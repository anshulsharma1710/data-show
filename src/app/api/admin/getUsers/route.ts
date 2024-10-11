import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Adjust path if necessary

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data-show"); // Replace with your actual database name
    const users = await db.collection("test").find({}, { projection: { fname: 1, lname: 1 } }).toArray(); // Fetch only fname and lname
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
