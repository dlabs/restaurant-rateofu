import { BaseService } from '@common/services';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderItemDocument } from './entities/orderitem.entity';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';

@Injectable()
export class OrderItemService extends BaseService<OrderItemDocument> {
  constructor(
    @Inject(RepositoryProviderTypes.OrderItemRepository)
    private readonly orderItemModel: Model<OrderItemDocument>,
  ) {
    super(orderItemModel);
  }
}
