"use client";

import Link from "next/link";
import { useState } from "react";

export default function PropertyDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const propertyImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];

  const similarProperties = [
    {
      id: 1,
      title: "Modern Apartment in Şişli",
      location: "Şişli, Istanbul",
      price: "₺1,850,000",
      forSale: true,
      beds: 2,
      baths: 1,
      area: "85 m²",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Luxury Apartment in Kadıköy",
      location: "Kadıköy, Istanbul",
      price: "₺12,500/mo",
      forSale: false,
      beds: 3,
      baths: 2,
      area: "120 m²",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 lg:pb-0">
      {/* Content Wrapper */}
      <div className="lg:container lg:mx-auto lg:px-6 lg:py-8">
        {/* Mobile Navigation */}
        <div className="absolute top-12 left-6 z-10 lg:hidden">
          <Link href="/home" className="p-2 bg-white rounded-full shadow-md">
            <i className="ri-arrow-left-s-line text-black"></i>
          </Link>
        </div>

        {/* Desktop Breadcrumb */}
        <div className="hidden lg:flex items-center mb-6 text-sm">
          <Link href="/home" className="text-gray-500 hover:text-black">
            Home
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <Link href="/search" className="text-gray-500 hover:text-black">
            Istanbul
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <Link href="/search" className="text-gray-500 hover:text-black">
            Beşiktaş
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-black">Modern Villa</span>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Property Images & Details */}
          <div className="lg:col-span-8">
            {/* Property Images */}
            <div className="relative">
              <img
                src={propertyImages[activeImageIndex]}
                alt="Property"
                className="w-full h-72 object-cover lg:h-[500px] lg:rounded-xl"
              />

              {/* Favorite Button */}
              <button className="absolute top-12 right-6 p-2 bg-white rounded-full shadow-md lg:top-6">
                <i className="ri-heart-line text-black"></i>
              </button>

              {/* Image Navigation on Desktop */}
              <div className="hidden lg:block lg:absolute lg:top-1/2 lg:left-4 lg:-translate-y-1/2">
                <button
                  className="p-2 bg-white rounded-full shadow-md"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev > 0 ? prev - 1 : propertyImages.length - 1
                    )
                  }
                >
                  <i className="ri-arrow-left-s-line text-black"></i>
                </button>
              </div>

              <div className="hidden lg:block lg:absolute lg:top-1/2 lg:right-4 lg:-translate-y-1/2">
                <button
                  className="p-2 bg-white rounded-full shadow-md"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev < propertyImages.length - 1 ? prev + 1 : 0
                    )
                  }
                >
                  <i className="ri-arrow-right-s-line text-black"></i>
                </button>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-${
                      activeImageIndex === index ? "5" : "2"
                    } h-2 rounded-full ${
                      activeImageIndex === index ? "bg-white" : "bg-white/50"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Desktop Image Thumbnails */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 lg:mt-4">
              {propertyImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden ${
                    activeImageIndex === index ? "ring-2 ring-[#ff8e53]" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Property Details */}
            <div className="px-6 py-5 bg-white lg:mt-8 lg:p-8 lg:rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-xl font-bold text-black lg:text-3xl">
                    Modern Villa in Beşiktaş
                  </h1>
                  <div className="flex items-center text-gray-500">
                    <i className="ri-map-pin-line mr-1"></i>
                    <span className="text-sm lg:text-base">
                      Beşiktaş, Istanbul
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    <span className="font-medium text-black">4.8</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4 mb-5 lg:mt-8 lg:mb-8">
                <div className="flex items-center">
                  <i className="ri-hotel-bed-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                    <p className="font-medium text-black">4</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-shower-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                    <p className="font-medium text-black">3</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-ruler-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="font-medium text-black">240 m²</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-building-4-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Floors</p>
                    <p className="font-medium text-black">2</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <h2 className="text-lg font-bold text-black mb-3 lg:text-2xl">
                  Price
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-black lg:text-3xl">
                    ₺2,450,000
                  </span>
                  <span className="ml-2 text-sm text-gray-500">($78,200)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-6 py-5 bg-gray-50 lg:bg-white lg:mt-8 lg:p-8 lg:rounded-xl">
              <h2 className="text-lg font-bold text-black mb-3 lg:text-2xl">
                Description
              </h2>
              <p className="text-sm text-black leading-relaxed lg:text-base">
                This beautiful modern villa offers luxurious living with a
                private pool and garden. The property features 4 spacious
                bedrooms, 3 bathrooms, a large living area, and a fully equipped
                kitchen with high-end appliances.
                <span className="hidden lg:inline">
                  <br />
                  <br />
                  The master bedroom includes an en-suite bathroom and walk-in
                  closet. The villa has floor-to-ceiling windows providing ample
                  natural light and stunning views of the surroundings. The
                  outdoor space features a private swimming pool, a garden, and
                  a terrace perfect for entertaining.
                </span>
                <br />
                <br />
                Located in the prestigious Beşiktaş district, it provides easy
                access to shopping centers, restaurants, and public
                transportation.
              </p>
            </div>

            {/* Amenities */}
            <div className="px-6 py-5 bg-white lg:mt-8 lg:p-8 lg:rounded-xl">
              <h2 className="text-lg font-bold text-black mb-4 lg:text-2xl">
                Amenities
              </h2>
              <div className="grid grid-cols-3 gap-3 lg:grid-cols-4 lg:gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-wifi-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    WiFi
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-car-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    Parking
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-drop-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    Pool
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-shield-check-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    Security
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-home-wifi-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    Smart Home
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl lg:flex-row lg:justify-start lg:p-4">
                  <i className="ri-plant-line text-xl text-black mb-2 lg:mb-0 lg:mr-3"></i>
                  <span className="text-xs text-black text-center lg:text-sm">
                    Garden
                  </span>
                </div>
                <div className="hidden lg:flex lg:flex-row lg:justify-start lg:p-4 lg:bg-gray-50 lg:rounded-xl">
                  <i className="ri-restaurant-line text-xl text-black mr-3"></i>
                  <span className="text-sm text-black">Kitchen</span>
                </div>
                <div className="hidden lg:flex lg:flex-row lg:justify-start lg:p-4 lg:bg-gray-50 lg:rounded-xl">
                  <i className="ri-tv-line text-xl text-black mr-3"></i>
                  <span className="text-sm text-black">TV</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="px-6 py-5 bg-gray-50 lg:bg-white lg:mt-8 lg:p-8 lg:rounded-xl">
              <h2 className="text-lg font-bold text-black mb-3 lg:text-2xl">
                Location
              </h2>
              <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center mb-3 lg:h-64">
                <i className="ri-map-2-line text-3xl text-gray-400"></i>
              </div>
              <div className="flex items-center text-black">
                <i className="ri-map-pin-line mr-2"></i>
                <span className="text-sm lg:text-base">
                  Nispetiye Cad. No:123, Beşiktaş, Istanbul
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Agent Info & CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              {/* Agent Info */}
              <div className="px-6 py-5 bg-white lg:p-8 lg:rounded-xl">
                <h2 className="text-lg font-bold text-black mb-3 lg:text-xl">
                  Listed by
                </h2>
                <div className="flex items-center mb-6">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Agent"
                    className="w-12 h-12 rounded-full object-cover mr-3 lg:w-16 lg:h-16"
                  />
                  <div>
                    <h3 className="font-medium text-black lg:font-bold lg:text-lg">
                      Ahmet Yılmaz
                    </h3>
                    <p className="text-sm text-gray-500">Premium Agent</p>
                    <div className="hidden lg:flex items-center mt-1">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm text-black">4.9</span>
                      <span className="text-sm text-gray-500 ml-1">
                        (124 reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Form on Desktop */}
                <div className="hidden lg:block">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full py-3 px-4 bg-gray-50 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53] h-24 resize-none"
                      placeholder="I'm interested in this property..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-8 py-3 rounded-xl font-medium">
                    Send Message
                  </button>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500">or</span>
                    <div className="flex justify-between mt-4">
                      <button className="flex items-center justify-center bg-white border border-gray-200 rounded-xl py-2 px-4 text-sm font-medium w-[48%] hover:bg-gray-50">
                        <i className="ri-message-2-line mr-2"></i>
                        Chat
                      </button>
                      <button className="flex items-center justify-center bg-white border border-gray-200 rounded-xl py-2 px-4 text-sm font-medium w-[48%] hover:bg-gray-50">
                        <i className="ri-phone-line mr-2"></i>
                        Call
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Contact Buttons */}
                <div className="flex space-x-2 lg:hidden">
                  <button className="p-2 bg-gray-100 rounded-full">
                    <i className="ri-message-2-line text-black"></i>
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full">
                    <i className="ri-phone-line text-black"></i>
                  </button>
                </div>
              </div>

              {/* Similar Properties - Desktop Only */}
              <div className="hidden lg:block lg:mt-8 lg:bg-white lg:p-8 lg:rounded-xl">
                <h2 className="text-xl font-bold text-black mb-6">
                  Similar Properties
                </h2>
                <div className="space-y-5">
                  {similarProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium text-black">
                          {property.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {property.location}
                        </p>
                        <p className="text-sm font-bold text-black mt-1">
                          {property.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm font-medium text-[#ff8e53] hover:underline">
                  View All Similar Properties
                </button>
              </div>

              {/* Share & Report - Desktop Only */}
              <div className="hidden lg:block lg:mt-8 lg:bg-white lg:p-8 lg:rounded-xl">
                <div className="flex justify-between">
                  <button className="flex items-center text-gray-500 hover:text-black">
                    <i className="ri-share-line mr-2"></i>
                    <span>Share</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-black">
                    <i className="ri-flag-line mr-2"></i>
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 px-6 py-4 bg-white lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-lg font-bold text-black">₺2,450,000</p>
          </div>
          <button className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-8 py-3 rounded-xl font-medium">
            Schedule a Tour
          </button>
        </div>
      </div>
    </div>
  );
}
