"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export default function IntroductionSection() {
  return (
    <section
      id="about-nirvaana-hills"
      className="w-full bg-[#FAF9F5] py-10 md:py-16 lg:py-20 overflow-hidden select-none"
    >
      <div className="container max-w-[1280px]">
        {/* Top Content: Overline, Heading, Subhead & Stanzas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 md:space-y-4"
        >
          {/* Overline with Icon */}
          <div className="flex items-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
              INTRODUCTION
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[1.15] tracking-[-0.01em]">
            Own A Life Worth Coming Back To
          </h2>

          {/* Lead Paragraph & Stanza */}
          <div className="text-[#313116] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal space-y-3 pt-1">
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
          className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm my-6 md:my-8 isolate"
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
          className="flex flex-col space-y-5 md:space-y-6"
        >
          {/* Narrative Text */}
          <div className="text-[#313116] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal space-y-1">
            <p>A 200-acre farm community in the Aravalli foothills.</p>
            <p>Just a short drive from Delhi and Gurgaon.</p>
            <p>Surrounded by over 9,600 acres of protected forest.</p>
            <p>
              A place to slow down, reconnect, and own something that grows
              richer with time.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <Link
              href="/contact-us#enquiry"
              className="inline-flex items-center justify-center bg-primary text-[#19241B] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:brightness-95 transition-all shadow-sm active:scale-[0.98]"
            >
              Book A Site Visit
            </Link>

            <div className="flex flex-col items-start">
              <Link
                href="#brochure"
                className="inline-flex items-center gap-1.5 text-[#1F2922] hover:text-primary transition-colors font-normal text-[12px] md:text-[16px]"
              >
                <span>Download Brochure</span>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </Link>
              <span className="w-6 md:w-8 h-[2px] md:h-[3px] bg-primary rounded-full mt-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
