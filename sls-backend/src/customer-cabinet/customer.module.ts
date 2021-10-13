import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { OrderEntity } from 'src/database/entities/order.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { WebsocketsModule } from 'src/websockets/websockets.module';
import { CustomerController } from './customer.controller';
import { ProductController } from './product.controller';
import { CustomerOrderService } from './services/customer-order.service';
import { ProductService } from './services/product.service';

@Module({
    imports: [WebsocketsModule, TypeOrmModule.forFeature([ProductEntity, OrderItemEntity, OrderEntity])],
    controllers: [ProductController, CustomerController],
    providers: [ProductService, CustomerOrderService],
})
export class CustomerModule {}
