# abrar-faiyaz07.github.io

Personal portfolio of **Abrar Faiyaz** — Computer Science & Engineering student at
the Islamic University of Technology (IUT), Bangladesh.

**Live:** https://abrar-faiyaz07.github.io/Portfolio_Version_1/

Built by hand: HTML, CSS and vanilla JavaScript. No framework, no build step, no
dependencies. `git push` is the deploy.

---

## Why no framework

The site is the portfolio piece, not just the container for one. Every part of it —
the design token system, the scroll-reveal engine, the ASCII-particle portrait, the
carousel, the tabs, the platformer — is written from scratch rather than assembled
from packages. It ships as three static files that any host can serve.

| | |
|---|---|
| Markup | `index.html` — semantic landmarks, JSON-LD, OG/Twitter meta |
| Design system | `style.css` — CSS custom-property tokens, dark + light themes |
| Behaviour | `script.js` — content registry + all interaction |
| Assets | `uploads/` |
| Resume | `resume.pdf` |
| Assignment report | [`REPORT.md`](REPORT.md) — comprehensive engineering & design report |
| Process & AI disclosure | [`docs/AI-USAGE.md`](docs/AI-USAGE.md) |
| Architectural blueprint | [`docs/architecture/`](docs/architecture/) — 9-part system specification |

## Features

- **Two themes** — ink-navy dark and white/orange light, persisted in `localStorage`
- **ASCII-particle portrait** — the hero photo is sampled into density-mapped glyphs
  that scatter from the cursor and spring back (canvas, no library)
- **Motion system** — scroll reveals, split-text, magnetic buttons, tilt cards with
  cursor-following hover lighting, scroll-drawn timeline, count-up statistics
- **Logo tickers** — the tech stack scrolls as a continuous marquee with inlined
  Simple Icons brand marks
- **Fun Mode** — a hidden platformer where every line of text on the page becomes a
  platform and the win condition is reaching the footer
- **Accessible** — skip link, landmarks, focus-visible rings, WAI-ARIA tabs and
  carousel, full `prefers-reduced-motion` support, AA contrast in both themes

## Run locally

Serve over HTTP — opening `index.html` directly blocks `script.js` in some browsers
and taints the canvas, which silently disables the particle portrait.

```bash
py -m http.server 8099
```

Then open http://localhost:8099

## Extending it

All content lives in a registry at the top of `script.js`. Adding to the site means
editing an array, never touching a component.

| To add | Edit |
|---|---|
| A project | `PROJECTS` (set `featured: true` to surface it) |
| A featured carousel slide | `CAROUSEL` |
| A degree or school | `EDUCATION` |
| A role or society | `EXPERIENCE` |
| A certificate | `CERTIFICATES` |
| A skill bar / tech chip | `SKILL_BARS` / `TECH` |
| A photo | `PHOTOS` |
| A future plan | `ROADMAP` |

New sections follow the existing pattern: a `<section class="section">` with a
`.sec-head`, rendered from its own array.

## Credits

- Type: [Clash Display](https://www.fontshare.com/fonts/clash-display) (Fontshare),
  Inter and JetBrains Mono (Google Fonts)
- Brand marks: [Simple Icons](https://simpleicons.org/) (CC0), inlined as SVG paths
- Technique reference: the ASCII-portrait idea was adapted from
  [Gazi Jarin's portfolio](https://www.gazijarin.com/) — reimplemented from scratch
  in vanilla JS, no code or copy reused

## AI assistance

This site was built with AI assistance. See [`docs/AI-USAGE.md`](docs/AI-USAGE.md)
for the tools used and the full history of instructions given.

## License

Code is MIT. Photographs, the resume, and personal images are © Abrar Faiyaz and are
not covered by that licence — please don't reuse them.
