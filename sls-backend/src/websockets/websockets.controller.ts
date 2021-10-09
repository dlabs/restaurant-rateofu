import { Body, Controller, Post } from '@nestjs/common';
import { WsConnectionService } from './services/ws-connection.service';

@Controller('ws')
export class WebsocketsController {
    constructor(private readonly wsConnectionService: WsConnectionService) {}

    @Post('register')
    public async registerWsConnection(@Body() data: { connectionId: string }) {
        // * This method is executed by $connect hook on AWS API Gateway
        await this.wsConnectionService.registerConnection(data.connectionId);
        return JSON.stringify(data);
    }
}
