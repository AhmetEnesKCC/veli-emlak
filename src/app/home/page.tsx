"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: 1, name: "All", icon: "ri-home-4-line" },
    { id: 2, name: "Apartment", icon: "ri-building-line" },
    { id: 3, name: "House", icon: "ri-home-5-line" },
    { id: 4, name: "Villa", icon: "ri-building-4-line" },
    { id: 5, name: "Office", icon: "ri-store-2-line" },
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "Modern Villa in Beşiktaş",
      location: "Beşiktaş, Istanbul",
      price: "₺2,450,000",
      type: "For Sale",
      beds: 4,
      baths: 3,
      area: "240 m²",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Luxury Apartment in Kadıköy",
      location: "Kadıköy, Istanbul",
      price: "₺12,500/mo",
      type: "For Rent",
      beds: 3,
      baths: 2,
      area: "120 m²",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Penthouse with City View",
      location: "Şişli, Istanbul",
      price: "₺3,750,000",
      type: "For Sale",
      beds: 3,
      baths: 2,
      area: "160 m²",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Modern Studio Apartment",
      location: "Beyoğlu, Istanbul",
      price: "₺7,800/mo",
      type: "For Rent",
      beds: 1,
      baths: 1,
      area: "55 m²",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const nearbyProperties = [
    {
      id: 1,
      title: "Office Space in Levent",
      location: "Levent, Istanbul",
      price: "₺8,500/mo",
      type: "For Rent",
      area: "150 m²",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Modern Apartment in Şişli",
      location: "Şişli, Istanbul",
      price: "₺1,850,000",
      type: "For Sale",
      beds: 2,
      area: "85 m²",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    },
    {
      id: 3,
      title: "Luxury Villa with Pool",
      location: "Beykoz, Istanbul",
      price: "₺3,750,000",
      type: "For Sale",
      beds: 5,
      area: "320 m²",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Cozy Apartment with View",
      location: "Üsküdar, Istanbul",
      price: "₺1,250,000",
      type: "For Sale",
      beds: 2,
      area: "95 m²",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Web Header - Only visible on medium screens and larger */}
      <header className="hidden md:block bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
                EmlakBul
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-8">
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
                href="/add-listing"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Add Listing
              </Link>
              <Link
                href="/chatbot"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Chat with AI
              </Link>
              <Link
                href="/profile"
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
              >
                Profile
              </Link>
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center cursor-pointer">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-2 font-medium">Ayşe Demir</span>
                <i className="ri-arrow-down-s-line ml-1 text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 pb-24 md:pb-12">
        {/* Mobile Header */}
        <div className="md:hidden px-2 pt-12 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">Hi, Ayşe</h1>
              <p className="text-sm text-gray-500">
                Find your dream home today!
              </p>
            </div>
            <div className="flex items-center">
              <button className="p-2 bg-gray-100 rounded-full mr-2">
                <i className="ri-notification-3-line text-black text-xl"></i>
              </button>
              <Link href="/profile">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Hero Section (Web Only) */}
        <div className="hidden md:block mt-6 mb-12">
          <div className="relative rounded-xl overflow-hidden h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Luxury Home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="px-12 py-6 max-w-lg">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Find Your Dream Property
                </h1>
                <p className="text-white/90 mb-6">
                  Discover the perfect home among thousands of properties
                  available for sale and rent across Turkey.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="/search"
                    className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
                  >
                    Browse Properties
                  </Link>
                  <Link
                    href="/chatbot"
                    className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium backdrop-blur hover:bg-white/30 transition"
                  >
                    <i className="ri-ai-generate mr-2"></i>AI Assistant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-0 mb-6">
          <div className="relative">
            <Link href="/search" className="w-full block">
              <input
                type="text"
                placeholder="Search for location, property..."
                className="w-full py-3 px-4 pl-12 bg-white rounded-xl text-black border border-gray-100 shadow-sm md:py-4 md:pl-14"
                readOnly
              />
              <i className="ri-search-line absolute left-4 top-3.5 text-gray-400 md:top-4 md:text-xl"></i>
            </Link>
            {/* Advanced Search Button (Web Only) */}
            <button className="absolute right-4 top-2.5 bg-gray-50 p-1.5 rounded-lg text-gray-600 border border-gray-100 hidden md:flex items-center">
              <i className="ri-equalizer-line mr-1"></i>
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar md:justify-center md:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-pill flex flex-col items-center justify-center p-3 rounded-xl min-w-[70px] ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <i className={`${category.icon} text-xl mb-1`}></i>
                <span className="text-xs whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black md:text-2xl">
              Featured Properties
            </h2>
            <Link href="/search" className="text-sm font-medium text-[#ff8e53]">
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href="/property-detail"
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold text-black">
                      {property.type}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                    <i className="ri-heart-line text-black"></i>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-black">{property.price}</h3>
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm text-black">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-medium text-black mb-2">
                    {property.title}
                  </h4>
                  <div className="flex items-center text-gray-500 mb-3">
                    <i className="ri-map-pin-line mr-1"></i>
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    {property.beds && (
                      <div className="flex items-center">
                        <i className="ri-hotel-bed-line mr-1 text-black"></i>
                        <span className="text-black">{property.beds} Beds</span>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center">
                        <i className="ri-shower-line mr-1 text-black"></i>
                        <span className="text-black">
                          {property.baths} Baths
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <i className="ri-ruler-line mr-1 text-black"></i>
                      <span className="text-black">{property.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Nearby Properties */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black md:text-2xl">
              Nearby Properties
            </h2>
            <Link href="/search" className="text-sm font-medium text-[#ff8e53]">
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyProperties.map((property) => (
              <Link
                key={property.id}
                href="/property-detail"
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold text-black">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-sm text-black">
                      {property.price}
                    </h3>
                  </div>
                  <h4 className="font-medium text-sm text-black mb-1">
                    {property.title}
                  </h4>
                  <div className="flex items-center text-gray-500 mb-2">
                    <i className="ri-map-pin-line mr-1 text-xs"></i>
                    <span className="text-xs">{property.location}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    {property.beds && (
                      <div className="flex items-center">
                        <i className="ri-hotel-bed-line mr-1 text-black"></i>
                        <span className="text-black">{property.beds} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <i className="ri-ruler-line mr-1 text-black"></i>
                      <span className="text-black">{property.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Web Featured Categories Section */}
        <div className="hidden md:block mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            Explore by Category
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
                alt="Apartments"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Apartments
                  </h3>
                  <p className="text-white/80 text-sm">1,245 listings</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Houses"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Houses</h3>
                  <p className="text-white/80 text-sm">863 listings</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Office Spaces"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Office Spaces
                  </h3>
                  <p className="text-white/80 text-sm">432 listings</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Luxury Villas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Luxury Villas
                  </h3>
                  <p className="text-white/80 text-sm">175 listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Web Newsletter Section */}
        <div className="hidden md:block bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-xl p-8 text-white">
          <div className="flex justify-between items-center">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-2">
                Stay updated with new listings
              </h2>
              <p className="mb-4 opacity-90">
                Subscribe to our newsletter and be the first to know about new
                properties in your area.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="py-3 px-4 rounded-l-lg w-full focus:outline-none text-black"
                />
                <button className="bg-[#1E293B] hover:bg-[#0F172A] transition-colors py-3 px-6 rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://freesvg.org/img/1538298822.png"
                alt="Newsletter illustration"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 md:hidden">
        <div className="flex justify-between px-6 py-4">
          <button className="flex flex-col items-center text-[#ff8e53]">
            <i className="ri-home-5-fill text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </button>
          <Link
            href="/search"
            className="flex flex-col items-center text-gray-400"
          >
            <i className="ri-search-line text-xl"></i>
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link href="/add-listing" className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full flex items-center justify-center -mt-6">
              <i className="ri-add-line text-2xl text-white"></i>
            </div>
            <span className="text-xs mt-1 text-gray-400">Add</span>
          </Link>
          <Link
            href="/chatbot"
            className="flex flex-col items-center text-gray-400"
          >
            <i className="ri-message-2-line text-xl"></i>
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center text-gray-400"
          >
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
      {/* Footer - Web Only */}
      <footer className="hidden md:block bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
                  EmlakBul
                </span>
              </h3>
              <p className="text-gray-600 mb-4">
                Find your perfect property with Turkey's leading real estate
                platform.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  <i className="ri-twitter-x-fill"></i>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Property Types</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Apartments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Houses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Villas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Office Spaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff8e53]">
                    Land
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-map-pin-line mr-3 mt-1"></i>
                  <span>Nispetiye Cad. No:123, Beşiktaş, Istanbul</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-3"></i>
                  <span>+90 212 123 4567</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-3"></i>
                  <span>contact@emlakbul.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 EmlakBul. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-[#ff8e53]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#ff8e53]">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#ff8e53]">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
