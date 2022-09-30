import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderRequestDto) {
    return await this.orderService.createOrder(createOrderDto);
  }
}
