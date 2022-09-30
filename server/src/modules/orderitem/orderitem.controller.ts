import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './orderitem.service';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
}
