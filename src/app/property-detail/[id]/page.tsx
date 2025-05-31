"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { propertyAPI, Property } from "@/lib/api";

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock images for now
  const propertyImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await propertyAPI.getById(Number(params.id));
        setProperty(propertyData);
      } catch (err) {
        setError("Emlak detayları yüklenirken hata oluştu");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff8e53] mx-auto mb-4"></div>
          <p className="text-gray-600">Emlak detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
          <h2 className="text-xl font-bold text-black mb-2">Hata Oluştu</h2>
          <p className="text-gray-600 mb-4">{error || "Emlak bulunamadı"}</p>
          <Link
            href="/home"
            className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-2 rounded-lg"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const weekdayRate = property.room_rates?.[0]?.weekday_rate || 0;
  const weekendRate = property.room_rates?.[0]?.weekend_rate || 0;

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
            Ana Sayfa
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <Link href="/search" className="text-gray-500 hover:text-black">
            {property.city}
          </Link>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-black">{property.property_name}</span>
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
                    {property.property_name}
                  </h1>
                  <div className="flex items-center text-gray-500">
                    <i className="ri-map-pin-line mr-1"></i>
                    <span className="text-sm lg:text-base">
                      {property.street_number} {property.street}, {property.city}, {property.state}
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
                    <p className="text-xs text-gray-500">Yatak Odası</p>
                    <p className="font-medium text-black">{property.amenities?.number_bedrooms || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-shower-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Banyo</p>
                    <p className="font-medium text-black">{property.amenities?.number_bathrooms || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-ruler-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Alan</p>
                    <p className="font-medium text-black">{property.amenities?.square_footage || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-building-4-line text-xl mr-2 text-gray-500"></i>
                  <div>
                    <p className="text-xs text-gray-500">Tip</p>
                    <p className="font-medium text-black">{property.amenities?.property_type || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">Açıklama</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bu muhteşem {property.amenities?.property_type?.toLowerCase()} {property.city}'da yer almaktadır. 
                  {property.amenities?.number_bedrooms} yatak odası ve {property.amenities?.number_bathrooms} banyo ile 
                  geniş bir yaşam alanı sunmaktadır. Modern tasarım ve kaliteli malzemelerle inşa edilmiştir.
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">Özellikler</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities?.wifi === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-wifi-line text-green-500 mr-2"></i>
                      <span className="text-sm text-gray-600">WiFi</span>
                    </div>
                  )}
                  {property.amenities?.air_conditioning === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-temp-cold-line text-blue-500 mr-2"></i>
                      <span className="text-sm text-gray-600">Klima</span>
                    </div>
                  )}
                  {property.amenities?.parking === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-car-line text-gray-500 mr-2"></i>
                      <span className="text-sm text-gray-600">Otopark</span>
                    </div>
                  )}
                  {property.amenities?.swimming_pool === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-water-flash-line text-blue-500 mr-2"></i>
                      <span className="text-sm text-gray-600">Yüzme Havuzu</span>
                    </div>
                  )}
                  {property.amenities?.laundry_facilities === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-shirt-line text-purple-500 mr-2"></i>
                      <span className="text-sm text-gray-600">Çamaşırhane</span>
                    </div>
                  )}
                  {property.amenities?.pets === "Yes" && (
                    <div className="flex items-center">
                      <i className="ri-heart-3-line text-red-500 mr-2"></i>
                      <span className="text-sm text-gray-600">Evcil Hayvan Dostu</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-black mb-3">Ev Sahibi</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {property.host?.first_name?.[0]}{property.host?.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      {property.host?.first_name} {property.host?.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ev sahibi: {property.host?.host_since}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl shadow-sm lg:sticky lg:top-8">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-black">
                    ₺{weekdayRate.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-1">/gece</span>
                </div>
                {weekendRate !== weekdayRate && (
                  <p className="text-sm text-gray-500">
                    Hafta sonu: ₺{weekendRate.toLocaleString()}/gece
                  </p>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Giriş
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Çıkış
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Misafir Sayısı
                  </label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg text-sm">
                    <option>1 misafir</option>
                    <option>2 misafir</option>
                    <option>3 misafir</option>
                    <option>4 misafir</option>
                    <option>5+ misafir</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-lg font-medium mb-4">
                Rezervasyon Yap
              </button>

              <div className="text-center text-sm text-gray-500">
                Henüz ücret alınmayacak
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">₺{weekdayRate.toLocaleString()} x 5 gece</span>
                  <span className="text-black">₺{(weekdayRate * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Temizlik ücreti</span>
                  <span className="text-black">₺500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hizmet bedeli</span>
                  <span className="text-black">₺750</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span className="text-black">Toplam</span>
                  <span className="text-black">₺{(weekdayRate * 5 + 500 + 750).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 