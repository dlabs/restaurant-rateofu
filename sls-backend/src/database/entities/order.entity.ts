import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'table_no', type: 'int', nullable: false })
    public tableNo: number;

    @Column({ name: 'total_amount', type: 'money', nullable: true })
    public totalAmount: string;

    @Column({ name: 'is_completed', type: 'boolean', nullable: false })
    public isCompleted: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    public orderItems?: any;

    public getFloatTotalAmount() {
        return parseFloat(this.totalAmount.replace('$', ''));
    }
}
