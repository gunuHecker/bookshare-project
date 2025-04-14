"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";

export default function PublicBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        // Use the Next.js API route
        const response = await fetch("/api/books/public");

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err instanceof Error ? err.message : "Failed to load books");

        // For demo purposes, set some mock data
        const mockBooks = [
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic Literature",
            location: "New York",
            contactInfo: "owner1@example.com",
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
            contactInfo: "owner2@example.com",
            ownerId: "124",
            ownerName: "Jane Smith",
            status: "available",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            location: "Boston",
            contactInfo: "owner3@example.com",
            ownerId: "125",
            ownerName: "Bob Johnson",
            status: "available",
            createdAt: new Date().toISOString(),
          },
        ];

        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            <span className="text-indigo-600">Book</span>Share
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover books shared by our community members
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:max-w-lg">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search by title, author, genre, or location"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
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

        {filteredBooks.length === 0 ? (
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books match your search criteria
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or check back later for new
              additions
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredBooks.length}{" "}
                {filteredBooks.length === 1 ? "book" : "books"}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="relative">
                  <div className="pb-16">
                    <BookCard
                      book={book}
                      isOwner={false}
                      hideFunctionButtons={true}
                    />
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <Link
                      href="/login"
                      className="w-full block text-center bg-indigo-600 text-white py-2 px-3 rounded-md text-sm hover:bg-indigo-700 transition font-medium"
                    >
                      Sign in to contact owner
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-16 text-center p-8 bg-indigo-50 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            Join Our Book Sharing Community
          </h2>
          <p className="text-indigo-700 mb-8 max-w-2xl mx-auto">
            Want to share your own books or contact book owners? Create an
            account and join our growing community today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=owner"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
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
              Register as a Book Owner
            </Link>
            <Link
              href="/register?role=seeker"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
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
              Register as a Book Seeker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
