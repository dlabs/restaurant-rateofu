import { Module } from '@nestjs/common';
import { MenuItemService } from './menuitem.service';
import { MenuItemController } from './menuitem.controller';
import { MenuItemProvider } from './provider/menuitem.entity.provider';

@Module({
  providers: [MenuItemProvider, MenuItemService],
  controllers: [MenuItemController],
})
export class MenuitemModule {}
