import { NextResponse } from "next/server";
import { getBooks, getUsers } from "@/app/api/utils";

// Get public books (no authentication required)
export async function GET() {
  try {
    let books = getBooks();

    // Only return available books for public view
    books = books.filter((book) => book.status === "available");

    // Get all users to include owner details with books
    const users = getUsers();

    // Map books with owner details, but mask contact info
    const publicBooks = books.map((book) => {
      const owner = users.find((user) => user.id === book.ownerId);
      return {
        ...book,
        ownerName: owner ? owner.name : "Unknown",
        contactInfo: "Login to view contact details",
      };
    });

    return NextResponse.json(publicBooks, { status: 200 });
  } catch (error) {
    console.error("Get public books error:", error);
    return NextResponse.json(
      { message: "Server error while getting public books" },
      { status: 500 }
    );
  }
}
