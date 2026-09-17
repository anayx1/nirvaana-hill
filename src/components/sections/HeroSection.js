"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const CDN_VIDEO_URL =
  "https://res.cloudinary.com/spqd54wy/video/upload/v1789568819/drone.mp4_HERO_-10_09_2026_18_18.mp4";
const LOCAL_VIDEO_URL = "/homepage/hero.mp4";

export default function HeroSection() {
  const videoRef = useRef(null);

  // Graceful fallback to local video if CDN stream fails
  const handleVideoError = () => {
    if (videoRef.current && videoRef.current.currentSrc !== LOCAL_VIDEO_URL) {
      videoRef.current.src = LOCAL_VIDEO_URL;
      videoRef.current.play().catch(() => { });
    }
  };

  return (
    <section className="w-full bg-[#FAF9F5] pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-24 overflow-hidden">
      <div className="container">
        {/* Responsive Grid: 1 Column on Mobile / Tablet, 2 Columns on Desktop (lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-24">
          {/* Main Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center"
          >
            <h1 className="font-serif !font-normal text-[#313116] uppercase tracking-[0.06em] leading-[1.04] !text-[52px] md:!text-[72px] lg:!text-[84px]">
              NIRVAANA
              <br />
              HILLS
            </h1>
          </motion.div>

          {/* Media / Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[480px] md:max-w-[580px] lg:max-w-none mx-auto lg:mx-0"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/3] rounded-xl overflow-hidden isolate">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={handleVideoError}
                className="w-full h-full object-cover scale-[1.03]"
              >
                <source src={CDN_VIDEO_URL} type="video/mp4" />
                <source src={LOCAL_VIDEO_URL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Static Caption Below Video */}
            <p className="text-[#313116] font-normal text-[13px] md:text-[18px] pt-3 text-center">
              Mahendragarh, Haryana • 200 Acres • Phase 2 Now Open
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
