import React from "react";

const MARQUEE_ITEMS = [
  "PHASE 2 LIMITED OWNERSHIP NOW OPEN",
  "₹1.29 CR. STARTING PRICE INDICATIVE",
];

export default function NirvaanaMarqueeStrip() {
  // Repeat content to create continuous smooth scrolling marquee
  const repeatedContent = Array(8).fill(MARQUEE_ITEMS).flat();

  return (
    <div
      className="w-full bg-[#62735B] text-white overflow-hidden py-3 sm:py-3.5 select-none font-sans"
      aria-label="Phase 2 limited ownership announcement"
    >
      <div className="flex w-max animate-marquee font-sans items-center">
        {repeatedContent.map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap px-4 sm:px-6">
              {text}
            </span>
            <span className="text-[14px] text-white/70 select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
