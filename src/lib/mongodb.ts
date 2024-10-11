import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || ""; // MongoDB URI from .env.local

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Add type declaration for global in Node.js
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Check if we're in development mode
if (process.env.NODE_ENV === "development") {
  // In development mode, use global to preserve the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
