import mongoose from 'mongoose';
import { Document } from 'mongoose';

export default interface Category extends Document {
  category : String,
  productId : mongoose.Schema.Types.ObjectId
}