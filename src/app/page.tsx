import Image from "next/image";
import Link from "next/link";
import HomePage from "./home/page";

export default function Page() {
  return (
    <>
      {/* Web Navigation Header */}
      <header className="hidden md:block w-full bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
                  EmlakBul
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/home"
                className="text-black font-medium hover:text-[#ff8e53] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/search"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Properties
              </Link>
              <Link
                href="#"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Agents
              </Link>
              <Link
                href="/add-listing"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Add Listing
              </Link>
              <Link
                href="#"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-black font-medium hover:text-[#ff8e53] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile and Tablet Content */}
      <HomePage />
    </>
  );
}
