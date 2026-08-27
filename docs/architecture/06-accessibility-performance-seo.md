# 06 — Accessibility, Performance & SEO Strategy

## Accessibility guidelines (non-negotiable checklist)

- **Semantics:** one `h1` per page; landmark structure (`header/nav/main/section/footer`); sections labeled via `aria-labelledby` on their headings; real `<button>`/`<a>` (no div-buttons).
- **Keyboard:** everything reachable in DOM order; skip-link first; visible focus ring (2px accent outline + offset — styled, never removed); carousel/tabs follow WAI-ARIA patterns (arrow keys, roving tabindex); Dialog/Sheet trap focus (Radix handles this); minigame fully skippable and never traps focus.
- **Reduced motion:** `useReducedMotion` gates every Framer variant; CSS `@media (prefers-reduced-motion: reduce)` kills ambient loops, parallax, smooth-scroll (Lenis off), cursor effects, autoplay. Site must feel complete, not broken, in this mode.
- **Screen readers:** typewriter renders full sentence in an `aria-label`, animation is `aria-hidden`; split-text keeps a single accessible text node; decorative particles/gradients `aria-hidden`; achievement toasts `role="status"`; Fun Mode toggle `aria-pressed` with text label.
- **Contrast:** tokens pre-verified AA (doc 03); glass surfaces re-checked against blurred worst-case backgrounds; accent-on-ink checked for links (mint on navy ≈ 8:1 ✓).
- **Media:** meaningful `alt` on all project/hardware images; SFX opt-in, never autoplay.
- Audit gate: axe DevTools clean + manual keyboard pass + NVDA spot-check before launch.

## Performance strategy

**Budgets (mobile, Moto G-class, Slow 4G):** LCP < 2.0s · CLS < 0.05 · INP < 200ms · initial JS < 180KB gz · Lighthouse ≥ 95 all categories.

Tactics:
1. **SSG everything** — HTML from CDN edge; zero server latency.
2. **Client islands only** — sections are RSC; only motion leaves hydrate.
3. **Lazy chunks:** MiniGame, ParticlePortrait (R3F), Sfx, LoadingScreen loaded on demand; R3F never in the critical path (static SVG portrait is the LCP element, particles enhance after idle).
4. **Images:** next/image, AVIF, explicit sizes, blur placeholders, priority only on hero.
5. **Fonts:** 3 variable fonts subset (latin), `font-display: swap` with size-adjusted fallbacks.
6. **Animation perf:** transform/opacity only; content-visibility on below-fold sections; single RAF loop; observers disconnected after fire.
7. **CI guard:** Lighthouse CI + `@next/bundle-analyzer` on every PR; budgets fail the build.

## SEO strategy

- **Metadata API:** per-route title template `"%s · Abrar Faiyaz"`, descriptions, canonical `https://<domain>`; project pages generate metadata from content files.
- **Open Graph / Twitter:** dynamic `opengraph-image.tsx` (name + role on ink gradient for home; project title + tech for case studies); `summary_large_image`.
- **Structured data (JSON-LD):** `Person` (name, url, sameAs: GitHub/LinkedIn, affiliation IUT) on home; `SoftwareSourceCode`/`CreativeWork` on project pages; `BreadcrumbList` on detail routes.
- **Indexing:** `sitemap.ts` from the content registry (auto-includes new projects); `robots.ts` allow-all; unpublished content excluded.
- **Semantic wins:** real text (no text-in-images), descriptive link text, one crawlable `<a>` per card.
- Target queries: "Abrar Faiyaz", "Abrar Faiyaz IUT", "Abrar-Faiyaz07". Personal-name SEO is easily winnable; a custom domain (open question) strengthens it.
