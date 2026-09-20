# Nirvaana Hill — Master Project Context & Development Guidelines

This document serves as the single source of truth for the **Nirvaana Hill** project. When starting a new chat session, load this file to maintain full context, architectural consistency, styling tokens, and development rules.

---

## 1. Project Overview & Tech Stack

- **Project**: Nirvaana Hills (200-Acre Luxury Farm Community in the Aravalli Foothills, Mahendragarh).
- **Framework**: Next.js (App Router, Turbopack, React 19).
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens (`src/app/globals.css`).
- **Animations**: Framer Motion (`framer-motion`).
- **Icons**: `lucide-react` and custom SVG vector paths.
- **Images/Videos**: Native `next/image` and HTML5 `<video>` with pre-optimized assets in `public/`.

---

## 2. Completed Pages & Component Breakdown

### A. Home Page (`/` -> `src/app/page.js`)
- `HeroSection.js`, `WalkthroughSection.js`, `MarqueeBanner.js`, `FeaturesSection.js`, `AmenitiesSection.js`, `SiteVisitCTASection.js`, etc.

### B. Locations Page (`/locations` -> `src/app/locations/page.js`)
- `LocationHeroRadarSection.js`: Custom SVG radar compass with shortened lime dotted rays, highway connectivity metrics, CTAs, and `/locations/hero.avif`.
- `LocationOverviewMapSection.js`: Responsive Google Maps iframe embed with terracotta eyebrow `#B3482B`.
- `LocationDistanceTableSection.js`: 16 travel corridors matrix with `#E5E8D8` header, `#5C6051` warm olive row typography, and dashed dividers.
- `LocationConnectivityTabsSection.js`: 3 interactive tabs (`Today` [16 highways], `Under Development` [7 expressways], `Future` [4 corridors]).
- `WhyLocationMattersSection.js`: 2-column desktop split (60-70% lower AQI narrative left, `/locations/hero.avif` right).
- `ExperienceTheJourneySection.js`: Clean portrait video card (`autoPlay`, `muted`, `loop`, `playsInline`, 0 controls overlay) with route walkthrough CTA.
- `WhyDistanceChangesSection.js`: 2-column desktop split with `/locations/why-distance-changes-everything.avif`.
- `WeekendTestSection.js`: Centered philosophy card and `Experience A Weekend Visit` CTA.

### C. Gallery Page (`/gallery` -> `src/app/gallery/page.js`)
- `GalleryHeroSection.js`: Hero with `/gallery/hero.avif` rendered as vertical `object-cover`.
- `DroneExperienceSection.js`: Full-bleed background video + floating glass card with synchronized nested `/gallery/drone.mp4`.
- `WalkthroughSection.js`: Reusable orbital walkthrough component with interactive hotspots.
- `OriginalSiteVisualsSection.js`: Category filter tabs (`All`, `Raw Site Images`, `Landscape Views`, `Aravalli Hills View`, `Sunrise & Sunset Moments`, `Drive Through Experience`), interactive image carousel with left/right overlay arrows, and `Discover Nirvaana` button. Exported `GALLERY_CATEGORIES` and `INITIAL_GALLERY_ITEMS` for easy API integration.
- `DevelopmentProgressSection.js`: Renders `/gallery/development-progress.avif` with bottom overlay continuous marquee ticker (*"Because promises matter less when progress becomes visible."*).
- `LifeAtNirvaanaSection.js`: 7-item interactive accordion (`Belonging`, `Grow Wild. Grow Free.`, `Built Around Nature`, `Wellness`, `Work-Life Balance`, `Restart Life Together`, `The Legacy`) mapped from `LIFE_AT_NIRVAANA_ITEMS` array, with background `/gallery/life-at-nirvaana.webp` and cross-browser left-to-right gradient overlay.

### D. Nirvaana Hills Page (`/nirvaana-hills` -> `src/app/nirvaana-hills/page.js`)
- `NirvaanaHeroSection.js`, `NirvaanaMarqueeStrip.js`, `NirvaanaPhilosophySection.js`, etc.

---

## 3. Design System & Color Tokens

Always adhere to these exact color tokens and typography definitions:

| Token / Usage | Hex Code | Implementation |
| :--- | :--- | :--- |
| **Brand Primary / Lime** | `#AFEB63` | `var(--primary)` / `bg-[#AFEB63]` / `text-[#AFEB63]` / active tab underline |
| **Terracotta / Eyebrow Accent** | `#B3482B` | `var(--secondary)` / `text-[#B3482B]` (used on section eyebrows with SVGs) |
| **Warm Olive / Body Text** | `#5C6051` | Explicit `style={{ color: "#5C6051" }}` or `text-[#5C6051]` (never allow to render as harsh black) |
| **Deep Charcoal / Headings** | `#1F2922` | `text-[#1F2922]` for titles & major typography |
| **Base Light Background** | `#FAF9F5` | `bg-[#FAF9F5]` for light section containers |
| **Sage Hero / Accent BG** | `#62735B` | `bg-[#62735B]` for hero/colored containers |
| **Card / Table Beige** | `#E5E8D8` | `bg-[#E5E8D8]` or `border-[#E5E8D8]` for borders & table headers |
| **Dark Theme BG** | `#1F241C` / `#1C2614` | Card backgrounds and dark gradient origins |

### Typography
- **Headings**: `font-serif` (`Times Sans Serif`, `Times New Roman, Times, serif`).
- **Body**: `font-sans` (`Mona Sans, sans-serif`).
- **Eyebrows**: `font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] text-[#B3482B]`.

---

## 4. Strict What TO DO

1. **Strictly Follow User Requests**: Implement ONLY what the user requests. Do not guess or add unrequested pages/features.
2. **Mobile-First Screenshot Translation**:
   - The user provides **mobile UI screenshots** as the source of truth.
   - Write mobile styles unprefixed (e.g., `text-[16px] p-4`).
   - Add desktop overrides with `md:` / `lg:` / `xl:` (e.g., `md:text-[18px] md:p-8`).
   - For image + content sections, convert stacked mobile layouts into balanced **2-column split grids** on desktop (`grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16`).
3. **Keep `page.js` as Server Components**:
   - NEVER add `'use client'` to any `page.js` file.
   - Keep page files purely for layout, SEO metadata, and assembling client section components.
4. **API-Ready Array Mapping**:
   - All repeating elements (galleries, accordions, tables, corridor lists) must be mapped from exported data arrays so they can be seamlessly hooked into backend APIs.
5. **Video Rules**:
   - Every video must have `autoPlay`, `muted`, `loop`, `playsInline`.
   - Never add play/pause icons or controls overlay unless explicitly requested.
6. **Next.js Image Best Practices**:
   - Always use `next/image` (`<Image fill className="object-cover" />` or explicit `width`/`height`).
   - Always wrap `<Image fill />` in a parent with `relative` and explicit aspect-ratio or height.
7. **Verification**:
   - Run `npm run build` to verify every change before finishing.

---

## 5. Strict What NOT To DO

1. ❌ **NEVER use AI image generation tools**. Images are provided by the user in `public/` or optimized via `npm run optimize-images`.
2. ❌ **NEVER modify or resize original assets in `public/`** unless running the dedicated optimization script requested by the user.
3. ❌ **NEVER use `sm:` for mobile styles** in Tailwind. In Tailwind, `sm:` applies to `≥ 640px`. Unprefixed classes are for mobile.
4. ❌ **NEVER stretch mobile single-column stacks edge-to-edge on desktop**. Always constrain with `max-w-xl` / `max-w-2xl` / `max-w-[1100px]` and center with `mx-auto`.
5. ❌ **NEVER hardcode black (`#000000`) for descriptive text**. Always use `#5C6051` for warm luxury editorial feel.
6. ❌ **NEVER create duplicate components**. Check `src/components/` first and reuse whenever possible (e.g. `WalkthroughSection.js`, `MarqueeBanner.js`).

---

## 6. Directory Structure Reference

```
d:/Vikava labs projects/nirvaana-hill/
├── public/
│   ├── gallery/                # hero.avif, drone.mp4, development-progress.avif, life-at-nirvaana.webp
│   ├── locations/              # hero.avif, why-distance-changes-everything.avif, route.mp4
│   └── fonts/                  # Times Sans Serif & Mona Sans font files
├── src/
│   ├── app/
│   │   ├── globals.css         # Design tokens, keyframes, typography
│   │   ├── layout.js           # Root server layout
│   │   ├── page.js             # Home page (Server Component)
│   │   ├── locations/page.js   # Locations page (Server Component)
│   │   ├── gallery/page.js     # Gallery page (Server Component)
│   │   └── nirvaana-hills/page.js
│   └── components/
│       ├── gallery/            # Gallery page components
│       ├── locations/          # Locations page components
│       ├── nirvaana-hills/     # Nirvaana hills page components
│       └── sections/           # Reusable global sections (Walkthrough, Marquee, etc.)
```
