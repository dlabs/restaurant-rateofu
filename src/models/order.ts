import { Schema, model } from 'mongoose';
const { String, Number } = Schema.Types;
import { IOrderItem, OrderItemSchema } from './order-item';

interface IOrder {
    tableId: string;
    orderTotal: number;
    orderItems: IOrderItem[];
}

const OrderSchema = new Schema<IOrder>({
    tableId: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
});

const Order = model<IOrder>('Order', OrderSchema);
export default Order;
