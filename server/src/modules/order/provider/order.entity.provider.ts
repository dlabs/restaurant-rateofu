import { Connection } from 'mongoose';
import { OrderSchema } from '../entities/order.entity';
import { DatabaseProviderTypes } from 'modules/database/database.provider.types';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';

export const OrderProvider = {
  provide: RepositoryProviderTypes.OrderRepository,
  useFactory: (connection: Connection) =>
    connection.model('Order', OrderSchema),
  inject: [DatabaseProviderTypes.MainDatabase],
};
