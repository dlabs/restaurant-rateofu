import { IsEnum } from 'class-validator';
import { OrderItemStatus } from 'src/shared/enums/order-item-status.enum';

export class UpdateItemStatusRequest {
    accessToken: string;

    @IsEnum(OrderItemStatus)
    newStatus: OrderItemStatus;
}
