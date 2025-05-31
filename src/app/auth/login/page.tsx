"use client";

import Link from "next/link";
import { useState } from "react";
import { authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({ email, password });
      
      if (response.status === 200 && response.data?.access_token) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.access_token);
        
        // Redirect to home
        router.push('/home');
      } else {
        setError(response.message || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Giriş yaparken bir hata oluştu');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
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
          <h1 className="text-xl font-bold text-black">Giriş Yap</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-4 flex-1">
        <p className="text-sm text-gray-500 mb-8">
          Hoş geldiniz! Lütfen hesabınıza giriş yapın.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">
              E-posta Adresi
            </label>
            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 pl-12 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">
              Şifre
            </label>
            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 pl-12 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                disabled={loading}
              >
                <i
                  className={`${
                    showPassword ? "ri-eye-line" : "ri-eye-off-line"
                  } text-gray-400`}
                ></i>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 mr-2 accent-[#ff8e53]"
                disabled={loading}
              />
              <label htmlFor="remember" className="text-sm text-black">
                Beni hatırla
              </label>
            </div>
            <Link href="#" className="text-sm font-medium text-black">
              Şifremi Unuttum?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium mb-6 disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">veya şununla devam et</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-between space-x-3 mb-8">
          <button className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-medium text-black flex items-center justify-center hover:shadow-sm transition-shadow">
            <i className="ri-google-fill mr-2 text-lg"></i>
            Google
          </button>
          <button className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-medium text-black flex items-center justify-center hover:shadow-sm transition-shadow">
            <i className="ri-facebook-fill mr-2 text-lg"></i>
            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-sm text-gray-500">Hesabınız yok mu? </span>
          <Link href="/auth/register" className="text-sm font-bold text-black">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
