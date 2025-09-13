import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface INews extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  slug?: string;
  eventAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema<INews> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String },
    slug: { type: String },
    eventAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const News: Model<INews> = mongoose.model<INews>("News", newsSchema);

export default News;
