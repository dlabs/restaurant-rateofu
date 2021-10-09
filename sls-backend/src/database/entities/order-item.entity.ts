import { OrderItemStatus } from 'src/shared/enums/order-item-status.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity({ schema: 'public', name: 'order_items' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'product_id', type: 'int', nullable: false })
    public productId: number;

    @ManyToOne(() => ProductEntity, (p) => p.orderItems)
    @JoinColumn({ name: 'id' })
    public product: ProductEntity;

    @Column({ name: 'order_id', type: 'int', nullable: false })
    public orderId: number;

    @ManyToOne(() => OrderEntity, (o) => o.orderItems)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    public order: OrderEntity;

    @Column({
        name: 'status',
        type: 'enum',
        enum: [OrderItemStatus.AWAITING, OrderItemStatus.IN_PROCESS, OrderItemStatus.READY, OrderItemStatus.SERVED],
        nullable: false,
    })
    public status: OrderItemStatus;

    // * We can add relation to the staff in future to query all processed order items by single staff member
    @Column({ name: 'processed_by', type: 'int', nullable: false })
    public processedBy: number;
}
