import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectToDatabase() {
  // Check if MONGODB_URI is defined
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
  }

  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  // Connect to MongoDB
  return mongoose.connect(MONGODB_URI);
}
