import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProvider } from './provider/order.entity.provider';
import { MenuItemProvider } from 'modules/menuitem/provider/menuitem.entity.provider';
import { MenuItemService } from 'modules/menuitem/menuitem.service';

@Module({
  providers: [OrderProvider, MenuItemProvider, MenuItemService, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
