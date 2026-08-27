# PROGRESS — Portfolio v2 "Ink & Signal"

Live trace file for the rebuild. Newest status at the top of each section.
Read `PROJECT_NOTES.md` for background, `../../docs/*` for the design blueprint.

**Status:** 🟢 v2 shipped — `dist/` rebuilt end-to-end against the blueprint.
**Last updated:** 2026-07-31

---

## What v2 is

The v1 `dist/` was a warm-cream single-column page. The blueprint in `docs/`
specifies a different product: **"Ink & Signal"** — ink-navy canvas, one luminous
mint accent, frosted glass, cinematic type, motion language **"Signal Flow"**.

v2 implements that blueprint on the existing zero-build static stack
(HTML + CSS + vanilla JS, no npm, no bundler). Every capability the docs asked
for is present; the Next.js/Framer/Lenis dependency list is replaced with
hand-rolled equivalents so the site stays deployable as flat files.

v1 is preserved at `dist/backup-v1/` — restore by copying those three files up
one level.

---

## Blueprint → implementation map

| Doc | Requirement | Status |
|---|---|---|
| 03 | Full token set (`--bg`, `--accent`, `--fg-*`, glass, radii) | ✅ `style.css` `:root` |
| 03 | Dark-first, light theme as `[data-theme=light]` map | ✅ toggle in nav, persisted |
| 03 | 3-font system: display / body / mono | ✅ Clash Display · Inter · JetBrains Mono |
| 03 | Fluid clamp type scale, 65–70ch measure | ✅ |
| 03 | Glass + glass-strong, `@supports` fallback | ✅ |
| 03 | Radius scale sm/md/lg/full, never mixed | ✅ |
| 03 | `SectionHeading` mono `/ label` + hairline | ✅ `.sec-head` |
| 03 | TiltCard, MagneticButton, GlowBorder, CursorGlow | ✅ |
| 04 | Easing + duration tokens | ✅ `--ease-out`, `--dur-*` |
| 04 | Loading screen, monogram draw, ≤1.5s, skippable, once | ✅ |
| 04 | Hero typewriter + particle portrait + gradient mesh | ✅ ASCII/dot particle canvas |
| 04 | Nav glass intensify + sliding active indicator | ✅ |
| 04 | About split-text word reveal + clip-path photo unmask | ✅ |
| 04 | Timeline scroll-drawn line + spring nodes | ✅ `#education` |
| 04 | Experience tabs, sliding sidebar indicator | ✅ `#experience` |
| 04 | Projects carousel + tilt/hover-lighting cards + stagger | ✅ |
| 04 | Hardware clip-path wipe + mono spec rows | ✅ |
| 04 | Skills stagger + proficiency bars fill on view | ✅ |
| 04 | Roadmap horizontal scrub (desktop) / stack (mobile) | ✅ |
| 04 | Contact magnetic button + ripple + copy-email toast | ✅ |
| 04 | Cursor spotlight + dot companion, pointer-fine only | ✅ |
| 04 | Fun Mode: minigame, achievements, easter eggs, particles | ✅ |
| 04 | `prefers-reduced-motion` first-class | ✅ every effect gated |
| 06 | Skip link, landmarks, `aria-labelledby`, focus rings | ✅ |
| 06 | Carousel/tabs WAI-ARIA keyboard patterns | ✅ |
| 06 | JSON-LD `Person`, OG/Twitter meta, canonical | ✅ |
| 02 | IA sections in blueprint order | ✅ 10 sections |
| 02 | Content-as-data — sections render from arrays | ✅ top of `script.js` |
| 01 | Honest content — no fake "coming soon" | ✅ roadmap is the honest slot |

---

## Section order shipped

1. `#home` — hero: typewriter, particle portrait, gradient mesh, magnetic CTAs
2. `#about` — split-text intro, clip-path photo, stack pills, stat cards
3. `#education` — scroll-drawn vertical timeline (IUT · HSC · SSC)
4. `#experience` — tabbed org sidebar (IUT RS · Al Biruni · Code Rush · IUPC)
5. `#projects` — featured carousel + marquee + filterable tilt-card grid
6. `#skills` — proficiency bars + tech grid + certificate strip
7. `#hardware` — flip cards: PC build specs · Arduino project + certificate
8. `#problem-solving` — Codeforces / LeetCode
9. `#photography` — campus frames, lightbox
10. `#roadmap` — honest "what's next"
11. `#contact` — magnetic CTA, copy-email, modal form
12. Footer — sitemap, socials, source note

---

## Click / interaction effects (the "click everything" pass)

- Global **click burst** — accent particles fire from every pointer press.
- **Ripple** on every `.btn`, filter chip, nav pill, and card CTA.
- **Magnetic pull** (≤10px) on primary buttons + logo.
- **Tilt + hover-lighting** (`--mx`/`--my` radial follow) on project/cert/photo cards.
- **Cursor spotlight** (400px accent radial) + 8px dot companion with hover-grow.
- **Copy email** click → clipboard + toast + achievement.
- **Photo lightbox** with arrow-key nav + Esc.
- **Flip cards** with click + keyboard (`Enter`/`Space`).
- **Konami code** → CRT scanline flash + achievement.
- **Triple-click logo** → dev joke toast.
- **Console banner** — ASCII name + hiring pitch, always on.
- Achievement toasts persist in `localStorage` (`af-achievements`).

---

## Done log

- **2026-08-03 — deployment prep**
  - Created `../../Abrar-Faiyaz07.github.io/` — a clean public repo containing only
    publishable files. `MyDocuments/` (CV source, personal photos) is deliberately
    outside it, as is `dist/backup-v1/` and 18 unused upload assets.
  - Repo named for a **user site**, so it serves at the root
    `https://abrar-faiyaz07.github.io/` rather than a `/project/` subpath.
  - `canonical`, `og:url`, `og:image`, `twitter:image` and JSON-LD `url` now point
    at that real address instead of the invented `abrarfaiyaz.dev` placeholder.
    OG images made absolute — relative OG paths don't resolve on most scrapers.
  - **Images optimised: 28.6 MB → 1.8 MB** (repo total 2.3 MB). Two 5 MB PNGs were
    being served for 230×132px marquee thumbnails, and 3.7 MB phone JPEGs for a
    ~350px photo grid. Resized to 2× display width and re-encoded as progressive
    JPEG q82. All references rewritten in both `dist/` and the repo.
  - Renamed `WhatsApp Image 2026-07-18 at 4.25.29 AM.jpeg` → `about-photo.jpg`;
    spaces in asset filenames are awkward in URLs and had already broken one
    automated pass.
  - Added `README.md` (with an "extending it" table pointing at the content
    registry), `docs/AI-USAGE.md` (assignment deliverable), `.gitignore`,
    `.nojekyll`; copied `docs/01`–`08` and `PROGRESS.md` in.
  - `git init` + first commit made locally. **Not pushed** — creating the public
    repo needs the owner.

- **2026-08-01 — owner review round 4 (Fun Mode fixes)**
  - **Layout regression fixed — this one was serious.** The new tickers are
    `width: max-content` (~2400px). A CSS grid item's automatic minimum size is
    its content's min-content width, so the About grid column blew out to
    ~3280px and shoved the entire right-hand column (photo + mini-cards) off
    screen. It was invisible rather than obviously broken only because `body`
    has `overflow-x: hidden`. Fixed with `.about-grid > * { min-width: 0 }` plus
    `max-width: 100%` on `.logo-marquee`. Columns are back to 607px / 449px.
  - **Fish could not descend.** `buildPlatforms()` matched `main li`, which now
    includes all 34 ticker chips. Those chips (a) move every frame, so captured
    rects go stale immediately, and (b) sit on a max-content track, so they
    reported positions out to x≈3283 on a 1280px viewport — carpeting the page
    in unreachable ledges. Now skips `.logo-marquee`, `.marquee` and any
    `[aria-hidden="true"]` subtree, and drops rects fully outside the viewport.
  - Added `thinPlatforms()` — collapses ledges stacked <26px apart with
    overlapping spans, which formed lids that could be landed on but not dropped
    through. Removes ~51 platforms.
  - Widened the chopped ledges' holes (65–130px, was 45–95px) so walking off an
    edge is a real route down, not just the `S` key.
  - Verified by simulation with the game's own constants: 274 platforms, all
    within the viewport; holding `S` reaches the bottom in 579 steps; and
    **walking alone now reaches the bottom** — previously it stalled.
  - **Fish faced the wrong way.** The 🐟 glyph points left by default, so
    `ctx.scale(facing, 1)` drew it facing left when moving right. Negated to
    `ctx.scale(-facing, 1)`: left arrow now faces left, right arrow faces right.
  - Removed the win-screen line "Bottom of the page reached…".

- **2026-08-01 — owner review round 3**
  - **Both About stack rows are now logo tickers** (newspaper-ticker scroll).
    "technologies I work with" scrolls left with brand marks; "currently exploring"
    scrolls **right** (`animation-direction: reverse`) as dashed text-only chips.
    Both pause on hover and on keyboard focus-within.
    - Logos are **Simple Icons (CC0) inlined as SVG paths** in the `TECH_LOGOS`
      map in `script.js` — no icon CDN, no extra requests, page stays
      self-contained. ~19 KB of path data.
    - Marks are monochrome at rest (keeps the one-accent rule) and animate to
      full brand colour with a slight rotate + scale on hover.
    - Reduced-motion **keeps the content** and just wraps it like the old pill
      list, rather than hiding it.
    - Seam maths: `gap` is deliberately *not* used on the track — a gap between
      the two duplicate passes puts the -50% translate half-a-gap off and the
      loop visibly jumps. Spacing is `margin-right` on the chips instead, so each
      half is exactly half the track. Measured seam offset: 0.2px / 0.0px.
  - **Added MySQL** alongside PostgreSQL. `SQL` has no brand mark, so it uses a
    hand-drawn database cylinder to keep the row consistent.
  - **Real LinkedIn + Instagram wired in** (nav, footer, `LINKS`, and JSON-LD
    `sameAs` so search engines tie the profiles to the Person entity).
    Codeforces (`Abrar_Faiyaz`) and LeetCode (`Caraxes007`) followed in the same
    round — **no placeholder links remain anywhere on the site.**

- **2026-08-01 — owner review round 2**
  - **Hero portrait swapped to the real photograph.** Was the illustrated version
    (`pasted-1784332992950-0.png` = `Photo_1.png`); now `uploads/Photo_1_Main.jpeg`.
    The dot/ASCII particle layer is unchanged and still draws from whatever image
    `#portrait-img` points at — swapping the file is all it takes.
    - Took the **jpeg** over the png: 57 KB vs 660 KB for identical photographic
      content, and this image is in the LCP path.
    - `og:image` / `twitter:image` updated to match, so link previews show the
      real photo.
    - Sampling verified against the new file: 6,269 particles, only 115 pixels
      skipped, good spread across the full ` .:-=+*#%@` ramp.
    - Source is square (962×962) in a 3:4 frame, so cover-fit crops ~60px from
      each side. Subject is centred, so this reads as a tighter portrait crop.
  - **Removed two About mini-cards** — "5.00 HSC GPA" and "Cumilla". Two remain
    (R&D panel, languages spoken). The HSC GPA is still in the education timeline.
  - **Fixed a real bug found while verifying:** `initPortraitParticles` bootstrapped
    off a double `requestAnimationFrame`. rAF is suspended in a background tab, so
    opening the site via middle-click / "open in new tab" — very common — meant the
    particles never built, and the `visibilitychange` handler only resumed an
    *existing* particle set. The hero would have stayed a plain photo permanently.
    Bootstrap is now ResizeObserver-based with a `setTimeout` fallback, and both
    `visibilitychange` and the IntersectionObserver now build-if-missing rather
    than only resuming.

- **2026-08-01 — owner review round 1**
  - **Skills grid:** removed CodeBlocks; added NumPy, pandas, Matplotlib, Seaborn
    (15 chips). Edit the `TECH` array in `script.js` to change these.
  - **Light theme re-skinned white + orange.** Was white + mint (a tint of the dark
    theme's accent); now pure `#FFFFFF` canvas with `--accent: #C2410C` burnt orange
    and `--accent-2: #E08707` amber for gradients. Dark theme is untouched.
    - Hard-coded mint values in the CSS (button glow, badge ping, carousel wash,
      CRT scanlines) were switched to `color-mix(… var(--accent) …)` so they follow
      whichever theme is active instead of staying green.
    - `--fg-faint` darkened to `#7A6E66` to keep AA on white.
    - Fun Mode's accent shift now has a light-theme variant (`#E2560F`).
    - Contrast re-measured in-page: body 8.33:1 · mono labels 5.18:1 ·
      faint meta 4.94:1 · headings 18.35:1 · primary button 5.18:1 — all pass AA.
  - **Roadmap trimmed** 6 cards → 4 (ML coursework, research, autonomous robotics,
    open source). Dropped the contest-rating and "writing it down" cards, and
    replaced the emoji icons with mono numerals.
  - **Copy professionalised** — removed the casual/jokey phrasing throughout:
    loader tagline, hero lead, all three About paragraphs, both education notes,
    the IUPC bullet, the Nightfall carousel line, the "hover the portrait" hint,
    the "off-duty" photo caption, the hardware card blurb, the roadmap intro, the
    modal's "Heads up:" note, and the footer's "a lot of coffee". Projects heading
    "Things I've actually built" → "Selected work".
    - Console-easter-egg jokes and the Fun Mode win screen were left alone — both
      are opt-in surfaces a recruiter never sees.

- **2026-07-31**
  - Read all 9 blueprint docs + `PROJECT_NOTES.md` + `HANDOFF.md` + real CV.
  - Backed up v1 → `dist/backup-v1/`.
  - Copied real CV → `dist/resume.pdf` (v1's Download CV was a 404).
  - Pulled real content from the CV into the content registry: education with
    GPAs, 3 certificates with issuers/dates, IUPC 26th place, Code Rush 2025,
    Al Biruni Research Society, languages.
  - Rewrote `index.html`, `style.css`, `script.js` for "Ink & Signal".
  - Ported the ASCII-particle portrait technique from the reference repo
    (`Gazi-V2/src/components/AsciiPortrait.jsx`) — the one noted-but-unbuilt
    technique in `PROJECT_NOTES.md`.
  - Kept Fish Climb Fun Mode; retuned it for the new layout.
  - Added `.claude/launch.json` (repo root) so the dev server starts with one command.

### Verified in-browser (localhost:8099)

| Check | Result |
|---|---|
| Console errors | none |
| Viewports | 375×812, 1440×900, 1920×1000 — no horizontal overflow (`scrollWidth === clientWidth`) |
| Themes | dark + light, both passed; portrait frame pinned to ink in both (ASCII only reads on dark) |
| Rendering | 3 certs · 3 photos · 9 projects · 4 exp tabs · 3 timeline nodes · 2 CP cards · 6 roadmap cards |
| Particle portrait | builds and animates; falls back to the flat `<img>` on a tainted canvas (`file://`) |
| Carousel | autoplay + progress bar + dots + arrows + swipe + arrow keys |
| Contact modal | opens, validates, focus-trapped, Esc closes |
| Lightbox | opens from photo grid, arrow-key nav, caption counter |
| Fun Mode | platforms build, fish lands, depth HUD ticks, exit restores the page |
| Theme toggle | persists, fires the achievement toast |
| A11y sweep | 1 `<h1>`, 11 `aria-labelledby` sections, no unlabelled buttons, no broken images |

### Fixes made during verification

- Carousel arrows landed on the caption below 720px → parked top-right on mobile.
- Carousel scrim was too weak over bright screenshots → added a second horizontal
  gradient so titles stay legible on any image.
- `--warning` / `--danger` washed out on the light canvas → darkened for AA;
  `.cert-badge` tint now derives from the token instead of a hard-coded rgba.
- Light theme turned the ASCII portrait unreadable → frame background pinned to ink.

---

## Answers assumed for `docs/08-open-questions.md`

v2 had to pick a default for each blocking question. Override any of these and
the change is one edit in the registry at the top of `script.js`.

| # | Question | What v2 assumed |
|---|---|---|
| 1 | Projects inventory / which are featured | All 9 real repos; featured = Nightfall, Infected Hours, Coders of Dhaka, People You May Know |
| 2 | Hardware details | Real PC spec table from v1; Arduino = the IEEE RAS workshop build + certificate |
| 3 | Domain & email | Canonical/OG set to `abrarfaiyaz.dev` (placeholder); email `abrarsamin04@gmail.com` |
| 4 | Assets | Existing illustrated portrait for the hero, beach photo for About, FlowCV resume used as-is |
| 5 | Hero identity line | Rewritten — see `.hero-lead` in `index.html` |
| 6 | Minigame concept | Kept Fish Climb (already built and liked) rather than starting a new one |
| 7 | Display font | **Clash Display** — the techy option, matching the ink/mono language |
| 8 | Fun Mode sound | **Dropped.** Unmuted-by-default audio is a liability and it was already opt-in-behind-opt-in |
| 9 | Dark-only at launch | Shipped **both** — light theme costs one token block, no reason to defer it |
| 10 | CP handles public | Yes, sections are live — but the handles themselves are still placeholders |
| 11 | Phone on the site | **Omitted deliberately.** Both numbers are in the CV but are not on the public page |

Note on #11: the resume PDF at `dist/resume.pdf` *does* contain both phone numbers
and the home city, and it is publicly downloadable. If that's not wanted, swap in a
redacted PDF — the page itself exposes nothing beyond the email.

---

## Still open (needs Abrar, not code)

These are the only remaining placeholders — everything else is real:

- [x] ~~LinkedIn URL~~ — set 2026-08-01
- [x] ~~Instagram URL~~ — set 2026-08-01
- [x] ~~Codeforces handle~~ — `Abrar_Faiyaz`, set 2026-08-01
- [x] ~~LeetCode handle~~ — `Caraxes007`, set 2026-08-01

**All four profile placeholders are now real.** Every link on the site resolves.
- [ ] **PC setup photo** — Hardware card front face still shows a text placeholder;
      drop a photo at `dist/uploads/pc-setup.jpg` and it picks it up
- [ ] **Custom domain** — open question #? in `docs/08-open-questions.md`

Search `script.js` for `yourusername` to find all four link placeholders in one place
(they live in the `LINKS` object at the top).

---

## Deliberately not built

Unchanged from `PROJECT_NOTES.md` — all of these need a real backend:

1. Contact form persistence (currently `localStorage` only — the owner never sees
   submissions). Needs Supabase/Postgres + a host.
2. Guestbook, visitor counter, project like-counts, blog, newsletter,
   resume-download counter, analytics — all depend on #1 and are **not** faked
   with local-only stand-ins, per the honest-content principle in doc 01.
3. Detail routes (`/projects/[slug]`, `/hardware/[slug]`, `/certificates`) from
   doc 02 — these need a router. The content registry in `script.js` is already
   shaped for them, so adding a build step later is additive, not a rewrite.

---

## How to preview

```bash
python -m http.server 8099 --directory PlannedWithClaudeDesign/portfolio/dist
```

Then open http://localhost:8099/ — run it from the repo root
(`D:\SaminWorks\01_portfolioWebsite`). `.claude/launch.json` has the same command
registered as the `portfolio` config.

Serve it over HTTP, don't open `index.html` directly: `file://` blocks `script.js`
in some browsers, and it taints the canvas so the ASCII portrait silently falls
back to the flat photo.

Deploying is a straight copy of `dist/` to GitHub Pages, Vercel or Netlify —
still zero build step.
