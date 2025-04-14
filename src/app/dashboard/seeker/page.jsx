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
    status: "available",
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        // Use the Next.js API route
        const response = await fetch("/api/books");

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
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

    // Filter by status
    if (filters.status) {
      result = result.filter(
        (book) => filters.status === "all" || book.status === filters.status
      );
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
      status: "available",
    });
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Browse Available Books
        </h1>
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
            filters.status !== "available") && (
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
              <option value="all" className="text-gray-900">
                All Status
              </option>
              <option value="available" className="text-gray-900">
                Available
              </option>
              <option value="rented" className="text-gray-900">
                Rented
              </option>
              <option value="exchanged" className="text-gray-900">
                Exchanged
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
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
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
            No matching books found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or check back later for new listings.
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
            <BookCard key={book.id} book={book} isOwner={false} />
          ))}
        </div>
      )}
    </div>
  );
}
