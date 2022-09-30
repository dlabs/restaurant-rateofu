import { BaseEntity } from '@common/entities/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MenuItemType } from '../enum/menuitem.type';

@Schema()
export class MenuItem extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.String })
  item_title: string;

  @Prop({ type: mongoose.Schema.Types.String })
  item_price: number;

  @Prop()
  item_description: MenuItemType;

  @Prop({ type: mongoose.Schema.Types.String })
  item_image: string;
}

export type MenuItemDocument = MenuItem & Document;

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
