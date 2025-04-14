"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="font-bold text-xl text-indigo-900">
                  BookShare
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/books"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse Books
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Connect with readers
              <br />
              <span className="text-indigo-600">Share your books</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              BookShare makes it easy to share your books with others in your
              community or find books to borrow, rent, or exchange.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Share Books
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
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Find Books
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-indigo-600 rounded-lg transform rotate-6 opacity-20"></div>
              <div className="relative bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div className="aspect-w-3 aspect-h-4 rounded-md overflow-hidden bg-indigo-100">
                    <div className="p-4 flex flex-col h-full">
                      <div className="rounded-md bg-indigo-200 h-24 w-full mb-2"></div>
                      <div className="h-3 bg-indigo-200 rounded mb-2 w-2/3"></div>
                      <div className="h-2 bg-indigo-200 rounded mb-1 w-1/2"></div>
                      <div className="h-2 bg-indigo-200 rounded mb-1 w-3/4"></div>
                      <div className="h-2 bg-indigo-200 rounded w-2/3"></div>
                      <div className="mt-auto">
                        <div className="h-6 bg-indigo-300 rounded-md w-full mt-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 rounded-md overflow-hidden bg-amber-100">
                    <div className="p-4 flex flex-col h-full">
                      <div className="rounded-md bg-amber-200 h-24 w-full mb-2"></div>
                      <div className="h-3 bg-amber-200 rounded mb-2 w-3/4"></div>
                      <div className="h-2 bg-amber-200 rounded mb-1 w-1/2"></div>
                      <div className="h-2 bg-amber-200 rounded mb-1 w-2/3"></div>
                      <div className="h-2 bg-amber-200 rounded w-3/4"></div>
                      <div className="mt-auto">
                        <div className="h-6 bg-amber-300 rounded-md w-full mt-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 rounded-md overflow-hidden bg-emerald-100">
                    <div className="p-4 flex flex-col h-full">
                      <div className="rounded-md bg-emerald-200 h-24 w-full mb-2"></div>
                      <div className="h-3 bg-emerald-200 rounded mb-2 w-1/2"></div>
                      <div className="h-2 bg-emerald-200 rounded mb-1 w-3/4"></div>
                      <div className="h-2 bg-emerald-200 rounded mb-1 w-1/2"></div>
                      <div className="h-2 bg-emerald-200 rounded w-2/3"></div>
                      <div className="mt-auto">
                        <div className="h-6 bg-emerald-300 rounded-md w-full mt-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 rounded-md overflow-hidden bg-blue-100">
                    <div className="p-4 flex flex-col h-full">
                      <div className="rounded-md bg-blue-200 h-24 w-full mb-2"></div>
                      <div className="h-3 bg-blue-200 rounded mb-2 w-3/4"></div>
                      <div className="h-2 bg-blue-200 rounded mb-1 w-1/2"></div>
                      <div className="h-2 bg-blue-200 rounded mb-1 w-3/4"></div>
                      <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                      <div className="mt-auto">
                        <div className="h-6 bg-blue-300 rounded-md w-full mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How BookShare Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to share books with others in your
              community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                List Your Books
              </h3>
              <p className="text-gray-600">
                Create an account as a book owner and add the books you want to
                share with others.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Find Books
              </h3>
              <p className="text-gray-600">
                Browse available books by title, author, genre, or location to
                find what you&apos;re looking for.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect & Share
              </h3>
              <p className="text-gray-600">
                Contact book owners directly to arrange exchanges, rentals, or
                borrowing details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-800 font-semibold">A</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Alex Johnson</h4>
                  <p className="text-sm text-gray-600">Book Lover</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;BookShare has completely changed how I access books.
                I&apos;ve connected with amazing people in my community and
                discovered books I wouldn&apos;t have found otherwise.&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-800 font-semibold">S</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">
                    Sarah Williams
                  </h4>
                  <p className="text-sm text-gray-600">Avid Reader</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;I love being able to share my collection with others.
                It&apos;s a great way to make sure my books don&apos;t just sit
                on a shelf gathering dust!&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-800 font-semibold">M</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">
                    Michael Thompson
                  </h4>
                  <p className="text-sm text-gray-600">Book Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;As a student, BookShare has been a financial lifesaver.
                I&apos;ve been able to borrow textbooks and novels without
                spending a fortune.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-indigo-600 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Ready to start sharing?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join our community today and connect with book lovers in your
              area. Start sharing your collection or finding books you want to
              read.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
              >
                Create an Account
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="font-bold text-xl text-white">BookShare</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BookShare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
