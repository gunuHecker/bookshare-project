import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Book from "@/models/Book";
import User from "@/models/User";
import mongoose from "mongoose";

// Get all books
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const author = searchParams.get("author");
    const genre = searchParams.get("genre");
    const location = searchParams.get("location");
    const status = searchParams.get("status");

    console.log(`Fetching books with filters: ${JSON.stringify({
      title, author, genre, location, status
    })}`);

    // Try direct database access first as a fallback
    let books = [];
    
    try {
      // Build the query filter
      const filter = {};

      if (title) {
        filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
      }

      if (author) {
        filter.author = { $regex: author, $options: "i" };
      }

      if (genre) {
        filter.genre = { $regex: genre, $options: "i" };
      }

      if (location) {
        filter.location = { $regex: location, $options: "i" };
      }

      // Only apply status filter if it's specified and not "all"
      if (status && status !== "all") {
        filter.status = status;
      }

      // Try to use the Mongoose model first
      books = await Book.find(filter).lean();
      console.log(`Found ${books.length} books using Mongoose model`);
    } catch (err) {
      console.error("Error using Mongoose model:", err);
      
      // Fallback to direct MongoDB access
      try {
        const db = mongoose.connection.db;
        const bookCollection = db.collection('books');
        
        // Build MongoDB filter
        const filter = {};
        
        if (title) {
          filter.title = { $regex: title, $options: "i" };
        }

        if (author) {
          filter.author = { $regex: author, $options: "i" };
        }

        if (genre) {
          filter.genre = { $regex: genre, $options: "i" };
        }

        if (location) {
          filter.location = { $regex: location, $options: "i" };
        }

        if (status && status !== "all") {
          filter.status = status;
        }
        
        books = await bookCollection.find(filter).toArray();
        console.log(`Found ${books.length} books using direct MongoDB access`);
      } catch (mongoErr) {
        console.error("Error accessing MongoDB directly:", mongoErr);
        throw mongoErr;
      }
    }

    // Format the response with consistent ID field
    const formattedBooks = books.map(book => ({
      ...book,
      id: book._id.toString(),
    }));

    console.log(`Returning ${formattedBooks.length} books`);

    return NextResponse.json(formattedBooks, { status: 200 });
  } catch (error) {
    console.error("Get books error:", error);
    return NextResponse.json(
      { message: `Server error while getting books: ${error.message}` },
      { status: 500 }
    );
  }
}

// Create a new book listing
export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    const body = await request.json();
    const { title, author, genre, location, contactInfo, ownerId, ownerName } =
      body;

    // Validate required fields
    if (!title || !author || !location || !ownerId) {
      return NextResponse.json(
        {
          message: "Title, author, location, and owner ID are required",
        },
        { status: 400 }
      );
    }

    // Verify that the owner exists and is an owner
    const owner = await User.findById(ownerId);

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    if (owner.role !== "owner") {
      return NextResponse.json(
        { message: "Only book owners can create listings" },
        { status: 403 }
      );
    }

    // Create new book
    const newBook = new Book({
      title,
      author,
      genre: genre || "Uncategorized",
      location,
      contactInfo: contactInfo || owner.mobile || owner.email,
      ownerId: new mongoose.Types.ObjectId(ownerId),
      ownerName: ownerName || owner.name,
      status: "available",
    });

    // Save to database
    await newBook.save();

    // Convert to plain object for response
    const bookResponse = newBook.toObject();
    bookResponse.id = bookResponse._id.toString();

    return NextResponse.json(bookResponse, { status: 201 });
  } catch (error) {
    console.error("Create book error:", error);
    return NextResponse.json(
      { message: "Server error while creating book listing" },
      { status: 500 }
    );
  }
}
