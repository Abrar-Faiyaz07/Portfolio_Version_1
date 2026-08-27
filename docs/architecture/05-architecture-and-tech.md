# 05 — Frontend Architecture, Folder Structure, Component Tree, Tech Decisions

## Tech decisions (with rationale)

| Decision | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 App Router, static-first** | All pages `generateStaticParams`/SSG — the site is content, no server state. Free hosting on Vercel, perfect Lighthouse potential. |
| Language | **TypeScript strict** | Content schemas are the CMS; types enforce them. |
| Styling | **Tailwind CSS v4 + CSS variables** | Tokens live in CSS vars (theming/Fun Mode), Tailwind consumes them. |
| Components | **shadcn/ui** (copied, restyled) | Owned code, no dependency lock-in, a11y primitives via Radix. |
| Motion | Framer Motion + Lenis (+ GSAP/R3F deferred) | See doc 04. |
| Icons | Lucide + Simple Icons | Consistent stroke UI icons; brand logos for tech stack. |
| Fonts | next/font self-hosted variable fonts | Zero CLS, no external requests. |
| Content | Typed TS modules in `src/content/` (v1) → MDX via Contentlayer-style pipeline when long-form case studies grow (v1.1) | Simplest thing that enforces the schema. |
| Forms | Contact = `mailto:` + copy-email (v1). Optional Resend/Formspree later. | No backend in v1. |
| Analytics | Vercel Analytics (cookieless) | Recruiter-respecting privacy, no banner needed. |
| Testing | Playwright smoke (routes render, nav works, reduced-motion snapshot) + `tsc`/ESLint in CI | Right-sized for a portfolio. |
| Deploy | Vercel, `main` = production | Preview deploys per PR. |

**Explicitly rejected:** site-wide Three.js scenes (perf cost > value), heavy scroll-jacking (usability), CMS/database (overhead), custom cursor replacing native cursor entirely (a11y — we overlay, never `cursor: none` globally).

## Folder structure

```
src/
  app/
    layout.tsx            # fonts, providers, metadata, skip-link
    template.tsx          # page transition wrapper
    page.tsx              # home (assembles sections via SectionRenderer)
    projects/page.tsx
    projects/[slug]/page.tsx
    hardware/[slug]/page.tsx
    certificates/page.tsx
    resume/route.ts       # redirect → /resume.pdf
    sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
    not-found.tsx
  components/
    ui/                   # shadcn primitives (Button, Dialog, Tabs, …)
    shared/               # SectionHeading, GlassCard, TiltCard, MagneticButton,
                          # GlowBorder, CursorGlow, LoadingScreen, Navbar, Footer
    motion/               # SplitTextReveal, TypewriterText, Parallax, Reveal,
                          # AnimatedGradient, DrawnLine
    sections/             # Hero, About, Education, Experience, ProjectsShowcase,
                          # Hardware, Skills, Roadmap, Contact  (each ≤150 lines,
                          # composed from shared/ + motion/)
    cards/                # ProjectCard, HardwareCard, CertificateCard, SkillBadge
    fun/                  # FunModeProvider pieces, MiniGame/ (lazy), EasterEgg,
                          # AchievementToast, Sfx
  content/                # THE CMS — typed data only
    site.ts profile.ts projects.ts hardware.ts timeline.ts
    skills.ts certificates.ts roadmap.ts achievements.ts
  lib/
    utils.ts seo.ts content.ts (queries: featured(), byLanguage(), published())
  hooks/
    useFunMode.ts useReducedMotion.ts useMagnetic.ts useTilt.ts
    useCursorGlow.ts useAchievements.ts useLenis.ts useMediaQuery.ts
  providers/
    ThemeProvider.tsx FunModeProvider.tsx LenisProvider.tsx
  styles/
    globals.css tokens.css   # all CSS variables (color, radius, easing)
  types/
    content.ts
public/
  resume.pdf  images/  models/ (only if R3F portrait ships)
docs/                      # these blueprints
```

Separation of concerns: **sections compose, shared/motion implement, content feeds, hooks encapsulate behavior, tokens.css owns all magic numbers.**

## Component tree (homepage)

```
RootLayout
├─ Providers (Theme → Lenis → FunMode → Tooltip)
├─ SkipLink → Navbar (glass, active-section, FunModeToggle, Resume CTA)
├─ CursorGlow (client, pointer-fine only)
├─ template.tsx (PageTransition)
│  └─ HomePage
│     ├─ LoadingScreen (first visit, lazy)
│     ├─ Hero (TypewriterText, ParticlePortrait|StaticPortrait, MagneticButton×2,
│     │        MiniGameGate [Fun Mode only, lazy])
│     ├─ SectionRenderer(content registry)
│     │  ├─ About(SectionHeading, SplitTextReveal, TechList, Photo)
│     │  ├─ Education(Timeline)
│     │  ├─ Experience(ExperienceTabs)
│     │  ├─ ProjectsShowcase(ProjectCarousel, LanguageSection×N → ProjectCard×N)
│     │  ├─ Hardware(HardwareCard×N)
│     │  ├─ Skills(SkillGrid, CertificateStrip)
│     │  ├─ Roadmap(RoadmapTimeline)
│     │  └─ Contact(MagneticButton, CopyEmail)
│     └─ Footer
└─ Toaster (achievements + UI toasts)
```

Server/client split: pages and sections are Server Components; motion/interactive leaves are `"use client"` islands, keeping the JS bundle to interaction code only.

## Responsive strategy

- Mobile-first; breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`; content max-width 1200px, ultrawide gets more whitespace not more columns (except project grid → 4-col at 2xl).
- No hardcoded px dimensions for layout — fluid type (clamp), aspect-ratio boxes for media, CSS grid `auto-fit/minmax` for card grids.
- Touch: tilt/magnetic/cursor-glow disabled (`pointer: coarse`); carousel becomes swipe (native scroll-snap); hover-lighting replaced by pressed states; hit targets ≥44px.
- Lenis disabled on touch (native momentum is better).
- Test matrix: 360, 390, 768, 1024, 1280, 1440, 1920, 3440 widths.
