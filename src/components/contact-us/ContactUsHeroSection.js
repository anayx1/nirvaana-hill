"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowUpRight } from "lucide-react";

export default function ContactUsHeroSection() {
  return (
    <section
      id="contact-hero"
      className="w-full bg-[#62735B] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Action CTAs                   */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-white/90">
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
                CONTACT US
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Let&apos;s Start The Conversation.
            </h1>

            {/* Narrative Body */}
            <p className="font-sans text-white/90 text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[1.65] max-w-xl font-normal">
              Have a question about Nirvaana Hills? Want to see the land,
              understand ownership, or explore Phase 2?
            </p>

            {/* Sub-tagline */}
            <p className="font-sans italic text-white/85 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.6] font-normal">
              We&apos;re here to help.
            </p>

            {/* Action Group */}
            <div className="flex flex-col space-y-5 pt-2 sm:pt-4">
              {/* Primary CTA */}
              <div>
                <Link
                  href="#enquiry-form"
                  className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 py-3.5 sm:px-9 sm:py-4 rounded-full transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
                >
                  Book A Site Visit
                </Link>
              </div>

              {/* Secondary WhatsApp CTA with Pill Indicator */}
              <div className="flex flex-col items-start group">
                <Link
                  href="https://wa.me/919589585050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-sans text-[18px] sm:text-[20px] font-medium transition-colors"
                >
                  <span>Chat On WhatsApp</span>
                  <ArrowUpRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {/* Decorative Pill Accent */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <div className="w-10 h-[3px] rounded-full bg-primary" />
                </div>
              </div>

              {/* Footnote */}
              <p className="font-sans italic text-white/80 text-[14px] sm:text-[15px] md:text-[16px] pt-1">
                Private guided site visits available by prior appointment.
              </p>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Hero Image                               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[3/4] xs:aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/contact-us/hero.webp"
                alt="Contact Nirvaana Hills - Site Progress and Consultation"
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
