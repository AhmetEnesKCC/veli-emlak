"use client";

import Link from "next/link";

export default function RegistrationSuccessPage() {
  const features = [
    {
      icon: "ri-search-line",
      title: "Browse Properties",
      description: "Search and filter properties based on your preferences",
      bgColor: "bg-red-100",
    },
    {
      icon: "ri-heart-line",
      title: "Save Favorites",
      description: "Save properties you like to view them later",
      bgColor: "bg-blue-100",
    },
    {
      icon: "ri-add-line",
      title: "List Properties",
      description: "Add your own properties for sale or rent",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="px-6 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full flex items-center justify-center mx-auto mb-6 animate-[scale-up_0.5s_ease-out]">
            <i className="ri-check-line text-5xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Registration Successful!
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Your account has been created successfully. You can now start
            exploring properties.
          </p>
        </div>

        {/* Features */}
        <div className="w-full space-y-4 mb-10">
          <h3 className="text-lg font-bold text-black mb-3">
            What you can do now:
          </h3>

          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-sm rounded-xl flex items-center hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 ${feature.bgColor} rounded-full flex items-center justify-center mr-4`}
              >
                <i className={`${feature.icon} text-xl text-black`}></i>
              </div>
              <div>
                <h4 className="font-medium text-black">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <Link
          href="/home"
          className="block w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium text-center"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
