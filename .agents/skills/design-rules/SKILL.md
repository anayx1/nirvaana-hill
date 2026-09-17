---
name: design-rules
description: Nirvaana Hill design system rules, component architecture guidelines, responsive conventions, and coding standards. Load this skill before making any UI or styling changes.
---

# Nirvaana Hill — Agent Guidelines & Rules

## 1. Strict Scope & User Directives

- **Follow User Instructions Strictly**: Implement ONLY what the user explicitly requests. Do NOT invent, assume, or add extra unrequested sections, pages, features, or design elements.
- **Ask Before Acting If Confused**: If any instruction or requirement is unclear or ambiguous, STOP and ask the user clarifying open questions BEFORE making any changes to the codebase.
- **Mobile-First Screenshot Conversion**: The user will provide UI reference screenshots designed for **mobile**. Translate them pixel-perfectly into code matching exact layouts, alignments, typography, colors, and visual details. Then scale the design responsively for larger screens while preserving the same UX intent.

## 2. Component Architecture & Next.js Best Practices

- **Check Existing Components First**: Always search and inspect `src/components/` before creating a new UI component. If a reusable component already exists, reuse and extend it — do not duplicate.
- **Keep `page.js` as a Server Component**: NEVER place `'use client'` on `page.js`. Keep page files as Server Components. Extract interactive UI or animation logic into modular client components inside `src/components/` and import them into `page.js`.
- **Server-Side API Data Fetching**: Perform all API data calls on the server side (in Server Components or Server Actions via `'use server'`), NOT through client proxy endpoints. Fetch data on the server and pass it down as props to Client Components.
- **State Management & Error Handling**: Implement proper React state management (`useState`, `useReducer`, context) and robust error handling (try/catch blocks, error boundaries, loading skeletons, and graceful fallbacks).
- **Clean Code**: Write clean, readable, well-structured code. Use meaningful variable and component names. Keep components small and focused. Avoid unnecessary nesting.

## 3. Design System, CSS & Responsive Rules

### 3.1 Design Tokens (from `globals.css`)

All tokens are defined as CSS custom properties in `src/app/globals.css`. Always use these — never hardcode values.

| Token              | Value                            | Tailwind Utility                     |
| ------------------ | -------------------------------- | ------------------------------------ |
| `--primary`        | `#AFEB63`                        | `bg-primary`, `text-primary`, `border-primary` |
| `--secondary`      | `#B3482B`                        | `bg-secondary`, `text-secondary`, `border-secondary` |
| `--background`     | `#ffffff`                        | `bg-background`                      |
| `--foreground`     | `#171717`                        | `text-foreground`                    |
| `--font-heading`   | `Times New Roman, Times, serif`  | Applied globally to `h1`–`h6`        |
| `--font-body`      | `Mona Sans, sans-serif`          | Applied globally to `body`, `p`, `li`, `span` |
| `--container-max`  | `1800px`                         | `.container` class                   |

### 3.2 Typography

Heading and body text sizes are defined globally in `globals.css` with responsive breakpoints. **Do not override these with inline styles or ad-hoc utility classes** unless the design explicitly requires a one-off exception.

#### Headings (serif — Times New Roman)

| Element | > 1600px | 801–1600px | ≤ 800px |
| ------- | -------- | ---------- | ------- |
| `h1`    | 72px     | 56px       | 38px    |
| `h2`    | 56px     | 44px       | 30px    |
| `h3`    | 44px     | 36px       | 26px    |
| `h4`    | 36px     | 28px       | 22px    |
| `h5`    | 28px     | 24px       | 20px    |
| `h6`    | 22px     | 20px       | 18px    |

#### Body Text (Mona Sans)

| Element        | Desktop (> 800px) | Mobile (≤ 800px) |
| -------------- | ----------------- | ---------------- |
| `p`, `li`, `span` | 20px           | 18px             |

### 3.3 No Inline Font Sizing

Avoid inline CSS font sizing (e.g. `style={{ fontSize: '18px' }}`). Always rely on the globally defined typography rules, Tailwind utility classes, or CSS custom properties.

### 3.4 Responsive Breakpoints & Mobile-First Tailwind Rules

The project uses two key breakpoints:

| Breakpoint     | Width       | Usage                              |
| -------------- | ----------- | ---------------------------------- |
| Mobile         | ≤ 800px     | Default / phone layouts            |
| Mid-screen     | 801–1600px  | Tablet / small desktop             |
| Large desktop  | > 1600px    | Full desktop experience            |

- **Mobile-first approach**: Design and code for mobile first, then enhance for larger screens.
- The user provides **mobile screenshots** as the design source of truth. Scale up for desktop while maintaining the same UX flow and visual hierarchy.

#### Tailwind CSS Responsive Class Rules (CRITICAL)

- **Default (Unprefixed) = Mobile**: In Tailwind CSS, unprefixed utility classes apply to mobile by default.
- **DO NOT use `sm:` for mobile styles**: `sm:` applies to screens `≥ 640px` (not mobile). Using `sm:` for mobile styling causes values to invert or fail.
- **Pattern**: Specify the mobile style unprefixed, then add breakpoint prefixes (e.g., `md:`, `lg:`) for larger screens.

**Example (20px text on mobile, 24px text on desktop):**
- ✅ **CORRECT**: `text-[20px] md:text-[24px]` *(Default mobile gets 20px, desktop/md gets 24px)*
- ❌ **INCORRECT**: `sm:text-[20px] text-[24px]` *(Applies 24px to mobile and 20px to sm+, completely reversing the intended layout)*

### 3.5 Container

- Main container max-width is capped at **1800px** using the `.container` class.
- On screens wider than 1800px, display blank side margins and keep all page content centered (`margin: 0 auto`).
- Always wrap page-level content in a `.container` div.

## 4. Mobile-to-Desktop Conversion Rules (CRITICAL FOR LUXURY AESTHETICS)

The user provides **mobile screenshots** as the source of truth for content, typography, and visual assets. **Do NOT simply stretch mobile single-column stacks across desktop screens.** You must elevate the mobile concept into a refined, high-end desktop editorial experience.

### 4.1 Layout Archetypes for Desktop (`lg:` / `xl:`)

When converting a mobile screen to desktop, identify the section archetype and apply the corresponding desktop pattern:

| Section Type | Mobile Layout | Desktop Layout (`lg:` ≥ 1024px) |
| :--- | :--- | :--- |
| **Hero / Headline + Media** | Stacked vertically | **2-Column Split Grid** (`grid lg:grid-cols-2 items-center gap-12 xl:gap-20`) — Text on one side, visual media on the other. |
| **Intro / Narrative + Image** | Stacked (Text → Image → Text → CTA) | **Asymmetric 2-Column Split** OR **Editorial Centered Column** (`max-w-[1100px] mx-auto`) with balanced margins, never stretched edge-to-edge. |
| **Feature / Amenity Cards** | 1-Column vertical scroll | **2, 3, or 4-Column Grid** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8`). |
| **Stats / Highlights** | Stacked vertical rows | **Horizontal Multi-Column Bar / Grid** (`grid grid-cols-2 lg:grid-cols-4 gap-8`). |
| **Forms / Enquiries** | Full-width single column | **Split Layout** (`lg:grid-cols-12` — Left 5 cols context/imagery, Right 7 cols form container). |

### 4.2 Desktop Spacing, White Space & Rhythm

- **Generous Vertical Breathing Room**: Desktop sections require substantial vertical padding (`py-16 md:py-24 lg:py-32 xl:py-36`). Never cram desktop sections into tight spaces.
- **Constrain Text Line Lengths**: Never allow paragraphs to stretch across full desktop width. Always cap text blocks at `max-w-[540px]` to `max-w-[680px]` (`max-w-xl` / `max-w-2xl` / `max-w-prose`) to maintain optimal typographic readability.
- **Intelligent Grid Gaps**: Use progressive gaps between columns: `gap-6 md:gap-10 lg:gap-16 xl:gap-24`.
- **Media Proportions on Desktop**: Prevent landscape images and videos from taking up 100% viewport height on desktop. Use balanced aspect ratios (`aspect-[16/10]`, `aspect-[16/9]`, `aspect-[4/3]`) and constrain with max-height/aspect-ratio containers.

### 4.3 Interactive Elements & Buttons on Desktop

- **Button Widths**: Action buttons must never stretch full-width on desktop. Use `w-fit` or `inline-flex` with luxury padding (`px-7 py-3.5` to `px-8 py-4`).
- **CTA Groups**: Align CTA buttons horizontally on desktop (`flex flex-row items-center gap-6 lg:gap-8`).
- **Micro-Interactions**: Implement subtle desktop hover animations (e.g. `hover:brightness-95`, `transition-transform duration-300 hover:scale-[1.02]`, smooth underline accents).

## 5. Performance & Animation

### 5.1 Framer Motion

- Use `framer-motion` for all animations and transitions.
- Write clean, performance-first animation code.
- Use `transform` and `opacity` properties for GPU-accelerated 60fps animations.
- Prevent unnecessary re-renders in animation-heavy layouts.
- Import motion components only in `'use client'` components — never in Server Components.

### 5.2 Images

- **NEVER generate images using AI tools.** If an image or asset is needed, STOP and ask the user. The user will upload or add the image to the `public/` folder manually.
- **Do NOT compress, crop, resize, or transform** any image in the `public/` folder. All assets there are pre-compressed and optimised — use them exactly as-is.
- Always use `next/image` (`import Image from "next/image"`) instead of raw `<img>` tags for automatic image optimization, layout shift prevention, and fast loading.
- Provide explicit `width` and `height` or use the `fill` prop with a sized container.

### 5.3 Icons

- Use `lucide-react` for clean, lightweight, accessible icons (install when first needed).

## 6. File & Folder Conventions

```
src/
├── app/
│   ├── globals.css        # Design tokens, typography, container
│   ├── layout.js          # Root layout (Server Component)
│   └── page.js            # Home page (Server Component)
├── components/            # Reusable UI components (Client or Server)
│   ├── ui/                # Atomic UI elements (Button, Card, etc.)
│   └── sections/          # Page sections (Hero, Features, etc.)
└── assets/                # Static assets (images, icons, etc.)
```

- **Components go in `src/components/`** — never define components inline inside page files.
- **Client Components** must have `'use client'` at the top.
- **Group related components** in subdirectories when a section grows beyond 2–3 files.

## 7. Code Quality Checklist

Before completing any task, verify:

- [ ] No `'use client'` on any `page.js`
- [ ] No inline font sizing
- [ ] All colors use design tokens, not hardcoded hex values
- [ ] All headings use `h1`–`h6` tags (not styled `div`/`span`)
- [ ] Page content is wrapped in `.container`
- [ ] Images use `next/image` with properly sized and aspect-ratio constrained containers
- [ ] Animations use `framer-motion` in client components only
- [ ] Mobile designs are intelligently converted into balanced, luxury desktop multi-column/grid layouts (never stretched single-column stacks)
- [ ] Text line-lengths on desktop are constrained (`max-w-xl` / `max-w-2xl` / `max-w-prose`) for readability
- [ ] Section vertical rhythm is generous on desktop (`py-16 md:py-24 lg:py-32 xl:py-36`)
- [ ] Responsive design works at ≤ 800px, 801–1600px, and > 1600px
- [ ] Tailwind responsive classes are mobile-first (unprefixed for mobile, `md:`/`lg:` for desktop — never use `sm:` for mobile styling)
- [ ] No dummy/placeholder content unless explicitly instructed
