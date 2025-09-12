import dotenv from "dotenv";
dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET,
  // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  // AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default ENV;