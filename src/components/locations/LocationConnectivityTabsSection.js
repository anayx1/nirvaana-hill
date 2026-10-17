"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TODAY_HIGHWAYS = [
  {
    id: "h-1",
    highway: "NH-48",
    route: "Delhi (Shiv Murti) → Gurugram (Kherki Daula) → Manesar → Bawal → Kotputli → Jaipur",
    impact: "Primary highway from Delhi/Gurugram. Connects NCR to Bawal/Kotputli and onward NH148B toward Narnaul-Mahendragarh. 8-lane, 242 km",
  },
  {
    id: "h-2",
    highway: "NH-148B",
    route: "Kotputli (Raj) → Narnaul → Mahendragarh → Charkhi Dadri → Bhiwani → Hansi → Bathinda (Punjab)",
    impact: "DIRECT highway through Mahendragarh district- 425 km",
  },
  {
    id: "h-3",
    highway: "NH-152D",
    route: "Gangheri (Kurukshetra) → Kaul → Pundri → Julana → Kalanaur → Charkhi Dadri → Kanina → Surana (Narnaul Bypass)",
    impact: "Primary highway from Delhi/Gurugram. Connects NCR to Bawal/Kotputli and onward NH148B toward Narnaul-Mahendragarh. 8-lane, 242 km",
  },
  {
    id: "h-4",
    highway: "NH-11",
    route: "Jaisalmer → Bikaner → Jhunjhunu → Singhana → Chirawa → Mandawa → Mahendragarh villages → Narnaul → Rewari",
    impact: "Provides direct Rewari → Ateli/Narnaul → Mahendragarh-region connectivity",
  },
  {
    id: "h-5",
    highway: "NH-334B",
    route: "Meerut (UP) → Baghpat → Sonipat → Sampla → Jhajjar → Charkhi Dadri → Badhra → Loharu",
    impact: "Passes through Jhajjar (NH-352 junction). From north Delhi/Ghaziabad: NH-9 → Ghaziabad → NH-334B → Jhajjar → Charkhi Dadri → Mahendragarh.- 272 km",
  },
  {
    id: "h-6",
    highway: "NH-44",
    route: "Srinagar → Jammu → Ludhiana → Ambala → Panipat → Delhi → Agra → Central/Southern India",
    impact: "Access from North Delhi, Sonipat and Panipat through the NH-709 / NH-152D network toward Charkhi Dadri-Kanina.8-lane expressway, 242 km",
  },
  {
    id: "h-7",
    highway: "NH-248-BB",
    route: "Shiv Murti/Mahipalpur (Delhi, IGI Airport area) → Yashobhoomi → Harsaru → Kherki Daula (Gurugram)",
    impact: "Modern 6-8 lane from west/central Delhi. Connects to NH-48 & NH-352W (Pataudi) at Harsaru junction. Entry point for Dwarka/Najafgarh origin.",
  },
  {
    id: "h-8",
    highway: "NH-709",
    route: "Panipat (NH-1 junction) → Rohtak → Bhiwani → Kalanaur → Pilani → Loharu → Rajgarh (Raj)",
    impact: "From north/Rohtak direction. Passes Bhiwani & Loharu (SH-20 junction to Charkhi Dadri → Mahendragarh). 243 km, 4-lane Haryana-Rajasthan.",
  },
  {
    id: "h-9",
    highway: "NH-9",
    route: "Fazilka (Punjab) → Hisar → Fatehabad → Rohtak → Bahadurgarh → Delhi → Ghaziabad → Moradabad → Rudrapur → Pithoragarh",
    impact: "Major east-west corridor through Delhi. Connects Ghaziabad/Noida/Faridabad to Rohtak (NH-709 junction → Bhiwani → Mahendragarh). 954 km total.",
  },
  {
    id: "h-10",
    highway: "SH-24",
    route: "Mahendragarh → Kanina → Rewari",
    impact: "LOCAL HIGHWAY within Mahendragarh-Rewari connectivity.",
  },
  {
    id: "h-11",
    highway: "SH-20",
    route: "Charkhi Dadri (NH-148B) → Loharu (NH-709)",
    impact: "Bridges NH-148B and NH-709. From Rohtak/Panipat: Panipat → NH-709 → Bhiwani → SH-20 → Charkhi Dadri → Mahendragarh.",
  },
  {
    id: "h-12",
    highway: "NH-352",
    route: "Narwana (NH-52) → Jind → Rohtak → Jhajjar → Rewari (junction NH-48/NH-11)",
    impact: "North-south connector through Rohtak. From Panipat/Faridabad: Panipat → NH-1 → Rohtak (NH-352) → Jhajjar → Rewari → Mahendragarh via SH-24.",
  },
  {
    id: "h-13",
    highway: "NH-919",
    route: "Palwal → Sohna → Dharuhera → Rewari (74 km)",
    impact: "From south Delhi/Faridabad direction. Palwal (NH-44) → NH-919 → Rewari → SH-24 → Mahendragarh. Connects WPE & Delhi-Mumbai Expressway to Rewari.",
  },
  {
    id: "h-14",
    highway: "Western Peripheral Expressway (KMP)",
    route: "Kundli → Bahadurgarh → Manesar → Taoru → Sohna → Palwal",
    impact: "6-lane ring bypass around Delhi. Connects all entry points (North/West/South Delhi). From WPE: Manesar → NH-352W (Pataudi) → Rewari. -(136km)",
  },
  {
    id: "h-15",
    highway: "Eastern Peripheral Expressway (KGP)",
    route: "Kundli → Sonipat → Baghpat → Ghaziabad → Noida → Faridabad → Palwal",
    impact: "(135 km) 6-lane ring bypass east Delhi. From Ghaziabad/Noida/Faridabad: EPE → Palwal → NH-919 → Rewari → Mahendragarh. Or: Faridabad → NH-44 → Rohtak → NH-352.",
  },
  {
    id: "h-16",
    highway: "Rewari Bypass (NHAI)",
    route: "Rewari district bypass connecting NH-11 & NH-352 integration",
    impact: "Improves connectivity across Gurugram, Rewari, Mahendragarh, Narnaul districts. Seamless integration of NH-11 and NH-352 at Rewari node.",
  },
];

const UNDER_DEVELOPMENT_HIGHWAYS = [
  {
    id: "ud-1",
    highway: "Delhi-Mumbai Expressway (NH-19 / DME)",
    route: "Delhi (DND/Maharani Bagh) → Faridabad → Palwal → Sohna → Alwar → Jaipur → Agra → Gwalior → Madhya Pradesh → Gujarat → Mumbai",
    impact: "6-8 lane expressway. South Delhi origin → DME → Sohna exit (junction NH-919) → Rewari → Mahendragarh. OR: Faridabad → NH-44 → Palwal section.",
  },
  {
    id: "ud-2",
    highway: "NH-352W",
    route: "Gurugram (Sector-84/Dwarka Expressway) → Pataudi → Rewari",
    impact: "FASTEST from Gurugram. Direct access to Rewari (NH-48/NH-11 junction). Connects to Dwarka Expressway at west Delhi entry. Gateway to SH-24 → Mahendragarh.- (43.2 km)",
  },
  {
    id: "ud-3",
    highway: "NH-152D (Trans-Haryana Expressway)",
    route: "Gangheri (Kurukshetra) → Kaul → Pundri → Julana → Kalanaur → Charkhi Dadri → Kanina → Surana (Narnaul Bypass)",
    impact: "6-lane expressway. Direct high-speed access to Charkhi Dadri (20 km from Mahendragarh). Will intersect Hisar-Rewari Expressway north of Mahendragarh.",
  },
  {
    id: "ud-4",
    highway: "Hisar-Rewari Expressway",
    route: "Hisar (NH-9 junction) → Tosham → Badhra → Mahendragarh → Kanina → Taoru → Rewari (NH-48/NH-11 junction)",
    impact: "CRITICAL 4-lane expressway through Mahendragarh. Connects Hisar/Panipat/Rohtak (NH-9 corridor) directly to Mahendragarh & Rewari. Total 160km",
  },
  {
    id: "ud-5",
    highway: "NH-334B Enhancement",
    route: "Jhajjar → Charkhi Dadri→ Loharu",
    impact: "4 lane widening- Improves access from Panipat/Meerut direction to Charkhi Dadri & Loharu (SH-20 junction to Mahendragarh).",
  },
  {
    id: "ud-6",
    highway: "NH-344P / UER-II spur",
    route: "Bawana, Delhi → Barwasni/Sonipat → NH-352A",
    impact: "Spur from UER-II elevated corridor in north Delhi. Connects to Panipat/Sonipat direction, which links to NH-9 → Rohtak → NH-709 → Mahendragarh routes.",
  },
  {
    id: "ud-7",
    highway: "NH-148B Enhancement",
    route: "Charkhi Dadri → Mahendragarh → Kanina (NH-148B upgrade segment)",
    impact: "6-lane upgrade of NH-148B through Mahendragarh district.",
  },
];

const FUTURE_HIGHWAYS = [
  {
    id: "f-1",
    highway: "Gurgaon-Jhajjar Expressway",
    route: "Dwarka Expressway → Harsaru (NH-352W) → Wazirpur → Farrukhnagar bypass → Jhajjar (connects NH-352)",
    impact: "6 lane expressway. Will extend modern Dwarka corridor west to Jhajjar/Farukhnagar",
  },
  {
    id: "f-2",
    highway: "NH-152D Hisar Extension",
    route: "Proposed spur from Trans-Haryana Expressway Mahendragarh junction via Farrukhnagar to NH-352W/Pataudi",
    impact: "Planned linkage connecting Trans-Haryana directly to NH-352W (Pataudi-Rewari). Would enable direct Dwarka/west Delhi → Trans-Haryana → Charkhi Dadri → Mahendragarh.",
  },
  {
    id: "f-3",
    highway: "Regional Circular Expressway-3",
    route: "Outer peripheral ring intersecting Trans-Haryana near Mahendragarh-Kanina and near Jind-Uchana (~400+ km planned)",
    impact: "Creates outer ring access around NCR. Mahendragarh intersection enables peripheral connectivity without central Delhi congestion.",
  },
  {
    id: "f-4",
    highway: "Faridabad-Noida-Ghaziabad Expressway (FNG)",
    route: "Faridabad → Noida Sector 168 → Ghaziabad (Rahul Vihar/Hindan Vihar) [56 km planned]",
    impact: "Proposed ring expressway connecting Faridabad-Noida-Ghaziabad. From Ghaziabad: FNG → NH-9 → Rohtak → NH-352/NH-709 → Mahendragarh routes.",
  },
];

const TABS = [
  { id: "today", label: "Today" },
  { id: "under-development", label: "Under Development" },
  { id: "future", label: "Future" },
];

export default function LocationConnectivityTabsSection() {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <section
      id="connectivity-tabs"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6">

        {/* ====================================================== */}
        {/* SECTION HEADER                                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.15] tracking-[-0.01em]">
            Connected Today.
            <br />
            Growing Closer Tomorrow.
          </h2>
        </motion.div>

        {/* ====================================================== */}
        {/* TABS NAVIGATION                                        */}
        {/* ====================================================== */}
        <div className="sticky top-[56px] lg:top-[64px] z-20 bg-[#FAF9F5]/95 backdrop-blur-sm pt-4 pb-2 mb-8 sm:mb-10 flex items-center justify-center gap-6 sm:gap-10 border-b border-[#5C6051]/20">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-[13px] sm:text-[15px] font-sans transition-colors cursor-pointer ${isActive
                  ? "text-[#1F2922] font-medium"
                  : "text-[#5C6051]/60 hover:text-[#1F2922] font-normal"
                  }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AFEB63] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ====================================================== */}
        {/* TAB CONTENT                                            */}
        {/* ====================================================== */}
        <AnimatePresence mode="wait">
          {activeTab === "today" && (
            <motion.div
              key="today"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col divide-y divide-dashed divide-[#5C6051]/20"
            >
              {TODAY_HIGHWAYS.map((item) => (
                <div key={item.id} className="py-4 sm:py-5 first:pt-0 flex flex-col space-y-1.5">
                  {/* Highway */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Highway:</span>
                    <span style={{ color: "#5C6051" }} className="font-medium">{item.highway}</span>
                  </p>

                  {/* Complete Route */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Complete Route:</span>
                    <span style={{ color: "#5C6051" }}>{item.route}</span>
                  </p>

                  {/* How It Helps Movement */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">How It Helps Movement:</span>
                    <span style={{ color: "#5C6051" }}>{item.impact}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "under-development" && (
            <motion.div
              key="under-development"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col divide-y divide-dashed divide-[#5C6051]/20"
            >
              {UNDER_DEVELOPMENT_HIGHWAYS.map((item) => (
                <div key={item.id} className="py-4 sm:py-5 first:pt-0 flex flex-col space-y-1.5">
                  {/* Highway */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Highway:</span>
                    <span style={{ color: "#5C6051" }} className="font-medium">{item.highway}</span>
                  </p>

                  {/* Complete Route */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Complete Route:</span>
                    <span style={{ color: "#5C6051" }}>{item.route}</span>
                  </p>

                  {/* How It Helps Movement */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">How It Helps Movement:</span>
                    <span style={{ color: "#5C6051" }}>{item.impact}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "future" && (
            <motion.div
              key="future"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col divide-y divide-dashed divide-[#5C6051]/20"
            >
              {FUTURE_HIGHWAYS.map((item) => (
                <div key={item.id} className="py-4 sm:py-5 first:pt-0 flex flex-col space-y-1.5">
                  {/* Highway */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Highway:</span>
                    <span style={{ color: "#5C6051" }} className="font-medium">{item.highway}</span>
                  </p>

                  {/* Complete Route */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">Complete Route:</span>
                    <span style={{ color: "#5C6051" }}>{item.route}</span>
                  </p>

                  {/* How It Helps Movement */}
                  <p className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed">
                    <span className="text-[#B3482B] font-medium mr-1.5">How It Helps Movement:</span>
                    <span style={{ color: "#5C6051" }}>{item.impact}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================== */}
        {/* BOTTOM CTA BLOCK                                       */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Bottom Heading */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-serif !font-normal text-[#1F2922] text-[22px] sm:text-[28px] md:text-[34px] leading-[1.15]">
              Today, You&apos;re 2 Hours Away.
            </h3>
            <p style={{ color: "#5C6051" }} className="font-sans text-[13.5px] sm:text-[15px] md:text-[16px] font-normal">
              Tomorrow, The Region Gets Even More Connected.
            </p>
          </div>

          {/* Action CTAs Row */}
          <div className="flex flex-row items-center justify-center gap-3.5 md:gap-8 pt-2">
            {/* Book A Site Visit Button */}
            <a
              href="/contact-us#enquiry"
              className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs whitespace-nowrap shrink-0"
            >
              Book A Site Visit
            </a>

            {/* Explore The Route Link with Underline Accent */}
            <a
              href="https://youtu.be/x5cTaqPR_HE?si=VAVZ-d0kUXllkdpM"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-start gap-0.5 md:gap-1 text-[#1F2922] hover:text-[#1F2922] transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              <div className="flex items-center gap-1.5 md:gap-2 font-sans text-[12px] md:text-[16px] font-normal tracking-tight">
                <span>Explore The Route</span>
                <svg
                  className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#AFEB63] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              {/* Signature Accent: Dot + Line */}
              <div className="flex items-center gap-1 md:gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#AFEB63]" />
                <span className="w-5 md:w-8 h-[2px] md:h-[2.5px] rounded-full bg-[#AFEB63] transition-all duration-300 group-hover:w-8 md:group-hover:w-12" />
              </div>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
