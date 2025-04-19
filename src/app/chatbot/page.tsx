"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  sender: "bot" | "user";
  isLoading?: boolean;
  options?: string[];
  timestamp?: string;
}

export default function ChatbotPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hello! I'm EmlakBot, your AI real estate assistant. How can I help you today with finding, buying, selling, or renting properties?",
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

  const handleSendMessage = () => {
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
    setInputValue("");

    // Add loading message
    setMessages((prev) => [
      ...prev,
      { text: "...", sender: "bot", isLoading: true },
    ]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      // For demo purposes, we'll simulate a response based on content
      let botResponse = {
        text: "",
        sender: "bot" as const,
        options: [] as string[],
        timestamp: currentTime,
      };

      // Example response for a property search in Kadıköy
      if (
        inputValue.toLowerCase().includes("kadıköy") ||
        inputValue.toLowerCase().includes("kadikoy")
      ) {
        botResponse = {
          text: "Great choice! Kadıköy is a vibrant district with excellent amenities. I found 14 properties matching your criteria:\n\n• 8 apartments between 1.8M-2.2M TL\n• Average size: 95m²\n• Most have balconies and are close to public transport\n\nWould you like me to show you the details?",
          sender: "bot",
          options: ["Show more properties", "Filter by price", "Show map view"],
          timestamp: currentTime,
        };
      } else {
        botResponse = {
          text: "I'd be happy to help you with that! Could you provide me with more details about the location, budget, and property type you're looking for?",
          sender: "bot",
          options: ["Search by location", "Set budget", "View popular areas"],
          timestamp: currentTime,
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen bg-white">
      {/* Sidebar - only visible on large screens */}
      <div className="hidden lg:block lg:col-span-1 bg-[#F7F9FC] border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-black mb-6">
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] bg-clip-text text-transparent">
              EmlakBul
            </span>
          </h2>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Recent Conversations
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#ECF0F6] rounded-lg cursor-pointer">
                <p className="font-medium text-black">
                  Property Search in Kadıköy
                </p>
                <p className="text-xs text-gray-500 mt-1">Today, 11:30 AM</p>
              </div>
              <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                <p className="font-medium text-black">Investment Properties</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday, 3:15 PM</p>
              </div>
              <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                <p className="font-medium text-black">Rental Inquiry</p>
                <p className="text-xs text-gray-500 mt-1">Apr 15, 10:22 AM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Suggested Topics
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded">
                💰 Property investment advice
              </button>
              <button className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded">
                🏙️ Best neighborhoods in Istanbul
              </button>
              <button className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded">
                📊 Current market trends
              </button>
              <button className="w-full text-left p-2 text-sm text-black hover:bg-gray-100 rounded">
                📑 Legal requirements for buyers
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
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main chat area */}
      <div className="lg:col-span-3 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pt-12 lg:pt-6 pb-4 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/home" className="mr-5 lg:hidden">
              <i className="ri-arrow-left-line text-black text-xl"></i>
            </Link>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-home-smile-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">EmlakBot</h1>
                <p className="text-gray-500 text-sm">AI Property Assistant</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <i className="ri-search-line text-xl"></i>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <i className="ri-delete-bin-line text-xl"></i>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <i className="ri-more-2-fill text-xl"></i>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F7F9FC] lg:border-l lg:border-gray-200">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={`max-w-[85%] lg:max-w-[70%] rounded-2xl p-4 ${
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
                    <p className="whitespace-pre-wrap">{message.text}</p>
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
          ))}

          {/* Option buttons */}
          {messages.length > 0 && messages[messages.length - 1].options && (
            <div className="flex flex-wrap gap-2 mt-2">
              {messages[messages.length - 1].options?.map((option, index) => (
                <button
                  key={index}
                  className="bg-white text-black border border-gray-200 hover:bg-gray-50 rounded-full px-4 py-2 text-sm transition-colors shadow-sm"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center bg-[#F7F9FC] border border-gray-200 rounded-full pr-3">
            <button className="p-3 text-gray-500 hover:text-gray-700">
              <i className="ri-image-line text-xl"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent flex-1 text-black border-none focus:outline-none px-2"
            />
            <button
              onClick={handleSendMessage}
              className={`p-3 rounded-full ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53]"
                  : "bg-gray-300"
              } transition-colors`}
              disabled={!inputValue.trim()}
            >
              <i className="ri-send-plane-fill text-white"></i>
            </button>
            <button className="p-3 text-gray-500 hover:text-gray-700 ml-1">
              <i className="ri-mic-line text-xl"></i>
            </button>
          </div>

          <div className="text-xs text-center text-gray-500 mt-3 hidden lg:block">
            EmlakBot can help with property searching, recommendations, and real
            estate inquiries. <br />
            Responses may not always be accurate. Please verify important
            information.
          </div>
        </div>
      </div>
    </div>
  );
}
