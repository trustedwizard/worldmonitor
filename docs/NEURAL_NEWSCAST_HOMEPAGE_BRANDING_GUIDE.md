# Neural Newscast Branding Guide

Branding standards for the Neural Newscast website and any forked or integrated experiences (e.g. dark-mode dashboards forked from [World Monitor](https://worldmonitor.app) / [worldmonitor](https://github.com/koala73/worldmonitor)). This guide ensures a consistent look and feel across the main site and dashboard-style dark interfaces.

---

## 1. Design Philosophy (Aligned with Existing Site)

- **Dark-first:** Default theme is dark to reduce eye strain and support extended listening/browsing.
- **Information density:** Prioritize clarity and scannability; avoid decorative clutter.
- **Authority and trust:** Clean typography and consistent accents support a “daily news, synthesized” identity.
- **Unified family:** Any dashboard or forked UI (e.g. World Monitor–style panels, map, signals) should feel like part of Neural Newscast, not a separate product.

---

## 2. Typography

### 2.1 Font Stack

- **Primary (UI & body):** [Inter](https://fonts.google.com/specimen/Inter) via Next.js `next/font/google`, exposed as CSS variable `--font-sans`.
- **Fallback (when Inter not loaded):** System stack per `globals.css`:
  ```css
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  ```
- **Usage:** Prefer `font-sans` (Tailwind) or `var(--font-sans)` so the app uses Inter when available.

### 2.2 Weights and Hierarchy

| Use            | Weight   | Notes                                      |
|----------------|----------|--------------------------------------------|
| Page/section H1| Bold     | Main branding / page title                 |
| H2–H4         | Bold     | Section headings                            |
| Body / cards  | Normal   | Default text                                |
| Labels, nav   | Medium   | Buttons, nav links, metadata                |
| Small / meta  | Normal   | Timestamps, captions, secondary info         |
| Links / CTAs  | Medium or Semibold | Emphasize clickable elements        |

### 2.3 Sizing Conventions (Reference)

- Hero H1: `text-3xl` → `text-7xl` responsive (e.g. `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`).
- Section H2: `text-2xl` → `text-3xl`.
- Card titles: `text-lg`–`text-xl`, often `font-semibold`.
- Body: `text-base`; dense UI may use `text-sm`.
- Metadata / captions: `text-xs`–`text-sm`.

---

## 3. Color System

All values are defined in HSL for use with `hsl(var(--name))` (no `%` in the variable value). Tailwind and components should reference these variables so light/dark or future themes stay consistent.

### 3.1 Core Palette (Neural Newscast)

| Token                     | HSL Value         | Hex (approx) | Usage |
|---------------------------|-------------------|--------------|--------|
| **Background (page)**     | `222 47% 11%`     | ~#1a2332     | Default page background (dark) |
| **Foreground (text)**     | `222 47% 96%`     | ~#f1f5f9    | Default body/heading text on dark |
| **nnc-subpage-bg**        | `208 70% 12%`     | #0a2233      | Alternate dark background (e.g. subpages) |
| **nnc-header-bg**         | `211 100% 8%`     | #00122a      | Header, hero background |
| **nnc-header-bg-hover**   | `212 100% 13%`    | #001f40      | Header/nav hover state |
| **nnc-hero-bg**           | `211 100% 8%`     | #00122a      | Hero sections (same as header) |
| **nnc-content-bg**        | `220 13% 90%`     | ~#e3e5e8    | Content sections (light) on dark homepage |
| **nnc-card-bg**           | `255 255% 255%`*  | #ffffff      | Cards on light sections; dark theme uses darker card (see 3.2) |
| **nnc-text-primary**      | `0 0% 100%`       | #ffffff      | Primary text on dark backgrounds |
| **nnc-text-secondary**     | `220 10% 70%`     | ~#a8b2bd    | Secondary/muted text on dark |
| **nnc-text-content-primary**   | `222 47% 11%`  | ~#1a2332    | Primary text on light backgrounds |
| **nnc-text-content-secondary** | `222 47% 44%`  | ~#4a5568    | Secondary text on light backgrounds |
| **nnc-accent-blue**        | `217 91% 60%`     | #428DFF      | Primary CTAs, links, focus ring, key actions |
| **nnc-accent-yellow**     | `45 93% 47%`      | #E0C321      | Highlights, active nav, badges; link hover often uses #e7b008 / #f0c040 |

\* In CSS, card on light sections uses literal white; in dark-only dashboard contexts, card uses a dark surface (see 3.2).

### 3.2 Dark-Only Context (e.g. Dashboard / World Monitor Fork)

When the entire UI is dark (no light content strips), use these so panels and cards align with Neural Newscast:

| Token (concept)   | Recommended value   | Usage in dashboard |
|-------------------|---------------------|--------------------|
| Page background   | `--nnc-subpage-bg` or `--nnc-header-bg` | Main canvas / map background |
| Panel/card bg     | `222 47% 15%`–`222 47% 20%` | Cards, side panels, modals |
| Border (dark)     | `222 47% 25%`      | Panel borders, dividers, inputs |
| Text primary      | `--nnc-text-primary` (#fff) | Headings, important labels |
| Text secondary    | `--nnc-text-secondary` or `222 47% 65%` | Descriptions, metadata |
| Primary action    | `--nnc-accent-blue` | Buttons, links, selected state, ring |
| Accent / highlight| `--nnc-accent-yellow` | Badges, active tab, “live” or “new” indicators |
| Destructive       | Keep existing red semantics; ensure contrast on dark |

### 3.3 Link and Interactive Colors

- **Default link:** `--nnc-accent-blue` (#428DFF).
- **Link hover (legacy / prose):** `#e7b008` → `#f0c040` (yellow, matches accent).
- **Active nav / current page:** `--nnc-accent-yellow` (e.g. #E0C321).
- **Focus ring:** `--ring: var(--nnc-accent-blue)`.

### 3.4 Semantic / Status Colors (Dashboard)

For alerts, signals, and status (e.g. World Monitor–style badges), keep semantics but align with NNC where it makes sense:

- **Success / positive:** Green (e.g. `green-500` / `green-400` on dark).
- **Warning / elevated:** Yellow/amber — prefer `--nnc-accent-yellow` or amber-400/500.
- **Error / critical:** Red; ensure sufficient contrast on dark (e.g. red-400/500).
- **Info / neutral:** `--nnc-accent-blue` or a muted blue-gray.
- **Muted / disabled:** `--nnc-text-secondary` or `222 47% 45%`.

---

## 4. Borders, Radius, and Spacing

- **Border color (dark):** `222 47% 25%` (HSL, no % in variable).
- **Border radius:** `--radius: 0.5rem`; `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`, `sm: calc(var(--radius) - 4px)` for consistency with shadcn/UI.
- **Spacing:** Prefer Tailwind scale (4, 6, 8, 12, 16, 24…). Section padding: e.g. `py-12 md:py-16`, container `px-4 sm:px-6 lg:px-8`, `max-w-5xl mx-auto` where appropriate.

---

## 5. CSS Variables Summary (Copy-Paste Reference)

Use these in `globals.css` or a dashboard theme file so a World Monitor fork can adopt Neural Newscast branding:

```css
:root {
  /* NNC Dark Theme */
  --background: 222 47% 11%;
  --foreground: 222 47% 96%;
  --nnc-subpage-bg: 208 70% 12%;
  --nnc-header-bg: 211 100% 8%;
  --nnc-header-bg-hover: 212 100% 13%;
  --nnc-hero-bg: 211 100% 8%;
  --nnc-content-bg: 220 13% 90%;
  --nnc-card-bg: 255 255% 255%;
  --nnc-text-primary: 0 0% 100%;
  --nnc-text-secondary: 220 10% 70%;
  --nnc-text-content-primary: 222 47% 11%;
  --nnc-text-content-secondary: 222 47% 44%;
  --nnc-accent-blue: 217 91% 60%;
  --nnc-accent-yellow: 45 93% 47%;
  --border: 222 47% 25%;
  --radius: 0.5rem;
  --ring: var(--nnc-accent-blue);
}
```

Usage in CSS: `background: hsl(var(--nnc-header-bg));`, `color: hsl(var(--nnc-text-primary));`, etc. In Tailwind: `bg-[hsl(var(--nnc-hero-bg))]`, `text-[hsl(var(--nnc-accent-blue))]`.

---

## 6. Applying This to a World Monitor–Style Fork

- **Map / shell:** Use `--nnc-header-bg` or `--nnc-subpage-bg` for the main background; header bar same or `--nnc-header-bg-hover` on hover.
- **Panels:** Background `222 47% 15%` or `20%`; border `222 47% 25%`; text primary/secondary from NNC tokens.
- **Primary actions and links:** `--nnc-accent-blue`; accent/highlight badges and “live” indicators: `--nnc-accent-yellow`.
- **Typography:** Load Inter (or equivalent) and use the same weight hierarchy (bold headings, medium labels, normal body).
- **Focus and a11y:** Ring color `--nnc-accent-blue`; ensure contrast ratios for text and buttons (WCAG AA minimum on dark).

---

## 7. Files to Reference in This Repo

- **Colors and base theme:** `src/app/globals.css` (`:root` and NNC variables).
- **Font setup:** `src/app/layout.tsx` (Inter, `--font-sans`, `font-sans` on body).
- **Tailwind mapping:** `tailwind.config.ts` (background, foreground, primary, accent, border, radius).
- **Component examples:** Header/nav, `HeroEpisodeDisplay`, `HomepageEpisodeCard`, episode and show pages (use of `--nnc-*` and `hsl(var(...))`).

---

## 8. Changelog

- **2026-03-01:** Initial branding guide: NNC palette, typography (Inter), dark-mode and dashboard application, CSS variables reference, and World Monitor fork alignment.
