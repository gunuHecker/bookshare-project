import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Book from "@/models/Book";
import User from "@/models/User";
import mongoose from "mongoose";

// Get a single book by ID
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { bookId } = params;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    // Find the book by ID
    const book = await Book.findById(bookId).lean();

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Map _id to id for consistent API response format
    book.id = book._id.toString();
    
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Get book error:", error);
    return NextResponse.json(
      { message: "Server error while getting book details" },
      { status: 500 }
    );
  }
}

// Update a book listing
export async function PUT(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { bookId } = params;
    const body = await request.json();
    const { title, author, genre, location, contactInfo, ownerId } = body;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
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

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Check if user is the owner of the book
    if (book.ownerId.toString() !== ownerId) {
      return NextResponse.json(
        { message: "You can only update your own book listings" },
        { status: 403 }
      );
    }

    // Update the book
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.location = location || book.location;
    book.contactInfo = contactInfo || book.contactInfo;

    // Save the updated book
    await book.save();

    // Convert to plain object for response
    const bookResponse = book.toObject();
    bookResponse.id = bookResponse._id.toString();

    return NextResponse.json(bookResponse, { status: 200 });
  } catch (error) {
    console.error("Update book error:", error);
    return NextResponse.json(
      { message: "Server error while updating book listing" },
      { status: 500 }
    );
  }
}

// Delete a book listing
export async function DELETE(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { bookId } = params;
    const body = await request.json();
    const { ownerId } = body;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Check if user is the owner of the book
    if (book.ownerId.toString() !== ownerId) {
      return NextResponse.json(
        { message: "You can only delete your own book listings" },
        { status: 403 }
      );
    }

    // Delete the book
    await Book.findByIdAndDelete(bookId);

    return NextResponse.json(
      {
        message: "Book listing deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete book error:", error);
    return NextResponse.json(
      { message: "Server error while deleting book listing" },
      { status: 500 }
    );
  }
}
