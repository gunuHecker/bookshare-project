import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Book from "@/models/Book";
import User from "@/models/User";
import mongoose from "mongoose";

// Get books by owner ID
export async function GET(request, context) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the ownerId from context
    const ownerId = context.params.ownerId;
    console.log("Processing request for owner ID:", ownerId);

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    // Check if ownerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return NextResponse.json(
        { message: "Invalid owner ID format" },
        { status: 400 }
      );
    }

    // Find the owner in the database
    const owner = await User.findById(ownerId).lean();

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    // Find books for this owner
    const books = await Book.find({
      ownerId: new mongoose.Types.ObjectId(ownerId),
    }).lean();

    // Format the response with consistent ID field
    const result = books.map((book) => ({
      ...book,
      id: book._id.toString(),
      ownerName: owner.name,
      contactInfo: book.contactInfo || owner.mobile || owner.email,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error getting books:", error);
    return NextResponse.json(
      { message: "Server error getting books" },
      { status: 500 }
    );
  }
}
