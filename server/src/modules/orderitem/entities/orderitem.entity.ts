import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseEntity } from '@common/entities/base.entity';
import { OrderItemStatus } from '../enum/orderitem.status';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class OrderItem extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  item_id: string;

  @Prop({ required: true })
  item_status: OrderItemStatus;
}

export type OrderItemDocument = OrderItem & Document;

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
