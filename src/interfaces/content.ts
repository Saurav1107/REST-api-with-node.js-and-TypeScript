import { Document } from 'mongoose';
import mongoose from 'mongoose';

export default interface Content extends Document {
  count: number,
  productId : mongoose.Schema.Types.ObjectId
}