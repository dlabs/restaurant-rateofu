import {
  Controller,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateOrderItemParams, UpdateOrderItemRequestDto } from './dto';
import { OrderItemDocument } from './entities/orderitem.entity';
import { OrderItemService } from './orderitem.service';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Put(':id')
  async updateOrderItemStatus(
    @Param() { id }: UpdateOrderItemParams,
    @Body() { status }: UpdateOrderItemRequestDto,
  ): Promise<OrderItemDocument> {
    const orderItem = await this.orderItemService.findOne(id);

    if (!orderItem)
      throw new HttpException('Order item not found', HttpStatus.NOT_FOUND);

    orderItem.item_status = status;

    return await this.orderItemService.update(id, orderItem);
  }
}
