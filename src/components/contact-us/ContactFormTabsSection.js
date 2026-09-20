"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Info, Check, ChevronDown } from "lucide-react";

export const INTEREST_OPTIONS = [
  "Farmland Ownership & Plot Selection",
  "Pricing & Flexible Payment Plans",
  "Phase 2 Expansion Details",
  "Farming, Organic Produce & Wellness",
  "Site Visit & Weekend Experience",
  "Clubhouse & Amenities Membership",
  "Long-Term Investment & Returns",
  "General Enquiry",
];

export default function ContactFormTabsSection() {
  const [activeTab, setActiveTab] = useState("enquiry"); // "enquiry" | "channel-partner"

  // Form states for Tab 1 (Enquiry)
  const [enquiryData, setEnquiryData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    city: "",
    interestedIn: "",
    message: "",
  });

  // Form states for Tab 2 (Channel Partner)
  const [partnerData, setPartnerData] = useState({
    fullName: "",
    companyName: "",
    mobileNumber: "",
    emailAddress: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryData.mobileNumber.trim()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiryData.fullName,
          email: enquiryData.emailAddress,
          phone: enquiryData.mobileNumber,
          requirement: enquiryData.interestedIn || "Enquiry Form Submission",
          message: `City: ${enquiryData.city} | Message: ${enquiryData.message}`,
          source: "contact-page-enquiry",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setEnquiryData({
          fullName: "",
          mobileNumber: "",
          emailAddress: "",
          city: "",
          interestedIn: "",
          message: "",
        });
      } else {
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    if (!partnerData.mobileNumber.trim()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: partnerData.fullName,
          email: partnerData.emailAddress,
          phone: partnerData.mobileNumber,
          requirement: "Channel Partner Program Application",
          message: `Company: ${partnerData.companyName} | City: ${partnerData.city}`,
          source: "contact-page-channel-partner",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setPartnerData({
          fullName: "",
          companyName: "",
          mobileNumber: "",
          emailAddress: "",
          city: "",
        });
      } else {
        setErrorMessage(data.error || "Failed to submit application. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enquiry-form"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[1280px] px-4 sm:px-6">

        {/* ====================================================== */}
        {/* TOP TABS NAVIGATION                                    */}
        {/* ====================================================== */}
        <div className="flex items-center gap-6 sm:gap-10 border-b border-[#E5E8D8] pb-4 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => {
              setActiveTab("enquiry");
              setSubmitted(false);
            }}
            className={`font-sans text-[15px] sm:text-[17px] font-medium pb-1.5 transition-all relative cursor-pointer ${
              activeTab === "enquiry"
                ? "text-[#1F2922]"
                : "text-[#5C6051]/70 hover:text-[#1F2922]"
            }`}
          >
            Enquiry Form
            {activeTab === "enquiry" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute left-0 right-0 -bottom-[17px] h-[3px] bg-primary rounded-full"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("channel-partner");
              setSubmitted(false);
            }}
            className={`font-sans text-[15px] sm:text-[17px] font-medium pb-1.5 transition-all relative cursor-pointer ${
              activeTab === "channel-partner"
                ? "text-[#1F2922]"
                : "text-[#5C6051]/70 hover:text-[#1F2922]"
            }`}
          >
            Channel Partner Program Form
            {activeTab === "channel-partner" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute left-0 right-0 -bottom-[17px] h-[3px] bg-primary rounded-full"
              />
            )}
          </button>
        </div>

        {/* ====================================================== */}
        {/* TAB 1: ENQUIRY FORM CONTENT                            */}
        {/* ====================================================== */}
        {activeTab === "enquiry" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            
            {/* Left: Form Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[#B3482B]">
                <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
                  ENQUIRY FORM
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[34px] sm:text-[40px] md:text-[46px] leading-[1.15] tracking-[-0.01em]">
                Tell Us How We Can Help.
              </h2>

              {/* Description */}
              <p
                style={{ color: "#5C6051" }}
                className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.65] font-normal"
              >
                Have questions about ownership, pricing, availability,
                development progress, farming opportunities, weekend living, or
                long-term investment potential? Choose what you&apos;d like to
                explore and our team will get back to you.
              </p>

              {/* Success Message */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#E4EAD9] border border-primary rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center space-y-3 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-[#1F2922]">
                    <Check className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-serif text-[22px] sm:text-[24px] text-[#1F2922]">
                    Enquiry Received
                  </h3>
                  <p className="font-sans text-[#5C6051] text-[15px] max-w-md">
                    Thank you for reaching out. Our team will get in touch with
                    you during working hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-medium underline text-[14px] pt-2 cursor-pointer"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[14px] text-[14px]">
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={enquiryData.fullName}
                        onChange={(e) =>
                          setEnquiryData({ ...enquiryData, fullName: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={enquiryData.mobileNumber}
                        onChange={(e) =>
                          setEnquiryData({ ...enquiryData, mobileNumber: e.target.value })
                        }
                        placeholder="+91 00000 00000"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={enquiryData.emailAddress}
                        onChange={(e) =>
                          setEnquiryData({ ...enquiryData, emailAddress: e.target.value })
                        }
                        placeholder="your@email.com"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        City
                      </label>
                      <input
                        type="text"
                        value={enquiryData.city}
                        onChange={(e) =>
                          setEnquiryData({ ...enquiryData, city: e.target.value })
                        }
                        placeholder="Your city"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: Interested In Dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                      I&apos;m Interested In
                    </label>
                    <div className="relative">
                      <select
                        value={enquiryData.interestedIn}
                        onChange={(e) =>
                          setEnquiryData({ ...enquiryData, interestedIn: e.target.value })
                        }
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] appearance-none outline-none transition-all cursor-pointer shadow-xs pr-10"
                      >
                        <option value="">Select an option</option>
                        {INTEREST_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C6051] pointer-events-none" />
                    </div>
                  </div>

                  {/* Row 4: Additional Message */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                      Additional Message
                    </label>
                    <textarea
                      rows={4}
                      value={enquiryData.message}
                      onChange={(e) =>
                        setEnquiryData({ ...enquiryData, message: e.target.value })
                      }
                      placeholder="Tell us anything specific you'd like to know."
                      className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs resize-y min-h-[110px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] py-4 rounded-full transition-all duration-300 shadow-xs active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center"
                    >
                      {loading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </div>

                  {/* Info Note */}
                  <div className="flex items-center gap-2 pt-1 text-[#5C6051]">
                    <Info className="w-4 h-4 shrink-0" />
                    <span className="font-sans text-[13px] sm:text-[14px]">
                      Our team typically responds during working hours.
                    </span>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Right: Tab 1 Hero/Enquiry Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 w-full pt-4 lg:pt-0"
            >
              <div className="relative w-full aspect-[3/4] xs:aspect-[4/5] sm:aspect-[4/4.8] lg:aspect-[4/5.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl bg-[#2A3426] ring-1 ring-black/5">
                <Image
                  src="/contact-us/enquiry-form.webp"
                  alt="Documentation, Land Consultation and Ownership"
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* ====================================================== */}
        {/* TAB 2: CHANNEL PARTNER PROGRAM FORM                    */}
        {/* ====================================================== */}
        {activeTab === "channel-partner" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left: Form Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[#B3482B]">
                <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
                  CHANNEL PARTNER PROGRAM
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[34px] sm:text-[40px] md:text-[46px] leading-[1.15] tracking-[-0.01em]">
                Grow With Nirvaana Hills.
              </h2>

              {/* Description */}
              <p
                style={{ color: "#5C6051" }}
                className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.65] font-normal"
              >
                We work with consultants, brokers and channel partners who
                believe in thoughtful ownership and meaningful client
                experiences.
              </p>

              {/* Success Message */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#E4EAD9] border border-primary rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center space-y-3 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-[#1F2922]">
                    <Check className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-serif text-[22px] sm:text-[24px] text-[#1F2922]">
                    Application Received
                  </h3>
                  <p className="font-sans text-[#5C6051] text-[15px] max-w-md">
                    Thank you for applying to our Channel Partner Program. Our
                    institutional desk will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-medium underline text-[14px] pt-2 cursor-pointer"
                  >
                    Submit another application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[14px] text-[14px]">
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerData.fullName}
                        onChange={(e) =>
                          setPartnerData({ ...partnerData, fullName: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerData.companyName}
                        onChange={(e) =>
                          setPartnerData({ ...partnerData, companyName: e.target.value })
                        }
                        placeholder="Your company"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mobile Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={partnerData.mobileNumber}
                        onChange={(e) =>
                          setPartnerData({ ...partnerData, mobileNumber: e.target.value })
                        }
                        placeholder="+91 00000 00000"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={partnerData.emailAddress}
                        onChange={(e) =>
                          setPartnerData({ ...partnerData, emailAddress: e.target.value })
                        }
                        placeholder="your@email.com"
                        className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: City */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-sans text-[12px] sm:text-[13px] font-medium text-[#1F2922]">
                      City
                    </label>
                    <input
                      type="text"
                      value={partnerData.city}
                      onChange={(e) =>
                        setPartnerData({ ...partnerData, city: e.target.value })
                      }
                      placeholder="Your city"
                      className="w-full bg-[#E5E8D8] border border-transparent focus:border-primary focus:bg-[#FAF9F5] rounded-[16px] sm:rounded-[18px] px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-[14px] sm:text-[15px] text-[#1F2922] placeholder:text-[#5C6051]/60 outline-none transition-all shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] py-4 rounded-full transition-all duration-300 shadow-xs active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center"
                    >
                      {loading ? "Submitting Application..." : "Become A Channel Partner"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Right: Tab 2 Hero/Partner Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 w-full pt-4 lg:pt-0"
            >
              <div className="relative w-full aspect-[3/4] xs:aspect-[4/5] sm:aspect-[4/4.8] lg:aspect-[4/5.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl bg-[#2A3426] ring-1 ring-black/5">
                <Image
                  src="/contact-us/tab-2-form.jpg"
                  alt="Nirvaana Hills Channel Partner and Corporate Advisory"
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
