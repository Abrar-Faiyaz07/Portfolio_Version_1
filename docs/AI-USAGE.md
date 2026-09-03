# AI usage disclosure

Submitted as part of the portfolio assignment deliverable:
*"If you used any AI tools, the names of the tools and the history of the sent prompts."*

## Tools used

| Tool | Model | Used for |
|---|---|---|
| **Claude Code** (Anthropic) | Claude Opus 5 | Design-system implementation, all HTML/CSS/JS, in-browser verification, image optimisation, this repo's scaffolding |

No other AI tools were used. No code was copied from another portfolio — where an
existing site inspired a technique (the ASCII-particle portrait), it was
reimplemented from scratch; see the credits in the README.

## How the work was done

The site was **not** produced from a single prompt. It was built across an iterative
session: a planning phase (`docs/01`–`docs/08`, written before implementation), a
build phase, then repeated rounds of visual review where I inspected the running
site and gave corrections.

Each change was verified in a real browser before being accepted — console errors,
computed styles, contrast ratios, layout measurements at three viewport widths, and
physics simulation for the platformer.

## History of instructions given

Chronological. Paraphrased where the original was shorthand; intent preserved.

### 1 — Initial build
> Go to `PlannedWithClaudeDesign/portfolio` (the initial conceptual tablet design plan is located at `docs/architecture/initial-tablet-design-plan.pdf`). Read the full planning and implement
> the code. Make it advanced and polished, add more design animation, hero styled
> like a top award-winning portfolio, click effects on everything. Create a file to
> trace progress. Look at the other portfolios in the parent folders and take
> inspiration to make mine better.

Result: read all 9 planning docs + the initial tablet design plan (`initial-tablet-design-plan.pdf`) + the real CV; rebuilt `dist/` end-to-end against
the "Ink & Signal" blueprint; 11 sections; ported the ASCII-portrait technique from
the reference repo; created `PROGRESS.md`.

### 2 — Local preview
> Browse from server to get design, everything you need.
> How to run it?

Result: dev server, verification workflow, and the `py -m http.server` instructions
(the `python` command was not on PATH).

### 3 — Content and theme corrections
> Remove CodeBlocks. Add NumPy, pandas, Matplotlib and Seaborn. In light mode the
> colour theme should be white and orange. Trim the "what's coming next" section.
> Remove unwanted text to make it fully professional.

Result: skills grid updated; light theme re-skinned white + burnt orange (contrast
re-measured for AA); roadmap 6 cards → 4; casual phrasing removed site-wide.

### 4 — Database additions
> Beside PostgreSQL also add MySQL.

### 5 — Hero portrait and About cards
> Remove the HSC 5.00 and Cumilla cards. `Photo_1.png` will be replaced by
> `Photo_1_Main.png` or jpeg, but the dot image will still be there.

Result: hero swapped from the illustrated portrait to the real photograph, with the
particle layer retained. Uncovered and fixed a bug where the particle effect never
initialised in a background tab.

### 6 — Copy removals
> Remove "Both cards flip — click or press Enter" and "Have an idea? Let's talk".

### 7 — Stack ticker
> In the technologies part I saw my friend's website — there they were moving like
> a newspaper heading, with their logo animation. See if you can add them.
> Make "currently exploring" also like that.

Result: both stack rows became continuous tickers scrolling in opposite directions,
with Simple Icons brand marks inlined as SVG.

### 8 — Real profile links
> LinkedIn and Instagram URLs. Then LeetCode and Codeforces URLs.

Result: all four placeholders replaced; JSON-LD `sameAs` updated.

### 9 — Positioning
> Remove "prompt engineering" from the hero paragraph.

### 10 — Fun Mode bug reports
> The fish can't go down because of the platforms — arrange them properly. And when
> I press the left arrow the fish faces right; I want it to face left, and right
> arrow to face right.

Result: platform builder now excludes the moving tickers (which were generating
unreachable ledges out to x≈3283 on a 1280px viewport); added a thinning pass;
widened gaps. Fixed the sprite flip — the 🐟 glyph faces left by default, so the
scale had to be negated. This also surfaced a CSS Grid regression the tickers had
caused, which was pushing the About section's right column off-screen.

### 11 — Deployment
> Remove the win-screen text. Then: the assignment requirements, and — is a simple
> database (names, messages) possible free of cost on GitHub / Vercel?

Result: this repo scaffolded, canonical URL pointed at the real GitHub Pages
address, images optimised (28.6 MB → 1.8 MB), and this document written.

## Note on completeness

The above is a faithful summary rather than a verbatim transcript. For the raw
conversation, export the session directly from Claude Code.

## What was human-directed

Every design decision, correction and content choice above originated from me. The
planning documents in `docs/01`–`docs/08` defined the design system, motion
language, information architecture and accessibility targets before any code was
written; the implementation was held to them. All personal content — projects,
education, certificates, achievements — is factual and taken from my CV.
