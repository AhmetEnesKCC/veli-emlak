"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings");

  // Mock user data
  const user = {
    name: "Ayşe Demir",
    email: "ayse.demir@example.com",
    phone: "+90 555 123 4567",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Istanbul, Turkey",
    bio: "Real estate agent with over 5 years of experience in the Istanbul market.",
    joinedDate: "April 2020",
    type: "Agent",
    badges: ["Premium", "Verified", "Top Seller"],
  };

  // Mock listings data
  const listings = [
    {
      id: 1,
      title: "Modern Villa in Beşiktaş",
      location: "Beşiktaş, Istanbul",
      price: "₺2,450,000",
      forSale: true,
      date: "2 days ago",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Luxury Apartment in Kadıköy",
      location: "Kadıköy, Istanbul",
      price: "₺12,500/mo",
      forSale: false,
      date: "1 week ago",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Mock favorites data
  const favorites = [
    {
      id: 3,
      title: "Modern Apartment in Şişli",
      location: "Şişli, Istanbul",
      price: "₺1,850,000",
      forSale: true,
      date: "3 days ago",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    },
    {
      id: 4,
      title: "Office Space in Levent",
      location: "Levent, Istanbul",
      price: "₺8,500/mo",
      forSale: false,
      date: "2 weeks ago",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Function to render properties based on active tab
  const renderProperties = () => {
    const data = activeTab === "listings" ? listings : favorites;

    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        {data.map((property) => (
          <div
            key={property.id}
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
                  {property.forSale ? "For Sale" : "For Rent"}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md">
                  <i
                    className={`${
                      activeTab === "listings"
                        ? "ri-edit-line"
                        : "ri-heart-fill text-red-500"
                    } text-black`}
                  ></i>
                </button>
                {activeTab === "listings" && (
                  <button className="p-2 bg-white rounded-full shadow-md">
                    <i className="ri-delete-bin-line text-black"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-black">{property.price}</h3>
                <div className="text-xs text-gray-500">{property.date}</div>
              </div>
              <h4 className="font-medium text-black mb-2">{property.title}</h4>
              <div className="flex items-center text-gray-500 mb-3">
                <i className="ri-map-pin-line mr-1"></i>
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-28 lg:pb-12">
      {/* Container for web layout */}
      <div className="lg:container lg:mx-auto lg:px-6 lg:py-8">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 bg-white lg:bg-transparent lg:pt-0 lg:px-0">
          <div className="flex items-center lg:hidden">
            <Link href="/home" className="p-2 mr-4">
              <i className="ri-arrow-left-s-line text-xl text-black"></i>
            </Link>
            <h1 className="text-xl font-bold text-black">Profile</h1>
            <div className="flex-1"></div>
            <button className="p-2 bg-gray-100 rounded-full">
              <i className="ri-settings-line text-black"></i>
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* User Info - Left Column on Desktop */}
          <div className="lg:col-span-4 xl:col-span-3">
            {/* User Card */}
            <div className="px-6 pb-6 lg:p-0 lg:mb-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <div className="flex flex-col items-center lg:items-start lg:flex-row lg:space-x-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 lg:mb-0 lg:w-20 lg:h-20">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <h2 className="text-xl font-bold text-black">
                        {user.name}
                      </h2>
                      <p className="text-sm text-gray-500">{user.type}</p>
                      <div className="flex justify-center space-x-2 mt-2 lg:justify-start">
                        {user.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] px-2 py-1 rounded-lg"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-6 space-y-4 lg:text-sm">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-black">{user.email}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium text-black">{user.phone}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium text-black">{user.location}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <p className="text-gray-500">Member Since</p>
                      <p className="font-medium text-black">
                        {user.joinedDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <p className="text-gray-500 mb-2">About</p>
                    <p className="text-sm text-black">{user.bio}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex lg:justify-between">
                    <button className="flex items-center justify-center bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] rounded-xl w-[48%] py-3 font-medium lg:w-auto lg:px-6">
                      <i className="ri-edit-line mr-2"></i>
                      <span>Edit Profile</span>
                    </button>
                    <button className="flex items-center justify-center bg-gray-100 text-black rounded-xl w-[48%] py-3 font-medium hover:bg-gray-200 lg:w-auto lg:px-6">
                      <i className="ri-settings-3-line mr-2"></i>
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card - Desktop Only */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm p-6">
                <h3 className="text-lg font-bold text-black mb-4">
                  Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-[#ff6b6b]/5 to-[#ff8e53]/5 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Total Listings</p>
                    <h4 className="text-2xl font-bold text-black">24</h4>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <i className="ri-arrow-up-s-line mr-1"></i>
                      <span>+2 this month</span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#ff6b6b]/5 to-[#ff8e53]/5 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Active Listings</p>
                    <h4 className="text-2xl font-bold text-black">12</h4>
                    <p className="text-xs text-[#ff8e53] flex items-center mt-1">
                      <i className="ri-time-line mr-1"></i>
                      <span>50% of total</span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#ff6b6b]/5 to-[#ff8e53]/5 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Views</p>
                    <h4 className="text-2xl font-bold text-black">1.2k</h4>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <i className="ri-arrow-up-s-line mr-1"></i>
                      <span>+15% this week</span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#ff6b6b]/5 to-[#ff8e53]/5 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Inquiries</p>
                    <h4 className="text-2xl font-bold text-black">45</h4>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <i className="ri-arrow-up-s-line mr-1"></i>
                      <span>+5 this week</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full text-center text-[#ff8e53] font-medium">
                    View detailed statistics
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Listings - Right Column on Desktop */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Tabs */}
            <div className="px-6 bg-white pb-4 border-b border-gray-200 lg:px-0 lg:bg-transparent lg:border-none">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("listings")}
                  className={`py-2 ${
                    activeTab === "listings"
                      ? "text-[#ff8e53] border-b-2 border-[#ff8e53] font-medium"
                      : "text-gray-500"
                  }`}
                >
                  My Listings
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`py-2 ${
                    activeTab === "favorites"
                      ? "text-[#ff8e53] border-b-2 border-[#ff8e53] font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Favorites
                </button>
              </div>
            </div>

            {/* Add Listing Button - Desktop Only */}
            <div className="hidden lg:flex lg:justify-between lg:items-center lg:mb-6 lg:mt-6">
              <h2 className="text-2xl font-bold text-black">
                {activeTab === "listings"
                  ? "My Listings"
                  : "Favorite Properties"}
              </h2>
              {activeTab === "listings" && (
                <Link
                  href="/add-listing"
                  className="flex items-center bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-4 py-2 rounded-xl font-medium"
                >
                  <i className="ri-add-line mr-2"></i>
                  <span>Add New Listing</span>
                </Link>
              )}
            </div>

            {/* Property List */}
            <div className="px-4 pt-4 pb-4 lg:px-0 lg:mt-2">
              {renderProperties()}
            </div>

            {/* Empty State - Conditionally render if no properties */}
            {/* No properties state would go here */}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-between px-6 py-4">
          <Link
            href="/home"
            className="flex flex-col items-center text-gray-400"
          >
            <i className="ri-home-5-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </Link>
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
          <button className="flex flex-col items-center text-gray-400">
            <i className="ri-message-2-line text-xl"></i>
            <span className="text-xs mt-1">Messages</span>
          </button>
          <button className="flex flex-col items-center text-[#ff8e53]">
            <i className="ri-user-fill text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
