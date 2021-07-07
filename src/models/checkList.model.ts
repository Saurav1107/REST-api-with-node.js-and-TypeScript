import mongoose, { Schema } from 'mongoose';
import checkList from '../interfaces/checkList';

//Schema model for check List
const checkListSchema: Schema = new Schema(
  {
    item: { type: String, required: true },
    count: { type: Number, required: true }
  },
  { timestamps: true }
);

const CheckList = mongoose.model<checkList>("CheckList", checkListSchema);

export default CheckList;