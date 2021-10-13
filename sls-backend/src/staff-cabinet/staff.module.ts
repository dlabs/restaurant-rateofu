import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { OrderEntity } from 'src/database/entities/order.entity';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { WebsocketsModule } from 'src/websockets/websockets.module';
import { StaffService } from './services/staff.service';
import { StaffController } from './staff.controller';

@Module({
    imports: [WebsocketsModule, TypeOrmModule.forFeature([StaffEntity, OrderEntity, OrderItemEntity])],
    controllers: [StaffController],
    providers: [StaffService],
})
export class StaffModule {}
