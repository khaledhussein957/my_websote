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
  motto?: string;

  // social links
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;

  resetPasswordCode: string;
  resetPasswordExpiresAt: Date;

  location: string;

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

    // social links
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },

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
    motto: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
