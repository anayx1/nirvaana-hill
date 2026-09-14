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

### 3.4 Responsive Breakpoints

The project uses two key breakpoints:

| Breakpoint     | Width       | Usage                              |
| -------------- | ----------- | ---------------------------------- |
| Mobile         | ≤ 800px     | Default / phone layouts            |
| Mid-screen     | 801–1600px  | Tablet / small desktop             |
| Large desktop  | > 1600px    | Full desktop experience            |

- **Mobile-first approach**: Design and code for mobile first, then enhance for larger screens.
- The user provides **mobile screenshots** as the design source of truth. Scale up for desktop while maintaining the same UX flow and visual hierarchy.

### 3.5 Container

- Main container max-width is capped at **1800px** using the `.container` class.
- On screens wider than 1800px, display blank side margins and keep all page content centered (`margin: 0 auto`).
- Always wrap page-level content in a `.container` div.

## 4. Performance & Animation

### 4.1 Framer Motion

- Use `framer-motion` for all animations and transitions.
- Write clean, performance-first animation code.
- Use `transform` and `opacity` properties for GPU-accelerated 60fps animations.
- Prevent unnecessary re-renders in animation-heavy layouts.
- Import motion components only in `'use client'` components — never in Server Components.

### 4.2 Images

- **NEVER generate images using AI tools.** If an image or asset is needed, STOP and ask the user. The user will upload or add the image to the `public/` folder manually.
- **Do NOT compress, crop, resize, or transform** any image in the `public/` folder. All assets there are pre-compressed and optimised — use them exactly as-is.
- Always use `next/image` (`import Image from "next/image"`) instead of raw `<img>` tags for automatic image optimization, layout shift prevention, and fast loading.
- Provide explicit `width` and `height` or use the `fill` prop with a sized container.

### 4.3 Icons

- Use `lucide-react` for clean, lightweight, accessible icons (install when first needed).

## 5. File & Folder Conventions

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

## 6. Code Quality Checklist

Before completing any task, verify:

- [ ] No `'use client'` on any `page.js`
- [ ] No inline font sizing
- [ ] All colors use design tokens, not hardcoded hex values
- [ ] All headings use `h1`–`h6` tags (not styled `div`/`span`)
- [ ] Page content is wrapped in `.container`
- [ ] Images use `next/image`
- [ ] Animations use `framer-motion` in client components only
- [ ] Responsive design works at ≤ 800px, 801–1600px, and > 1600px
- [ ] No dummy/placeholder content unless explicitly instructed
