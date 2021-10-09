import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRequest } from './requests/auth.request';
import { StaffService } from './services/staff.service';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Post('authenticate')
    public authenticate(@Body() data: AuthRequest) {
        return this.staffService.authenticate(data);
    }

    @Get('orders')
    public async getPendingOrders() {
        return this.staffService.getPendingOrders();
    }
}
