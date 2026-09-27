"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

const CDN_VIDEO_URL =
  "https://res.cloudinary.com/spqd54wy/video/upload/v1790420996/experince-the-journey.mp4";
const LOCAL_VIDEO_URL = "/locations/video/experince-the-journey.mp4";

export default function ExperienceTheJourneySection() {
  const videoRef = useRef(null);

  // Graceful fallback to local video if CDN stream fails
  const handleVideoError = () => {
    if (videoRef.current && videoRef.current.currentSrc !== LOCAL_VIDEO_URL) {
      videoRef.current.src = LOCAL_VIDEO_URL;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      id="experience-the-journey"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      {/* Prefetch & Preload CDN Video */}
      <link rel="preload" href={CDN_VIDEO_URL} as="video" type="video/mp4" />
      <link rel="prefetch" href={CDN_VIDEO_URL} as="video" type="video/mp4" />

      <div className="container max-w-[900px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* SECTION HEADER & NARRATIVE                             */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 mb-8 sm:mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              EXPERIENCE THE JOURNEY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.12] tracking-[-0.01em]">
            Before You Arrive, Experience The Journey.
          </h2>

          {/* Body Paragraph 1 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-3xl font-normal pt-1"
          >
            Imagine leaving home on a Saturday morning. A comfortable drive. Open highways. A day outdoors with family - time to walk, talk, eat, explore, and slow down. An evening return without feeling rushed.
          </p>

          {/* Body Paragraph 2 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-3xl font-normal"
          >
            A meaningful weekend destination should fit naturally into real life. That&apos;s exactly how the Nirvaana Hills location has been planned.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* VIDEO DISPLAY CONTAINER (Vertical Portrait)            */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[540px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E8D8] bg-[#1F241C] aspect-[314/382]"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
            className="w-full h-full object-cover"
          >
            <source src={CDN_VIDEO_URL} type="video/mp4" />
            <source src={LOCAL_VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* ====================================================== */}
        {/* BOTTOM CTA BUTTON                                      */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <a
            href="#site-visit"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
          >
            Watch Route Walkthrough
          </a>
        </motion.div>

      </div>
    </section>
  );
}
