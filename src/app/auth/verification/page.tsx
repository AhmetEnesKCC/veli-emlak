"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Focus on first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to next input if current one is filled
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center">
          <Link href="/auth/register" className="p-2 mr-4">
            <i className="ri-arrow-left-s-line text-xl text-black"></i>
          </Link>
          <h1 className="text-xl font-bold text-black">Verification</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex-1">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-mail-send-line text-3xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-black mb-2">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-500">
            We've sent a verification code to
            <br />
            <span className="font-medium text-black">example@email.com</span>
          </p>
        </div>

        {/* Verification Code Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-black mb-4 text-center">
            Enter the 4-digit code
          </label>
          <div className="flex justify-between">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={verificationCode[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-[60px] h-[60px] text-center text-2xl font-bold bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#ff8e53]"
              />
            ))}
          </div>
        </div>

        {/* Resend Code */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
          <button className="text-sm font-medium text-black">
            Resend Code <span className="text-gray-400">(30s)</span>
          </button>
        </div>
      </div>

      {/* Verify Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <Link
          href="/auth/user-type"
          className="block w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium text-center"
        >
          Verify and Continue
        </Link>
      </div>
    </div>
  );
}
