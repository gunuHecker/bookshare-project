import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Book from "@/models/Book";
import mongoose from "mongoose";

// Update book status
export async function PATCH(request, context) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Properly access the bookId from context
    const { params } = context;
    const { bookId } = params;

    const body = await request.json();
    const { status, ownerId } = body;

    console.log(
      `Updating book ${bookId} status to ${status} by owner ${ownerId}`
    );

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    // Validate bookId format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json(
        { message: "Invalid book ID format" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    if (!["available", "rented", "exchanged"].includes(status)) {
      return NextResponse.json(
        {
          message:
            "Invalid status. Must be one of: available, rented, exchanged",
        },
        { status: 400 }
      );
    }

    // Validate owner ID
    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    try {
      // Instead of using Mongoose validation, directly update with MongoDB driver
      const db = mongoose.connection.db;

      // First check if the book exists and belongs to the owner
      const bookCollection = db.collection("books");
      const book = await bookCollection.findOne({
        _id: new mongoose.Types.ObjectId(bookId),
      });

      if (!book) {
        return NextResponse.json(
          { message: "Book not found" },
          { status: 404 }
        );
      }

      // Check ownership
      if (book.ownerId.toString() !== ownerId) {
        return NextResponse.json(
          { message: "You can only update your own book listings" },
          { status: 403 }
        );
      }

      // Update the book status directly in MongoDB
      const result = await bookCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(bookId) },
        { $set: { status: status, updatedAt: new Date() } }
      );

      console.log(`Update result: ${JSON.stringify(result)}`);

      if (result.modifiedCount === 0) {
        throw new Error("Book could not be updated");
      }

      // Get the updated book
      const updatedBook = await bookCollection.findOne({
        _id: new mongoose.Types.ObjectId(bookId),
      });

      console.log(`Updated book: ${JSON.stringify(updatedBook)}`);

      // Format the response
      const bookResponse = {
        ...updatedBook,
        id: updatedBook._id.toString(),
        _id: updatedBook._id.toString(),
      };

      return NextResponse.json(bookResponse, { status: 200 });
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      throw dbError;
    }
  } catch (error) {
    console.error("Update book status error:", error);
    return NextResponse.json(
      { message: `Server error while updating book status: ${error.message}` },
      { status: 500 }
    );
  }
}
