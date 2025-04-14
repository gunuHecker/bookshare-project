import { NextResponse } from "next/server";
import { getBooks, saveBooks, getUsers } from "../../../../utils";

// Update book status
export async function PATCH(request, { params }) {
  try {
    const { bookId } = params;
    const body = await request.json();
    const { status, ownerId } = body;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
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

    // Update the book status
    books[bookIndex].status = status;
    books[bookIndex].updatedAt = new Date().toISOString();

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
    console.error("Update book status error:", error);
    return NextResponse.json(
      { message: "Server error while updating book status" },
      { status: 500 }
    );
  }
}
