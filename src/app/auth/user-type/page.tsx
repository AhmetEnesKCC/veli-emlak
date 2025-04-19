"use client";

import Link from "next/link";
import { useState } from "react";

export default function UserTypePage() {
  const [selectedType, setSelectedType] = useState("individual");

  const userTypes = [
    {
      id: "individual",
      title: "Individual User",
      description: "Looking to buy, sell or rent properties for personal use",
      icon: "ri-user-line",
      iconBg: "bg-red-100",
    },
    {
      id: "agent",
      title: "Real Estate Agent",
      description:
        "Professional agent representing clients in property transactions",
      icon: "ri-briefcase-line",
      iconBg: "bg-blue-100",
    },
    {
      id: "developer",
      title: "Property Developer",
      description: "Company or individual developing new properties for sale",
      icon: "ri-building-line",
      iconBg: "bg-green-100",
    },
    {
      id: "manager",
      title: "Property Manager",
      description: "Managing rental properties on behalf of property owners",
      icon: "ri-home-gear-line",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center">
          <Link href="/auth/verification" className="p-2 mr-4">
            <i className="ri-arrow-left-s-line text-xl text-black"></i>
          </Link>
          <h1 className="text-xl font-bold text-black">Select User Type</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex-1">
        <p className="text-sm text-gray-500 mb-8">
          Please select your user type to personalize your experience.
        </p>

        {/* User Type Selection */}
        <div className="space-y-4 mb-8">
          {userTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 bg-white shadow-sm rounded-xl border-2 ${
                selectedType === type.id
                  ? "border-[#ff8e53] bg-[#fff8f5]"
                  : "border-transparent"
              } flex items-center cursor-pointer transition-all duration-200 hover:shadow-md`}
              onClick={() => setSelectedType(type.id)}
            >
              <div
                className={`${type.iconBg} w-12 h-12 rounded-full flex items-center justify-center mr-4`}
              >
                <i className={`${type.icon} text-2xl text-black`}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black mb-1">{type.title}</h3>
                <p className="text-xs text-gray-500">{type.description}</p>
              </div>
              <div className="ml-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedType === type.id
                      ? "border-2 border-red-400"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {selectedType === type.id && (
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center">
          You can change your user type later in your profile settings.
        </p>
      </div>

      {/* Continue Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <Link
          href="/auth/success"
          className="block w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium text-center"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
