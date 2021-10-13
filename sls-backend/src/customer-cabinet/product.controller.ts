import { Controller, Get } from '@nestjs/common';
import { ProductService } from './services/product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAvailableProducts() {
        const products = await this.productService.getAvailableProducts();
        // * Return price as both string & float for display & calculation purposes
        return products.map((p) => ({ ...p, price: p.getFloatPrice(), displayPrice: p.price }));
    }
}
