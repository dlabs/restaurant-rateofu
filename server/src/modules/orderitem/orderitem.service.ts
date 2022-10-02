import { BaseService } from '@common/services';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderItemDocument } from './entities/orderitem.entity';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';
import { OrderItemStatus } from './enum/orderitem.status';

@Injectable()
export class OrderItemService extends BaseService<OrderItemDocument> {
  constructor(
    @Inject(RepositoryProviderTypes.OrderItemRepository)
    private readonly orderItemModel: Model<OrderItemDocument>,
  ) {
    super(orderItemModel);
  }

  async getOrderItemsByStatus(has_unfinished_items: boolean) {
    const condition = has_unfinished_items ? '$in' : '$nin';
    const result = await this.orderItemModel
      .find({
        item_status: {
          [condition]: [
            OrderItemStatus.ordered,
            OrderItemStatus.preparing,
            OrderItemStatus.ready_to_serve,
          ],
        },
      })
      .exec();

    return result;
  }
}
