"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Wallet, Camera, FileText, ChevronDown, Check, Info } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";
import { getContactContext } from "@/lib/contact-context";
import FormSpamTrap from "@/components/ui/FormSpamTrap";

const BROCHURE_FEATURES = [
  {
    icon: Compass,
    text: "Full Phase 2 Master Plan with Plot Numbers",
  },
  {
    icon: Wallet,
    text: "Pricing, Payment Plans & ROI Projections",
  },
  {
    icon: Camera,
    text: "High-Resolution Site Photography",
  },
  {
    icon: FileText,
    text: "Legal, Title & RERA Information",
  },
];

const CITIES = [
  "Select your city",
  "Delhi",
  "Gurugram",
  "Noida",
  "Faridabad",
  "Mumbai",
  "Banglore",
  "Hyderabad",
  "Pune",
  "Other",
];

const BUDGET_RANGES = [
  "Select budget range",
  "₹1-2 Crore",
  "₹2-3 Crore",
  "₹3-5 Crore",
  "₹5 Crore+",
  "Still Exploring",
];

const PURPOSES = [
  "Select purpose",
  "Second Home / Weekend Retreat",
  "Long-term Investment",
  "Rental Income",
  "Sustainable Living",
  "All of the Above",
];

export default function BrochureSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "Select your city",
    budget: "Select budget range",
    purpose: "Select purpose",
    agreed: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactContext = getContactContext(e.currentTarget);
    if (!formData.mobile.trim()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactContext,
          name: formData.fullName,
          phone: formData.mobile,
          email: formData.email,
          city: formData.city !== "Select your city" ? formData.city : "",
          budget: formData.budget !== "Select budget range" ? formData.budget : "",
          purpose: formData.purpose !== "Select purpose" ? formData.purpose : "",
          requirement: "Phase 2 Brochure Download Request",
          source: "brochure-section",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          city: "Select your city",
          budget: "Select budget range",
          purpose: "Select purpose",
          agreed: false,
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="brochure"
      className="w-full bg-[#FAF9F5] py-14 sm:py-16 md:py-5 overflow-hidden select-none"
    >
      <div className="container max-w-[1300px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* DESKTOP 2-COL / MOBILE STACKED LAYOUT                    */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-start">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative, Feature List & Imagery         */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8"
          >
            {/* Header / Eyebrow */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 text-secondary">
                <FarmIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                  DOWNLOAD PHASE 2 BROCHURE
                </span>
              </div>

              <h2 className="font-serif !font-normal text-[#1F2922] tracking-[-0.01em]">
                Your Complete Phase 2 Guide
              </h2>

              <p className="text-[#313116] leading-relaxed">
                Everything you need to evaluate Phase 2—from master plans and
                pricing to legal details and investment insights.
              </p>
            </div>

            {/* Checklist Features */}
            <div className="flex flex-col space-y-3.5 sm:space-y-4 pt-1">
              {BROCHURE_FEATURES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5E8D8] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 text-[#2E3527]" />
                    </div>
                    <span className="font-sans text-[#2A3123] text-[13.5px] sm:text-[14.5px] font-normal leading-snug">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Brochure Mockup Image (Desktop view display on left column) */}
            <div className="hidden lg:flex flex-col space-y-3 mt-4">
              <div className="relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-lg bg-[#242A1F] ring-1 ring-black/5">
                <Image
                  src="/homepage/brocher.avif"
                  alt="Nirvaana Hills Phase 2 Brochure"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(min-width: 1024px) 500px, 100vw"
                />
              </div>
              <div className="flex items-center gap-2.5 text-[#353D2C] pt-1">
                <Info className="w-4 h-4 text-[#353D2C] shrink-0" />
                <span className="font-sans text-[13px] sm:text-[14px] font-normal">
                  Your information is 100% secure. No spam, ever.
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Form & Instant Download CTA              */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-4">
              <p className="text-[#313116] font-medium text-[15px] sm:text-[16px]">
                Complete the form to receive your brochure instantly.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-5">
                {/* 2-Column Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                  {/* Full Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      Full Name <span className="text-[#B3482B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#E5E8D8] text-[#20261A] placeholder-[#79806C] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all"
                    />
                  </div>

                  {/* Mobile Number (WhatsApp) */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      Mobile Number (WhatsApp) <span className="text-[#B3482B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      className="w-full bg-[#E5E8D8] text-[#20261A] placeholder-[#79806C] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#E5E8D8] text-[#20261A] placeholder-[#79806C] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all"
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      City
                    </label>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full appearance-none bg-[#E5E8D8] text-[#20261A] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 pr-11 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all cursor-pointer"
                      >
                        {CITIES.map((c, i) => (
                          <option key={i} value={c} disabled={i === 0}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E5643] pointer-events-none" />
                    </div>
                  </div>

                  {/* Investment Budget */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      Investment Budget
                    </label>
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full appearance-none bg-[#E5E8D8] text-[#20261A] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 pr-11 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all cursor-pointer"
                      >
                        {BUDGET_RANGES.map((b, i) => (
                          <option key={i} value={b} disabled={i === 0}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E5643] pointer-events-none" />
                    </div>
                  </div>

                  {/* Purpose of Investment */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[13px] sm:text-[14px] text-[#2F3528] font-normal">
                      Purpose of Investment
                    </label>
                    <div className="relative">
                      <select
                        value={formData.purpose}
                        onChange={(e) =>
                          setFormData({ ...formData, purpose: e.target.value })
                        }
                        className="w-full appearance-none bg-[#E5E8D8] text-[#20261A] text-[15px] sm:text-[16px] px-5 py-3.5 sm:py-4 pr-11 rounded-[18px] sm:rounded-[20px] focus:outline-none focus:ring-1 focus:ring-[#79806C]/50 transition-all cursor-pointer"
                      >
                        {PURPOSES.map((p, i) => (
                          <option key={i} value={p} disabled={i === 0}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E5643] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-2 group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={(e) =>
                        setFormData({ ...formData, agreed: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${formData.agreed
                        ? "bg-[#AFEB63] border-[#7DBF2D]"
                        : "bg-white border-black/30 group-hover:border-black/50"
                        }`}
                    >
                      {formData.agreed && (
                        <Check className="w-3 h-3 stroke-[3] text-[#1E2519]" />
                      )}
                    </div>
                  </div>
                  <span className="font-sans text-[12px] sm:text-[13px] text-[#3E4534] leading-relaxed">
                    I agree to receive the Phase 2 brochure and property updates
                    from Nirvaana Hills via WhatsApp and email. I can unsubscribe
                    at any time.
                  </span>
                </label>

                {errorMessage && (
                  <p className="text-[#B3482B] text-[13px] sm:text-[14px] font-medium pt-1">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] py-3 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 cursor-pointer shadow-xs active:scale-[0.99] mt-2 flex items-center justify-center disabled:opacity-60"
                >
                  {isLoading
                    ? "Submitting Request..."
                    : isSubmitted
                      ? "Brochure Sent Successfully!"
                      : "Download Brochure Now"}
                </button>
                <FormSpamTrap />
                </form>
            </div>

            {/* Brochure Mockup Image & Trust Note (Mobile view display below form) */}
            <div className="flex lg:hidden flex-col space-y-3 mt-6">
              <div className="relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-lg bg-[#242A1F] ring-1 ring-black/5">
                <Image
                  src="/homepage/brocher.avif"
                  alt="Nirvaana Hills Phase 2 Brochure"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
              <div className="flex items-center gap-2.5 text-[#353D2C] pt-1">
                <Info className="w-4 h-4 text-[#353D2C] shrink-0" />
                <span className="font-sans text-[13px] sm:text-[14px] font-normal">
                  Your information is 100% secure. No spam, ever.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
