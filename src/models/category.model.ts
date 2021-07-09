import  mongoose from "mongoose";
import Category from "../interfaces/category";

const categorySchema  = new mongoose.Schema({
  category : { type : String , required : true},
  productId : {type : mongoose.Schema.Types.ObjectId , ref : 'Product' , required : true}
},
  {timestamps : true}
);

export default mongoose.model<Category>("Category" , categorySchema);