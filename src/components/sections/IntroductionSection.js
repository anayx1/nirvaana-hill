"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section
      id="about-nirvaana-hills"
      className="w-full bg-[#FAF9F5] md:py-20 lg:py-28 overflow-hidden"
    >
      <div className="container max-w-[1280px]">
        {/* Top Content: Overline, Heading, Subhead & Stanzas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 md:space-y-6"
        >
          {/* Overline with Icon */}
          <div className="flex items-center gap-2 text-secondary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 3l-8 7h16l-8-7z" />
              <path d="M5 14c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
              <path d="M5 19c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
            </svg>
            <span className="text-[13px] md:text-[15px] font-semibold tracking-[0.12em] uppercase">
              INTRODUCTION
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif !font-normal text-[#1F2922] !text-[32px] sm:!text-[38px] md:!text-[48px] lg:!text-[56px] leading-[1.12] tracking-[-0.01em]">
            Own A Life Worth Coming Back To
          </h2>

          {/* Lead Paragraph & Stanza */}
          <div className="text-[#313116] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] font-normal space-y-4 pt-1">
            <p>The older we grow, the more we realise what truly matters.</p>

            <div className="space-y-1">
              <p>Time with family.</p>
              <p>Quiet mornings.</p>
              <p>Open skies.</p>
              <p>And moments when life simply feels slower.</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm my-6 md:my-10 isolate"
        >
          <Image
            src="/homepage/sec2.avif"
            alt="Nirvaana Hills - 200-acre farm community in the Aravalli foothills"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1280px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Bottom Content: Narrative Description & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-6 md:space-y-8"
        >
          {/* Narrative Text */}
          <div className="text-[#313116] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] font-normal space-y-1">
            <p>A 200-acre farm community in the Aravalli foothills.</p>
            <p>Just a short drive from Delhi and Gurgaon.</p>
            <p>Surrounded by over 9,600 acres of protected forest.</p>
            <p>
              A place to slow down, reconnect, and own something that grows
              richer with time.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-5 pt-2">
            <Link
              href="#book-visit"
              className="inline-flex items-center justify-center bg-primary text-[#19241B] font-medium text-[15px] sm:text-[16px] md:text-[17px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:brightness-95 transition-all shadow-sm active:scale-[0.98]"
            >
              Book A Site Visit
            </Link>

            <div className="flex flex-col items-start">
              <Link
                href="#brochure"
                className="inline-flex items-center gap-1.5 text-[#1F2922] hover:text-primary transition-colors"
              >
                <span className="text-[15px] md:text-[18px] font-normal ">Download Brochure</span>
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </Link>
              <span className="w-8 h-[3px] bg-primary rounded-full mt-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
