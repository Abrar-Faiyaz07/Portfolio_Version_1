# 03 — Design System (Color, Typography, Spacing, Components)

Design language name: **"Ink & Signal"** — deep ink-dark canvas, one luminous accent, frosted glass surfaces, generous whitespace, cinematic type. Principles extracted (not copied) from Gazi Jarin (dark hero, `/section` labels, sidebar-tabbed experience), Linear (restraint, glass, glow borders), Apple (type scale, motion easing), Vercel/Stripe (grid discipline, gradients), Anthropic (warm minimalism).

## 1. Color System

Dark-first (default). Light theme is a v1.1 stretch goal — dark-only at launch is acceptable and on-brand.

### Core tokens (CSS variables, consumed by Tailwind)
```
--bg           #0A0E1A   ink navy (page canvas)
--bg-elevated  #101527   cards, glass base
--bg-subtle    #151B30   hovered surfaces
--border       #232B45   hairlines (1px)
--border-glow  accent @ 35% for hover border-glow

--fg           #E8ECF5   primary text (AAA on --bg)
--fg-muted     #9AA3B8   secondary text (AA)
--fg-faint     #5A6478   captions, meta (AA-large only)

--accent       #4FE3C1   "signal mint" — links, highlights, cursor glow
--accent-soft  #4FE3C1 @ 12%  tinted fills
--accent-2     #7C8CFF   "circuit violet" — gradients, Fun Mode energy
--warning      #FFB86B   sparing use (certificate badges, featured tags)
--danger       #FF6B7A   errors only
```

- Gradients: `accent → accent-2` at low opacity for animated background meshes and text-gradient moments (hero name). Never on body text.
- **Fun Mode shift:** accent saturation +10%, ambient background particles denser, `--accent-2` participates more. Same palette family — Fun Mode is *more energy*, not a different brand.
- Contrast rule: all text pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large). `--fg-faint` only ≥18px or non-essential meta.

## 2. Typography System

Three-font system, all self-hosted variable fonts via `next/font` (zero CLS):

| Role | Font | Usage |
|---|---|---|
| Display | **Clash Display** (or General Sans as fallback choice) | Hero name, section titles, big numbers |
| Body/UI | **Inter** (variable) | Paragraphs, nav, cards, forms |
| Mono | **JetBrains Mono** | `/section` labels, code, tech tags, typewriter line, dates |

### Fluid scale (clamp-based, mobile-first)
```
display   clamp(2.75rem, 6vw + 1rem, 5.5rem)   / 1.05 / -0.02em
h1        clamp(2rem, 4vw + 0.5rem, 3.5rem)    / 1.1  / -0.015em
h2        clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)/ 1.15
h3        1.25rem / 1.3
body-lg   1.125rem / 1.7    (about paragraphs)
body      1rem / 1.65
small     0.875rem / 1.5
mono-tag  0.8125rem / 1.4 / +0.04em uppercase optional
```
Max line length 65–70ch. Section headers use the mono `/ about` prefix + hairline rule motif from the reference design.

## 3. Spacing, Grid, Radius

- **Spacing:** Tailwind 4px base scale. Section vertical rhythm: `py-24 md:py-32 lg:py-40`. Component gaps from {4, 6, 8, 12, 16, 24} steps only.
- **Grid:** 12-col, max-width `1200px` content / `1440px` for full-bleed media, gutters `1.5rem → 2rem`. Homepage sections alternate layout (text-left/media-right ↔ reversed) for scroll rhythm.
- **Radius:** `--r-sm 8px` (tags, inputs) · `--r-md 14px` (cards, buttons) · `--r-lg 22px` (media, modals) · full (pills, avatar). Consistent — never mix radii within one component.

## 4. Glass & Surface Language

```
.glass        bg: rgba(16,21,39,.55); backdrop-blur: 16px;
              border: 1px solid rgba(255,255,255,.08);
              inner top highlight: inset 0 1px 0 rgba(255,255,255,.06)
.glass-strong blur 24px, bg .7 — navbar, modals
.card         bg-elevated + border; hover: border-glow + translateY(-2px)
              + radial "hover lighting" following cursor (CSS var --mx/--my)
```
- Backdrop-filter has a solid-color fallback (`@supports not`).
- Glow is used at three sanctioned intensities only (border-glow, text-glow on accent headings, cursor spotlight). No arbitrary glows.

## 5. Component Library (shadcn/ui base + custom)

**From shadcn/ui (restyled with tokens):** Button, Badge, Dialog, Sheet, Tabs, Tooltip, DropdownMenu, Separator, Sonner (toasts — achievement popups).

**Custom shared components:**
- `SectionHeading` — mono `/ label` + title + hairline + scroll-reveal.
- `GlassCard`, `TiltCard` (pointer tilt, ≤6°), `MagneticButton` (≤8px pull), `GlowBorder`.
- `ProjectCard` (folder icon, GitHub/live icons, title, summary, tech list — the reference card anatomy), `ProjectCarousel` (featured, with media), `LanguageSection` (Python/C++/Java groupings).
- `Timeline` (education/experience vertical, scroll-drawn line), `ExperienceTabs` (sidebar org list → detail panel, per reference).
- `HardwareCard` (photo, spec list, "full build log →"), `CertificateCard` (issuer, validity, verify link).
- `TypewriterText`, `SplitTextReveal` (char/word), `AnimatedGradientText`.
- `CursorGlow` (spotlight following pointer, desktop-only, disabled on touch + reduced-motion).
- `LoadingScreen` (first visit only, ≤1.5s, skippable, sets localStorage flag).
- `FunModeToggle`, `AchievementToast`, `EasterEgg` wrapper, `MiniGame` (lazy-loaded chunk).
- `SectionRenderer` — maps content registry → homepage sections (the extensibility engine).

## 6. Iconography & Media

- Lucide React exclusively for UI icons (1.5px stroke, 20/24px). Simple Icons (via `@icons-pack/react-simple-icons` or inline SVG) for tech-stack logos.
- Project media: 16:10 screenshots, `next/image`, AVIF/WebP, blurred placeholder. Every image ships `alt`.
- Photography treatment: subtle duotone (ink + accent) option for the about photo to keep palette cohesion; original on hover.
