import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuItemService } from './menuitem.service';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}
}
