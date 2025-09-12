import { Schema, model, Document, Types } from "mongoose";

export interface ITechStack extends Document {
  user: Types.ObjectId;
  name: string;
  icon?: string; // optional URL for icon (S3)
  category?: Types.ObjectId[]; // e.g., "frontend", "backend", "database", "tool"
}

const techStackSchema = new Schema<ITechStack>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const TechStack = model<ITechStack>("TechStack", techStackSchema);

export default TechStack;