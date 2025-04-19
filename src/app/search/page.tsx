"use client";

import Link from "next/link";
import { useState } from "react";

export default function SearchPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter states
  const [propertyType, setPropertyType] = useState("Any");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [amenities, setAmenities] = useState([]);

  const propertyTypes = [
    "Any",
    "Apartment",
    "House",
    "Villa",
    "Office",
    "Land",
    "Shop",
  ];

  const bedroomsOptions = ["Any", "1", "2", "3", "4+"];
  const bathroomsOptions = ["Any", "1", "2", "3+"];

  const amenitiesOptions = [
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

  // Toggle amenity selection
  const toggleAmenity = (amenityId) => {
    if (amenities.includes(amenityId)) {
      setAmenities(amenities.filter((id) => id !== amenityId));
    } else {
      setAmenities([...amenities, amenityId]);
    }
  };

  // Mock property data
  const properties = [
    {
      id: 1,
      title: "Modern Villa in Beşiktaş",
      location: "Beşiktaş, Istanbul",
      price: "₺2,450,000",
      forSale: true,
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
      forSale: false,
      beds: 3,
      baths: 2,
      area: "120 m²",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Modern Apartment in Şişli",
      location: "Şişli, Istanbul",
      price: "₺1,850,000",
      forSale: true,
      beds: 2,
      baths: 1,
      area: "85 m²",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    },
    {
      id: 4,
      title: "Office Space in Levent",
      location: "Levent, Istanbul",
      price: "₺8,500/mo",
      forSale: false,
      beds: 0,
      baths: 1,
      area: "150 m²",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      title: "Luxury Villa with Pool",
      location: "Beykoz, Istanbul",
      price: "₺3,750,000",
      forSale: true,
      beds: 5,
      baths: 4,
      area: "320 m²",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 6,
      title: "Penthouse in Bebek",
      location: "Bebek, Istanbul",
      price: "₺5,250,000",
      forSale: true,
      beds: 3,
      baths: 2,
      area: "180 m²",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-12">
      {/* Container for web layout */}
      <div className="lg:container lg:mx-auto lg:px-6 lg:py-8">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 bg-white lg:bg-transparent lg:px-0 lg:py-0 lg:pb-8">
          <div className="flex items-center">
            <Link href="/home" className="p-2 mr-4 lg:hidden">
              <i className="ri-arrow-left-s-line text-xl text-black"></i>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-black lg:text-3xl">
                Search Properties
              </h1>
              <p className="text-sm text-gray-500 lg:text-base">
                Find the perfect property for you
              </p>
            </div>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="p-2 bg-gray-100 rounded-full lg:hidden"
            >
              <i className="ri-filter-3-line text-black"></i>
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters - Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-black">Filters</h2>
                <button className="text-sm font-medium text-[#ff8e53] hover:underline">
                  Clear All
                </button>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Property Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`py-2 px-3 rounded-lg text-sm ${
                        propertyType === type
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Price Range
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Min</p>
                    <input
                      type="text"
                      value={priceRange[0].toLocaleString()}
                      onChange={(e) =>
                        setPriceRange([
                          parseInt(e.target.value.replace(/,/g, "")),
                          priceRange[1],
                        ])
                      }
                      className="w-full p-2 bg-gray-50 rounded-lg text-sm text-black"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Max</p>
                    <input
                      type="text"
                      value={priceRange[1].toLocaleString()}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value.replace(/,/g, "")),
                        ])
                      }
                      className="w-full p-2 bg-gray-50 rounded-lg text-sm text-black"
                    />
                  </div>
                </div>
                {/* Price slider would go here */}
                <div className="h-2 bg-gray-200 rounded-full mt-4 mb-2 relative">
                  <div className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full absolute left-[20%] right-[20%]"></div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Bedrooms
                </h3>
                <div className="flex space-x-3">
                  {bedroomsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setBedrooms(option)}
                      className={`flex-1 py-2 px-3 rounded-lg text-center text-sm ${
                        bedrooms === option
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Bathrooms
                </h3>
                <div className="flex space-x-3">
                  {bathroomsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setBathrooms(option)}
                      className={`flex-1 py-2 px-3 rounded-lg text-center text-sm ${
                        bathrooms === option
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-medium text-black mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <div key={amenity.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`desktop-${amenity.id}`}
                        checked={amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="w-4 h-4 mr-2 accent-[#ff8e53]"
                      />
                      <label
                        htmlFor={`desktop-${amenity.id}`}
                        className="text-sm text-black"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Filters */}
              <div className="mt-8">
                <button className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-xl font-medium">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Search Bar */}
            <div className="px-6 pb-4 lg:px-0 lg:pb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for location, property..."
                  className="w-full py-3 px-4 pl-12 bg-white rounded-xl text-black border border-gray-100 shadow-sm"
                />
                <i className="ri-search-line absolute left-4 top-3.5 text-gray-400"></i>
              </div>
            </div>

            {/* Sort & View Options - Desktop */}
            <div className="hidden lg:flex lg:justify-between lg:items-center lg:mb-6">
              <p className="text-sm text-gray-500">Showing 15 results</p>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">Sort by:</span>
                <select className="bg-white border border-gray-100 rounded-lg text-sm py-2 px-4">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
                <div className="ml-4 flex space-x-2 border-l border-gray-200 pl-4">
                  <button className="bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] p-2 rounded-lg">
                    <i className="ri-grid-line text-lg"></i>
                  </button>
                  <button className="bg-gray-50 text-gray-500 p-2 rounded-lg">
                    <i className="ri-list-check text-lg"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Property List */}
            <div className="px-4 lg:px-0">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    href="/property-detail"
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover lg:h-52"
                      />
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                        <span className="text-xs font-bold text-black">
                          {property.forSale ? "For Sale" : "For Rent"}
                        </span>
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                        <i className="ri-heart-line text-black"></i>
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-black">
                          {property.price}
                        </h3>
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
                        {property.beds > 0 && (
                          <div className="flex items-center">
                            <i className="ri-hotel-bed-line mr-1 text-black"></i>
                            <span className="text-black">
                              {property.beds} Beds
                            </span>
                          </div>
                        )}
                        {property.baths > 0 && (
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
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isFiltersOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-black">Filters</h2>
              <button onClick={() => setIsFiltersOpen(false)}>
                <i className="ri-close-line text-xl text-black"></i>
              </button>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-3">
                Property Type
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.slice(0, 6).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`py-2 px-3 rounded-lg text-sm ${
                      propertyType === type
                        ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-3">
                Price Range
              </h3>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Min</p>
                  <input
                    type="text"
                    value={priceRange[0].toLocaleString()}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value.replace(/,/g, "")),
                        priceRange[1],
                      ])
                    }
                    className="w-full p-2 bg-gray-50 rounded-lg text-sm text-black"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Max</p>
                  <input
                    type="text"
                    value={priceRange[1].toLocaleString()}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value.replace(/,/g, "")),
                      ])
                    }
                    className="w-full p-2 bg-gray-50 rounded-lg text-sm text-black"
                  />
                </div>
              </div>
              {/* Price slider would go here */}
              <div className="h-2 bg-gray-200 rounded-full mt-4 mb-2 relative">
                <div className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full absolute left-[20%] right-[20%]"></div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-3">Bedrooms</h3>
              <div className="flex space-x-3">
                {bedroomsOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setBedrooms(option)}
                    className={`flex-1 py-2 px-3 rounded-lg text-center text-sm ${
                      bedrooms === option
                        ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-3">Bathrooms</h3>
              <div className="flex space-x-3">
                {bathroomsOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setBathrooms(option)}
                    className={`flex-1 py-2 px-3 rounded-lg text-center text-sm ${
                      bathrooms === option
                        ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Filters */}
            <div className="flex space-x-3">
              <button className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-black">
                Reset
              </button>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-xl font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button className="flex flex-col items-center text-[#ff8e53]">
            <i className="ri-search-line text-xl"></i>
            <span className="text-xs mt-1">Search</span>
          </button>
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
          <Link
            href="/profile"
            className="flex flex-col items-center text-gray-400"
          >
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
