"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Global helper to trigger the visit confirmation modal from anywhere
 */
export function openVisitModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-visit-modal"));
  }
}

export default function VisitConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleBackToHome = useCallback(() => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push("/");
    }
  }, [pathname, router]);

  // Listen for custom event dispatched on successful enquiry form submission
  useEffect(() => {
    const onOpenEvent = () => handleOpen();
    window.addEventListener("open-visit-modal", onOpenEvent);

    return () => {
      window.removeEventListener("open-visit-modal", onOpenEvent);
    };
  }, [handleOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
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
  }, [isOpen, handleClose]);

  // Don't render inside admin portal
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 select-none"
        >
          {/* ======================================================== */}
          {/* BACKDROP WITH DARKENED SATELLITE MAP VISUAL (/pop-up/bg.webp) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 overflow-hidden bg-black/75 backdrop-blur-xs cursor-pointer"
          >
            <Image
              src="/pop-up/bg.webp"
              alt="Site map background"
              fill
              priority
              unoptimized
              className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 pointer-events-none" />
          </motion.div>

          {/* ======================================================== */}
          {/* CENTER CONFIRMATION CARD                                 */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[430px] sm:max-w-[460px] bg-[#E8E9DC] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 shadow-2xl border border-white/20 text-center flex flex-col items-center"
          >
            {/* Close (X) Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#4A5443] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Brand Logo */}
            <div className="mb-5 sm:mb-6 flex items-center justify-center">
              <div className="relative w-[150px] sm:w-[175px] h-[36px] sm:h-[42px]">
                <Image
                  src="/logo-new.png"
                  alt="Nirvaana Hills"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[20px] sm:text-[24px] leading-[1.2] tracking-[0.02em] uppercase mb-4">
              YOUR VISIT IS CONFIRMED
            </h2>

            {/* Description Paragraph */}
            <p className="font-sans text-[#4A5443] text-[13px] sm:text-[14.5px] leading-[1.6] max-w-[340px] font-normal">
              Come walk the land, breathe the air, explore the surroundings and
              experience what Nirvaana Hills feels like for yourself.
            </p>

            {/* Italic Tagline */}
            <p className="font-serif italic text-[#4A5443] text-[14px] sm:text-[15px] font-normal mt-4 mb-7">
              Bring your family. Take your time.
            </p>

            {/* Back To Home Button */}
            <button
              type="button"
              onClick={handleBackToHome}
              className="w-full sm:w-auto min-w-[180px] py-2.5 sm:py-3 px-6 sm:px-8 rounded-[14px] md:rounded-[16px] bg-[#AFEB63] hover:bg-[#9de04e] active:scale-[0.98] text-[#1F2922] font-normal text-[12px] md:text-[16px] transition-all duration-200 shadow-sm cursor-pointer"
            >
              Back To Home
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
