"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function FaqClarifySection() {
  return (
    <section
      id="questions-welcome"
      className="relative w-full bg-[#FAF9F5] py-14 md:py-20 lg:py-28 overflow-hidden select-none border-t border-[#ECEEE4]/60"
    >
      {/* ====================================================== */}
      {/* BOTANICAL FLOWER BACKGROUND IMAGE (RIGHT SIDE)         */}
      {/* ====================================================== */}
      <div className="absolute right-0 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 w-[220px] md:w-[380px] lg:w-[460px] h-[90%] md:h-[95%] pointer-events-none select-none z-0">
        <Image
          src="/nirvaana-hills/flower-bg.avif"
          alt="Nirvaana Hills Flora"
          fill
          unoptimized
          priority
          className="object-contain object-right opacity-40"
        />
      </div>

      <div className="container max-w-[1200px] px-4 md:px-6 relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start space-y-4 md:space-y-5 max-w-xl lg:max-w-2xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
              QUESTIONS ARE ALWAYS WELCOME
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            Questions Are Part Of The Journey.
          </h2>

          {/* Narrative Body */}
          <div className="space-y-3 text-[#313116] font-normal">
            <p className="text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65]">
              Whether you&apos;re curious about ownership, development progress,
              location, lifestyle possibilities, or the philosophy behind
              Nirvaana Hills - clarity should always come first. You&apos;ll find
              detailed answers here: clear, transparent, without unnecessary
              complexity.
            </p>
            <p className="italic text-gray-800 font-light pt-1 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.6]">
              Because important decisions deserve complete understanding.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-3 md:pt-4">
            <Link
              href="/contact-us"
              className="bg-[#AFEB63] hover:bg-[#9EE837] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
            >
              Get More Clarity
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
