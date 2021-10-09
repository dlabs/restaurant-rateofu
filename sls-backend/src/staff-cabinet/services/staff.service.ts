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

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
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
                        console.dir('here');
                        await this.startWorkingOnItem(staffMember.id, orderItem.id);
                    } else {
                        console.dir('else');
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

    private async startWorkingOnItem(staffId: number, itemId: number) {
        return Promise.all([
            this.orderItemRepository.update(itemId, { status: OrderItemStatus.IN_PROCESS, processedBy: staffId }),
            this.staffRepository.update(staffId, { status: StaffStatus.BUSY }),
        ]);
    }

    private async markItemAsReady(staffId: number, orderItem: OrderItemEntity) {
        await this.orderItemRepository.update(orderItem.id, { status: OrderItemStatus.READY, processedBy: null });

        const allOrderItems = await this.orderItemRepository.find({
            where: { orderId: orderItem.orderId },
            relations: ['product'],
        });

        // TODO: Send WS event to every staff to reflect item state change

        // * Mark staff member as available if all his processed items were delivered
        if (allOrderItems.filter((oi) => oi.processedBy === staffId).length === 0) {
            await this.staffRepository.update(staffId, { status: StaffStatus.AVAILABLE });
        }

        const productSpecificItems = allOrderItems.filter((oi) => oi.product.type === orderItem.product.type);

        if (productSpecificItems.every((item) => item.status === OrderItemStatus.READY)) {
            // * Batch ready, assign waiter
            // TODO: Assign waiter
            console.dir(`${orderItem.product.type} batch ready!`);
        }

        return;
    }
}
