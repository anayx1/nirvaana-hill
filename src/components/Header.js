"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ============================================
// MENU DATA CONFIGURATION
// ============================================

export const TOP_NAV_ITEMS = [
  { id: "home", label: "HOME", href: "/" },
  {
    id: "about-nirvaana-hills",
    label: "About Nirvaana Hills",
    href: "#about-nirvaana-hills",
    isItalic: true,
  },
  { id: "nirvaana-hills", label: "NIRVAANA HILLS", href: "#nirvaana-hills" },
  {
    id: "different",
    label: "WHAT MAKES NIRVAANA HILLS DIFFERENT",
    href: "#different",
  },
  {
    id: "features",
    label: "FEATURES & AMENITIES",
    href: "#features-amenities",
  },
  { id: "meaning", label: "THE MEANING OF NIRVAANA", href: "#meaning" },
  { id: "phases", label: "PHASES OF NIRVAANA HILLS", href: "#phases" },
  { id: "master-plan", label: "MASTER PLAN", href: "#master-plan" },
  { id: "price", label: "PRICE", href: "#price" },
  {
    id: "roi",
    label: "ROI & FOREST DIVIDEND INSIGHT",
    href: "#roi-forest-dividend",
  },
  {
    id: "gallery",
    label: "GALLERY & LIFE AT NIRVAANA",
    href: "#gallery",
  },
  { id: "location", label: "LOCATION", href: "#location" },
  { id: "about-sead", label: "ABOUT SEAD", href: "#about-sead" },
];

export const INSIGHTS_ITEMS = [
  { id: "blogs", label: "BLOGS", href: "#blogs" },
  { id: "faqs", label: "FAQS", href: "#faqs" },
];

export const CONTACT_ITEMS = [
  { id: "enquiry", label: "ENQUIRY FORM", href: "#enquiry" },
  { id: "channel-partner", label: "CHANNEL PARTNER", href: "#channel-partner" },
  { id: "careers", label: "CAREERS", href: "#careers" },
];

// Full list maintained for backwards compatibility
export const MENU_ITEMS = [
  ...TOP_NAV_ITEMS,
  {
    id: "insights",
    label: "Insights",
    href: "#insights",
    isItalic: true,
    isSubheading: true,
  },
  ...INSIGHTS_ITEMS,
  {
    id: "contact-us",
    label: "Contact Us",
    href: "#contact-us",
    isItalic: true,
    isSubheading: true,
  },
  ...CONTACT_ITEMS,
];

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-2a2 2 0 0 0-2 2v2h-2v3h2v7h3v-7h2.5l.5-3H15v-1.5c0-.5.5-1 1-1h2V8z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919589585050",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="15" x="2" y="4.5" rx="4" />
        <polygon points="10 9 15 12 10 15 10 9" />
      </svg>
    ),
  },
];

export const CONTACT_INFO = {
  phone: { display: "+91 958-958-5050", href: "tel:+919589585050" },
  email: { display: "info@seadrealty.com", href: "mailto:info@seadrealty.com" },
  address: [
    "Nirvaana Hills Akoda,",
    "Near Mahendragarh",
    "Naurangbas Rajputan",
    "Haryana 127310",
  ],
};

export const CTA_ACTIONS = [
  {
    id: "book-visit",
    label: "Book A Site Visit",
    href: "#book-visit",
    type: "button",
  },
  {
    id: "brochure",
    label: "Download Brochure",
    href: "#brochure",
    type: "link-with-accent",
  },
];

// ============================================
// BRAND LOGO COMPONENT
// ============================================

function BrandLogo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex items-center transition-opacity hover:opacity-90 py-1 shrink-0"
      aria-label="Nirvaana Hills Home"
    >
      <div className="relative w-[145px] sm:w-[165px] lg:w-[180px] h-[24px] sm:h-[26px] lg:h-[28px] max-w-[180px] max-h-[28px] shrink-0">
        <Image
          src="/logo.avif"
          alt="Nirvaana Hills"
          fill
          priority
          sizes="(max-width: 1024px) 165px, 180px"
          className="object-contain object-left !w-full !h-full"
        />
      </div>
    </Link>
  );
}

// ============================================
// MAIN HEADER COMPONENT
// ============================================

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) return hash;
    }
    if (pathname === "/about" || pathname?.includes("about")) {
      return "about-nirvaana-hills";
    }
    return "home";
  });
  const drawerRef = useRef(null);

  // Sync active nav item when pathname or URL hash changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveId(hash);
        return;
      }
    }
    if (pathname === "/about" || pathname?.includes("about")) {
      setActiveId("about-nirvaana-hills");
    } else if (pathname === "/" || !pathname) {
      setActiveId("home");
    }
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveId(hash);
      } else if (pathname === "/" || !pathname) {
        setActiveId("home");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  // Split navigation items into 2 balanced columns for desktop
  const desktopNavCol1 = TOP_NAV_ITEMS.slice(0, 7);
  const desktopNavCol2 = TOP_NAV_ITEMS.slice(7);

  // Lock body scroll when drawer is open and reset scroll position
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (drawerRef.current) {
        drawerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Top Navbar Header Bar (Fixed at top with z-50, using .container for proper luxury gutters) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FAF9F5]/95 backdrop-blur-sm border-b border-[#EBE8DF]">
        <div className="container h-[56px] lg:h-[64px] flex items-center justify-between">
          {/* Logo */}
          <BrandLogo onClick={closeMenu} />

          {/* Animated Hamburger / X Button with minimum 44x44px touch target */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isOpen}
            className="relative w-11 h-11 flex items-center justify-center cursor-pointer focus:outline-none group rounded-full hover:bg-black/5 transition-colors"
          >
            <span className="relative w-7 h-5 flex items-center justify-center">
              {/* Line 1 (rotates +45deg to form top diagonal of X) */}
              <motion.span
                initial={false}
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-7 h-[2px] bg-[#1F2922] rounded-full"
                style={{ transformOrigin: "center" }}
              />
              {/* Line 2 (rotates -45deg to form bottom diagonal of X) */}
              <motion.span
                initial={false}
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-7 h-[2px] bg-[#1F2922] rounded-full"
                style={{ transformOrigin: "center" }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Spacer to prevent page content from jumping under fixed header */}
      <div className="h-[56px] lg:h-[64px]" />

      {/* Fullscreen Drawer Overlay - Opens from top to bottom strictly below header */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-[56px] lg:top-[64px] bottom-0 left-0 right-0 z-40 bg-[#FAF9F5] overflow-y-auto"
          >
            {/* Drawer Body Container - Perfectly aligns with the header using .container */}
            <div className="container py-8 md:py-10 lg:py-14 pb-20">
              {/* ======================================================== */}
              {/* DESKTOP LAYOUT (>= 1024px / lg) - 4 Balanced Columns   */}
              {/* ======================================================== */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-8 xl:gap-14 items-start">
                {/* Column 1: Primary Navigation (Part 1 - items 1 to 7) */}
                <nav className="flex flex-col space-y-1">
                  {desktopNavCol1.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setActiveId(item.id);
                          closeMenu();
                        }}
                        className={`nav-menu-link tracking-[0.03em] block transition-colors ${item.isItalic
                          ? "font-serif italic text-[20px] xl:text-[22px] py-1.5 xl:py-2 normal-case"
                          : "uppercase text-[15px] xl:text-[17px] py-1.5 xl:py-2 font-normal"
                          } ${isActive ? "active" : ""}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Column 2: Primary Navigation (Part 2 - items 8 to 13) */}
                <nav className="flex flex-col space-y-1">
                  {desktopNavCol2.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setActiveId(item.id);
                          closeMenu();
                        }}
                        className={`nav-menu-link tracking-[0.03em] block transition-colors ${item.isItalic
                          ? "font-serif italic text-[20px] xl:text-[22px] py-1.5 xl:py-2 normal-case"
                          : "uppercase text-[15px] xl:text-[17px] py-1.5 xl:py-2 font-normal"
                          } ${isActive ? "active" : ""}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Column 3: Insights & Contact Us Categories */}
                <div className="flex flex-col">
                  {/* Insights Section */}
                  <h3 className="font-serif !font-normal italic text-secondary !text-[20px] pt-1 pb-1.5 normal-case select-none">
                    Insights
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {INSIGHTS_ITEMS.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setActiveId(item.id);
                            closeMenu();
                          }}
                          className={`nav-menu-link uppercase text-[15px] xl:text-[17px] py-1.5 xl:py-2 tracking-[0.03em] font-normal block ${isActive ? "active" : ""
                            }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Contact Us Section */}
                  <h3 className="font-serif !font-normal italic text-secondary !text-[20px] pt-1 pb-1.5 normal-case select-none">
                    Contact Us
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {CONTACT_ITEMS.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setActiveId(item.id);
                            closeMenu();
                          }}
                          className={`nav-menu-link uppercase text-[15px] xl:text-[17px] py-1.5 xl:py-2 tracking-[0.03em] font-normal block ${isActive ? "active" : ""
                            }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 4: Contact Details, Socials, Address & Action CTAs */}
                <div className="flex flex-col space-y-4 pt-1">
                  {/* Phone */}
                  <div>
                    <a
                      href={CONTACT_INFO.phone.href}
                      className="nav-menu-link text-[16px] xl:text-[18px] tracking-wide font-normal block"
                    >
                      {CONTACT_INFO.phone.display}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <a
                      href={CONTACT_INFO.email.href}
                      className="nav-menu-link text-[15px] xl:text-[17px] block"
                    >
                      {CONTACT_INFO.email.display}
                    </a>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex items-center gap-3 py-1">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="nav-menu-link text-[#1F2922] hover:text-primary transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="text-[#3D4A40] text-[14px] xl:text-[15px] leading-relaxed pt-1">
                    {CONTACT_INFO.address.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>

                  {/* Action CTAs for Desktop */}
                  <div className="flex flex-col gap-4 pt-4">
                    <Link
                      href="#book-visit"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center bg-primary text-[#19241B] font-medium text-[15px] xl:text-[17px] px-6 py-3 rounded-xl hover:brightness-95 transition-all shadow-sm active:scale-[0.98] w-fit"
                    >
                      Book A Site Visit
                    </Link>

                    <div className="flex flex-col items-start pt-1">
                      <Link
                        href="#brochure"
                        onClick={closeMenu}
                        className="nav-menu-link inline-flex items-center gap-1.5 text-[16px] xl:text-[18px] font-normal"
                      >
                        <span>Download Brochure</span>
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </Link>
                      <span className="w-8 h-[3px] bg-primary rounded-full mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* MOBILE & TABLET LAYOUT (< 1024px)                        */}
              {/* ======================================================== */}
              <div className="block lg:hidden max-w-xl md:max-w-2xl">
                {/* 1. Primary Menu Links (1 col on phone, 2 cols on tablet) */}
                <nav className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8">
                  {TOP_NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setActiveId(item.id);
                          closeMenu();
                        }}
                        className={`nav-menu-link tracking-[0.03em] block transition-colors ${item.isItalic
                          ? "font-serif italic text-[18px] md:text-[20px] py-1.5 md:py-2 normal-case"
                          : "uppercase text-[15px] md:text-[17px] py-1.5 md:py-2 font-normal"
                          } ${isActive ? "active" : ""}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* 2. Lower Section: 2 Columns Side by Side */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 pt-5 md:pt-6 items-start">
                  {/* Left Column: Insights + Links, Contact Us + Links */}
                  <div className="flex flex-col">
                    {/* Insights Subheading */}
                    <h3 className="font-serif !font-normal italic text-secondary !text-[20px] pt-1 pb-1.5 normal-case select-none">
                      Insights
                    </h3>
                    {INSIGHTS_ITEMS.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setActiveId(item.id);
                            closeMenu();
                          }}
                          className={`nav-menu-link uppercase text-[15px] md:text-[17px] py-1.5 md:py-2 tracking-[0.03em] font-normal block ${isActive ? "active" : ""
                            }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}

                    {/* Contact Us Subheading */}
                    <h3 className="font-serif !font-normal italic text-secondary !text-[20px] pt-1 pb-1.5 normal-case select-none">
                      Contact Us
                    </h3>
                    {CONTACT_ITEMS.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setActiveId(item.id);
                            closeMenu();
                          }}
                          className={`nav-menu-link uppercase text-[15px] md:text-[17px] py-1.5 md:py-2 tracking-[0.03em] font-normal block ${isActive ? "active" : ""
                            }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right Column: Contact Details, Socials, and Address */}
                  <div className="flex flex-col items-end text-right space-y-2.5 md:space-y-3 pt-5 md:pt-6">
                    {/* Phone */}
                    <a
                      href={CONTACT_INFO.phone.href}
                      className="nav-menu-link text-[15px] md:text-[17px] tracking-wide font-normal block"
                    >
                      {CONTACT_INFO.phone.display}
                    </a>

                    {/* Email */}
                    <a
                      href={CONTACT_INFO.email.href}
                      className="nav-menu-link text-[14px] md:text-[16px] block"
                    >
                      {CONTACT_INFO.email.display}
                    </a>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-2.5 md:gap-3 py-1 justify-end">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.id}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="nav-menu-link text-[#1F2922] hover:text-primary transition-colors"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>

                    {/* Address */}
                    <div className="text-[#3D4A40] text-[13px] md:text-[14px] leading-snug text-right pt-0.5">
                      {CONTACT_INFO.address.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Action CTAs (Book A Site Visit & Download Brochure) */}
                <div className="flex flex-wrap items-center gap-5 md:gap-8 pt-8 md:pt-10 pb-4">
                  <Link
                    href="#book-visit"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center bg-primary text-[#19241B] font-medium text-[15px] md:text-[17px] px-6 py-3 md:px-7 md:py-3.5 rounded-xl hover:brightness-95 transition-all shadow-sm active:scale-[0.98]"
                  >
                    Book A Site Visit
                  </Link>

                  <div className="flex flex-col items-start">
                    <Link
                      href="#brochure"
                      onClick={closeMenu}
                      className="nav-menu-link inline-flex items-center gap-1.5 text-[16px] md:text-[18px] font-normal"
                    >
                      <span>Download Brochure</span>
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </Link>
                    <span className="w-8 h-[3px] bg-primary rounded-full mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
