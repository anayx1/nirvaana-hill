"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export default function StoryBehindNirvaanaSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isBlurred, setIsBlurred] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    setIsBlurred(false);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseDown = () => {
    setIsDragging(true);
    setIsBlurred(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleContainerClick = (e) => {
    handleMove(e.clientX);
  };

  return (
    <section
      id="story-behind-nirvaana"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[860px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-7 md:space-y-8"
        >
          {/* ====================================================== */}
          {/* EYEBROW                                                */}
          {/* ====================================================== */}
          <div className="inline-flex items-center justify-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              THE STORY BEHIND NIRVAANA HILLS
            </span>
          </div>

          {/* ====================================================== */}
          {/* HEADLINE                                               */}
          {/* ====================================================== */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.18] tracking-[-0.01em]">
            Sometimes The Best Projects Begin By Observing What People Truly Need.
          </h2>

          {/* ====================================================== */}
          {/* NARRATIVE PARAGRAPHS                                   */}
          {/* ====================================================== */}
          <div className="flex flex-col space-y-5 max-w-[740px] mx-auto">
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
            >
              For over 2+ decades, SEAD Realty has helped Delhi families buy
              farmhouses and agricultural land. Over time, something quietly
              changed - people stopped searching for land alone. Post-pandemic,
              families wanted open spaces, healthier lifestyles, cleaner air,
              and a genuine escape from the pace of city life. At the same time,
              meaningful land near Gurgaon was becoming harder to find.
            </p>
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
            >
              Then we discovered a pristine 200-acre stretch surrounded by
              hills and forest - and saw the chance to build something
              fundamentally different. That vision became Nirvaana Hills: a
              farmland community where premium living, nature, wellness, and
              ownership come together.
            </p>
          </div>

          {/* ====================================================== */}
          {/* BEFORE / AFTER COMPARISON SLIDER                       */}
          {/* ====================================================== */}
          <div className="w-full max-w-[780px] pt-4 sm:pt-6">
            <div
              ref={containerRef}
              onClick={handleContainerClick}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsBlurred(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3.2] sm:aspect-[16/11] md:aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] cursor-ew-resize select-none ring-1 ring-black/5"
            >
              {/* ---------------- AFTER IMAGE (BACKGROUND) ---------------- */}
              <div
                className={`absolute inset-0 w-full h-full transition-[filter] duration-700 ease-out ${
                  isBlurred ? "blur-[7px] scale-[1.03]" : "blur-0 scale-100"
                }`}
              >
                <Image
                  src="/about-seed/after.webp"
                  alt="After: Nirvaana Hills Developed Community"
                  fill
                  unoptimized
                  priority
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 860px) 100vw, 780px"
                />
              </div>

              {/* ---------------- BEFORE IMAGE (CLIPPED FOREGROUND) ---------------- */}
              <div
                className="absolute inset-0 h-full overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className={`relative h-full transition-[filter] duration-700 ease-out ${
                    isBlurred ? "blur-[7px] scale-[1.03]" : "blur-0 scale-100"
                  }`}
                  style={{
                    width: containerRef.current
                      ? `${containerRef.current.offsetWidth}px`
                      : "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src="/about-seed/before.webp"
                    alt="Before: Raw Pristine Land"
                    fill
                    unoptimized
                    priority
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 860px) 100vw, 780px"
                  />
                </div>
              </div>

              {/* ---------------- BADGES ---------------- */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 pointer-events-none z-10">
                <span className="bg-[#1F2922]/85 backdrop-blur-xs text-white text-[10px] sm:text-[12px] font-bold tracking-widest px-3 sm:px-4 py-1.5 rounded-lg shadow-sm">
                  BEFORE
                </span>
              </div>

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 pointer-events-none z-10">
                <span className="bg-[#1F2922]/85 backdrop-blur-xs text-white text-[10px] sm:text-[12px] font-bold tracking-widest px-3 sm:px-4 py-1.5 rounded-lg shadow-sm">
                  AFTER
                </span>
              </div>

              {/* ---------------- SLIDER DIVIDER LINE & HANDLE ---------------- */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Vertical Line */}
                <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]" />

                {/* Draggable Circular Knob */}
                <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF9F5] shadow-2xl flex items-center justify-center gap-0.5 border border-white/80 ring-2 ring-black/10 transition-transform hover:scale-105 active:scale-95 pointer-events-auto">
                  <ChevronLeft className="w-4 h-4 text-[#1F2922]" strokeWidth={2.5} />
                  <ChevronRight className="w-4 h-4 text-[#1F2922]" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
