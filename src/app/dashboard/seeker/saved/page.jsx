"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";

export default function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Get user from localStorage first
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error("Error getting user data:", err);
    } finally {
      if (!localStorage.getItem("user")) {
        setIsLoading(false);
      }
    }
  }, []);

  // Only fetch saved books if we have a user
  useEffect(() => {
    if (user) {
      fetchSavedBooks();
    }
  }, [user]);

  const fetchSavedBooks = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`/api/books/saved?userId=${user.id}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch saved books");
      }

      const data = await response.json();
      setSavedBooks(data);
    } catch (err) {
      console.error("Error fetching saved books:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load saved books"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromSaved = async (bookId) => {
    try {
      setError("");

      const response = await fetch(`/api/books/saved/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to remove book from saved");
      }

      // Update the UI by removing the book
      setSavedBooks(savedBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      console.error("Error removing book from saved:", err);
      setError(
        err instanceof Error ? err.message : "Failed to remove book from saved"
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

  // If no user is found, show login prompt
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Please login to see your saved books
        </h3>
        <p className="text-gray-600 mb-4">
          You need to be logged in to access your saved books.
        </p>
        <a
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Books</h1>
        <p className="text-gray-600">
          Books you&apos;ve saved for quick access and reference.
        </p>
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

      {savedBooks.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {savedBooks.length} {savedBooks.length === 1 ? "book" : "books"}{" "}
            saved
          </div>
        </div>
      )}

      {savedBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            You haven&apos;t saved any books yet
          </h3>
          <p className="text-gray-600 mb-4">
            Browse books and save them to your list for easier access later.
          </p>
          <a
            href="/dashboard/seeker"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Books
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBooks.map((book) => (
            <div key={book.id} className="relative group">
              <BookCard book={book} isOwner={false} />
              <button
                onClick={() => handleRemoveFromSaved(book.id)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md border border-gray-200 text-red-500 hover:text-red-700 hover:bg-red-50 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Remove from saved"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
