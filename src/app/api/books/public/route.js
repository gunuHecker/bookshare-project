import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Book from "@/models/Book";
import User from "@/models/User";

// Get public books (no authentication required)
export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get only available books for public view
    const books = await Book.find({ status: "available" }).lean();

    // Format response with consistent ID field and masked contact info
    const publicBooks = await Promise.all(
      books.map(async (book) => {
        // Get the owner name if available
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
          contactInfo: "Login to view contact details",
        };
      })
    );

    return NextResponse.json(publicBooks, { status: 200 });
  } catch (error) {
    console.error("Get public books error:", error);
    return NextResponse.json(
      { message: "Server error while getting public books" },
      { status: 500 }
    );
  }
}
