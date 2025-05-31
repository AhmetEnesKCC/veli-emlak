"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(authAPI.isAuthenticated());
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-lg flex items-center justify-center">
              <i className="ri-home-smile-fill text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
              Home Insight
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/home" 
              className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
            >
              Search
            </Link>
            <Link 
              href="/chatbot" 
              className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
            >
              AI Assistant
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/add-listing" 
                  className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                >
                  Add Listing
                </Link>
                <Link 
                  href="/profile" 
                  className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl text-gray-700`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/home" 
                className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/search" 
                className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link 
                href="/chatbot" 
                className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Assistant
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/add-listing" 
                    className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Listing
                  </Link>
                  <Link 
                    href="/profile" 
                    className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-700 hover:text-[#ff6b6b] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 