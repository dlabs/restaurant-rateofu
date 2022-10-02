import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProvider } from './provider/order.entity.provider';
import { MenuItemProvider } from 'modules/menuitem/provider/menuitem.entity.provider';
import { MenuItemService } from 'modules/menuitem/menuitem.service';
import { OrderItemProvider } from 'modules/orderitem/provider/orderitem.entity.provider';
import { OrderItemService } from 'modules/orderitem/orderitem.service';
import { databaseProviders } from 'modules/database/database.providers';

@Module({
  providers: [
    ...databaseProviders,
    OrderProvider,
    MenuItemProvider,
    OrderItemProvider,
    OrderItemService,
    MenuItemService,
    OrderService,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
