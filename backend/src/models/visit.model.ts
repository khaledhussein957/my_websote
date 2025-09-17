import mongoose, { Schema, Document } from "mongoose";

export interface IVisit extends Document {
  ip: string;
  url: string;
  method: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  createdAt: Date;
  updatedAt: Date;
}

const visitSchema = new Schema<IVisit>(
  {
    ip: { type: String, required: true },
    url: { type: String, required: true },
    method: { type: String, required: true },
    userAgent: { type: String, required: true },
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    device: { type: String, default: "Unknown" },
  },
  { timestamps: true } 
);

const Visit = mongoose.model<IVisit>("Visit", visitSchema);

export default Visit;
