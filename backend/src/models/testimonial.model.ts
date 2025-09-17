import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  email: string;
  feedback: string;
  image?: string;
  rating: number; // ⭐ 1–5
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;