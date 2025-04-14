"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";

export default function SeekerDashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    genre: "",
    status: "all",
  });

  useEffect(() => {
    // Fetch all books without status filter
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError("");

        console.log("Fetching books from API...");

        // Use the Next.js API route without status filter
        const response = await fetch("/api/books");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error response:", errorData);
          throw new Error(errorData.message || "Failed to fetch books");
        }

        const data = await response.json();
        console.log(`Fetched ${data.length} books from API`);

        // Log the first book to check its structure
        if (data.length > 0) {
          console.log("Sample book:", data[0]);
        }

        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err instanceof Error ? err.message : "Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    let result = [...books];

    // Filter by status (only if not "all")
    if (filters.status && filters.status !== "all") {
      result = result.filter((book) => book.status === filters.status);
    }

    // Filter by location
    if (filters.location) {
      result = result.filter((book) =>
        book.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by genre
    if (filters.genre) {
      result = result.filter((book) =>
        book.genre?.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    // Filter by search term (title or author)
    if (filters.searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(result);
  }, [filters, books]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      location: "",
      genre: "",
      status: "all",
    });
  };

  // Get counts by status for displaying stats
  const getStatusCounts = () => {
    const counts = {
      all: books.length,
      available: books.filter((book) => book.status === "available").length,
      rented: books.filter((book) => book.status === "rented").length,
      exchanged: books.filter((book) => book.status === "exchanged").length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover books shared by our community members and connect with
          owners.
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
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-200">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {(filters.searchTerm ||
            filters.location ||
            filters.genre ||
            filters.status !== "all") && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center font-medium"
            >
              <svg
                className="w-4 h-4 mr-1"
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
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center mb-1.5">
              <svg
                className="w-4 h-4 text-indigo-500 mr-1.5"
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
              <label
                htmlFor="searchTerm"
                className="block text-sm font-medium text-gray-800"
              >
                Search Books
              </label>
            </div>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search by title or author"
              className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center mb-1.5">
              <svg
                className="w-4 h-4 text-indigo-500 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-800"
              >
                Location
              </label>
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by location"
              className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center mb-1.5">
              <svg
                className="w-4 h-4 text-indigo-500 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-800"
              >
                Genre
              </label>
            </div>
            <input
              type="text"
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              placeholder="Filter by genre"
              className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center mb-1.5">
              <svg
                className="w-4 h-4 text-indigo-500 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-800"
              >
                Status
              </label>
            </div>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Books ({statusCounts.all})</option>
              <option value="available">
                Available ({statusCounts.available})
              </option>
              <option value="rented">Rented ({statusCounts.rented})</option>
              <option value="exchanged">
                Exchanged ({statusCounts.exchanged})
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredBooks.length}{" "}
          {filteredBooks.length === 1 ? "book" : "books"}
        </p>
        <div className="text-sm text-gray-600">
          {filters.status === "all"
            ? "All statuses"
            : filters.status === "available"
            ? "Available books"
            : filters.status === "rented"
            ? "Rented books"
            : "Exchanged books"}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching books found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Try adjusting your search filters or check back later as our
            community members are always adding new books.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
