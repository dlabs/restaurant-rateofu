import { Connection } from 'mongoose';
import { OrderItemSchema } from '../entities/orderitem.entity';
import { DatabaseProviderTypes } from 'modules/database/database.provider.types';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';

export const OrderItemProvider = {
  provide: RepositoryProviderTypes.OrderItemRepository,
  useFactory: (connection: Connection) =>
    connection.model('OrderItem', OrderItemSchema),
  inject: [DatabaseProviderTypes.MainDatabase],
};
