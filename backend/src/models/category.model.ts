import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  user: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
