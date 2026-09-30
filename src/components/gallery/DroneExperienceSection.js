"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

const YOUTUBE_URL = "https://youtu.be/oEEhBYWmNrU?si=o9jdABNYPEz_wQW8";
const VIDEO_SRC = "/gallery/drone.mp4";

export default function DroneExperienceSection() {
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;

    // Mobile browsers strictly require muted property set on DOM element
    if (bg) {
      bg.muted = true;
      bg.defaultMuted = true;
      bg.playsInline = true;
    }
    if (fg) {
      fg.muted = true;
      fg.defaultMuted = true;
      fg.playsInline = true;
    }

    const playVideo = (videoEl) => {
      if (!videoEl) return;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy/low-power mode
        });
      }
    };

    const startPlayback = () => {
      playVideo(bg);
      playVideo(fg);
    };

    startPlayback();

    const handleLoadedData = () => {
      setVideoLoaded(true);
      startPlayback();
    };

    if (fg) {
      fg.addEventListener("loadeddata", handleLoadedData);
      fg.addEventListener("canplay", startPlayback);
    }
    if (bg) {
      bg.addEventListener("canplay", startPlayback);
    }

    // Fallback trigger on first user touch/interaction for mobile low-power modes
    const handleUserInteraction = () => {
      startPlayback();
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });
    window.addEventListener("scroll", handleUserInteraction, { passive: true });

    return () => {
      if (fg) {
        fg.removeEventListener("loadeddata", handleLoadedData);
        fg.removeEventListener("canplay", startPlayback);
      }
      if (bg) {
        bg.removeEventListener("canplay", startPlayback);
      }
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  return (
    <section
      id="drone-experience"
      className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-6 select-none bg-[#141A12]"
    >
      {/* ======================================================== */}
      {/* BACKGROUND VIDEO (Full-bleed, Loop, Muted)              */}
      {/* ======================================================== */}
      <video
        ref={bgVideoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-700"
        style={{ opacity: videoLoaded ? 1 : 0.8 }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Atmospheric Dark & Blur Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] pointer-events-none" />

      {/* ======================================================== */}
      {/* CENTERED FLOATING GLASS CARD                            */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 p-5 sm:p-7 shadow-2xl flex flex-col space-y-5 text-white text-center"
      >
        {/* Inner Video Window with YouTube Link Badge */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-white/15 shadow-inner group">
          <video
            ref={fgVideoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        {/* Card Content */}
        <div className="flex flex-col items-center space-y-3 px-1 sm:px-2">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-white/90">
            <FarmIcon className="w-4 h-4 shrink-0 text-white" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              DRONE EXPERIENCE
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white text-[22px] xs:text-[25px] sm:text-[28px] md:text-[32px] leading-[1.18] tracking-[-0.01em]">
            See Nirvaana From Above.
          </h2>

          {/* Description */}
          <p className="font-sans text-white/90 text-[12.5px] sm:text-[13.5px] leading-[1.65] font-normal">
            200 acres surrounded by 9,600 acres of forest. Original drone footage and 360° aerial views capture the true scale - rolling hills, open skies, and protected forest stretching to the horizon.
          </p>

          {/* Watch on YouTube Primary CTA */}
          <div className="pt-2">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#9de04e] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 group"
            >
              <svg
                className="w-4 h-4 text-[#1F2922] fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Watch On YouTube</span>
              <ArrowUpRight className="w-4 h-4 text-[#1F2922] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
