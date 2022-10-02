import { Module } from '@nestjs/common';
import { OrderItemService } from './orderitem.service';
import { OrderItemController } from './orderitem.controller';
import { OrderItemProvider } from './provider/orderitem.entity.provider';

@Module({
  providers: [OrderItemProvider, OrderItemService],
  controllers: [OrderItemController],
})
export class OrderitemModule {}
