import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;

export async function connectDb() {
  try {
    await mongoose.connect(mongoUri, {});
    console.info("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
