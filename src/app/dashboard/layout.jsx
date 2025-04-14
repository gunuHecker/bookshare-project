"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Only redirect if user is on the wrong dashboard home page
      // But allow access to shared pages like profile
      const userType = parsedUser.role === "owner" ? "owner" : "seeker";
      const correctPath = `/dashboard/${userType}`;

      // Only redirect if user is directly on the wrong dashboard type
      // Don't redirect if they're on a shared page like profile
      if (
        (pathname === "/dashboard/owner" && userType === "seeker") ||
        (pathname === "/dashboard/seeker" && userType === "owner")
      ) {
        router.push(correctPath);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

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
              {user && (
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Hello, </span>
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar for larger screens */}
        <aside
          className={`bg-white shadow-sm w-full md:w-64 md:flex-shrink-0 md:flex md:flex-col md:border-r border-gray-200 ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-5">
            <div className="md:hidden flex items-center justify-between mb-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Hello, </span>
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
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

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                DASHBOARD
              </h3>
              <nav className="space-y-1">
                {user?.role === "owner" ? (
                  <>
                    <Link
                      href="/dashboard/owner"
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        pathname === "/dashboard/owner"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mr-3 h-5 w-5 ${
                          pathname === "/dashboard/owner"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      My Books
                    </Link>
                    <Link
                      href="/dashboard/owner/add-book"
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        pathname === "/dashboard/owner/add-book"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mr-3 h-5 w-5 ${
                          pathname === "/dashboard/owner/add-book"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
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
                      Add New Book
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard/seeker"
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        pathname === "/dashboard/seeker"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mr-3 h-5 w-5 ${
                          pathname === "/dashboard/seeker"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
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
                      Browse Books
                    </Link>
                    <Link
                      href="/dashboard/seeker/saved"
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        pathname === "/dashboard/seeker/saved"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mr-3 h-5 w-5 ${
                          pathname === "/dashboard/seeker/saved"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Saved Books
                    </Link>
                  </>
                )}
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                ACCOUNT
              </h3>
              <nav className="space-y-1">
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                    pathname === "/dashboard/profile"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`mr-3 h-5 w-5 ${
                      pathname === "/dashboard/profile"
                        ? "text-indigo-500"
                        : "text-gray-400"
                    }`}
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
                  My Profile
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
