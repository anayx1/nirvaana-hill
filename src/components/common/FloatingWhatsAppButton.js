"use client";

import React from "react";
import { usePathname } from "next/navigation";

const WHATSAPP_URL =
  "https://wa.me/919589585050?text=Hi%20Nirvaana%20Hills%2C%20I%20would%20like%20to%20know%20more%20about%20the%20property";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed bottom-15 right-5 z-90"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nirvaana Hills on WhatsApp"
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[18px] bg-primary hover:bg-[#9de04e] text-[#1F2922] shadow-lg shadow-black/15 hover:shadow-xl transition-colors duration-200 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#1F2922]"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>
    </aside>
  );
}
