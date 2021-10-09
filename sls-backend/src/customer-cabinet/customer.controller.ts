import { Body, Controller, Post } from '@nestjs/common';
import { SubmitOrderRequest } from './requests/submit-order.request';
import { CustomerOrderService } from './services/customer-order.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerOrderService: CustomerOrderService) {}

    @Post('orders')
    public submitOrder(@Body() data: SubmitOrderRequest) {
        return this.customerOrderService.createAndSubmitOrder(data);
    }
}
