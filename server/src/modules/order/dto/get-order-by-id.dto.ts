import { IsNotEmpty } from 'class-validator';
import { OrderItemDto } from './create-order.dto';

export class GetOrderByIdRequestDto {
  @IsNotEmpty()
  id: string;
}

export class GetOrderByIdResponseDto {
  order_id: string;
  table_id: string;
  order_items: OrderItemDto[];
  order_total: number;
}
