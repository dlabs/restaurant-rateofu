import mongoose, { Schema, model } from 'mongoose';
const { String, ObjectId } = Schema.Types;

export interface IOrderItem {
    itemId: mongoose.Types.ObjectId;
    itemStatus: 'ordered' | 'preparing' | 'ready_to_serve' | 'served';
}

export type OrderItemWithID = IOrderItem & { _id: string };

export const OrderItemSchema = new Schema<IOrderItem>({
    itemId: { type: ObjectId, required: true },
    itemStatus: {
        type: String,
        enum: ['ordered', 'preparing', 'ready_to_serve', 'served'],
        required: true,
    },
});

const OrderItem = model<IOrderItem>('Order Item', OrderItemSchema);
export default OrderItem;
