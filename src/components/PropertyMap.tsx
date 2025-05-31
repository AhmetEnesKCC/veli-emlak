"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/lib/api';

// Leaflet icon sorununu çözmek için
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
  className?: string;
}

export default function PropertyMap({ properties, className = "" }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current || !properties.length) return;

    // Eğer harita zaten varsa temizle
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
    }

    // Türkiye'nin merkezinde haritayı başlat
    const map = L.map(mapRef.current).setView([39.925533, 32.866287], 6);

    // OpenStreetMap tile layer'ı ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom marker icon oluştur
    const customIcon = L.divIcon({
      html: `
        <div class="relative">
          <div class="w-8 h-8 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <i class="ri-home-4-line text-white text-sm"></i>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-[#ff6b6b]"></div>
        </div>
      `,
      className: 'custom-div-icon',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    });

    // Property'ler için marker'ları ekle
    properties.forEach((property) => {
      if (property.latitude && property.longitude) {
        const marker = L.marker([property.latitude, property.longitude], {
          icon: customIcon
        }).addTo(map);

        // Popup içeriği
        const popupContent = `
          <div class="max-w-xs">
            <div class="relative h-32 mb-3 rounded-lg overflow-hidden">
              ${property.image_url ? 
                `<img src="${property.image_url}" alt="${property.property_name}" class="w-full h-full object-cover" />` : 
                `<div class="w-full h-full bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 flex items-center justify-center">
                  <i class="ri-home-line text-[#ff6b6b] text-2xl"></i>
                </div>`
              }
            </div>
            <h3 class="font-semibold text-gray-900 mb-1 text-sm">${property.property_name}</h3>
            <p class="text-gray-600 text-xs mb-2">
              <i class="ri-map-pin-line mr-1"></i>
              ${property.city}, ${property.state}
            </p>
            ${property.room_rates && property.room_rates.length > 0 ? 
              `<p class="text-[#ff6b6b] font-semibold text-sm mb-3">
                ${property.room_rates[0].weekday_rate.toLocaleString('tr-TR')} TL/night
              </p>` : 
              `<p class="text-gray-500 text-sm mb-3">Price not specified</p>`
            }
            <button 
              onclick="window.propertyMapClick(${property.id})"
              class="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
            >
              View Details
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: 'custom-popup'
        });
      }
    });

    // Global function for popup button click
    (window as any).propertyMapClick = (propertyId: number) => {
      router.push(`/property-detail/${propertyId}`);
    };

    // Map referansını sakla
    leafletMapRef.current = map;

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      // Global function'ı temizle
      delete (window as any).propertyMapClick;
    };
  }, [properties, router]);

  if (!properties.length) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-xl ${className}`}>
        <div className="text-center p-8">
          <i className="ri-map-2-line text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-500">No properties to display on map</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={mapRef} className={`rounded-xl overflow-hidden shadow-sm ${className}`} />
      <style jsx global>{`
        .custom-div-icon {
          background: transparent;
          border: none;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 16px;
          line-height: 1.4;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </>
  );
} 