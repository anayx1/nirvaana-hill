"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const CATEGORIES_DATA = [
  {
    id: "about",
    name: "About Nirvaana Hills",
    tagline: "Understanding The Project Better.",
    faqs: [
      {
        id: "about-1",
        question: "What is Nirvaana Hills?",
        answer:
          "A 200-acre premium farmhouse community in Naurangabas Rajputana, Haryana, planned around sustainability, nature, and wellness - scenic landscapes, curated amenities, and a secure gated environment offering families long-term agricultural land ownership with modern rural comforts.",
      },
      {
        id: "about-2",
        question: "How is it different from raw farmland?",
        answer:
          "Nirvaana Hills combines ownership with planning, infrastructure, accessibility, lifestyle experiences, community design, and long-term vision. Not simply land ownership - an ecosystem designed around living.",
      },
      {
        id: "about-3",
        question: "What is the total project size?",
        answer: "200 acres across the scenic Aravalli foothills.",
      },
      {
        id: "about-4",
        question: "What do Phase 1 and Phase 2 mean?",
        answer:
          "Launched in Sep 2025 Phase 1 is completely sold out, a testament to strong demand. Phase 2 launched in June 2026, is now open for booking with limited farmland parcels available.",
      },
    ],
  },
  {
    id: "location",
    name: "Location & Connectivity",
    tagline: "Close Enough To Reach. Far Enough To Disconnect.",
    faqs: [
      {
        id: "loc-1",
        question: "Where is Nirvaana Hills located?",
        answer:
          "Near Mahendragarh, Haryana - one of the most scenic, pollution-free belts near Delhi NCR and Gurgaon.",
      },
      {
        id: "loc-2",
        question: "How far from Delhi and Gurgaon?",
        answer:
          "Approximately 120–135 minutes from both, making it highly accessible for weekend getaways or even a permanent retreat, via NH-148B, NH-352W, and NH-152D highways - smooth connectivity alongside countryside tranquility.",
      },
      {
        id: "loc-3",
        question: "How is physical connectivity to the site?",
        answer:
          "Seamless via major highways; inside the gated property, robust 33-ft wide internal pathways support access.",
      },
      {
        id: "loc-4",
        question: "Can families visit and return the same day?",
        answer:
          "Absolutely - the location is chosen with practical weekend accessibility in mind.",
      },
      {
        id: "loc-5",
        question: "Why was this Aravalli stretch chosen?",
        answer:
          "Post-COVID demand for expansive, hill-adjacent open spaces skyrocketed. This stretch offers an unpolluted microclimate and genuine topography that can't be replicated closer to urban concrete belts.",
      },
      {
        id: "loc-6",
        question: "Are essential utility services available nearby?",
        answer:
          "Yes - despite complete tranquility, it sits within driving proximity of towns offering emergency medical support, fuel stations, and daily markets.",
      },
    ],
  },
  {
    id: "ownership",
    name: "Ownership & Legal Clarity",
    tagline: "Ownership Should Always Be Transparent.",
    faqs: [
      {
        id: "own-1",
        question: "Is the farmland legally clear for purchase?",
        answer:
          "Yes - all farmland comes with clear titles and fully verified legal documentation.",
      },
      {
        id: "own-2",
        question: "Is the land freehold or leasehold?",
        answer:
          "100% freehold agricultural land, with a separate registry and mutation in the buyer's name - secure and future-proof.",
      },
      {
        id: "own-3",
        question: "Is ownership legally secure?",
        answer:
          "Yes - every transaction follows legally transparent documentation for complete buyer confidence.",
      },
      {
        id: "own-4",
        question: "Is Nirvaana Hills a gated community?",
        answer:
          "Yes - fully gated, with managed access and on-site security.",
      },
    ],
  },
  {
    id: "farmlands",
    name: "Farm Sizes & Development",
    tagline: "Flexible Ownership Designed Around Your Needs.",
    faqs: [
      {
        id: "farm-1",
        question: "What farmland sizes are available?",
        answer:
          "1,613 Sq Yd (1/3rd acre) · 2,420 Sq Yd (1/2 acre) · 4,840 Sq Yd (1 full acre) - chosen based on availability and lifestyle or investment preference.",
      },
      {
        id: "farm-2",
        question: "Can I combine adjacent farmlands?",
        answer:
          "Yes - for a larger family retreat, adjacent farmlands can be clubbed together, subject to real-time inventory on the master plan.",
      },
      {
        id: "farm-3",
        question: "How are farm boundaries marked?",
        answer:
          "Every farm has clear, permanent physical boundaries and demarcated landscaping, preserving privacy while keeping community-wide aesthetic harmony.",
      },
      {
        id: "farm-4",
        question: "Does my farmland size shrink for roads and parks?",
        answer:
          "No loading-- the area you purchase is your clear, usable farmland. Roads, clubhouse zones, and community forests sit on separately allocated land.",
      },
      {
        id: "farm-5",
        question: "Am I forced to grow specific crops?",
        answer:
          "Not at all - while the community plants 1,00,000+ trees overall, your inner layout is yours to customise with orchards, vegetables, or lawns.",
      },
      {
        id: "farm-6",
        question: "Can I build a farmhouse on my land?",
        answer:
          "Yes - up to 10% of your total farmland area under Haryana agricultural land norms, with design-build options in Stone, Mud, or Wood Villas (at additional cost).",
      },
    ],
  },
  {
    id: "amenities",
    name: "Amenities & Experiences",
    tagline: "More Than Land Ownership. A Better Way Of Living.",
    faqs: [
      {
        id: "amen-1",
        question: "What premium amenities are included?",
        answer:
          "Exclusive access to Clubhouse, a dedicated Golf Range, wellness centres, and curated nature trails.",
      },
      {
        id: "amen-2",
        question: "How does the Farm-to-Fork concept work?",
        answer:
          "Dedicated organic farming support zones let you grow fresh, residue-free seasonal produce with help from community farmers - delivered straight from your backyard to your kitchen.",
      },
      {
        id: "amen-3",
        question: "Will my farmland have electricity and water?",
        answer:
          "Yes - systematic water conservation frameworks, water access for every farm, electricity infrastructure, and solar-powered pathway lighting.",
      },
      {
        id: "amen-4",
        question: "What security safeguards the community?",
        answer:
          "A fully gated community with 24/7 manned security, monitored access control, perimeter fencing, and CCTV coverage.",
      },
      {
        id: "amen-5",
        question: "Who cares for my farm while I'm away?",
        answer:
          "The on-site management team (at additional cost) handles irrigation, pruning, pest control, and general upkeep of major plantations - complete peace of mind.",
      },
      {
        id: "amen-6",
        question: "Is the community pet-friendly and child-friendly?",
        answer:
          "Entirely - children reconnect with nature while pets move freely, away from dense traffic and urban congestion.",
      },
      {
        id: "amen-7",
        question: "Can I do organic farming here?",
        answer:
          "Yes - dedicated organic farming lets you grow your own fresh, chemical-free produce right on your land.",
      },
    ],
  },
  {
    id: "investment",
    name: "Investment & Long Term Value",
    tagline: "Ownership That Creates More Than Lifestyle Value.",
    faqs: [
      {
        id: "inv-1",
        question: "Is farmland near Delhi NCR a good investment?",
        answer:
          "The Aravalli belt has seen consistent appreciation from limited supply, rising NCR demand, and growing interest in green living. Phase 1 selling out fully has already proven Nirvaana Hills' market value.",
      },
      {
        id: "inv-2",
        question: "Why has Nirvaana Hills seen strong buyer interest?",
        answer:
          "A rare combination: large-scale 200-acre development, premium lifestyle infrastructure, strong Delhi NCR accessibility, legal transparency, limited inventory, nature-led planning, and long-term vision - reflected in Phase 1 selling out and continued Phase 2 demand.",
      },
    ],
  },
  {
    id: "visits",
    name: "Site Visits",
    tagline: "Experience The Land Before Making A Decision.",
    faqs: [
      {
        id: "vis-1",
        question: "Can I visit the site before buying?",
        answer:
          "Absolutely - we welcome and encourage every interested family to experience Nirvaana Hills firsthand through a guided private site visit. Walking the land often provides more clarity than any brochure or conversation.",
      },
      {
        id: "vis-2",
        question: "What happens during a site visit?",
        answer:
          "A guided land walkthrough, project overview, development progress updates, location & connectivity overview, lifestyle experience walkthrough, and personal consultation for your questions - because important decisions deserve first-hand experience.",
      },
    ],
  },
];

export default function FaqListSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaqIds, setOpenFaqIds] = useState(["about-1"]);

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedCategories =
    activeTab === "all"
      ? CATEGORIES_DATA
      : CATEGORIES_DATA.filter((cat) => cat.id === activeTab);

  return (
    <section className="w-full bg-[#FAF9F5] pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden select-none">
      <div className="container max-w-[720px] px-4 md:px-6 mx-auto">

        {/* ======================================================== */}
        {/* CATEGORY FILTER TABS                                     */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 md:gap-x-7 gap-y-2.5 md:gap-y-3 mb-9 md:mb-11 text-center max-w-[680px] mx-auto">
          {/* "All" Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className="group flex flex-col items-center cursor-pointer transition-all duration-200"
          >
            <span
              className={`text-[13.5px] md:text-[14.5px] transition-colors ${activeTab === "all"
                ? "text-black font-medium"
                : "text-[#8E8E8E] hover:text-black font-normal"
                }`}
            >
              All
            </span>
            {activeTab === "all" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="w-4 h-[2.5px] bg-[#9EE837] rounded-full mt-0.5"
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
          </button>

          {/* Individual Category Tabs */}
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className="group flex flex-col items-center cursor-pointer transition-all duration-200"
              >
                <span
                  className={`text-[13.5px] md:text-[14.5px] transition-colors ${isActive
                    ? "text-black font-medium"
                    : "text-[#8E8E8E] hover:text-black font-normal"
                    }`}
                >
                  {cat.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="w-5 h-[2.5px] bg-[#9EE837] rounded-full mt-0.5"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* CATEGORY SECTIONS & ACCORDIONS                           */}
        {/* ======================================================== */}
        <div className="space-y-10 md:space-y-14">
          {displayedCategories.map((category) => (
            <div key={category.id} className="space-y-4 md:space-y-5">

              {/* Category Header Card Banner */}
              <div className="w-full bg-[#6B7F64] rounded-[18px] md:rounded-[22px] p-5 md:p-8 text-white shadow-xs">
                <h2 className="font-serif !font-normal text-[20px] md:text-[36px] leading-[1.18] text-white">
                  {category.name}
                </h2>
                <p className="font-sans text-[13px] md:text-[15.5px] text-[#F0F5EC] font-normal mt-1.5 leading-relaxed">
                  {category.tagline}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-3 md:space-y-3.5">
                {category.faqs.map((faq) => {
                  const isOpen = openFaqIds.includes(faq.id);

                  return (
                    <div key={faq.id} className="flex flex-col space-y-2.5">

                      {/* Question Row: Bubble + (+) Button */}
                      <div className="flex items-center gap-3 justify-start">
                        <div className="relative inline-block group">
                          <button
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${faq.id}`}
                            className="relative z-10 bg-[#E5E8D8] hover:bg-[#DDE1CE] transition-colors rounded-[18px] md:rounded-[22px] rounded-br-[4px] px-5 md:px-6 py-3 md:py-3.5 text-left text-[#1A1A1A] font-sans text-[12px] md:text-[15px] font-medium leading-snug cursor-pointer shadow-2xs active:scale-[0.99]"
                          >
                            {faq.question}
                          </button>

                          {/* Bubble Tail */}
                          <div
                            className="absolute -right-1 bottom-0 w-2.5 h-2.5 bg-[#E5E8D8] group-hover:bg-[#DDE1CE] transition-colors [clip-path:polygon(0_0,100%_100%,0_100%)] pointer-events-none"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Plus / Minus Circular Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          aria-label={isOpen ? "Collapse question" : "Expand question"}
                          className="w-7 h-7 md:w-7.5 md:h-7.5 rounded-full border border-[#1A1A1A]/50 hover:border-black hover:bg-black/5 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-90"
                        >
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5 text-[#1A1A1A] stroke-[1.5]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-[#1A1A1A] stroke-[1.5]" />
                          )}
                        </button>
                      </div>

                      {/* Expandable Answer */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${faq.id}`}
                            initial={{ opacity: 0, height: 0, y: -4 }}
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
                              y: -4,
                              transition: {
                                height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.15 },
                              },
                            }}
                            className="overflow-hidden flex justify-end"
                          >
                            <div className="bg-[#E5E8D8] rounded-[20px] md:rounded-[24px] p-5 md:p-6 max-w-[92%] md:max-w-[88%] shadow-2xs">
                              <p className="font-sans text-[#252B20] text-[12px] md:text-[15px] font-medium leading-tight">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
