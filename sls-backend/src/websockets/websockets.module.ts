import { Module } from '@nestjs/common';
import { WebsocketsController } from './websockets.controller';

@Module({
    controllers: [WebsocketsController],
})
export class WebsocketsModule {}
