import dotenv from "dotenv";
dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  DB_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  // AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ARCJET_KEY: process.env.ARJEC_API_KEY || "",
};

export default ENV;