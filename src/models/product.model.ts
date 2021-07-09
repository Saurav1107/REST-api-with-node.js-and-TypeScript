import mongoose, { Schema } from 'mongoose';
import Product from '../interfaces/product';

//Schema model for check List
const productSchema: Schema = new Schema(
  {
    categoryId: {type : mongoose.Schema.Types.ObjectId , ref : 'Category' , required : true},
    productName: { type: String, required: true }
  },

  { timestamps: true }
);

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;