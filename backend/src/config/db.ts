import mongoose from "mongoose";
import ENV from "./ENV";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
