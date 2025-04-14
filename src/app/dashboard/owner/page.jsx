"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";

export default function OwnerDashboard() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll simulate fetching the owner's books
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        // Use the Next.js API route with relative path
        const response = await fetch(`/api/books/owner/${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err instanceof Error ? err.message : "Failed to load books");

        // For demo purposes, set some mock data
        setBooks([
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic Literature",
            location: "New York",
            contactInfo: "owner@example.com",
            ownerId: "123",
            ownerName: "John Doe",
            status: "available",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            location: "Chicago",
            contactInfo: "owner@example.com",
            ownerId: "123",
            ownerName: "John Doe",
            status: "rented",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Call the API to update the book status
      const response = await fetch(`/api/books/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          ownerId: user.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update book status");
      }

      // Update local state to reflect the status change
      setBooks(
        books.map((book) => (book.id === id ? { ...book, status } : book))
      );
    } catch (err) {
      console.error("Error updating book status:", err);
      // Show error message to user
      alert(
        `Error updating status: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Call the API to delete the book
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerId: user.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete book");
      }

      // Update local state to remove the book from UI
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      // Show error message to user
      alert(
        `Error deleting book: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Books</h1>
        <p className="text-gray-600">
          Manage your book listings and monitor their status.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          {books.length} {books.length === 1 ? "book" : "books"} in your
          collection
        </div>
        <Link
          href="/dashboard/owner/add-book"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex items-center shadow-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Book
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {books.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            You haven&apos;t added any books yet.
          </h3>
          <p className="text-gray-600 mb-6">
            Start sharing your books with others by adding your first book.
          </p>
          <Link
            href="/dashboard/owner/add-book"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isOwner={true}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
