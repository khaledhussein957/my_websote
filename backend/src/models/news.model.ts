import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  image?: string; // optional news image URL
  author?: string; // optional author name
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema<INews> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String },
    author: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const News: Model<INews> = mongoose.model<INews>("News", newsSchema);

export default News;
