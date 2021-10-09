import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { WsConnectionService } from './services/ws-connection.service';

@Controller('ws')
export class WebsocketsController {
    constructor(private readonly wsConnectionService: WsConnectionService) {}

    @HttpCode(204)
    @Post('register')
    public async registerWsConnection(@Body() data: { connectionId: string }) {
        // * This method is executed by $connect hook on AWS API Gateway
        await this.wsConnectionService.registerConnection(data.connectionId);
        return;
    }
}
