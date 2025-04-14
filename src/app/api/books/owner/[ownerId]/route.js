import { NextResponse } from "next/server";
import { getBooks, getUsers } from "../../../../utils";

// Get books by owner ID with simpler implementation
export async function GET(request, context) {
  // Get the ownerId from context
  const ownerId = context.params.ownerId;
  console.log("Processing request for owner ID:", ownerId);

  if (!ownerId) {
    return NextResponse.json(
      { message: "Owner ID is required" },
      { status: 400 }
    );
  }

  try {
    // Get books from data store
    const books = getBooks();

    // Find books for this owner
    const ownerBooks = books.filter((book) => book.ownerId === ownerId);

    // Get owner details
    const users = getUsers();
    const owner = users.find((user) => user.id === ownerId);

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    // Add owner details to books
    const result = ownerBooks.map((book) => ({
      ...book,
      ownerName: owner.name,
      contactInfo: owner.mobile || owner.email,
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
