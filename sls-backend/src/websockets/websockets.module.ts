import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { WsConnectionService } from './services/ws-connection.service';
import { WebsocketsController } from './websockets.controller';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([WsConnectionEntity, StaffEntity])],
    controllers: [WebsocketsController],
    providers: [WsConnectionService],
    exports: [WsConnectionService],
})
export class WebsocketsModule {}
