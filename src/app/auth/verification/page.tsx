"use client";

import Link from "next/link";
import { useState } from "react";
import { authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      setLoading(false);
      return;
    }

    if (!formData.age || parseInt(formData.age) < 18) {
      setError("Yaş 18 veya üzeri olmalıdır");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
      });

      if (response.status === 201) {
        // Redirect to login page
        router.push('/auth/login');
      } else {
        setError(response.message || 'Kayıt başarısız');
      }
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu');
      console.error('Signup error:', err);
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
          <h1 className="text-xl font-bold text-black">Hesap Oluştur</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-4 flex-1">
        <p className="text-sm text-gray-500 mb-8">
          Hesabınızı oluşturmak için bilgilerinizi girin.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">
              Ad Soyad
            </label>
            <div className="relative">
              <i className="ri-user-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type="text"
                name="name"
                placeholder="Adınızı ve soyadınızı girin"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-3 px-4 pl-12 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">
              E-posta Adresi
            </label>
            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type="email"
                name="email"
                placeholder="E-posta adresinizi girin"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 pl-12 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Age */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">
              Yaş
            </label>
            <div className="relative">
              <i className="ri-calendar-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type="number"
                name="age"
                placeholder="Yaşınızı girin"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
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
                name="password"
                placeholder="Şifrenizi girin"
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-2">
              Şifre Tekrar
            </label>
            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-3.5 text-gray-400"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Şifrenizi tekrar girin"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 px-4 pl-12 bg-gray-100 rounded-xl text-black border border-transparent focus:outline-none focus:border-[#ff8e53]"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                disabled={loading}
              >
                <i
                  className={`${
                    showConfirmPassword ? "ri-eye-line" : "ri-eye-off-line"
                  } text-gray-400`}
                ></i>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white py-4 rounded-xl font-medium mb-6 disabled:opacity-50"
          >
            {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-gray-500">Zaten hesabınız var mı? </span>
          <Link href="/auth/login" className="text-sm font-bold text-black">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
