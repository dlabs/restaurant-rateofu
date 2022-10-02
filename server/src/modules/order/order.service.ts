import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { IOrderService } from './interfaces/order.service.interface';
import { OrderDocument } from './entities/order.entity';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';
import { BaseService } from '@common/services';
import { MenuItemService } from 'modules/menuitem/menuitem.service';
import { OrderItemService } from 'modules/orderitem/orderitem.service';
import { OrderItemStatus } from 'modules/orderitem/enum/orderitem.status';
import { OrderItemDto } from './dto/create-order.dto';
import { OrderItem } from 'modules/orderitem/entities/orderitem.entity';

@Injectable()
export class OrderService
  extends BaseService<OrderDocument>
  implements IOrderService
{
  constructor(
    @Inject(RepositoryProviderTypes.OrderRepository)
    private readonly orderModel: Model<OrderDocument>,
    private readonly menuItemService: MenuItemService,
    private readonly orderItemService: OrderItemService,
  ) {
    super(orderModel);
  }

  async createOrder(
    createOrderDto: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
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

    let total_price: number = 0;
    const orderItems: OrderItem[] = [];

    /**
     * Loop through items to calculate total price and create order items
     */
    for (const item of createOrderDto.items) {
      const menuItem = menuItems.find((m) => m.id === item.item_id);
      // Calculate total price (better way of doing this is with reduce() method)
      total_price += item.quantity * menuItem.item_price;

      // @ts-ignore : Ignore
      const orderItem: OrderItem = await this.orderItemService.create({
        item_id: menuItem.id,
        item_status: OrderItemStatus.ordered,
      });
      orderItems.push(orderItem);
    }

    // @ts-ignore : Ignore
    const createdOrder = await this.create({
      table_id: createOrderDto.table_id,
      order_total: total_price,
      order_items: orderItems,
    });

    const order_items: OrderItemDto[] = orderItems.map((orderItem) => ({
      order_item_id: orderItem.id,
      item_id: orderItem.item_id,
      status: orderItem.item_status,
    }));

    return {
      order_id: createdOrder.id,
      order_items: order_items,
      table_id: createOrderDto.table_id,
    };
  }

  async getOrdersByFinishedItems(has_unfinished_items: boolean) {
    // This is an interesting approach of solving this problem since we don't have to do two separate methods
    // for orders who have unfinished items and for those who don't
    const condition = has_unfinished_items ? '$in' : '$nin';

    const result = await this.orderModel.aggregate([
      {
        $lookup: {
          from: 'orderitems',
          localField: 'order_items',
          foreignField: '_id',
          as: 'order_items',
        },
      },
      {
        $match: {
          'order_items.item_status': {
            [condition]: [
              OrderItemStatus.ordered,
              OrderItemStatus.preparing,
              OrderItemStatus.ready_to_serve,
            ],
          },
        },
      },
    ]);

    return result;
  }
}
