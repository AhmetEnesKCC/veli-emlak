"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddListingPage() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment");
  const [listingType, setListingType] = useState("sale");

  const propertyTypes = [
    { id: 1, name: "Apartment", icon: "ri-building-line" },
    { id: 2, name: "House", icon: "ri-home-5-line" },
    { id: 3, name: "Villa", icon: "ri-building-4-line" },
    { id: 4, name: "Office", icon: "ri-store-2-line" },
    { id: 5, name: "Land", icon: "ri-hotel-line" },
    { id: 6, name: "Shop", icon: "ri-store-line" },
  ];

  const amenities = [
    { id: "wifi", label: "WiFi" },
    { id: "parking", label: "Parking" },
    { id: "pool", label: "Swimming Pool" },
    { id: "security", label: "Security" },
    { id: "smart", label: "Smart Home" },
    { id: "garden", label: "Garden" },
    { id: "balcony", label: "Balcony" },
    { id: "elevator", label: "Elevator" },
    { id: "ac", label: "Air Conditioning" },
    { id: "heating", label: "Heating" },
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
                className="text-gray-600 font-medium hover:text-[#ff8e53] transition-colors"
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
                className="text-black font-medium hover:text-[#ff8e53] transition-colors"
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
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="md:max-w-4xl lg:max-w-5xl mx-auto">
          {/* Mobile Header - Only visible on small screens */}
          <div className="md:hidden px-2 pt-12 pb-4 flex items-center">
            <Link href="/home" className="p-2 mr-4">
              <i className="ri-arrow-left-s-line text-xl text-black"></i>
            </Link>
            <h1 className="text-xl font-bold text-black">Add New Listing</h1>
          </div>

          {/* Web Page Title - Only visible on medium screens and larger */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-black">Add New Listing</h1>
            <p className="text-gray-500">
              Fill in the details to list your property
            </p>
          </div>

          {/* Form Layout - Grid for desktop, single column for mobile */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="md:grid md:grid-cols-3">
              {/* Left Sidebar - Progress and Tips */}
              <div className="hidden md:block bg-gray-50 border-r border-gray-100 p-6">
                <div className="sticky top-6">
                  <h3 className="font-bold text-black mb-4">
                    Listing Progress
                  </h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <div className="bg-[#ff8e53] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-black">
                          Basic Information
                        </p>
                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full overflow-hidden">
                          <div className="bg-[#ff8e53] h-1 rounded-full w-[100%]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#ff8e53] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-black">
                          Property Details
                        </p>
                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full overflow-hidden">
                          <div className="bg-[#ff8e53] h-1 rounded-full w-[50%]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold mr-3">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-500">Location</p>
                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold mr-3">
                        4
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-500">Amenities</p>
                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-blue-800 font-medium mb-2">
                      <i className="ri-lightbulb-line mr-1"></i> Tips
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Add high-quality photos for better visibility</li>
                      <li>• Be detailed in your property description</li>
                      <li>• Accurate pricing will attract serious buyers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Main Form Area */}
              <div className="md:col-span-2">
                {/* Form */}
                <div className="flex-1">
                  {/* Property Images */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Property Images
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="border-2 border-dashed border-gray-200 rounded-xl aspect-square flex flex-col items-center justify-center p-2 hover:border-[#ff8e53] transition-colors cursor-pointer"
                        >
                          <i className="ri-add-line text-2xl text-gray-400 mb-1"></i>
                          <span className="text-xs text-gray-400 text-center">
                            Add Photo
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      You can upload up to 10 photos. First photo will be the
                      cover.
                    </p>
                  </div>

                  {/* Basic Information */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Basic Information
                    </h2>

                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Property Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Modern Apartment in City Center"
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        />
                      </div>

                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your property..."
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black h-24 resize-none border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        ></textarea>
                      </div>

                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Property Type
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                          {propertyTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedPropertyType(type.name)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl ${
                                selectedPropertyType === type.name
                                  ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white"
                                  : "bg-gray-50 text-black"
                              }`}
                            >
                              <i className={`${type.icon} text-xl mb-1`}></i>
                              <span className="text-xs text-center">
                                {type.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Listing Type
                        </label>
                        <div className="flex space-x-3">
                          <button
                            className={`flex-1 py-3 rounded-xl ${
                              listingType === "sale"
                                ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white"
                                : "bg-gray-50 text-black"
                            }`}
                            onClick={() => setListingType("sale")}
                          >
                            For Sale
                          </button>
                          <button
                            className={`flex-1 py-3 rounded-xl ${
                              listingType === "rent"
                                ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white"
                                : "bg-gray-50 text-black"
                            }`}
                            onClick={() => setListingType("rent")}
                          >
                            For Rent
                          </button>
                        </div>
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Price (₺)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 1,500,000"
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Property Details
                    </h2>

                    <div className="md:grid md:grid-cols-4 md:gap-6">
                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Bedrooms
                        </label>
                        <select className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black appearance-none border border-transparent focus:outline-none focus:border-[#ff8e53]">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5+</option>
                        </select>
                      </div>
                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Bathrooms
                        </label>
                        <select className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black appearance-none border border-transparent focus:outline-none focus:border-[#ff8e53]">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4+</option>
                        </select>
                      </div>
                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Area (m²)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 120"
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        />
                      </div>
                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Year Built
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2020"
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Location
                    </h2>

                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          City
                        </label>
                        <select className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black appearance-none border border-transparent focus:outline-none focus:border-[#ff8e53]">
                          <option>Istanbul</option>
                          <option>Ankara</option>
                          <option>Izmir</option>
                          <option>Antalya</option>
                          <option>Bursa</option>
                        </select>
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          District
                        </label>
                        <select className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black appearance-none border border-transparent focus:outline-none focus:border-[#ff8e53]">
                          <option>Beşiktaş</option>
                          <option>Kadıköy</option>
                          <option>Şişli</option>
                          <option>Beyoğlu</option>
                          <option>Üsküdar</option>
                        </select>
                      </div>

                      <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full address"
                          className="w-full py-3 px-4 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <div className="bg-gray-100 rounded-xl h-48 md:h-64 flex items-center justify-center mb-3">
                          <i className="ri-map-2-line text-3xl text-gray-400"></i>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                          Drag the pin to mark the exact location
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="px-6 py-5">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Amenities
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={amenity.id}
                            className="w-5 h-5 mr-3 accent-[#ff8e53]"
                          />
                          <label
                            htmlFor={amenity.id}
                            className="text-sm text-black"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons - Sticky on mobile, fixed position on web */}
                <div className="px-6 py-6 border-t border-gray-200 bg-white md:flex md:justify-between md:items-center">
                  <div className="hidden md:block text-sm text-gray-500 mb-4 md:mb-0">
                    All fields marked with * are required
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex-1 py-3 md:py-2 md:px-6 border border-gray-300 rounded-xl font-medium text-black hover:bg-gray-50 transition-colors">
                      Save Draft
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 md:py-2 md:px-8 rounded-xl font-medium hover:shadow-md transition-shadow">
                      Publish Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
