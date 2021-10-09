import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { WsConnectionService } from './services/ws-connection.service';
import { WebsocketsController } from './websockets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WsConnectionEntity])],
    controllers: [WebsocketsController],
    providers: [WsConnectionService],
})
export class WebsocketsModule {}
