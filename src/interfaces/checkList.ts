import { Document } from 'mongoose';

export default interface checkList extends Document {
  item: string,
  count: number
}