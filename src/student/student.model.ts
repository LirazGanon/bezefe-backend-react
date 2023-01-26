import * as mongoose from 'mongoose';

export const StudentScheme = new mongoose.Schema({
  _id: { type: Number, require: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: false },
  profession: { type: String, required: true },
  classroom: { type: String, required: false },
});

export interface Student extends mongoose.Document {
  _id: number;
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
  classroom: string;
}
