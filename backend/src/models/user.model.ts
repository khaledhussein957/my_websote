import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
  imageKey?: string;

  title?: string;
  about_me?: string;

  resetPasswordCode: string;
  resetPasswordExpiresAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    imageKey: {
      type: String,
    },

    resetPasswordCode: { type: String },
    resetPasswordExpiresAt: { type: Date },

    title: {
      type: String,
      default: "",
    },
    about_me: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
