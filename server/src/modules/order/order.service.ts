import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { IOrderService } from './interfaces/order.service.interface';
import { OrderDocument } from './entities/order.entity';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';
import { BaseService } from '@common/services';
import { MenuItemService } from 'modules/menuitem/menuitem.service';

@Injectable()
export class OrderService
  extends BaseService<OrderDocument>
  implements IOrderService
{
  constructor(
    @Inject(RepositoryProviderTypes.OrderRepository)
    private readonly orderModel: Model<OrderDocument>,
    private readonly menuItemService: MenuItemService,
  ) {
    super(orderModel);
  }

  async createOrder(createOrderDto: CreateOrderRequestDto): Promise<any> {
    // Grab the order item ids
    const ids = createOrderDto.items.map((i) => i.item_id);

    // Grab menu items by ids
    const menuItems = await this.menuItemService.findByIds(ids);

    /**
     * There are many ways of approaching this problem.
     * Interesting and hacky way of validating if the user provided the correct order menu items
     * We can approach this in multiple ways but this approach is definitely better in
     * performance than looping through the items and calling findById on each item.
     */
    if (ids.length !== menuItems.length) {
      throw new HttpException(
        'Please provider valid items',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Calculate total price
    const total_price: number = createOrderDto.items.reduce((sum, item) => {
      const menuItem = menuItems.find((m) => m._id === item.item_id);
      const menuItemTotal: number = item.quantity * menuItem.item_price;

      return sum + menuItemTotal;
    }, 0);
  }
}
