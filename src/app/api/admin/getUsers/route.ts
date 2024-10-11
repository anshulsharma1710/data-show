import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// Named export for GET request
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Database connection successful");

    const users = await User.find();
    console.log("Users fetched successfully", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch users:", error.message);
      return NextResponse.json({ message: "Failed to fetch users", error: error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
