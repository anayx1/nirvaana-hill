"use client";

import React from "react";
import { motion } from "framer-motion";

const LEGAL_SECTIONS = [
  {
    id: "privacy-policy",
    number: "1",
    title: "Privacy Policy",
    paragraphs: [
      "At Nirvaana Hills, your privacy is important to us.",
      "Information shared through enquiry forms, brochure requests, WhatsApp conversations, or consultation calls remains secure and confidential.",
      "Personal information collected through the website is used solely for communication related to Nirvaana Hills and services offered by SEAD Realty.",
      "We do not share personal information with third parties without user consent.",
    ],
  },
  {
    id: "terms",
    number: "2",
    title: "Terms & Conditions",
    paragraphs: [
      "All information presented on this website is intended for general informational purposes only.",
      "Project specifications, pricing, timelines, amenities, infrastructure plans, and future development details may evolve over time.",
      "Buyers are advised to independently verify all documentation and conduct due diligence prior to purchase decisions.",
      "All ownership decisions remain subject to applicable laws and regulations.",
    ],
  },
  {
    id: "disclaimer",
    number: "3",
    title: "Disclaimer",
    paragraphs: [
      "All visuals displayed on the website including renders, conceptual images, walkthroughs, development representations, and design references are indicative in nature.",
      "Actual development, infrastructure execution, amenities, and future planning may vary based on approvals, operational requirements, and development timelines.",
      "Availability of farmland inventory remains subject to current booking status.",
    ],
  },
  {
    id: "refund-policy",
    number: "4",
    title: "Refund Policy",
    paragraphs: [
      "All booking structures, payment schedules, reservation policies, and applicable cancellation terms are governed by individual buyer agreements shared during the ownership process.",
      "Refund policies, if applicable, will be communicated separately through formal documentation.",
      "For complete booking details, buyers are advised to speak directly with the relationship team.",
    ],
  },
  {
    id: "legal-disclosure",
    number: "5",
    title: "Legal Disclosure",
    paragraphs: [
      "This website and its contents are intended for general informational purposes only and do not constitute a legal offer, advertisement, solicitation, or invitation to purchase any unit, farmland, or property in the Nirvaana Hills project, by SEAD Realty (Shreeram Estates and Developers) or any of its affiliates.",
      "All images, renders, illustrations, plans, dimensions, specifications, amenities, tree counts, and other particulars displayed on this website are artistic conceptualizations or indicative representations only, and are subject to change, revision, or withdrawal at the sole discretion of the developer without prior notice. The actual product, layout, and surroundings may vary materially from the visuals shown.",
      "All prices, payment plans, rental yield estimates, return projections, and availability are indicative, provisional, and subject to change without notice. Any figures relating to rental yield, appreciation, or returns are illustrative estimates only, do not constitute a guarantee or assurance of returns, and should not be relied upon as financial or investment advice.",
      "Prospective purchasers are strongly advised to independently verify all details - including land title, ownership, approvals, permitted land use, registry, mutation status, and applicable Haryana agricultural land and R-Zone regulations - and to conduct their own due diligence and seek independent legal, financial, and tax advice before making any purchase decision.",
      "The construction of any structure on agricultural farmland is subject to prevailing Haryana government norms, approvals, and statutory limits (including the permissible built-up area). SEAD Realty makes no representation regarding approvals that fall outside its control.",
      "All trademarks, logos, and brand names appearing on this website are the property of their respective owners and are used for identification purposes only. SEAD Realty shall not be liable for any decision, action, loss, or damage arising directly or indirectly from reliance placed solely on the information contained in this website. By accessing this website, you acknowledge and agree to the terms of this disclaimer. This is the official website for Nirvaana Hills.",
    ],
  },
];

export default function LegalContentSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-14 md:py-20 lg:py-24 overflow-hidden select-none">
      <div className="container max-w-[860px] px-4 md:px-6 mx-auto">
        <div className="space-y-12 md:space-y-16">
          {LEGAL_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.number}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: Math.min(idx * 0.05, 0.2),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-start gap-4 md:gap-6 scroll-mt-24"
            >
              {/* Number Badge */}
              <div className="w-11 h-11 md:w-13 md:h-13 bg-[#B3EE60] rounded-[14px] md:rounded-[18px] flex items-center justify-center font-sans font-normal text-[20px] md:text-[22px] text-[#1F2922] shrink-0 mt-0.5 shadow-2xs">
                {section.number}
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-3 md:space-y-4">
                <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] md:text-[30px] lg:text-[32px] leading-tight">
                  {section.title}
                </h2>

                <div className="space-y-2.5 md:space-y-3 text-[#313116] font-normal leading-[1.65]">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-[14px] md:text-[15.5px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
