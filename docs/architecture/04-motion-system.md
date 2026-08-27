# 04 — Motion & Animation System

Motion is the signature of this site — but it obeys rules. **Motion language name: "Signal Flow."**

## Motion principles

1. **Motion explains, never decorates blindly** — every animation communicates hierarchy, causality, or state.
2. **Fast in, gentle out** — entrances 300–600ms, exits 150–250ms. Nothing the user waits on.
3. **One hero moment per section** — each section gets exactly one signature animation; everything else is quiet support.
4. **60fps or it doesn't ship** — animate only `transform`, `opacity`, `filter`. No layout-thrashing properties. `will-change` applied just-in-time.
5. **`prefers-reduced-motion` is a first-class theme** — every animation has a reduced variant (opacity-only fade, no parallax, no cursor effects, no autoplaying loops). Tested, not bolted on.
6. **Fun Mode adds, never replaces** — base motion identical; Fun Mode layers extras.

## Easing & duration tokens

```
--ease-out     cubic-bezier(0.22, 1, 0.36, 1)     entrances (Apple-like)
--ease-in-out  cubic-bezier(0.65, 0, 0.35, 1)     movement/morph
--ease-spring  Framer spring { stiffness: 260, damping: 26 }  magnetic, tilt
--dur-fast 150ms · --dur-base 300ms · --dur-slow 600ms · --dur-cine 900ms
Stagger: 40–70ms between siblings, max total cascade 800ms.
```

## Library responsibilities (no overlap)

| Layer | Tool | Used for |
|---|---|---|
| Smooth scroll | **Lenis** | Global scroll smoothing (desktop only; native on touch), anchor scrolls |
| UI/scroll-triggered | **Framer Motion** | Reveals (`whileInView`), layout transitions, magnetic/tilt springs, page transitions, AnimatePresence |
| Micro/ambient | **CSS** | Gradients, border glows, hover lighting, marquees, background mesh |
| Complex timelines | **GSAP** | Only if a sequence exceeds Framer's ergonomics (e.g. scroll-scrubbed hero timeline). Not installed until needed. |
| 3D/particles | **R3F** | One candidate use: hero dot-matrix particle portrait (reference design). Lazy-loaded; static SVG fallback for low-power/reduced-motion/mobile. |

## Signature moments (the "one per section" map)

- **Loading screen:** name monogram draws in (SVG stroke), progress shimmer, quick fade-up exit. First visit only; skippable via click/key; ≤1.5s cap.
- **Hero:** typewriter `hi, abrar here.|` with blinking caret (mono font) + particle/dot portrait forming on load + slow ambient gradient mesh. CTA buttons magnetic.
- **Nav:** glass blur intensifies on scroll; active section indicator slides (layoutId).
- **About:** split-text word reveal on the intro paragraph; photo unmasks via clip-path; tech list items cascade with `▸` markers.
- **Education/Timeline:** vertical line draws with scroll progress; nodes pop with spring; dates count up.
- **Experience tabs:** sidebar indicator slides; panel crossfades + 12px rise.
- **Projects:** featured carousel with parallaxed media; cards tilt + hover-lighting + border glow; grid items stagger in; image reveal via scale-from-1.06.
- **Hardware:** photos reveal with clip-path wipe; spec rows type in (mono).
- **Skills:** icon grid staggers; proficiency bars fill on view (reduced: instant).
- **Roadmap:** horizontal timeline scrubbed by scroll (desktop), vertical stack (mobile).
- **Contact:** big magnetic "Say hi!" button with ripple on click; email copies with toast.
- **Page transitions:** 250ms fade + 16px vertical slip via template.tsx AnimatePresence; project pages hero-image shared-layout feel (crossfade, not heavy layoutId across routes).
- **Cursor:** soft radial spotlight (accent @ ~6% opacity, 400px) + 1px dot cursor companion. Desktop pointer-fine only.

## Fun Mode layer

Toggle in navbar (visible, labeled, keyboard-accessible; persisted in localStorage; OFF by default; announced via `aria-pressed` + toast).

Adds:
1. **Hero minigame** (from the design PDF): a small skill game gates a playful scroll — e.g. "catch the bug" / dodge-style canvas game; completing it auto-scrolls to About with a celebration burst. A "skip →" link is always present; the professional scroll is never actually locked.
2. **Achievements** (Sonner toasts + localStorage): "First visit", "Konami code", "Found all easter eggs", "Read a full case study", "Beat the minigame".
3. **Easter eggs:** Konami code → CRT/scanline flash; triple-click logo → dev joke; console.log ASCII banner + hiring pitch (always on, actually).
4. **Optional SFX:** tiny UI blips (WebAudio, <30KB total), muted by default even in Fun Mode; separate sound toggle.
5. **Ambient particles** density increase + cursor trail (short-lived, capped particle count).

Constraints: minigame and SFX are lazy-loaded chunks (zero cost when off); Fun Mode state never appears in URLs; disabled automatically under `prefers-reduced-motion`.

## Performance guardrails for motion

- IntersectionObserver-driven; animations unmount observers after firing (`once: true`).
- Lenis + Framer `useScroll` share one RAF; no scroll listeners outside it.
- Particle systems capped (≤2500 points hero, ≤60 trail) and paused when tab hidden.
- CLS budget: 0 from animations — reveals animate transform/opacity on already-laid-out elements.
