import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  GetMenuItemRequestDto,
  GetMenuItemResponseDto,
  GetMenuItemsResponseDto,
} from './dto';
import { MenuItemService } from './menuitem.service';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  async getMenuItems(): Promise<GetMenuItemsResponseDto[]> {
    const menuItems = await this.menuItemService.findAll();
    return menuItems.map((menuItem) => ({
      item_id: menuItem.id,
      item_description: menuItem.item_description,
      item_image: menuItem.item_image,
      item_price: menuItem.item_price,
      item_title: menuItem.item_title,
      item_type: menuItem.item_type,
    }));
  }

  @Get(':id')
  async getMenuItem(
    @Param() { id }: GetMenuItemRequestDto,
  ): Promise<GetMenuItemResponseDto> {
    const menuItem = await this.menuItemService.findOne(id);

    if (!menuItem)
      throw new HttpException('Menu item does not exist', HttpStatus.NOT_FOUND);

    return {
      item_id: menuItem.id,
      item_description: menuItem.item_description,
      item_image: menuItem.item_image,
      item_price: menuItem.item_price,
      item_title: menuItem.item_title,
      item_type: menuItem.item_type,
    };
  }
}
