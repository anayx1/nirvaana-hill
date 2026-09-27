"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Format currency into Indian Rupees (Cr / L / K)
 */
function formatINR(amount) {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹${l.toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function RoiCalculatorModal({ isOpen, onClose }) {
  // Calculator state variables
  const [plotSize, setPlotSize] = useState(1250); // Sq Yards
  const [pricePerSqYd, setPricePerSqYd] = useState(7999); // ₹ per Sq Yard
  const [appreciationRate, setAppreciationRate] = useState(18); // % annual
  const [horizonYears, setHorizonYears] = useState(5); // Years

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Calculations
  const totalInvestment = plotSize * pricePerSqYd;
  const estimatedValue = Math.round(
    totalInvestment * Math.pow(1 + appreciationRate / 100, horizonYears)
  );
  // Estimated 8% annual managed forest/retreat rental yield
  const annualRentalYieldRate = 0.08;
  const cumulativeRental = Math.round(
    totalInvestment * annualRentalYieldRate * horizonYears
  );
  const totalReturn = estimatedValue + cumulativeRental - totalInvestment;
  const totalRoiPercent = Math.round((totalReturn / totalInvestment) * 100);

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `Hi Nirvaana Hills Team, I used the Forest Dividend ROI Calculator on your website for a ${plotSize.toLocaleString(
      "en-IN"
    )} sq yd plot (${horizonYears} year horizon, total estimated value ${formatINR(
      estimatedValue
    )}). I would like to discuss this with an investment advisor.`
  );
  const whatsappUrl = `https://wa.me/919589585050?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF9F5] border border-[#E5E8D8] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-5 sm:p-8 md:p-10 shadow-2xl z-10 select-none my-auto"
          >
            {/* Sticky Close Button */}
            <div className="sticky top-0 z-30 flex justify-end -mt-1 -mr-1 sm:-mt-3 sm:-mr-3 mb-2 sm:mb-0 pointer-events-none">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close calculator"
                className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E5E8D8] text-[#1F2922] hover:text-black flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Header / Eyebrow */}
            <div className="flex items-center gap-2 text-secondary mb-2">
              <span className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
                ROI CALCULATOR
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[22px] sm:text-[26px] md:text-[30px] leading-[1.2] mb-2 sm:mb-3">
              Calculate Your{" "}
              <span className="font-serif italic text-secondary">Forest Dividend</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[#424A3B] text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal">
              See exactly what your investment returns — from rental income to
              capital appreciation over your chosen horizon.
            </p>

            {/* Sliders Container (2 columns on tablet/desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 bg-white/70 border border-[#E5E8D8] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Slider 1: Plot Size */}
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-sans text-[12px] sm:text-[13px] font-normal text-[#1F2922] uppercase tracking-[0.06em]">
                    Plot Size (Sq Yards)
                  </label>
                  <span className="font-sans font-normal text-[#1F2922] text-[13px] sm:text-[14px] bg-[#E5E8D8]/80 px-2.5 py-0.5 rounded-md">
                    {plotSize.toLocaleString("en-IN")} sq yd
                  </span>
                </div>
                <input
                  type="range"
                  min={1250}
                  max={5000}
                  step={250}
                  value={plotSize}
                  onChange={(e) => setPlotSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E8D8] rounded-lg appearance-none cursor-pointer accent-[#72BF2B] focus:outline-none"
                />
                <div className="flex justify-between font-sans text-[11px] sm:text-[12px] text-[#757D6D] font-normal">
                  <span>1,250 sq yd</span>
                  <span>5,000 sq yd</span>
                </div>
              </div>

              {/* Slider 2: Price Per Sq Yard */}
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-sans text-[12px] sm:text-[13px] font-normal text-[#1F2922] uppercase tracking-[0.06em]">
                    Price Per Sq Yard (₹)
                  </label>
                  <span className="font-sans font-normal text-[#1F2922] text-[13px] sm:text-[14px] bg-[#E5E8D8]/80 px-2.5 py-0.5 rounded-md">
                    ₹{pricePerSqYd.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min={7999}
                  max={12000}
                  step={250}
                  value={pricePerSqYd}
                  onChange={(e) => setPricePerSqYd(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E8D8] rounded-lg appearance-none cursor-pointer accent-[#72BF2B] focus:outline-none"
                />
                <div className="flex justify-between font-sans text-[11px] sm:text-[12px] text-[#757D6D] font-normal">
                  <span>₹7,999</span>
                  <span>₹12,000</span>
                </div>
              </div>

              {/* Slider 3: Annual Appreciation */}
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-sans text-[12px] sm:text-[13px] font-normal text-[#1F2922] uppercase tracking-[0.06em]">
                    Annual Appreciation (%)
                  </label>
                  <span className="font-sans font-normal text-[#1F2922] text-[13px] sm:text-[14px] bg-[#E5E8D8]/80 px-2.5 py-0.5 rounded-md">
                    {appreciationRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={25}
                  step={1}
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E8D8] rounded-lg appearance-none cursor-pointer accent-[#72BF2B] focus:outline-none"
                />
                <div className="flex justify-between font-sans text-[11px] sm:text-[12px] text-[#757D6D] font-normal">
                  <span>10%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Slider 4: Investment Horizon */}
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-sans text-[12px] sm:text-[13px] font-normal text-[#1F2922] uppercase tracking-[0.06em]">
                    Investment Horizon (Years)
                  </label>
                  <span className="font-sans font-normal text-[#1F2922] text-[13px] sm:text-[14px] bg-[#E5E8D8]/80 px-2.5 py-0.5 rounded-md">
                    {horizonYears} years
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={1}
                  value={horizonYears}
                  onChange={(e) => setHorizonYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E8D8] rounded-lg appearance-none cursor-pointer accent-[#72BF2B] focus:outline-none"
                />
                <div className="flex justify-between font-sans text-[11px] sm:text-[12px] text-[#757D6D] font-normal">
                  <span>3 yr</span>
                  <span>10 yr</span>
                </div>
              </div>
            </div>

            {/* Results Grid (4 Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Card 1: Total Investment */}
              <div className="bg-white border border-[#E5E8D8] rounded-2xl p-3.5 sm:p-4 text-center shadow-xs flex flex-col justify-center">
                <span className="font-serif !font-normal text-[#1F2922] text-[20px] sm:text-[22px] md:text-[24px] leading-tight block mb-1">
                  {formatINR(totalInvestment)}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] text-[#6E7766] uppercase tracking-[0.06em] font-normal">
                  Total Investment
                </span>
              </div>

              {/* Card 2: Estimated Value */}
              <div className="bg-white border border-[#E5E8D8] rounded-2xl p-3.5 sm:p-4 text-center shadow-xs flex flex-col justify-center">
                <span className="font-serif !font-normal text-[#1F2922] text-[20px] sm:text-[22px] md:text-[24px] leading-tight block mb-1">
                  {formatINR(estimatedValue)}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] text-[#6E7766] uppercase tracking-[0.06em] font-normal">
                  Est. Value in {horizonYears} Yrs
                </span>
              </div>

              {/* Card 3: Cumulative Rental Income */}
              <div className="bg-white border border-[#E5E8D8] rounded-2xl p-3.5 sm:p-4 text-center shadow-xs flex flex-col justify-center">
                <span className="font-serif !font-normal text-[#1F2922] text-[20px] sm:text-[22px] md:text-[24px] leading-tight block mb-1">
                  {formatINR(cumulativeRental)}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] text-[#6E7766] uppercase tracking-[0.06em] font-normal">
                  Cumulative Yield
                </span>
              </div>

              {/* Card 4: Total ROI */}
              <div className="bg-white border border-[#E5E8D8] rounded-2xl p-3.5 sm:p-4 text-center shadow-xs flex flex-col justify-center">
                <span className="font-serif !font-normal text-secondary text-[20px] sm:text-[22px] md:text-[24px] leading-tight block mb-1">
                  {totalRoiPercent}%
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] text-[#6E7766] uppercase tracking-[0.06em] font-normal">
                  Total ROI
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="font-sans text-[11px] sm:text-[12px] text-[#757D6D] text-center leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 font-normal">
              *Calculations are indicative estimates based on your inputs.
              Actual returns depend on market conditions, development, and rental
              performance. This is not financial advice. Consult our advisor
              before investing.
            </p>

            {/* CTA Button (Discuss with advisor on WhatsApp) */}
            <div className="flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2.5 active:scale-95 uppercase tracking-[0.04em]"
              >
                <span>Discuss My ROI With An Advisor</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
