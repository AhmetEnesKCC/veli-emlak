"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { propertyAPI, Property, SearchParams } from "@/lib/api";

export default function SearchPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: "",
    state: "",
    country: "Turkey",
    min_price: 0,
    max_price: 10000000,
  });
  const [propertyType, setPropertyType] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [amenities, setAmenities] = useState<string[]>([]);

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
    { id: "parking", label: "Otopark" },
    { id: "pool", label: "Yüzme Havuzu" },
    { id: "security", label: "Güvenlik" },
    { id: "smart", label: "Akıllı Ev" },
    { id: "garden", label: "Bahçe" },
    { id: "balcony", label: "Balkon" },
    { id: "elevator", label: "Asansör" },
    { id: "ac", label: "Klima" },
    { id: "heating", label: "Isıtma" },
  ];

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        let result: Property[];

        // If we have search parameters, use search API, otherwise get all
        if (searchParams.city || searchParams.state || (searchParams.min_price ?? 0) > 0 || (searchParams.max_price ?? 0) < 10000000) {
          result = await propertyAPI.search(searchParams);
        } else {
          result = await propertyAPI.getAll();
        }

        setProperties(result);
      } catch (err) {
        setError("Emlaklar yüklenirken hata oluştu");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  // Toggle amenity selection
  const toggleAmenity = (amenityId: string) => {
    if (amenities.includes(amenityId)) {
      setAmenities(amenities.filter((id) => id !== amenityId));
    } else {
      setAmenities([...amenities, amenityId]);
    }
  };

  // Handle search
  const handleSearch = () => {
    // Trigger search by updating searchParams
    setSearchParams({ ...searchParams });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchParams({
      city: "",
      state: "",
      country: "Turkey",
      min_price: 0,
      max_price: 10000000,
    });
    setPropertyType("Any");
    setBedrooms("Any");
    setBathrooms("Any");
    setAmenities([]);
  };

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
                Emlak Ara
              </h1>
              <p className="text-sm text-gray-500 lg:text-base">
                Size uygun mükemmel evi bulun
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
                <h2 className="text-lg font-bold text-black">Filtreler</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-[#ff8e53] hover:underline"
                >
                  Temizle
                </button>
              </div>

              {/* Location Search */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">Konum</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Şehir"
                    value={searchParams.city}
                    onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    placeholder="İlçe"
                    value={searchParams.state}
                    onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Emlak Tipi
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`py-2 px-3 rounded-lg text-sm ${propertyType === type
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                        }`}
                    >
                      {type === "Any" ? "Hepsi" : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Fiyat Aralığı
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Min</p>
                    <input
                      type="number"
                      placeholder="0"
                      value={searchParams.min_price || ""}
                      onChange={(e) => setSearchParams({ ...searchParams, min_price: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Max</p>
                    <input
                      type="number"
                      placeholder="10000000"
                      value={searchParams.max_price || ""}
                      onChange={(e) => setSearchParams({ ...searchParams, max_price: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Yatak Odası
                </h3>
                <div className="flex flex-wrap gap-2">
                  {bedroomsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setBedrooms(option)}
                      className={`py-2 px-4 rounded-lg text-sm ${bedrooms === option
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                        }`}
                    >
                      {option === "Any" ? "Hepsi" : option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">Banyo</h3>
                <div className="flex flex-wrap gap-2">
                  {bathroomsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setBathrooms(option)}
                      className={`py-2 px-4 rounded-lg text-sm ${bathrooms === option
                          ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                          : "bg-gray-50 text-gray-700"
                        }`}
                    >
                      {option === "Any" ? "Hepsi" : option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">
                  Özellikler
                </h3>
                <div className="space-y-2">
                  {amenitiesOptions.map((amenity) => (
                    <label
                      key={amenity.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="w-4 h-4 mr-3 accent-[#ff8e53]"
                      />
                      <span className="text-sm text-gray-700">
                        {amenity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-lg font-medium"
              >
                Filtreleri Uygula
              </button>
            </div>
          </div>

          {/* Properties List */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="px-6 py-4 bg-white lg:bg-transparent lg:px-0 lg:py-0 lg:mb-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {loading ? "Yükleniyor..." : `${properties.length} emlak bulundu`}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sırala:</span>
                  <select className="text-sm font-medium text-black bg-transparent">
                    <option>Fiyat (Düşük-Yüksek)</option>
                    <option>Fiyat (Yüksek-Düşük)</option>
                    <option>En Yeni</option>
                    <option>En Popüler</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff8e53]"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
                <h3 className="text-xl font-bold text-black mb-2">Hata Oluştu</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            )}

            {/* Properties Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6 lg:px-0">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/property-detail/${property.id}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt={property.property_name}
                        className="w-full h-48 object-cover"
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm">
                        <i className="ri-heart-line text-black"></i>
                      </button>
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                        <span className="text-xs font-medium text-black">
                          {property.amenities?.property_type || "Emlak"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-black text-sm">
                            {property.property_name}
                          </h3>
                          <div className="flex items-center text-gray-500">
                            <i className="ri-map-pin-line mr-1 text-xs"></i>
                            <span className="text-xs">
                              {property.city}, {property.state}
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-2 py-1 rounded">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1 text-xs"></i>
                            <span className="text-xs font-medium text-black">
                              4.8
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <i className="ri-hotel-bed-line text-gray-400 mr-1"></i>
                            <span className="text-xs text-gray-600">
                              {property.amenities?.number_bedrooms || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-shower-line text-gray-400 mr-1"></i>
                            <span className="text-xs text-gray-600">
                              {property.amenities?.number_bathrooms || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-ruler-line text-gray-400 mr-1"></i>
                            <span className="text-xs text-gray-600">
                              {property.amenities?.square_footage || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-bold text-black">
                            ₺{property.room_rates?.[0]?.weekday_rate?.toLocaleString() || "N/A"}
                          </span>
                          <span className="text-gray-500 text-sm">/gece</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && properties.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-search-line text-6xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-bold text-black mb-2">Emlak Bulunamadı</h3>
                <p className="text-gray-600 mb-4">
                  Arama kriterlerinize uygun emlak bulunamadı.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-2 rounded-lg"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-black">Filtreler</h2>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2"
                >
                  <i className="ri-close-line text-xl text-black"></i>
                </button>
              </div>

              {/* Mobile filter content - same as desktop but in modal */}
              <div className="space-y-6">
                {/* Location Search */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">Konum</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Şehir"
                      value={searchParams.city}
                      onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="İlçe"
                      value={searchParams.state}
                      onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">
                    Emlak Tipi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`py-2 px-3 rounded-lg text-sm ${propertyType === type
                            ? "bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] font-medium"
                            : "bg-gray-50 text-gray-700"
                          }`}
                      >
                        {type === "Any" ? "Hepsi" : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 border border-gray-200 rounded-lg font-medium text-black"
                  >
                    Temizle
                  </button>
                  <button
                    onClick={() => {
                      handleSearch();
                      setIsFiltersOpen(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-lg font-medium"
                  >
                    Uygula
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
