import { Schema, model } from 'mongoose';
const { String, ObjectId } = Schema.Types;

export interface IOrderItem {
    itemId: string;
    itemStatus: 'ordered' | 'preparing' | 'ready_to_serve' | 'served';
}

export const OrderItemSchema = new Schema<IOrderItem>({
    itemId: { type: ObjectId, required: true },
    itemStatus: {
        type: String,
        enum: ['ordered', 'preparing', 'ready_to_serve', 'served'],
        required: true,
    },
});

const OrderItem = model<IOrderItem>('Order', OrderItemSchema);
export default OrderItem;
