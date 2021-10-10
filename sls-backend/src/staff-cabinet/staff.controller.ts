import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductTypes } from 'src/shared/enums/product-types.enum';
import { AuthRequest } from './requests/auth.request';
import { UpdateItemStatusRequest } from './requests/update-item-status.request';
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

    @Patch('orders/:orderId/batches/:batchType')
    public async markBatchAsServed(
        @Param('orderId') orderId: number,
        @Param('batchType') batchType: ProductTypes,
        @Body() { accessToken }: { accessToken: string },
    ) {
        return this.staffService.verifyAndMarkBatchAsServed({
            accessToken,
            batchType,
            orderId,
        });
    }

    @Patch('orders/:orderId/items/:itemId')
    public async updateItemStatus(
        @Param('orderId') orderId: number,
        @Param('itemId') itemId: number,
        @Body() data: UpdateItemStatusRequest,
    ) {
        return this.staffService.verifyAndUpdateItemStatus({
            accessToken: data.accessToken,
            orderId,
            itemId,
            newStatus: data.newStatus,
        });
    }
}
