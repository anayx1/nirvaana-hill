"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// ========================================================
// FAQ DATA
// ========================================================
export const FAQS_DATA = [
  {
    id: "faq-1",
    question: "What is Nirvaana Hills?",
    answer:
      "A 200-acre farmland community in Naurangabas Rajputana, Haryana, planned around sustainability, nature, and wellness - scenic landscapes, curated amenities, and a secure gated environment offering long-term farmland ownership with modern rural comforts.",
  },
  {
    id: "faq-2",
    question: "What is the total size?",
    answer: "200 acres, developed across the scenic Aravalli foothills.",
  },
  {
    id: "faq-3",
    question: "What do Phase 1 and Phase 2 mean?",
    answer:
      "Phase 1 launched September 2025 with 87 farmland parcels - now completely sold out. Phase 2 launched June 2026 with 100 additional parcels, currently open for booking with limited inventory.",
  },
  {
    id: "faq-4",
    question: "Can I visit the site before buying?",
    answer:
      "Yes - we welcome and encourage a guided private site visit for every interested family.",
  },
];

export default function FaqSection() {
  // Open FAQ item IDs (Question 1 open by default as in reference screenshot)
  const [openFaqIds, setOpenFaqIds] = useState(["faq-1"]);

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#FAF9F5] py-14 sm:py-16 md:py-24 lg:py-28 overflow-hidden select-none"
    >
      <div className="container max-w-[900px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14 max-w-2xl mx-auto"
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
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M9 21V12h6v9" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
              FAQS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] tracking-[-0.01em]">
            Every Important Question Deserves A Clear Answer.
          </h2>
        </motion.div>

        {/* ======================================================== */}
        {/* CHAT-STYLE FAQ ACCORDION                                */}
        {/* ======================================================== */}
        <div className="flex flex-col space-y-5 sm:space-y-6 max-w-[680px] mx-auto">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqIds.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col space-y-3.5"
              >
                {/* Question Bubble (Left Aligned with Tail) */}
                <div className="flex items-center gap-3">
                  <div className="relative inline-block group">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="relative z-10 text-left bg-[#E5E8D8] hover:bg-[#DFE3D1] transition-colors rounded-[20px] rounded-br-[6px] px-5 sm:px-6 py-3.5 sm:py-4 cursor-pointer text-[#252B20] font-sans font-medium text-[15px] sm:text-[16px] leading-snug shadow-2xs active:scale-[0.99]"
                    >
                      {faq.question}
                    </button>

                    {/* Chat Bubble Tail Tip */}
                    <div
                      className="absolute -right-1.5 bottom-0 w-3 h-3 bg-[#E5E8D8] group-hover:bg-[#DFE3D1] transition-colors [clip-path:polygon(0_0,100%_100%,0_100%)] pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Toggle Button (+ / -) */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#2F3528]/45 hover:border-[#2F3528] hover:bg-[#2F3528]/5 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-90"
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#2F3528]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#2F3528]" />
                    )}
                  </button>
                </div>

                {/* Answer Bubble (Right Aligned) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                        transition: {
                          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25, delay: 0.08 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -6,
                        transition: {
                          height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden flex justify-end"
                    >
                      <div className="bg-[#E5E8D8] rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 md:p-8 max-w-[92%] sm:max-w-[85%] shadow-xs">
                        <p className="font-sans text-[#3A4032] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.65]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* EXPLORE ALL FAQS CTA BUTTON                             */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-10 sm:mt-12 md:mt-14"
        >
          <button
            type="button"
            className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 py-3.5 sm:px-9 sm:py-4 rounded-full transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
          >
            Explore All FAQs
          </button>
        </motion.div>
      </div>
    </section>
  );
}
