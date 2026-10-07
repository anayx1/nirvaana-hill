"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

function InstagramIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ========================================================
// FALLBACK SOCIAL SLIDES DATA
// ========================================================
const BASE_SOCIAL_ITEMS = [
  { id: "office-1", src: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience", isVideo: false },
  { id: "woman-1", src: "/homepage/sec10-woman.avif", alt: "Community Member", isVideo: false },
  { id: "woman-2", src: "/homepage/sec10-woman.avif", alt: "Community Member", isVideo: false },
  { id: "office-2", src: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience", isVideo: false },
  { id: "woman-3", src: "/homepage/sec10-woman.avif", alt: "Community Member", isVideo: false },
  { id: "woman-4", src: "/homepage/sec10-woman.avif", alt: "Community Member", isVideo: false },
];

export default function SocialHubSection({ initialPosts = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(1);
  const animationFrameId = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  // Use provided initialPosts from server if available and non-empty, otherwise fallback
  const rawPosts =
    Array.isArray(initialPosts) && initialPosts.length > 0
      ? initialPosts
          .map((p, idx) => ({
            id: p.id || `post-${idx}`,
            src: p.src || p.imageUrl || "",
            alt: p.alt || "Nirvaana Hills Instagram Post",
            url: p.url || (p.shortCode ? `https://www.instagram.com/p/${p.shortCode}/` : ""),
            videoUrl: p.videoUrl || "",
            isVideo: Boolean(p.isVideo || (p.url && p.url.includes("/reel/")) || p.videoUrl),
            shortCode: p.shortCode || (p.url ? p.url.match(/\/(?:p|reel)\/([^/?#]+)/)?.[1] : "") || "",
            caption: p.caption || "",
          }))
          .filter((p) => Boolean(p.src))
      : BASE_SOCIAL_ITEMS;

  const validItems = rawPosts.length > 0 ? rawPosts : BASE_SOCIAL_ITEMS;

  // Duplicate list to guarantee a seamless, wide infinite track
  const multiplier = Math.max(2, Math.ceil(24 / validItems.length));
  const slideItems = Array.from({ length: multiplier }).flatMap(() => validItems);

  // Handle keyboard Escape to close popup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };
    if (selectedPost) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost]);

  // Reset iframe loader state on post change
  useEffect(() => {
    if (selectedPost) {
      setIframeLoaded(false);
    }
  }, [selectedPost]);

  // Infinite marquee animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Smooth deceleration/acceleration between normal (1.0) and slowed (0.22) speed
      const targetSpeed = isHovered || selectedPost ? 0.0 : isHovered ? 0.22 : 1.0;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;

      // Base speed in pixels per second
      const baseSpeedPx = 65;
      offsetRef.current += baseSpeedPx * currentSpeedRef.current * delta;

      if (contentRef.current) {
        // Half of the total duplicated content width for seamless wrapping
        const halfWidth = contentRef.current.scrollWidth / 2;
        if (halfWidth > 0 && offsetRef.current >= halfWidth) {
          offsetRef.current -= halfWidth;
        }

        contentRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovered, selectedPost]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = false;
    dragStartPosRef.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0,
    };
  };

  const handlePointerMove = (e) => {
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const currentY = e.clientY || e.touches?.[0]?.clientY || 0;
    const diffX = Math.abs(currentX - dragStartPosRef.current.x);
    const diffY = Math.abs(currentY - dragStartPosRef.current.y);
    if (diffX > 6 || diffY > 6) {
      isDraggingRef.current = true;
    }
  };

  const handleCardClick = (item) => {
    if (isDraggingRef.current) return;
    setSelectedPost(item);
  };

  return (
    <section
      id="social-hub"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden select-none relative"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-secondary text-center">
            <FarmIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
              OUR SOCIAL HUB
            </span>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* SEAMLESS AUTOPLAY SLIDER WITH HOVER SLOWDOWN TRACK       */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        className="relative w-full overflow-hidden cursor-pointer"
      >
        <div
          ref={contentRef}
          className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform py-2"
        >
          {slideItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleCardClick(item)}
              className="group relative w-[210px] h-[280px] xs:w-[240px] xs:h-[320px] sm:w-[270px] sm:h-[360px] md:w-[300px] md:h-[400px] lg:w-[330px] lg:h-[440px] shrink-0 rounded-[24px] sm:rounded-[30px] md:rounded-[34px] overflow-hidden bg-[#242A1F] shadow-md transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt || "Nirvaana Hills Instagram Post"}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 330px"
              />

              {/* Play Icon Pill for Reels / Videos */}
              {item.isVideo && (
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5 text-white" />
                </div>
              )}

              {/* Subtle hover dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 drop-shadow-md">
                  {item.isVideo ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" /> Watch Reel
                    </>
                  ) : (
                    <>
                      <InstagramIcon className="w-3.5 h-3.5" /> View Post
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* REEL / POST INTERACTIVE POPUP MODAL (LIGHT / WHITE THEME)*/}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card (White Theme, Strict No Scroll) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[420px] bg-white border border-[#EAE7DF] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F0EEE6] bg-[#FAF9F5]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-[15px] font-bold text-[#171717] tracking-tight leading-tight">
                      @nirvaanahills
                    </h4>
                    <p className="font-sans text-[11px] text-secondary font-medium tracking-wider uppercase">
                      {selectedPost.isVideo ? "Instagram Reel" : "Instagram Post"}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 rounded-full bg-[#EAE7DF]/70 hover:bg-[#EAE7DF] active:scale-95 flex items-center justify-center text-[#171717] transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Media Body (Strict Sizing, Zero Inner Scroll) */}
              <div className="relative w-full bg-[#11160F] flex items-center justify-center overflow-hidden h-[380px] sm:h-[420px]">
                {selectedPost.shortCode ? (
                  <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF9F5] text-[#5C5850] gap-2.5 z-0">
                        <div className="w-7 h-7 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                        <span className="font-sans text-xs tracking-wider uppercase text-[#5C5850]">Loading Reel...</span>
                      </div>
                    )}
                    <iframe
                      src={`https://www.instagram.com/reel/${selectedPost.shortCode}/embed/`}
                      onLoad={() => setIframeLoaded(true)}
                      className={`w-full h-full border-0 transition-opacity duration-300 ${
                        iframeLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ overflow: "hidden" }}
                      scrolling="no"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : selectedPost.videoUrl ? (
                  <video
                    src={selectedPost.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedPost.src}
                      alt={selectedPost.alt || "Nirvaana Hills Post"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer (Clean Light Layout) */}
              <div className="p-4 bg-white border-t border-[#F0EEE6] flex flex-col gap-2.5">
                {selectedPost.caption && (
                  <p className="font-sans text-xs text-[#5C5850] line-clamp-2 leading-relaxed">
                    {selectedPost.caption}
                  </p>
                )}

                {selectedPost.url && (
                  <a
                    href={selectedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-[#171717] hover:bg-black text-white font-sans font-medium text-xs sm:text-[13px] flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-primary" />
                    <span>Watch on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
