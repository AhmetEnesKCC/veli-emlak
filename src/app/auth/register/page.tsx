"use client";

import Link from "next/link";

export default function RegisterWelcomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80')",
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-black/10 to-black/70 flex flex-col px-6 py-12">
        {/* Logo and Skip */}
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">EmlakBul</div>
          <Link href="/home" className="text-white text-sm">
            Geç
          </Link>
        </div>

        {/* Main Content */}
        <div className="mt-auto mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Hayalinizdeki Evi Bulun
          </h1>
          <p className="text-white text-sm opacity-90 mb-8">
            Türkiye genelinde binlerce satılık ve kiralık ev keşfedin.
            Mükemmel evinizi bulmak için topluluğumuza katılın.
          </p>

          {/* Registration Buttons */}
          <Link
            href="/auth/verification"
            className="block w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium mb-4 text-center"
          >
            Hesap Oluştur
          </Link>

          {/* Social Login */}
          <div className="flex justify-between space-x-3 mb-6">
            <button className="flex-1 bg-white py-3 rounded-xl font-medium text-black flex items-center justify-center hover:shadow-md transition-shadow">
              <i className="ri-google-fill mr-2 text-lg"></i>
              Google
            </button>
            <button className="flex-1 bg-white py-3 rounded-xl font-medium text-black flex items-center justify-center hover:shadow-md transition-shadow">
              <i className="ri-facebook-fill mr-2 text-lg"></i>
              Facebook
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-white text-sm">
              Zaten hesabınız var mı?{" "}
            </span>
            <Link href="/auth/login" className="text-white text-sm font-bold">
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
