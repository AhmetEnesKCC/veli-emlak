"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { chatbotAPI, Property } from "@/lib/api";

interface Message {
  text: string;
  sender: "bot" | "user";
  isLoading?: boolean;
  options?: string[];
  properties?: Property[];
  timestamp?: string;
}

// Property Card Component
function PropertyCard({ property }: { property: Property }) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    return price.toLocaleString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link href={`/property-detail/${property.id}`}>
        <div className="space-y-2">
          <h3 className="font-semibold text-black text-sm line-clamp-1">
            {property.property_name}
          </h3>
          <p className="text-xs text-gray-600">
            {property.street}, {property.city}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-bold text-sm">
              {formatPrice(property.room_rates?.[0]?.weekday_rate || 0)} TL
            </span>
            <span className="text-xs text-gray-500">
              {property.amenities?.square_footage} m²
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>{property.amenities?.number_bedrooms} oda</span>
            <span className="mx-2">•</span>
            <span>{property.amenities?.number_bathrooms} banyo</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ChatbotPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Merhaba! Ben EmlakBot, AI emlak asistanınızım. Emlak alım, satım veya kiralama konularında size nasıl yardımcı olabilirim?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user" as const,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue("");

    // Add loading message
    setMessages((prev) => [
      ...prev,
      { text: "Düşünüyorum...", sender: "bot", isLoading: true },
    ]);

    try {
      // Call real API
      const response = await chatbotAPI.query({ message: messageToSend });
      
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      // Add bot response
      const botResponse: Message = {
        text: response.response,
        sender: "bot",
        options: response.options,
        properties: response.properties,
        timestamp: currentTime,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Remove loading message and show error
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));
      
      const errorResponse: Message = {
        text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        sender: "bot",
        timestamp: currentTime,
      };

      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar - responsive */}
      <div className="lg:w-80 bg-[#F7F9FC] border-r border-gray-200 hidden lg:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-black mb-6">
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
              EmlakBul
            </span>
          </h2>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Son Konuşmalar
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#ECF0F6] rounded-lg cursor-pointer">
                <p className="font-medium text-black text-sm">
                  Kadıköy'de Emlak Arama
                </p>
                <p className="text-xs text-gray-500 mt-1">Bugün, 11:30</p>
              </div>
              <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                <p className="font-medium text-black text-sm">Yatırım Amaçlı</p>
                <p className="text-xs text-gray-500 mt-1">Dün, 15:15</p>
              </div>
              <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                <p className="font-medium text-black text-sm">Kiralık Sorgusu</p>
                <p className="text-xs text-gray-500 mt-1">15 Nis, 10:22</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Önerilen Konular
            </h3>
            <div className="space-y-2">
              <button 
                className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded transition"
                onClick={() => setInputValue("İstanbul'da ucuz daire var mı?")}
              >
                💰 İstanbul'da uygun fiyatlı daireler
              </button>
              <button 
                className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded transition"
                onClick={() => setInputValue("Ankara'da villa arıyorum")}
              >
                🏙️ Ankara'da lüks villalar
              </button>
              <button 
                className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded transition"
                onClick={() => setInputValue("Kadıköy'de kiralık daire")}
              >
                📊 Kadıköy kiralık daireler
              </button>
              <button 
                className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded transition"
                onClick={() => setInputValue("2 milyon TL'ye ne alabilirim?")}
              >
                📑 Bütçeme uygun seçenekler
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6">
          <Link
            href="/home"
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header - responsive */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/home" className="mr-4 lg:hidden">
              <i className="ri-arrow-left-line text-black text-xl"></i>
            </Link>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-robot-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-black">EmlakBot</h1>
                <p className="text-gray-500 text-xs lg:text-sm">AI Emlak Asistanı</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <i className="ri-search-line text-xl"></i>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <i className="ri-delete-bin-line text-xl"></i>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <i className="ri-more-2-fill text-xl"></i>
            </button>
          </div>
        </div>

        {/* Chat Messages - responsive */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6 bg-[#F7F9FC]">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={
                  message.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={`max-w-[90%] lg:max-w-[70%] rounded-2xl p-3 lg:p-4 ${
                    message.sender === "bot"
                      ? "bg-white text-black border border-gray-200 shadow-sm"
                      : "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white"
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap text-sm lg:text-base">{message.text}</p>
                      {message.timestamp && (
                        <div
                          className={`text-xs mt-2 ${
                            message.sender === "bot"
                              ? "text-gray-500"
                              : "text-white/80"
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Properties Grid */}
              {message.properties && message.properties.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {message.properties.slice(0, 5).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {/* Option buttons */}
              {message.options && message.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className="bg-white text-black border border-gray-200 hover:bg-gray-50 rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm transition-colors shadow-sm"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - responsive */}
        <div className="bg-white p-4 lg:p-6 border-t border-gray-200">
          <div className="flex items-center bg-[#F7F9FC] border border-gray-200 rounded-full">
            <button className="p-3 text-gray-500 hover:text-gray-700 transition">
              <i className="ri-image-line text-lg lg:text-xl"></i>
            </button>
            <textarea
              placeholder="Mesajınızı yazın... (Örn: Kadıköy'de 2M TL'ye daire arıyorum)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-transparent flex-1 text-black border-none focus:outline-none px-2 py-3 resize-none text-sm lg:text-base"
              rows={1}
              style={{ minHeight: '20px', maxHeight: '100px' }}
            />
            <button
              onClick={handleSendMessage}
              className={`p-3 rounded-full transition-colors ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] hover:shadow-md"
                  : "bg-gray-300"
              }`}
              disabled={!inputValue.trim()}
            >
              <i className="ri-send-plane-fill text-white"></i>
            </button>
            <button className="p-3 text-gray-500 hover:text-gray-700 ml-1 transition">
              <i className="ri-mic-line text-lg lg:text-xl"></i>
            </button>
          </div>

          <div className="text-xs text-center text-gray-500 mt-3">
            EmlakBot emlak arama, öneriler ve emlak sorularında yardımcı olabilir.
            <br className="hidden lg:block" />
            Yanıtlar her zaman doğru olmayabilir. Önemli bilgileri doğrulayın.
          </div>
        </div>
      </div>
    </div>
  );
}
