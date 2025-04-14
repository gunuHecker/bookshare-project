import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import SavedBook from "@/models/SavedBook";
import Book from "@/models/Book";
import User from "@/models/User";
import mongoose from "mongoose";

// Get all saved books for a user
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const bookId = searchParams.get("bookId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // If bookId is provided, just check if this specific book is saved
    if (bookId) {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return NextResponse.json(
          { message: "Invalid book ID format" },
          { status: 400 }
        );
      }

      const savedBook = await SavedBook.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        bookId: new mongoose.Types.ObjectId(bookId),
      }).lean();

      return NextResponse.json({ isSaved: !!savedBook }, { status: 200 });
    }

    // Find all saved books for this user
    const savedBooks = await SavedBook.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();

    // Get the actual book details for each saved book
    const bookDetails = await Promise.all(
      savedBooks.map(async (saved) => {
        const book = await Book.findById(saved.bookId).lean();
        if (!book) return null; // Book might have been deleted

        // Get owner details
        let ownerName = "Unknown";
        if (book.ownerId) {
          const owner = await User.findById(book.ownerId).lean();
          if (owner) {
            ownerName = owner.name;
          }
        }

        return {
          ...book,
          id: book._id.toString(),
          ownerName,
          savedAt: saved.createdAt,
        };
      })
    );

    // Filter out any null values (deleted books)
    const validBooks = bookDetails.filter((book) => book !== null);

    return NextResponse.json(validBooks, { status: 200 });
  } catch (error) {
    console.error("Get saved books error:", error);
    return NextResponse.json(
      { message: "Server error while fetching saved books" },
      { status: 500 }
    );
  }
}

// Save a book for a user
export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    const body = await request.json();
    const { userId, bookId } = body;

    // Validate required fields
    if (!userId || !bookId) {
      return NextResponse.json(
        { message: "User ID and Book ID are required" },
        { status: 400 }
      );
    }

    // Check if IDs are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(bookId)
    ) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Check if the book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create a new saved book entry (this will fail if already saved due to unique index)
    const savedBook = new SavedBook({
      userId: new mongoose.Types.ObjectId(userId),
      bookId: new mongoose.Types.ObjectId(bookId),
    });

    await savedBook.save();

    return NextResponse.json(
      { message: "Book saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Book already saved" },
        { status: 409 }
      );
    }

    console.error("Save book error:", error);
    return NextResponse.json(
      { message: "Server error while saving book" },
      { status: 500 }
    );
  }
}
