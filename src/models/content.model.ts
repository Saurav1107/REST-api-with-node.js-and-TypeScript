import mongoose from "mongoose";
import Content from "../interfaces/content";

const contentSchema =  new mongoose.Schema({
  productId : {type : mongoose.Schema.Types.ObjectId , ref : 'Product' , required : true},
  count : { type : Number , required : true}
},
{timestamps : true});

export default mongoose.model<Content>("Content" , contentSchema);