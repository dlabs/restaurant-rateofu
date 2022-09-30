import { BaseService } from '@common/services';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';
import { MenuItemDocument } from './entities/menuitem.entity';

@Injectable()
export class MenuItemService extends BaseService<MenuItemDocument> {
  constructor(
    @Inject(RepositoryProviderTypes.MenuItemRepository)
    private readonly menuItemModel: Model<MenuItemDocument>,
  ) {
    super(menuItemModel);
  }
}
