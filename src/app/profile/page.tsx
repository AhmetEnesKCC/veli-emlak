"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { propertyAPI, authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: number;
}

interface Property {
  id: number;
  property_name: string;
  city: string;
  street: string;
  room_rates: Array<{ weekday_rate: number }>;
  amenities: {
    property_type: string;
    square_footage: string;
    number_bedrooms: string;
    number_bathrooms: number;
  };
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings");
  const [user, setUser] = useState<User | null>(null);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!authAPI.isAuthenticated()) {
        router.push("/auth/login");
        return;
      }

      // JWT token'dan kullanıcı bilgilerini al
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const userData = JSON.parse(jsonPayload);
          setUser({
            id: userData.user_id,
            name: userData.name || "Kullanıcı",
            email: userData.email,
            age: userData.age || 0,
            role: userData.role || 0
          });
        } catch (error) {
          console.error("Token decode error:", error);
          router.push("/auth/login");
        }
      }
    };

    const fetchMyProperties = async () => {
      try {
        const properties = await propertyAPI.getMyProperties();
        setMyProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchMyProperties();
  }, [router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRoleText = (role: number) => {
    switch (role) {
      case 1: return "Emlak Uzmanı";
      case 2: return "Premium Üye";
      default: return "Üye";
    }
  };

  const renderProperties = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b6b]"></div>
        </div>
      );
    }

    if (myProperties.length === 0) {
      return (
        <div className="text-center py-12">
          <i className="ri-home-line text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Henüz ilan yok</h3>
          <p className="text-gray-500 mb-6">İlk ilanınızı oluşturun ve kiralama sürecinizi başlatın.</p>
          <Link 
            href="/add-listing"
            className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-3 rounded-lg hover:shadow-md transition-all inline-flex items-center"
          >
            <i className="ri-add-line mr-2"></i>
            İlan Oluştur
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        {myProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 flex items-center justify-center">
                <i className="ri-home-line text-4xl text-[#ff6b6b]"></i>
              </div>
              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-black">
                  {property.amenities?.property_type || "Emlak"}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <i className="ri-edit-line text-black"></i>
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <i className="ri-delete-bin-line text-red-500"></i>
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-black">
                  {property.room_rates?.[0] 
                    ? formatPrice(property.room_rates[0].weekday_rate) + "/gece"
                    : "Fiyat belirtilmemiş"
                  }
                </h3>
                <div className="text-xs text-gray-500">Aktif</div>
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
                  {property.amenities?.number_bedrooms} oda • {property.amenities?.number_bathrooms} banyo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b6b]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header */}
        <div className="flex items-center lg:hidden mb-6">
          <Link href="/home" className="p-2 mr-4">
            <i className="ri-arrow-left-s-line text-xl text-black"></i>
          </Link>
          <h1 className="text-xl font-bold text-black">Profil</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* User Info - Left Column on Desktop */}
          <div className="lg:col-span-4 xl:col-span-3 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-xl font-bold text-black mb-1">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">{getRoleText(user.role)}</p>
                  <div className="flex justify-center lg:justify-start">
                    <span className="text-xs bg-gradient-to-r from-[#ff6b6b]/10 to-[#ff8e53]/10 text-[#ff8e53] px-3 py-1 rounded-full">
                      Doğrulanmış
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-black text-right">{user.email}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Yaş</p>
                  <p className="font-medium text-black">{user.age || "Belirtilmemiş"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">İlan Sayısı</p>
                  <p className="font-medium text-black">{myProperties.length}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Üyelik</p>
                  <p className="font-medium text-black">Aktif</p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <Link 
                  href="/add-listing"
                  className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center"
                >
                  <i className="ri-add-line mr-2"></i>
                  Yeni İlan Oluştur
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content - Right Column */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="flex border-b border-gray-100">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "listings"
                      ? "text-[#ff6b6b] border-b-2 border-[#ff6b6b]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("listings")}
                >
                  <i className="ri-home-line mr-2"></i>
                  İlanlarım ({myProperties.length})
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "favorites"
                      ? "text-[#ff6b6b] border-b-2 border-[#ff6b6b]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <i className="ri-heart-line mr-2"></i>
                  Favorilerim
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === "listings" ? (
                renderProperties()
              ) : (
                <div className="text-center py-12">
                  <i className="ri-heart-line text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Favori ilan yok</h3>
                  <p className="text-gray-500 mb-6">Beğendiğiniz ilanları favorilere ekleyin.</p>
                  <Link 
                    href="/search"
                    className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-3 rounded-lg hover:shadow-md transition-all inline-flex items-center"
                  >
                    <i className="ri-search-line mr-2"></i>
                    İlan Ara
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
