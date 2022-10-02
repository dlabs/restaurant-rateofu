import { OrderItemDto } from './create-order.dto';

export class GetUnfinishedOrdersResponseDto {
  order_id: string;
  table_id: string;
  order_items: OrderItemDto[];
}
