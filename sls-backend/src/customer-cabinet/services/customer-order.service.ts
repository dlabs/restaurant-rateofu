import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { OrderEntity } from 'src/database/entities/order.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { OrderItemStatus } from 'src/shared/enums/order-item-status.enum';
import { WsConnectionService } from 'src/websockets/services/ws-connection.service';
import { Repository } from 'typeorm';
import { OrderItem, SubmitOrderRequest } from '../requests/submit-order.request';

@Injectable()
export class CustomerOrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly wsConnectionService: WsConnectionService,
    ) {}

    public async createAndSubmitOrder({ items, tableNo }: SubmitOrderRequest) {
        const totalOrderAmount = await this.calculateTotalOrderAmount(items);
        const createdOrder = await this.orderRepository.save({
            tableNo,
            totalAmount: totalOrderAmount.toString(),
        });

        // * NOTE: Ideally - we should use a transactional approach here
        // * and create order and order items in the scope of a single transaction

        const preparedOrderItems: Partial<OrderItemEntity>[] = [];

        items.forEach((item) =>
            // * Create new order item entity N amount of times (N - quantity)
            Array.from({ length: item.quantity }, () =>
                preparedOrderItems.push({
                    orderId: createdOrder.id,
                    productId: item.productId,
                    status: OrderItemStatus.AWAITING,
                }),
            ),
        );

        await this.orderItemRepository.save(preparedOrderItems);

        const orderDataForStaff = await this.orderRepository.findOne(createdOrder.id, {
            relations: ['orderItems', 'orderItems.product'],
        });

        // * Notify staff applications via WS that new order has been created
        await this.wsConnectionService.sendMessageToAllConnections({
            event: 'newOrder',
            payload: orderDataForStaff,
        });

        return { totalOrderAmount };
    }

    private async calculateTotalOrderAmount(items: OrderItem[]) {
        // * Shortcut: Since we have limited amount of products - we can query all the products to simplify price search;
        const products = await this.productRepository.find();
        let totalAmount = 0;
        items.forEach((item) => (totalAmount += products.find((p) => p.id === item.productId).getFloatPrice() * item.quantity));
        return totalAmount;
    }
}
