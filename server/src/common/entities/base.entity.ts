import { Document } from 'mongoose';

export class BaseEntity extends Document {
  _id: string;

  created_at: Date;

  updated_at: Date;
}
