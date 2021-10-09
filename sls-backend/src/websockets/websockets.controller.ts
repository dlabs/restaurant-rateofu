import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { WsConnectionService } from './services/ws-connection.service';

@Controller('ws')
export class WebsocketsController {
    constructor(private readonly wsConnectionService: WsConnectionService) {}

    @Post('register')
    public async registerWsConnection(@Body() data: { connectionId: string }) {
        // * This method is executed by $connect hook on AWS API Gateway
        await this.wsConnectionService.registerConnection(data.connectionId);
        return data.connectionId;
    }

    @Post('unregister')
    public async unregisterWsConnection(@Body() data: { connectionId: string }) {
        // * This method is executed by $disconnect hook on AWS API Gateway
        await this.wsConnectionService.unregisterConnection(data.connectionId);
        return data.connectionId;
    }

    @Post('messages')
    public async processClientMessage(@Body() data: { connectionId: string; message: string }) {
        const payload = JSON.parse(data.message);

        // * Handle different events - consider implementing this part with more effort in case 2+ events will be processed;
        if (payload.event === 'confirm_connection') {
            await this.wsConnectionService.linkConnectionToStaff(data.connectionId, payload?.accessToken);
        }
        return;
    }
}
