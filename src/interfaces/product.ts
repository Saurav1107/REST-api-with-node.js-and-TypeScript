import { Document} from 'mongoose';
import mongoose from 'mongoose'
export default interface Product extends Document {
  productName: string,
  categoryId : mongoose.Schema.Types.ObjectId
}