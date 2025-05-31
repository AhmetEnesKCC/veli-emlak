"use client";

import Link from "next/link";
import { useState } from "react";
import { propertyAPI, CreatePropertyRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

interface FormData {
  property_name: string;
  street_number: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  property_type: string;
  urban_rural_suburban: string;
  square_footage: string;
  number_beds: string;
  number_bedrooms: string;
  number_bathrooms: number;
  air_conditioning: string;
  wifi: string;
  pets: string;
  smoke_free: string;
  parking: string;
  laundry_facilities: string;
  swimming_pool: string;
  accessibility: string;
  room_rates?: {
    weekday_rate: number;
    weekend_rate: number;
    person_add_on_price: number;
    tax_rate: number;
  };
}

export default function AddListingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    property_name: "",
    street_number: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "Turkey",
    property_type: "Apartment",
    urban_rural_suburban: "Urban",
    square_footage: "",
    number_beds: "",
    number_bedrooms: "",
    number_bathrooms: 1,
    air_conditioning: "No",
    wifi: "Yes",
    pets: "No",
    smoke_free: "Yes",
    parking: "No",
    laundry_facilities: "No",
    swimming_pool: "No",
    accessibility: "No",
    room_rates: {
      weekday_rate: 0,
      weekend_rate: 0,
      person_add_on_price: 0,
      tax_rate: 18,
    },
  });

  const propertyTypes = [
    { value: "Apartment", label: "Daire", icon: "ri-building-line" },
    { value: "Villa", label: "Villa", icon: "ri-home-5-line" },
    { value: "Studio", label: "Stüdyo", icon: "ri-building-4-line" },
    { value: "Penthouse", label: "Çatı Katı", icon: "ri-store-2-line" },
    { value: "Office", label: "Ofis", icon: "ri-store-line" },
  ];

  const cities = [
    "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", 
    "Gaziantep", "Konya", "Adana", "Kayseri", "Mersin"
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith("room_rates.")) {
      const rateField = field.split(".")[1];
      setFormData(prev => ({
        ...prev,
        room_rates: {
          ...prev.room_rates!,
          [rateField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await propertyAPI.create(formData as CreatePropertyRequest);
      router.push("/profile?success=İlan başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Ilan oluşturma hatası:", error);
      alert("İlan oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.property_name && formData.city && formData.street;
      case 2:
        return formData.property_type && formData.square_footage && formData.number_bedrooms;
      case 3:
        return formData.street_number && formData.state && formData.zip_code;
      case 4:
        return formData.room_rates && formData.room_rates.weekday_rate > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-6">Temel Bilgiler</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlan Başlığı *
              </label>
              <input
                type="text"
                value={formData.property_name}
                onChange={(e) => handleInputChange("property_name", e.target.value)}
                placeholder="Örn: Modern 3+1 Daire, Deniz Manzaralı"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                >
                  <option value="">Şehir seçin</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlçe *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="İlçe adını girin"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sokak/Cadde *
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                placeholder="Sokak veya cadde adını girin"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-6">Emlak Detayları</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Emlak Tipi *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange("property_type", type.value)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                      formData.property_type === type.value
                        ? "border-[#ff6b6b] bg-[#ff6b6b]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <i className={`${type.icon} text-2xl ${
                      formData.property_type === type.value ? "text-[#ff6b6b]" : "text-gray-400"
                    }`}></i>
                    <span className={`text-sm font-medium ${
                      formData.property_type === type.value ? "text-[#ff6b6b]" : "text-gray-700"
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metrekare *
                </label>
                <input
                  type="number"
                  value={formData.square_footage}
                  onChange={(e) => handleInputChange("square_footage", e.target.value)}
                  placeholder="120"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Sayısı *
                </label>
                <input
                  type="text"
                  value={formData.number_bedrooms}
                  onChange={(e) => handleInputChange("number_bedrooms", e.target.value)}
                  placeholder="3+1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banyo Sayısı *
                </label>
                <select
                  value={formData.number_bathrooms}
                  onChange={(e) => handleInputChange("number_bathrooms", parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-6">Adres Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kapı/Bina No *
                </label>
                <input
                  type="text"
                  value={formData.street_number}
                  onChange={(e) => handleInputChange("street_number", e.target.value)}
                  placeholder="12A"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posta Kodu *
                </label>
                <input
                  type="text"
                  value={formData.zip_code}
                  onChange={(e) => handleInputChange("zip_code", e.target.value)}
                  placeholder="34000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Konum Tipi
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "Urban", label: "Şehir Merkezi" },
                  { value: "Suburban", label: "Banliyö" },
                  { value: "Rural", label: "Kırsal" }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange("urban_rural_suburban", option.value)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      formData.urban_rural_suburban === option.value
                        ? "border-[#ff6b6b] bg-[#ff6b6b]/5 text-[#ff6b6b]"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-6">Fiyat ve Özellikler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hafta İçi Fiyatı (TL/Gece) *
                </label>
                <input
                  type="number"
                  value={formData.room_rates?.weekday_rate || 0}
                  onChange={(e) => handleInputChange("room_rates.weekday_rate", parseInt(e.target.value))}
                  placeholder="500"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hafta Sonu Fiyatı (TL/Gece)
                </label>
                <input
                  type="number"
                  value={formData.room_rates?.weekend_rate || 0}
                  onChange={(e) => handleInputChange("room_rates.weekend_rate", parseInt(e.target.value))}
                  placeholder="650"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Özellikler
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { field: "wifi", label: "WiFi", icon: "ri-wifi-line" },
                  { field: "parking", label: "Otopark", icon: "ri-car-line" },
                  { field: "air_conditioning", label: "Klima", icon: "ri-temp-cold-line" },
                  { field: "swimming_pool", label: "Havuz", icon: "ri-water-flash-line" },
                  { field: "laundry_facilities", label: "Çamaşırhane", icon: "ri-shirt-line" },
                  { field: "accessibility", label: "Engelli Erişimi", icon: "ri-wheelchair-line" },
                ].map((feature) => (
                  <button
                    key={feature.field}
                    type="button"
                    onClick={() => handleInputChange(feature.field, 
                      (formData as any)[feature.field] === "Yes" ? "No" : "Yes"
                    )}
                    className={`p-3 border-2 rounded-lg flex items-center space-x-2 transition-all ${
                      (formData as any)[feature.field] === "Yes"
                        ? "border-[#ff6b6b] bg-[#ff6b6b]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <i className={`${feature.icon} ${
                      (formData as any)[feature.field] === "Yes" ? "text-[#ff6b6b]" : "text-gray-400"
                    }`}></i>
                    <span className={`text-sm font-medium ${
                      (formData as any)[feature.field] === "Yes" ? "text-[#ff6b6b]" : "text-gray-700"
                    }`}>
                      {feature.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Mobile Header */}
        <div className="flex items-center mb-6 lg:hidden">
          <Link href="/profile" className="p-2 mr-4">
            <i className="ri-arrow-left-s-line text-xl text-black"></i>
          </Link>
          <h1 className="text-xl font-bold text-black">Yeni İlan</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Yeni İlan Oluştur</h1>
          <p className="text-gray-600">Emlak ilanınızı oluşturmak için formu doldurun</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Progress Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-bold text-black mb-4">İlerleme</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Temel Bilgiler" },
                  { step: 2, title: "Emlak Detayları" },
                  { step: 3, title: "Adres Bilgileri" },
                  { step: 4, title: "Fiyat & Özellikler" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                      currentStep >= item.step
                        ? "bg-[#ff6b6b] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {item.step}
                    </div>
                    <span className={`text-sm font-medium ${
                      currentStep >= item.step ? "text-black" : "text-gray-500"
                    }`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Mobile Progress */}
              <div className="lg:hidden border-b border-gray-100 p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Adım {currentStep} / 4</span>
                  <span>{Math.round((currentStep / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {renderStep()}
              </div>

              {/* Form Actions */}
              <div className="border-t border-gray-100 p-6 flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Geri
                </button>
                
                {currentStep === 4 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || loading}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Oluşturuluyor...
                      </>
                    ) : (
                      "İlanı Oluştur"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    İleri
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
