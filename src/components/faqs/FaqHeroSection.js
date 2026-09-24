"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowUpRight } from "lucide-react";

export default function FaqHeroSection() {
  return (
    <section
      id="faq-hero"
      className="w-full bg-[#62735B] py-10 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Info                          */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-white/90">
              <Home className="w-4 h-4 md:w-5 md:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] md:text-[13px] whitespace-nowrap">
                FAQS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[28px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Questions Are Part Of Every Meaningful Decision.
            </h1>

            {/* Narrative Body */}
            <p className="font-sans text-white/90 text-[14px] md:text-[17px] lg:text-[18px] leading-[1.65] max-w-xl font-normal">
              Choosing land, lifestyle, and long-term ownership naturally comes
              with important questions. We believe every important decision
              deserves complete clarity and transparency. Explore everything you
              may want to know about ownership, location, legal framework,
              lifestyle, development, and what makes Nirvaana Hills different.
            </p>

            {/* Sub-tagline */}
            <p className="font-sans italic text-white/85 text-[14px] md:text-[16.5px] leading-[1.6] font-normal">
              Because confidence begins with understanding.
            </p>

            {/* Action Group */}
            <div className="flex flex-col space-y-4 md:space-y-5 pt-2 md:pt-4">
              {/* Primary CTA */}
              <div>
                <Link
                  href="/contact-us"
                  className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[14.5px] md:text-[16px] px-7 py-3.5 md:px-9 md:py-4 rounded-full transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
                >
                  Book A Site Visit
                </Link>
              </div>

              {/* Secondary WhatsApp CTA with Pill Indicator */}
              <div className="flex flex-col items-start group">
                <Link
                  href="https://wa.me/919589585050?text=Hi%20Nirvaana%20Hills%2C%20I%20have%20a%20few%20questions%20about%20the%20property"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-sans text-[16px] md:text-[19px] font-medium transition-colors"
                >
                  <span>Talk To Our Team</span>
                  <ArrowUpRight className="w-4.5 h-4.5 md:w-5 md:h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {/* Decorative Pill Accent */}
                <div className="flex items-center gap-1.5 mt-1.5 md:mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <div className="w-9 h-[2.5px] md:w-10 md:h-[3px] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Hero Image                               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[4/3.2] md:aspect-[16/11] lg:aspect-[4/3.2] rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/faq/hero.webp"
                alt="Questions Are Part Of Every Meaningful Decision - Nirvaana Hills FAQs"
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

