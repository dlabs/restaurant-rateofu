import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { StaffStatus } from 'src/shared/enums/staff-status.enum';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { AuthRequest } from '../requests/auth.request';
import { OrderEntity } from 'src/database/entities/order.entity';
import { UpdateItemStatusRequest } from '../requests/update-item-status.request';

import { staffRolesAclMap } from 'src/shared/utils/staff-role-acl.map';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { OrderItemStatus } from 'src/shared/enums/order-item-status.enum';
import { ProductTypes } from 'src/shared/enums/product-types.enum';
import { StaffRoles } from 'src/shared/enums/staff-roles.enum';
import { WsConnectionService } from 'src/websockets/services/ws-connection.service';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
        private readonly wsService: WsConnectionService,
    ) {}

    public async authenticate({ name, role }: AuthRequest) {
        const existingStaff = await this.staffRepository.findOne({
            where: {
                name,
                role,
            },
        });

        if (existingStaff) {
            await this.staffRepository.update(existingStaff.id, { status: StaffStatus.AVAILABLE });
            return { accessToken: existingStaff.accessToken };
        }

        const newStaff = await this.staffRepository.save({
            name,
            role,
            status: StaffStatus.AVAILABLE,
            accessToken: nanoid(32),
        });

        return { accessToken: newStaff.accessToken };
    }

    public async getPendingOrders() {
        return this.orderRepository.find({ where: { isCompleted: false }, relations: ['orderItems', 'orderItems.product'] });
    }

    public async verifyAndUpdateItemStatus(data: UpdateItemStatusRequest & { orderId: number; itemId: number }) {
        const [staffMember, orderItem] = await Promise.all([
            this.staffRepository.findOne({ where: { accessToken: data.accessToken } }),
            this.orderItemRepository.findOne(data.itemId, { relations: ['product'] }),
        ]);

        if (!staffMember) {
            throw new UnauthorizedException('Access token is required');
        }
        if (!orderItem) {
            throw new BadRequestException('Target item not found');
        }

        const acl = staffRolesAclMap.get(staffMember.role);

        if (acl && acl.itemStatus.includes(data.newStatus) && acl.itemType.includes(orderItem.product.type)) {
            switch (data.newStatus) {
                case OrderItemStatus.IN_PROCESS:
                    if (orderItem.status === OrderItemStatus.AWAITING) {
                        await this.startWorkingOnItem(staffMember.id, orderItem.id);
                    } else {
                        throw new BadRequestException('Item is not in awaiting state');
                    }
                    break;
                case OrderItemStatus.READY:
                    if (orderItem.status === OrderItemStatus.IN_PROCESS) {
                        await this.markItemAsReady(staffMember.id, orderItem);
                    } else {
                        throw new BadRequestException('Item is not in process');
                    }
                    break;
            }
            return true;
        }
        throw new ForbiddenException('Action not allowed');
    }

    public async verifyAndMarkBatchAsServed(data: { orderId: number; batchType: ProductTypes; accessToken: string }) {
        const staffMember = await this.staffRepository.findOne({ where: { accessToken: data.accessToken } });
        if (!staffMember || staffMember.role !== StaffRoles.WAITER) {
            throw new ForbiddenException('Only waiters can serve orders');
        }

        // ? Shortcut: Might add validation that all batch items are indeed ready here;

        const allOrderItems = await this.orderItemRepository.find({ where: { orderId: data.orderId }, relations: ['product'] });
        const targetBatchItems = allOrderItems.filter((oi) => oi.product.type === data.batchType);

        await this.orderItemRepository.update(
            targetBatchItems.map((oi) => oi.id),
            { status: OrderItemStatus.SERVED },
        );

        // * Re-fetch updated order items & mark order as completed if all items were served
        const allItemsHaveBeenServed: boolean = (await this.orderItemRepository.find({ where: { orderId: data.orderId } })).every(
            (oi) => oi.status === OrderItemStatus.SERVED,
        );

        if (allItemsHaveBeenServed) {
            await this.orderRepository.update(data.orderId, { isCompleted: true });
            await this.wsService.sendMessageToAllConnections({
                event: 'orderCompleted',
                payload: { orderId: data.orderId },
            });
        } else {
            await this.wsService.sendMessageToAllConnections({
                event: 'multipleOrderItemsStatusChanged',
                payload: targetBatchItems.map((tbi) => ({ orderItemId: tbi.id, newStatus: OrderItemStatus.SERVED })),
            });
        }

        // * Currently waiters do not notify system when they are serving order;
        // * They just need to notify the system when the order has been served;
        // * The line below could be used if waiter availability tracking is required for automatic orders distribution;
        // await this.staffRepository.update({ accessToken: data.accessToken }, { status: StaffStatus.AVAILABLE });

        return true;
    }

    private async startWorkingOnItem(staffId: number, itemId: number) {
        await Promise.all([
            this.orderItemRepository.update(itemId, { status: OrderItemStatus.IN_PROCESS, processedBy: staffId }),
            this.staffRepository.update(staffId, { status: StaffStatus.BUSY }),
        ]);

        await this.wsService.sendMessageToAllConnections({
            event: 'orderItemStatusChanged',
            payload: { orderItemId: itemId, newStatus: OrderItemStatus.IN_PROCESS },
        });

        return;
    }

    private async markItemAsReady(staffId: number, orderItem: OrderItemEntity) {
        await this.orderItemRepository.update(orderItem.id, { status: OrderItemStatus.READY, processedBy: null });

        await this.wsService.sendMessageToAllConnections({
            event: 'orderItemStatusChanged',
            payload: { orderItemId: orderItem.id, newStatus: OrderItemStatus.READY },
        });

        const allOrderItems = await this.orderItemRepository.find({
            where: { orderId: orderItem.orderId },
            relations: ['product'],
        });

        // * Mark staff member as available if all his processed items were delivered
        if (allOrderItems.filter((oi) => oi.processedBy === staffId).length === 0) {
            await this.staffRepository.update(staffId, { status: StaffStatus.AVAILABLE });
        }

        const productSpecificItems = allOrderItems.filter((oi) => oi.product.type === orderItem.product.type);

        if (productSpecificItems.every((item) => item.status === OrderItemStatus.READY)) {
            // * Batch ready, assign waiter
            await this.assignWaiterToServeBatch({ orderId: orderItem.orderId, batchType: orderItem.product.type });
        }

        return;
    }

    private async assignWaiterToServeBatch({ orderId, batchType }: { orderId: number; batchType: ProductTypes }) {
        const availableWaiters = await this.staffRepository.find({
            where: { role: StaffRoles.WAITER, status: StaffStatus.AVAILABLE },
        });

        if (!availableWaiters.length) {
            // ! Critical Error
            console.error('Critical: no waiters available to serve batch of order items');
            return false;
        }

        const assignedWaiter = availableWaiters[Math.floor(Math.random() * availableWaiters.length)];
        await this.wsService.sendMessageToSingleStaffMember(assignedWaiter.id, {
            event: 'batchReady',
            payload: { orderId, batchType },
        });
        return true;
    }
}
