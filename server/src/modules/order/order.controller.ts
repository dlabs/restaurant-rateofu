import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  OrderItemDto,
  CreateOrderRequestDto,
  GetOrderByIdRequestDto,
  GetOrderByIdResponseDto,
  GetUnfinishedOrdersResponseDto,
} from './dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query('has_unfinished_items') has_unfinished_items: string,
  ): Promise<GetUnfinishedOrdersResponseDto[]> {
    const condition = has_unfinished_items && has_unfinished_items === 'true';
    const result: Order[] = await this.orderService.getOrdersByFinishedItems(
      condition,
    );
    return result.map((order) => ({
      order_id: order._id,
      table_id: order.table_id,
      order_items: order.order_items.map((i) => ({
        order_item_id: i._id,
        item_id: i.item_id,
        status: i.item_status,
      })),
    }));
  }

  @Get(':id')
  async getOrder(
    @Param() { id }: GetOrderByIdRequestDto,
  ): Promise<GetOrderByIdResponseDto> {
    const order = await this.orderService.findOne(id);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    const order_items: OrderItemDto[] = order.order_items.map((orderItem) => ({
      order_item_id: orderItem._id,
      item_id: orderItem.item_id,
      status: orderItem.item_status,
    }));

    return {
      order_id: order.id,
      order_items: order_items,
      table_id: order.table_id,
      order_total: order.order_total,
    };
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderRequestDto) {
    return await this.orderService.createOrder(createOrderDto);
  }
}
