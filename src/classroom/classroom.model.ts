import * as mongoose from 'mongoose';

export const ClassroomScheme = new mongoose.Schema({
  _id: { type: String, require: true },
  name: { type: String, required: true },
  totalPlaces: { type: Number, required: true },
  placeLeft: { type: Number, required: true },
  students: { type: Array, required: false },
});

export interface Classroom extends mongoose.Document {
  _id: string;
  name: string;
  totalPlaces: number;
  placeLeft: number;
  students: [];
}
