"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please provide both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid username or password.");
        setIsLoading(false);
        return;
      }

      // Successful login -> Navigate to Admin Dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login request error:", err);
      setError("A connection error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] text-[#1F2922] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#AFEB63]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#E5E8D8]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-[#E5E8D8] rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#AFEB63]/30 border border-[#AFEB63] flex items-center justify-center mb-4 text-[#1F2922]">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-2 text-[#B3482B] text-[12px] font-semibold tracking-[0.14em] uppercase mb-1">
              <span>ADMIN SECURE PORTAL</span>
            </div>
            
            <h1 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#1F2922] tracking-tight">
              Nirvaana Hills
            </h1>
            <p className="text-[13.5px] text-[#5C6051] font-sans mt-1">
              Sign in to manage leads, blogs &amp; visual media
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-[13px]">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                  <User className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5C6051]/60 hover:text-[#1F2922] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Default credentials tip for convenience */}
            <div className="pt-1 pb-2">
              <p className="text-[11.5px] text-[#5C6051]/80 leading-relaxed">
                Default: <span className="text-[#1F2922] font-semibold font-mono">admin</span> / <span className="text-[#1F2922] font-semibold font-mono">nirvaana@admin2026</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] active:scale-[0.99] text-[#1F2922] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Back link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-[12.5px] text-[#5C6051] hover:text-[#1F2922] font-medium transition-colors"
            >
              &larr; Back to Nirvaana Hills Website
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
