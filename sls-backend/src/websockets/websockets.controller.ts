import { Body, Controller, Post } from '@nestjs/common';

@Controller('ws')
export class WebsocketsController {
    @Post('register')
    public registerWsConnection(@Body() data: any) {
        console.dir(data);
        return data;
    }
}
