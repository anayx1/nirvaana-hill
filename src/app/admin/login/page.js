"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  // View modes: "login" | "forgot_request" | "forgot_verify"
  const [viewMode, setViewMode] = useState("login");

  // Form states
  const [email, setEmail] = useState("nirvaanahills@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password states
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Status & Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================================================================
  // HANDLER: LOGIN
  // =========================================================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Authentication successful! Redirecting...");
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 400);
    } catch (err) {
      console.error("Login request error:", err);
      setError("A connection error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // =========================================================================
  // HANDLER: REQUEST FORGOT PASSWORD OTP
  // =========================================================================
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid administrator email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request_otp",
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Could not process password reset request.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("A 6-digit verification code has been sent to your email.");
      setIsLoading(false);
      setViewMode("forgot_verify");
    } catch (err) {
      console.error("Request OTP error:", err);
      setError("Failed to send verification code. Please try again.");
      setIsLoading(false);
    }
  };

  // =========================================================================
  // HANDLER: VERIFY CODE & RESET PASSWORD
  // =========================================================================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!otp.trim() || otp.trim().length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_and_reset",
          email: email.trim(),
          otp: otp.trim(),
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to reset password. Please check your OTP.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Password reset successfully! Please sign in with your new password.");
      setPassword(newPassword);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      setViewMode("login");
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Failed to reset password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] text-[#1F2922] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden select-none py-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#AFEB63]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#E5E8D8]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-[460px] relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-[#E5E8D8] rounded-3xl p-7 sm:p-10 shadow-2xl shadow-black/5">

          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#AFEB63]/30 border border-[#AFEB63] flex items-center justify-center mb-3.5 text-[#1F2922] shadow-xs">
              {viewMode === "login" ? (
                <ShieldCheck className="w-7 h-7" />
              ) : (
                <KeyRound className="w-7 h-7" />
              )}
            </div>

            <div className="inline-flex items-center gap-2 text-[#B3482B] text-[12px] font-semibold tracking-[0.14em] uppercase mb-1">
              <span>ADMIN SECURE PORTAL</span>
            </div>

            <h1 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#1F2922] tracking-tight">
              Nirvaana Hills
            </h1>

            <p className="text-[13.5px] text-[#5C6051] font-sans mt-1">
              {viewMode === "login" && "Sign in to manage leads, blogs & visual media"}
              {viewMode === "forgot_request" && "Enter your email to receive a password reset code"}
              {viewMode === "forgot_verify" && "Verify code and set your new password"}
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-[13px] animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-700 text-[13px] animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
              <span className="leading-snug">{successMessage}</span>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 1: LOGIN FORM                                                */}
          {/* ================================================================= */}
          {viewMode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nirvaanahills@gmail.com"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setSuccessMessage("");
                      setViewMode("forgot_request");
                    }}
                    className="text-[12px] font-medium text-[#B3482B] hover:text-[#8f361f] hover:underline transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] active:scale-[0.99] text-[#1F2922] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60 cursor-pointer mt-2"
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
          )}

          {/* ================================================================= */}
          {/* VIEW 2: FORGOT PASSWORD - STEP 1 (REQUEST OTP)                    */}
          {/* ================================================================= */}
          {viewMode === "forgot_request" && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nirvaanahills@gmail.com"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] active:scale-[0.99] text-[#1F2922] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMessage("");
                  setViewMode("login");
                }}
                className="w-full py-2.5 text-center text-[13px] text-[#5C6051] hover:text-[#1F2922] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* VIEW 3: FORGOT PASSWORD - STEP 2 (VERIFY CODE & NEW PASSWORD)     */}
          {/* ================================================================= */}
          {viewMode === "forgot_verify" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider">
                    6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={isLoading}
                    className="text-[11.5px] font-medium text-[#5C6051] hover:text-[#1F2922] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend Code</span>
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  required
                  className="w-full text-center tracking-[0.4em] font-mono text-[22px] py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full pl-10 pr-11 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5C6051]/60 hover:text-[#1F2922] cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6051]/60">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:bg-white focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[14px] outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] active:scale-[0.99] text-[#1F2922] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Update Password &amp; Sign In</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMessage("");
                  setViewMode("login");
                }}
                className="w-full py-2 text-center text-[13px] text-[#5C6051] hover:text-[#1F2922] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
            </form>
          )}

          {/* Footer Back link */}
          <div className="mt-8 text-center pt-2 border-t border-[#E5E8D8]/70">
            <a
              href="/"
              className="text-[12.5px] text-[#5C6051] hover:text-[#1F2922] font-medium transition-colors inline-flex items-center gap-1"
            >
              &larr; Back to Nirvaana Hills Website
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
