import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { OrderItem } from 'modules/orderitem/entities/orderitem.entity';

export class CreateOrderOrderItemDto {
  item_id: string;
  quantity: number;
}

export class CreateOrderRequestDto {
  @IsNotEmpty()
  table_id: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'Please provide at least 1 item' })
  @Type(() => CreateOrderOrderItemDto)
  items: CreateOrderOrderItemDto[];
}

export class CreateOrderResponseDto {
  order_id: string;

  table_id: string;

  order_items: OrderItem[];
}
