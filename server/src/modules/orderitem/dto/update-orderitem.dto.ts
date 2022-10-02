import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderItemStatus } from '../enum/orderitem.status';

export class UpdateOrderItemParams {
  @IsNotEmpty()
  id: string;
}

export class UpdateOrderItemRequestDto {
  @IsNotEmpty()
  @IsEnum(OrderItemStatus, { message: 'Invalid status' })
  status: OrderItemStatus;
}

export class UpdateOrderItemResponseDto {}
