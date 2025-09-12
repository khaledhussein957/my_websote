import { Schema, Document, model, Types } from "mongoose";

export interface IExperience extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  company: string;
  startYear: string;
  endYear: string;
  location: string;

  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema: Schema<IExperience> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    company: {
      type: String,
      required: true,
    },
    startYear: {
      type: String,
    },
    endYear: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

const Experience = model<IExperience>("Experience", experienceSchema);

export default Experience;
