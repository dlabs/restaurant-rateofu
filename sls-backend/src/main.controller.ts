import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class MainController {
    @Get('health')
    health() {
        return 'Hello from serverless route!';
    }
}
