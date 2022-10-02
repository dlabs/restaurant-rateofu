import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderItem } from 'modules/orderitem/entities/orderitem.entity';
import { BaseEntity } from '@common/entities/base.entity';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Order extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  table_id: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  order_total: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'OrderItem',
    required: true,
  })
  order_items: OrderItem[];
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
