import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.String })
  table_id: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  order_total: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' })
  order_items: string[];
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
