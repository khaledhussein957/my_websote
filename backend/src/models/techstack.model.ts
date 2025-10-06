import { Types, Document, Schema, model } from "mongoose";

export interface ITechStack extends Document {
  user: Types.ObjectId;
  name: string;
  icon?: string;
  category?: Types.ObjectId[]; // allow multiple categories
  proficiency: number; // 1-10 scale
}

const techStackSchema = new Schema<ITechStack>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    icon: { type: String },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }], // ✅ array now
    proficiency: { type: Number, min: 1, max: 10, default: 5 },
  },
  { timestamps: true }
);

const TechStack = model<ITechStack>("TechStack", techStackSchema);

export default TechStack;
