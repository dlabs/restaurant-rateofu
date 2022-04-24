import mongoose from 'mongoose';

export interface IOrderRequest {
    tableId: string;
    items: {
        itemId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
}
