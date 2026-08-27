# 01 — Project Vision, Personas & User Journeys

## Project Vision

**Working title:** `abrarfaiyaz.dev` — a personal engineering product, not a portfolio page.

Abrar Faiyaz is a CSE undergraduate at IUT (2024–2028) focused on AI/ML, Generative AI, prompt engineering, robotics/embedded systems, and competitive programming. This site must:

1. **Feel like a product** — the first reaction should be *"who built this?"* The site itself is Project #1: proof of engineering taste, motion craft, and attention to detail.
2. **Serve recruiters in under 60 seconds** — clear identity, top projects, resume, contact. Everything cinematic must be skippable.
3. **Grow for 4+ years without redesign** — all content (projects, research, achievements, certificates) is data-driven from typed content files. Adding a project = adding a file, never touching components.
4. **Carry a dual personality** — a clean professional default, and an opt-in **Fun Mode** (minigame, easter eggs, achievements, sound) that never blocks or degrades the professional path.

### Positioning statement
> "An AI-focused CSE student who builds like a senior engineer." The site should over-index on *craft* to compensate for a short experience section — the quality of the site is the experience.

### Non-goals
- Not a blog-first site (blog/articles are a future module, planned for but not built in v1).
- Not a 3D-heavy showpiece — R3F is used only if a specific moment justifies it (hero particle portrait), never site-wide.
- No CMS in v1. Typed TS/MDX content files in the repo are the CMS.

### Honest-content principle (team challenge to the brief)
The section list in the brief (Research, Open Source, AI/ML, Game Dev…) exceeds current real content. **Empty sections damage credibility more than missing sections.** The IA therefore ships every section as a *capability* (route + component + content schema exist), but the nav and homepage only render sections whose content arrays are non-empty. "Coming soon" placeholders are banned; the Future Roadmap section is the one honest place to say what's next.

## User Personas

### P1 — "The Recruiter" (primary)
- Screening 50 candidates; gives the site 30–90 seconds, often on a laptop, sometimes mobile.
- Needs: who is this, what have they built, resume PDF, contact — in ≤3 scrolls or ≤2 clicks.
- Design implication: hero communicates identity in 5 seconds; sticky nav with Resume + Contact always visible; loading screen ≤1.5s and skippable; Fun Mode OFF by default.

### P2 — "The Engineer / Open-source maintainer"
- Arrives from GitHub or a PR. Judges code taste, stack choices, project depth.
- Needs: project case-study pages with architecture & challenges, GitHub links everywhere, fast site, dark mode.
- Design implication: project pages read like engineering write-ups, not marketing pages. Lighthouse scores are part of the pitch.

### P3 — "The Professor / Researcher"
- Evaluating for research assistantships (Al Biruni Research Society context).
- Needs: education, research interests, certificates, seriousness. Low tolerance for gimmicks.
- Design implication: calm typography, working reduced-motion mode, printable resume.

### P4 — "The Hackathon Judge / Peer"
- Curious, playful, on any device. Will find Fun Mode and love it.
- Needs: personality, the minigame, easter eggs, memorable moments.
- Design implication: Fun Mode is discoverable (visible toggle) but clearly optional.

## User Journeys

### J1 — Recruiter (goal: shortlist decision, <90s)
1. Lands on `/` → brief premium load (skippable, remembered via localStorage) → hero: name, one-line identity, CTA row (Resume · GitHub · Contact).
2. Scrolls: About snapshot → Featured Projects (3) → Skills → Contact.
3. Clicks Resume → PDF opens in new tab. Done. **Every step ≤1 interaction from the sticky nav.**

### J2 — Engineer (goal: assess depth, 3–5 min)
1. Lands on a shared project URL `/projects/[slug]` directly — pages must stand alone (own hero, own SEO).
2. Reads architecture/challenges → GitHub → back to `/projects` grid filtered by language (Python / Java / C++ / C groupings from the design PDF).

### J3 — Judge with Fun Mode (goal: delight, unbounded)
1. Toggles Fun Mode in nav → subtle theme energy shift + minigame invitation in hero (completing it scrolls you down, per the design PDF) → easter eggs and achievement toasts throughout.
2. Toggling OFF instantly restores the professional site. State persists in localStorage. Deep-linked professional URLs never auto-enable Fun Mode.

### J4 — Return visitor
- Loading screen skipped automatically; new content surfaced via "Recently added" ordering (content files carry dates).
