import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing");
  }

  try {
    if (mongoose.connection.readyState === 0) {
      // No need to pass extra options anymore for Mongoose 6+
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export default connectToDatabase;
