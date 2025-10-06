import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  techStack: Types.ObjectId[]; // array of tech stack IDs
  githubUrl?: string;
  type: string;
  liveDemoUrl?: string;
  image?: string;
  featured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: Schema.Types.ObjectId, ref: "TechStack" }],
    githubUrl: { type: String },
    type: {
      type: String,
      required: true,
      enum: ["mobile", "fullstack", "frontend", "backend", "machine"],
    },
    liveDemoUrl: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = model<IProject>("Project", projectSchema);

export default Project;
