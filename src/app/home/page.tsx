"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { propertyAPI, Property, authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// PropertyMap'i dinamik olarak import et (SSR sorunları için)
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b6b]"></div>
    </div>
  )
});

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [nearbyProperties, setNearbyProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const categories = [
    { id: 1, name: "All", icon: "ri-home-4-line", label: "All" },
    { id: 2, name: "Apartment", icon: "ri-building-line", label: "Apartments" },
    { id: 3, name: "House", icon: "ri-home-5-line", label: "Houses" },
    { id: 4, name: "Villa", icon: "ri-building-4-line", label: "Villas" },
    { id: 5, name: "Office", icon: "ri-store-2-line", label: "Offices" },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const properties = await propertyAPI.getAll();
        
        // Store all properties
        setAllProperties(properties);
        
        // Split properties into featured and nearby (for demo purposes)
        setFeaturedProperties(properties.slice(0, 4));
        setNearbyProperties(properties.slice(4, 8));
      } catch (err) {
        setError("Error loading properties");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/auth/login');
  };

  const filteredFeaturedProperties = activeCategory === "All" 
    ? featuredProperties 
    : featuredProperties.filter(property => 
        property.amenities?.property_type?.toLowerCase() === activeCategory.toLowerCase()
      );

  const filteredAllProperties = activeCategory === "All" 
    ? allProperties 
    : allProperties.filter(property => 
        property.amenities?.property_type?.toLowerCase() === activeCategory.toLowerCase()
      );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 md:pb-12">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-6 md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Find Your <span className="text-[#ff6b6b]">Dream Home</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover the perfect property with our AI-powered real estate platform
            </p>
          </div>

          {/* Search Bar */}
          <Link href="/search">
            <div className="relative">
              <input
                type="text"
                placeholder="Search location, property type..."
                className="w-full py-4 px-6 pl-14 bg-white rounded-2xl text-black border border-gray-100 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                readOnly
              />
              <i className="ri-search-line absolute left-5 top-5 text-gray-400 text-xl"></i>
              <button className="absolute right-4 top-3 p-2 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-xl hover:shadow-md transition-shadow">
                <i className="ri-equalizer-line text-white"></i>
              </button>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/search?type=Apartment" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 rounded-full flex items-center justify-center mb-3">
                <i className="ri-building-line text-[#ff6b6b] text-xl"></i>
              </div>
              <span className="text-sm font-medium text-black">Apartments</span>
            </div>
          </Link>
          
          <Link href="/search?type=Villa" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 rounded-full flex items-center justify-center mb-3">
                <i className="ri-building-4-line text-[#ff6b6b] text-xl"></i>
              </div>
              <span className="text-sm font-medium text-black">Villas</span>
            </div>
          </Link>
          
          <Link href="/chatbot" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 rounded-full flex items-center justify-center mb-3">
                <i className="ri-robot-line text-[#ff6b6b] text-xl"></i>
              </div>
              <span className="text-sm font-medium text-black">AI Assistant</span>
            </div>
          </Link>
          
          <Link href="/add-listing" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 rounded-full flex items-center justify-center mb-3">
                <i className="ri-add-line text-[#ff6b6b] text-xl"></i>
              </div>
              <span className="text-sm font-medium text-black">Add Listing</span>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`flex flex-col items-center min-w-[70px] p-3 rounded-2xl transition-all ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className={`${category.icon} text-2xl mb-1`}></i>
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Liste/Harita Toggle */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-[#ff6b6b] shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <i className="ri-list-unordered mr-2"></i>
              <span className="font-medium">List</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all ${
                viewMode === "map"
                  ? "bg-white text-[#ff6b6b] shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <i className="ri-map-2-line mr-2"></i>
              <span className="font-medium">Map</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-[#ff6b6b] underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Map View */}
        {!loading && !error && viewMode === "map" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">
                Map ({filteredAllProperties.length} property)
              </h2>
              <div className="text-sm text-gray-600">
                Click on a pin to view property details
              </div>
            </div>
            <PropertyMap 
              properties={filteredAllProperties} 
              className="h-96 md:h-[500px]"
            />
          </div>
        )}

        {/* List View - Featured Properties */}
        {!loading && !error && viewMode === "list" && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Featured Properties</h2>
                <Link href="/search" className="text-[#ff6b6b] text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFeaturedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      {property.image_url ? (
                        <Image
                          src={property.image_url}
                          alt={property.property_name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 flex items-center justify-center">
                          <i className="ri-home-line text-4xl text-[#ff6b6b]"></i>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                        <span className="text-xs font-bold text-black">
                          {property.amenities?.property_type || "Property"}
                        </span>
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <i className="ri-heart-line text-black"></i>
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-black">
                          {property.room_rates?.[0] 
                            ? formatPrice(property.room_rates[0].weekday_rate) + "/night"
                            : "Price not specified"
                          }
                        </h3>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-black mb-2 line-clamp-1">{property.property_name}</h4>
                      <div className="flex items-center text-gray-500 mb-3">
                        <i className="ri-map-pin-line mr-1"></i>
                        <span className="text-sm">{property.street}, {property.city}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {property.amenities?.square_footage && `${property.amenities.square_footage}m²`}
                        </span>
                        <span>
                          {property.amenities?.number_bedrooms} bedrooms
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFeaturedProperties.length === 0 && !loading && (
                <div className="text-center py-8">
                  <i className="ri-home-line text-4xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">No properties found in this category.</p>
                </div>
              )}
            </div>

            {/* Nearby Properties */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Nearby Properties</h2>
                <Link href="/search" className="text-[#ff6b6b] text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nearbyProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      {property.image_url ? (
                        <Image
                          src={property.image_url}
                          alt={property.property_name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 flex items-center justify-center">
                          <i className="ri-home-line text-4xl text-[#ff6b6b]"></i>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                        <span className="text-xs font-bold text-black">
                          {property.amenities?.property_type || "Property"}
                        </span>
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <i className="ri-heart-line text-black"></i>
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-black">
                          {property.room_rates?.[0] 
                            ? formatPrice(property.room_rates[0].weekday_rate) + "/night"
                            : "Price not specified"
                          }
                        </h3>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                          <span className="text-sm text-gray-600">4.5</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-black mb-2 line-clamp-1">{property.property_name}</h4>
                      <div className="flex items-center text-gray-500 mb-3">
                        <i className="ri-map-pin-line mr-1"></i>
                        <span className="text-sm">{property.street}, {property.city}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {property.amenities?.square_footage && `${property.amenities.square_footage}m²`}
                        </span>
                        <span>
                          {property.amenities?.number_bedrooms} bedrooms
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
