"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

// ========================================================
// STORY TESTIMONIALS (Instagram Story Video Data)
// ========================================================
export const STORY_TESTIMONIALS = [
  {
    id: "story-1",
    name: "Amit Sharma",
    location: "Gurugram",
    quote: '"A beautiful blend of nature and thoughtful planning."',
    video: "/homepage/testimonials/testimonial-1.mp4",
  },
  {
    id: "story-2",
    name: "Sandeep Verma",
    location: "Noida",
    quote: '"Professional experience from start to finish."',
    video: "/homepage/testimonials/testimonial-2.mp4",
  },
  {
    id: "story-3",
    name: "Karan Malhotra",
    location: "Faridabad",
    quote: '"A project that truly stands out for its vision."',
    video: "/homepage/testimonials/testimonial-3.mp4",
  },
  {
    id: "story-4",
    name: "Vikram Singhania",
    location: "Delhi NCR",
    quote: '"The most transparent and well-managed farmland community."',
    video: "/homepage/testimonials/testimonial-4.mp4",
  },
];

// ========================================================
// WRITTEN TESTIMONIALS (Review Cards)
// ========================================================
export const WRITTEN_TESTIMONIALS = [
  {
    id: "review-1",
    text: '"The vision behind Nirvaana Hills is both ambitious and grounded in careful planning. Its focus on a nature-led lifestyle creates a differentiated opportunity for clients exploring premium land ownership."',
    author: "Param Malhotra",
    organization: "CAPITAL KEY PARTNERS",
  },
  {
    id: "review-2",
    text: '"Nirvaana Hills by Sead Reality is very good farm Land community. The location and approach is very excellent. Very Good option for the weekend gateway home."',
    author: "",
    organization: "TULIP PRIME PROP",
  },
  {
    id: "review-3",
    text: '"What stands out about Nirvaana Hills is the team\'s commitment to clarity, responsiveness and long-term relationships. It is a distinctive proposition for clients seeking land, nature and a more considered lifestyle."',
    author: "Dinesh Chaudhary",
    organization: "GOOD ONE PROPERTIES",
  },
  {
    id: "review-4",
    text: '"Our experience with Nirvaana Hills has been excellent. The project is thoughtfully planned, and the location has great potential. Working with Mr. Puneet Ji and Mr. Kashish Ji has been a pleasure—they have been professional, supportive, and transparent throughout the process."',
    author: "Mr.Kaif Khan",
    organization: "SCALE UP REALTY",
  },
  {
    id: "review-5",
    text: '"Away from Hustle bustle of fast paced city daily life, coming here at foot hill location was a real welcome break... a must have Farm option at this place where one chill, rejuvenate and get ready for next challenge of life.."',
    author: "Asheesh and Vijender",
    organization: "VALUE DEALS",
  },
];

export default function TestimonialsSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const totalStories = STORY_TESTIMONIALS.length;

  const currentStory = STORY_TESTIMONIALS[activeStoryIndex];
  const currentReview = WRITTEN_TESTIMONIALS[activeReviewIndex];

  // Play / Pause handling on active video
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, activeStoryIndex]);

  // Video time tracking for progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  // Move to next story when video finishes
  const handleVideoEnded = () => {
    setProgress(0);
    setActiveStoryIndex((prev) => (prev + 1) % totalStories);
  };

  const handlePrevStory = (e) => {
    e?.stopPropagation();
    setProgress(0);
    setActiveStoryIndex((prev) => (prev === 0 ? totalStories - 1 : prev - 1));
  };

  const handleNextStory = (e) => {
    e?.stopPropagation();
    setProgress(0);
    setActiveStoryIndex((prev) => (prev + 1) % totalStories);
  };

  const togglePlayPause = (e) => {
    e?.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-[#FAF9F5] py-14 sm:py-16 md:py-24 lg:py-32 overflow-hidden select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-secondary text-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 3l-8 7h16l-8-7z" />
              <path d="M5 14c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
              <path d="M5 19c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
              TESTIMONIALS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] tracking-[-0.01em]">
            Stories That Begin With Belief.
          </h2>

          {/* Subheading */}
          <p className="text-[#313116] max-w-2xl text-center">
            Hear from families, investors, and partners who experienced
            Nirvaana Hills firsthand.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* MAIN TESTIMONIAL LAYOUT (Mobile Stack / Desktop 2-Col)   */}
        {/* ======================================================== */}
        <div className="max-w-[500px] lg:max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 lg:items-center">
          {/* ====================================================== */}
          {/* INSTAGRAM STORY VIDEO PLAYER (Left / Top)              */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div
              onClick={togglePlayPause}
              className="relative w-full aspect-[9/14.5] sm:aspect-[9/14] max-w-[440px] mx-auto rounded-3xl overflow-hidden shadow-xl isolate bg-[#1F2518] cursor-pointer group"
            >
              {/* Active Video Player */}
              <video
                key={currentStory.id}
                ref={videoRef}
                src={currentStory.video}
                playsInline
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />

              {/* Story Gradient Overlays (Top for progress bar, Bottom for text) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

              {/* Instagram Story Progress Bars (Top) */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1.5">
                  {STORY_TESTIMONIALS.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-1 rounded-full bg-white/35 overflow-hidden"
                    >
                      <div
                        className="h-full bg-white transition-all ease-linear"
                        style={{
                          width:
                            idx < activeStoryIndex
                              ? "100%"
                              : idx === activeStoryIndex
                              ? `${progress}%`
                              : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Sound Mute / Unmute Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer shrink-0"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-white" />
                  )}
                </button>

                {/* Pause / Play Button */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause story" : "Play story"}
                  className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white stroke-none" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white stroke-none ml-0.5" />
                  )}
                </button>
              </div>

              {/* Navigation Chevrons */}
              <button
                type="button"
                onClick={handlePrevStory}
                aria-label="Previous story"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextStory}
                aria-label="Next story"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Story Bottom Content */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20 text-white pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-serif !font-normal text-white text-[24px] sm:text-[28px] md:text-[30px] leading-tight mb-1.5">
                      {currentStory.name}, {currentStory.location}
                    </h3>
                    <p className="font-sans text-white/90 text-[14px] sm:text-[15px] font-normal leading-snug">
                      {currentStory.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* WRITTEN TESTIMONIAL CARD (Right / Bottom)              */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-center w-full"
          >
            <div className="w-full relative rounded-[22px] sm:rounded-[26px] bg-[#E5E8D8] p-6 sm:p-8 md:p-9 shadow-xs min-h-[260px] sm:min-h-[250px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full space-y-6"
                >
                  <p className="font-sans text-[#3A4032] text-[15px] sm:text-[16px] md:text-[17px] font-normal leading-[1.65] sm:leading-[1.7]">
                    {currentReview.text}
                  </p>

                  <div className="pt-2">
                    {currentReview.author ? (
                      <h4 className="font-sans font-medium text-[#23281E] text-[15px] sm:text-[16px] leading-tight mb-1">
                        {currentReview.author}
                      </h4>
                    ) : null}
                    <span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#707862] tracking-[0.06em] uppercase block">
                      {currentReview.organization}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2.5 pt-6">
              {WRITTEN_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveReviewIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeReviewIndex
                      ? "bg-[#9EE837] scale-110"
                      : "bg-[#D5E4BC] hover:bg-[#BCCE9E]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
