import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const revalidate = 0;

// Named export for GET request
export async function GET() {
  try {
    await connectToDatabase();
    console.log("Database connection successful");

    const users = await User.find(); // Ensure your model is correctly set up
    console.log("Users fetched successfully", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "Failed to fetch users", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
