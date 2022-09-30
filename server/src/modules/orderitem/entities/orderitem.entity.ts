import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.String })
  item_id: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  status: string;
}

export type OrderItemDocument = OrderItem & Document;

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
