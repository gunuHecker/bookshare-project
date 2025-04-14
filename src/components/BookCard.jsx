"use client";

import { useState, useEffect } from "react";

export default function BookCard({
  book,
  isOwner = false,
  onStatusChange,
  onDelete,
  hideFunctionButtons = false,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Check if book is saved in localStorage
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks") || "[]");
    setIsSaved(savedBooks.some((savedBook) => savedBook.id === book.id));
  }, [book.id]);

  const statusColors = {
    available:
      "bg-emerald-200 text-emerald-800 border border-emerald-400 shadow-sm",
    rented: "bg-amber-200 text-amber-800 border border-amber-400 shadow-sm",
    exchanged: "bg-blue-200 text-blue-800 border border-blue-400 shadow-sm",
  };

  const handleSaveBook = () => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks") || "[]");

    if (isSaved) {
      // Remove from saved
      const updatedSavedBooks = savedBooks.filter(
        (savedBook) => savedBook.id !== book.id
      );
      localStorage.setItem("savedBooks", JSON.stringify(updatedSavedBooks));
      setIsSaved(false);
    } else {
      // Add to saved
      savedBooks.push(book);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      setIsSaved(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-indigo-900 mb-2 line-clamp-2 pr-2">
              {book.title}
            </h3>
            <span
              className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                statusColors[book.status]
              }`}
            >
              {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
            </span>
          </div>
          <p className="text-gray-700 mb-3 font-medium">by {book.author}</p>

          <div className="space-y-2 mb-4 flex-grow">
            {book.genre && (
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span>{book.genre}</span>
              </div>
            )}

            <div className="flex items-center text-gray-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{book.location}</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{book.ownerName}</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>
                {isOwner
                  ? book.contactInfo
                  : book.contactInfo.substring(0, 5) + "..."}
              </span>
            </div>
          </div>

          {!hideFunctionButtons && (
            <div className="pt-4 border-t border-gray-200 mt-auto">
              {isOwner ? (
                <div className="flex justify-between items-center">
                  <select
                    value={book.status}
                    onChange={(e) =>
                      onStatusChange && onStatusChange(book.id, e.target.value)
                    }
                    className="text-sm font-medium border border-gray-300 rounded-md py-2 px-3 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    <option
                      value="available"
                      className="font-medium text-emerald-800 bg-emerald-50"
                    >
                      Available
                    </option>
                    <option
                      value="rented"
                      className="font-medium text-amber-800 bg-amber-50"
                    >
                      Rented
                    </option>
                    <option
                      value="exchanged"
                      className="font-medium text-blue-800 bg-blue-50"
                    >
                      Exchanged
                    </option>
                  </select>
                  <button
                    onClick={() => onDelete && onDelete(book.id)}
                    className="text-red-600 text-sm hover:text-red-800 font-medium flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Owner
                  </button>
                  <button
                    onClick={handleSaveBook}
                    className={`w-12 flex items-center justify-center ${
                      isSaved
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    } py-2 px-2 rounded-md hover:bg-amber-600 hover:text-white transition`}
                    title={isSaved ? "Remove from saved" : "Save book"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-indigo-900">
                Contact Information
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-lg mb-1 text-indigo-900">
                {book.title}
              </h4>
              <p className="text-indigo-700">by {book.author}</p>

              <div className="mt-3 flex">
                <span
                  className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                    statusColors[book.status]
                  }`}
                >
                  {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Owner</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.ownerName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.contactInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
