import { BaseEntity } from '@common/entities/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MenuItemType } from '../enum/menuitem.type';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class MenuItem extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  item_title: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  item_price: number;

  @Prop({ type: mongoose.Schema.Types.String })
  item_description: string;

  @Prop({ required: true })
  item_type: MenuItemType;

  @Prop({ type: mongoose.Schema.Types.String })
  item_image: string;
}

export type MenuItemDocument = MenuItem & Document;

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
