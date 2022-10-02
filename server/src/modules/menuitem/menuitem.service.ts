import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from '@common/services';
import { Model } from 'mongoose';
import { RepositoryProviderTypes } from 'modules/database/repository.provider.types';
import { MenuItemDocument } from './entities/menuitem.entity';
import { menuItems } from 'modules/database/seeds/seed';

@Injectable()
export class MenuItemService
  extends BaseService<MenuItemDocument>
  implements OnModuleInit
{
  constructor(
    @Inject(RepositoryProviderTypes.MenuItemRepository)
    private readonly menuItemModel: Model<MenuItemDocument>,
  ) {
    super(menuItemModel);
  }

  // Seed data
  async onModuleInit() {
    // If there's data already inserted, don't insert duplicates
    const seedData = (await this.menuItemModel.find().count()) === 0;
    if (seedData) {
      await this.menuItemModel.insertMany(menuItems);
    }
  }
}
