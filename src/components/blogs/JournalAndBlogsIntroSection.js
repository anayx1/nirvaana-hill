"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function JournalAndBlogsIntroSection() {
  return (
    <section
      id="journal-and-blogs"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[960px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* ====================================================== */}
          {/* EYEBROW                                                */}
          {/* ====================================================== */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              JOURNAL AND BLOGS
            </span>
          </div>

          {/* ====================================================== */}
          {/* HEADLINE                                               */}
          {/* ====================================================== */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[34px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.18] tracking-[-0.01em] max-w-3xl">
            Thoughtful Reads Around Living, Ownership &amp; Nature.
          </h2>

          {/* ====================================================== */}
          {/* SUBHEADING LEAD LINE                                   */}
          {/* ====================================================== */}
          <p className="font-sans font-medium text-[#1F2922] text-[16px] sm:text-[17px] md:text-[18px] leading-[1.5]">
            Read. Reflect. Reconsider what &ldquo;home&rdquo; really means.
          </p>

          {/* ====================================================== */}
          {/* BODY NARRATIVE                                         */}
          {/* ====================================================== */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.68] font-normal max-w-3xl"
          >
            At Nirvaana Hills, we believe buying farmland is never simply a
            transaction - it&apos;s often a shift in how people think about life
            itself. This is where we unpack that shift, through writing on
            nature-led living, land ownership, family wellbeing, slower living,
            investment philosophy, and the deeper thinking behind Nirvaana
            Hills. Only ideas worth spending time with.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
