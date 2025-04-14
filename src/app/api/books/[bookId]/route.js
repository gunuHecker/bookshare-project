import { NextResponse } from "next/server";
import { getBooks, saveBooks, getUsers } from "../../../utils";

// Get a single book by ID
export async function GET(request, { params }) {
  try {
    const { bookId } = params;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    const books = getBooks();
    const book = books.find((book) => book.id === bookId);

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Get owner details
    const users = getUsers();
    const owner = users.find((user) => user.id === book.ownerId);

    const bookWithOwnerDetails = {
      ...book,
      ownerName: owner ? owner.name : "Unknown",
      contactInfo: owner ? owner.mobile || owner.email : "N/A",
    };

    return NextResponse.json(bookWithOwnerDetails, { status: 200 });
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

    const books = getBooks();
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Check if user is the owner of the book
    if (books[bookIndex].ownerId !== ownerId) {
      return NextResponse.json(
        { message: "You can only update your own book listings" },
        { status: 403 }
      );
    }

    // Update the book
    books[bookIndex] = {
      ...books[bookIndex],
      title: title || books[bookIndex].title,
      author: author || books[bookIndex].author,
      genre: genre || books[bookIndex].genre,
      location: location || books[bookIndex].location,
      contactInfo: contactInfo || books[bookIndex].contactInfo,
      updatedAt: new Date().toISOString(),
    };

    saveBooks(books);

    // Get owner details
    const users = getUsers();
    const owner = users.find((user) => user.id === books[bookIndex].ownerId);

    const bookWithOwnerDetails = {
      ...books[bookIndex],
      ownerName: owner ? owner.name : "Unknown",
    };

    return NextResponse.json(bookWithOwnerDetails, { status: 200 });
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

    const books = getBooks();
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Check if user is the owner of the book
    if (books[bookIndex].ownerId !== ownerId) {
      return NextResponse.json(
        { message: "You can only delete your own book listings" },
        { status: 403 }
      );
    }

    // Remove the book
    books.splice(bookIndex, 1);
    saveBooks(books);

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
