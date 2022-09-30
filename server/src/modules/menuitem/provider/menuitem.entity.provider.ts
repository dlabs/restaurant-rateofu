import { Connection } from 'mongoose';
import { MenuItemSchema } from '../entities/menuitem.entity';
import { DatabaseProviderTypes } from 'modules/database/database.provider.types';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';

export const MenuItemProvider = {
  provide: RepositoryProviderTypes.MenuItemRepository,
  useFactory: (connection: Connection) =>
    connection.model('MenuItem', MenuItemSchema),
  inject: [DatabaseProviderTypes.MainDatabase],
};
