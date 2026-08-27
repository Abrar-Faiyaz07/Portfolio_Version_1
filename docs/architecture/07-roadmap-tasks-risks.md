# 07 — Development Roadmap, Task Breakdown, Risks, Future Expansion

## Roadmap (7 phases — each ends in a deployable state)

**Phase 0 — Foundation (0.5 day)**
Scaffold Next.js 15 + TS strict + Tailwind v4 + shadcn/ui; tokens.css (full design-token set); fonts via next/font; ESLint/Prettier; Vercel project + CI (tsc, lint, build); deploy "hello ink" page.

**Phase 1 — Content & core layout (1 day)**
Content types + all seed content from CV/LinkedIn; Navbar (glass, mobile sheet), Footer, SkipLink; SectionHeading; page shells for all routes; sitemap/robots/metadata baseline. *Site is already a valid plain portfolio here.*

**Phase 2 — Homepage sections, static (1–2 days)**
Hero (static portrait + typewriter), About, Education timeline, Experience tabs, Projects showcase (carousel + language groups + cards), Hardware, Skills + certificates, Roadmap, Contact. Fully responsive. No fancy motion yet.

**Phase 3 — Motion pass (1–2 days)**
Lenis; reveal system; split-text; drawn timeline; magnetic buttons; tilt + hover-lighting cards; cursor glow; page transitions; loading screen; reduced-motion variants for all of it. *This phase is where "premium" happens — budget real polish time.*

**Phase 4 — Detail pages (1 day)**
Project case-study template ("product page": hero media, overview, stack, architecture, challenges, lessons, links, future); hardware build-log template; certificates gallery; OG image generation; JSON-LD.

**Phase 5 — Fun Mode (1–2 days)**
FunModeProvider + toggle; minigame (lazy canvas game gating hero scroll, always skippable); achievements + toasts; easter eggs (Konami, console banner, logo click); optional SFX behind second toggle.

**Phase 6 — Hardening & launch (1 day)**
axe + keyboard + NVDA pass; Lighthouse CI budgets green; Playwright smoke; cross-browser (Chrome/Firefox/Safari/Android Chrome/iOS Safari); content proofread; custom domain + analytics; launch.

## Task breakdown convention
Each phase decomposes into PR-sized tasks (≤300 lines diff) tracked in GitHub issues with labels `phase:N`, `type:ui|motion|content|infra|a11y`. Definition of done per task: responsive ✓ · keyboard ✓ · reduced-motion ✓ · types clean ✓ · no console errors ✓.

## Suggested libraries (final list)

**Core:** next, react, typescript, tailwindcss, shadcn/ui (radix), framer-motion, lenis, lucide-react, next-themes (future light mode), sonner, class-variance-authority/clsx/tailwind-merge.
**Conditional (install only when the need is proven):** gsap (+ScrollTrigger), @react-three/fiber + drei (hero particles), @vercel/og (built-in), @icons-pack/react-simple-icons.
**Dev:** eslint, prettier(+tailwind plugin), playwright, @next/bundle-analyzer, lighthouse-ci.
**Rejected:** particles.js (hand-roll a capped canvas instead), AOS (Framer covers it), locomotive-scroll (Lenis is lighter), typed.js (trivial to write, saves a dep).

## Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Animation overload → slow, gimmicky site | Fails P1/P3 personas | "One signature moment per section" rule; perf budgets in CI; motion added in a dedicated phase *after* the static site works |
| Thin real content (few projects, no internships yet) | Site looks aspirational, not proven | Honest-content rendering (empty ⇒ hidden); site itself is flagship project #1; deep case studies on 2–3 real projects beat 10 shallow cards |
| Fun Mode blocks recruiters | Fatal for P1 | OFF by default, skip-link on minigame, never in URLs, instant off |
| R3F portrait balloons bundle/LCP | Perf budget blown | Lazy after idle, static SVG fallback is the actual LCP; feature-flagged — cut without redesign |
| Scope creep (20 sections × dream features) | Never ships | Phases each deployable; v1 = Phases 0–6 only; everything else in Future Expansion |
| Solo maintenance over 4 years | Rot | Content-as-data, typed schemas, docs/ folder, boring dependencies, CI |
| Design drift while building | Incoherence | tokens.css is law; new magic numbers require a token PR |

## Future expansion plan (designed-in, not built)

- **Research & publications** — `ResearchItem` schema ready; renders as timeline + detail MDX when first paper/RA work exists.
- **Blog/articles** — MDX pipeline slot reserved; nav auto-adds when ≥1 post.
- **Open source** — GitHub API-driven contribution showcase (ISR route).
- **Achievements wall** — hackathons/ICPC results feed the existing timeline `kind:'achievement'`.
- **Light theme** — tokens already CSS vars; add `[data-theme=light]` map.
- **i18n (Bangla)** — content files keyed for future locale split; not in v1.
- **Live Codeforces/LeetCode stats** — small ISR widgets on Skills section.
