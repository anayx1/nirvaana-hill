"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

const VIDEO_SRC = "/locations/video/experince-the-journey.mp4";

export default function ExperienceTheJourneySection() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile browsers strictly require muted property set on DOM element
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy/low-power mode
        });
      }
    };

    playVideo();

    const handleLoadedData = () => {
      setVideoLoaded(true);
      playVideo();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", playVideo);

    // Fallback trigger on first user touch/interaction for mobile low-power modes
    const handleUserInteraction = () => {
      playVideo();
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });
    window.addEventListener("scroll", handleUserInteraction, { passive: true });

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", playVideo);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  return (
    <section
      id="experience-the-journey"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
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
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: videoLoaded ? 1 : 0.85 }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
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
            href="https://www.youtube.com/watch?v=HwMWaD_C-As"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
          >
            Watch Route Walkthrough
          </a>
        </motion.div>

      </div>
    </section>
  );
}
