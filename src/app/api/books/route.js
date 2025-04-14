import { NextResponse } from "next/server";
import { getBooks, saveBooks, getUsers } from "@/app/api/utils";

// Get all books
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const author = searchParams.get("author");
    const genre = searchParams.get("genre");
    const location = searchParams.get("location");
    const status = searchParams.get("status");

    let books = getBooks();

    // Apply filters if provided
    if (title) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (author) {
      books = books.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (genre) {
      books = books.filter(
        (book) =>
          book.genre && book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (location) {
      books = books.filter((book) =>
        book.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (status) {
      books =
        status === "all"
          ? books
          : books.filter((book) => book.status === status);
    } else {
      // Default to showing only available books
      books = books.filter((book) => book.status === "available");
    }

    // Get all users to include owner details with books
    const users = getUsers();

    // Map books with owner details
    const booksWithOwnerDetails = books.map((book) => {
      const owner = users.find((user) => user.id === book.ownerId);
      return {
        ...book,
        ownerName: owner ? owner.name : "Unknown",
        contactInfo: owner ? owner.mobile || owner.email : "N/A",
      };
    });

    return NextResponse.json(booksWithOwnerDetails, { status: 200 });
  } catch (error) {
    console.error("Get books error:", error);
    return NextResponse.json(
      { message: "Server error while getting books" },
      { status: 500 }
    );
  }
}

// Create a new book listing
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, author, genre, location, contactInfo, ownerId } = body;

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
    const users = getUsers();
    const owner = users.find((user) => user.id === ownerId);

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    if (owner.role !== "owner") {
      return NextResponse.json(
        { message: "Only book owners can create listings" },
        { status: 403 }
      );
    }

    const books = getBooks();

    // Create new book
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre: genre || "Uncategorized",
      location,
      contactInfo: contactInfo || owner.mobile || owner.email,
      ownerId,
      status: "available", // available, rented, exchanged
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    books.push(newBook);
    saveBooks(books);

    // Add owner info to response
    const bookWithOwnerInfo = {
      ...newBook,
      ownerName: owner.name,
    };

    return NextResponse.json(bookWithOwnerInfo, { status: 201 });
  } catch (error) {
    console.error("Create book error:", error);
    return NextResponse.json(
      { message: "Server error while creating book listing" },
      { status: 500 }
    );
  }
}
