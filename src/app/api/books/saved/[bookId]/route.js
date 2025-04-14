import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import SavedBook from "@/models/SavedBook";
import mongoose from "mongoose";

// Delete a saved book
export async function DELETE(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { bookId } = params;
    const body = await request.json();
    const { userId } = body;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if IDs are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Find and delete the saved book
    const result = await SavedBook.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userId),
      bookId: new mongoose.Types.ObjectId(bookId),
    });

    if (!result) {
      return NextResponse.json(
        { message: "Saved book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Book removed from saved list successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete saved book error:", error);
    return NextResponse.json(
      { message: "Server error while removing saved book" },
      { status: 500 }
    );
  }
} 