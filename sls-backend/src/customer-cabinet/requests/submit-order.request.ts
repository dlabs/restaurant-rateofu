import { IsArray, IsInt } from 'class-validator';

export type OrderItem = { productId: number; quantity: number };

export class SubmitOrderRequest {
    @IsArray()
    items: OrderItem[];

    @IsInt()
    tableNo: number;
}
