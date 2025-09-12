import { Schema, Document, model } from "mongoose";

export interface IExperience extends Document {
  user: Types.ObjectId;
  company: string;
  position: string;
  startYear: string;
  endYear: string;
  uri: string;

  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema: Schema<IExperience> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startYear: {
      type: String,
    },
    endYear: {
      type: String,
    },
    uri: {
      type: String,
    },
  },
  { timestamps: true }
);

const Experience = model<IExperience>("Experience", experienceSchema);

export default Experience;
