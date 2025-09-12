import { Schema, Document, model } from "mongoose";

export interface IEducation extends Document {
  user: Types.ObjectId;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  gpa: string;
  uri: string;

  createdAt: Date;
  updatedAt: Date;
}

const educationSchema: Schema<IEducation> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startYear: {
    type: String,
  },
  endYear: {
    type: String,
  },
  gpa: {
    type: String,
  },
  uri: {
    type: String,
  },
}, { timestamps: true });

const Education = model<IEducation>("Education", educationSchema);

export default Education;
