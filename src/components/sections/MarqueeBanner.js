import React from "react";

const MARQUEE_ITEMS = [
  "Official Website Of Nirvaana Hills",
  "200 Acres Of Farm Community",
  "Phase 2 Now Open",
];

export default function MarqueeBanner() {
  // Repeat content to ensure continuous loop across wide screens
  const repeatedContent = Array(6).fill(MARQUEE_ITEMS).flat();

  return (
    <div
      className="w-full text-[#313116] bg-[#FAF9F5] overflow-hidden py-2 select-none font-sans"
      aria-label="Official announcements banner"
    >
      <div className="flex w-max animate-marquee font-sans">
        {repeatedContent.map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="!text-[14px] font-medium tracking-[0.04em] whitespace-nowrap px-3.5">
              {text}
            </span>
            <span className="text-[12px] text-[#7A8456] select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
