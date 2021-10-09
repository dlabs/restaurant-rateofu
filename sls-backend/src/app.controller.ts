import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
    @Get('health')
    health() {
        return {
            msg: 'Hello from serverless app!',
        };
    }
}
