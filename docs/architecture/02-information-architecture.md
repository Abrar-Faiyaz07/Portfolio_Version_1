# 02 — Information Architecture & Sitemap

## Architecture decision: hybrid single-page + detail routes

The brief lists 20+ "sections." Rendering 20 nav items would destroy the premium feel and recruiter journey. Instead:

- **One cinematic homepage** with 7–8 scroll sections (the Gazi-Jarin pattern from the design PDF, elevated).
- **Detail routes** for anything with depth (projects, hardware, research later).
- **Data-driven aggregation pages** (`/projects`, `/certificates`) for completeness.
- Sections with empty content arrays are **not rendered** (honest-content principle).

## Sitemap (v1)

```
/                       Home (single scroll experience)
  #hero                 Hello / identity / typewriter + particle portrait
  #about                About me + photo + current-technologies list
  #education            Education & journey timeline (IUT, HSC, SSC)
  #experience           Experience & involvement (tabbed sidebar: IUTCS volunteer,
                        Al Biruni RS, IUT Robotics Society, Code Rush 2025)
  #projects             Featured software (carousel hero project + card grid,
                        grouped by language: Python / C++ / C / Java)
  #hardware             Hardware & Arduino (PC setup + Arduino team project)
  #skills               Skills / tech stack / certificates strip
  #roadmap              Future roadmap (honest "what's coming": AI/ML coursework,
                        research, open source)
  #contact              Contact CTA + socials

/projects               All projects, filterable by language & domain (AI/ML,
                        Game Dev, Arduino, CP tools) — filters only appear when
                        ≥2 items exist in that domain
/projects/[slug]        Project case study ("product page"): hero media, overview,
                        tech stack, architecture, challenges, lessons, links,
                        future improvements
/hardware/[slug]        Hardware build log (PC setup, Arduino projects)
/certificates           Certificate gallery (3 real certs: Arduino & Robotics,
                        AgentX, AI+ Prompt Engineer L1)
/resume                 Redirect/viewer for the PDF resume (also direct /resume.pdf)
/fun                    (No route — Fun Mode is a client state, not a page)

Future (schema ready, not built in v1):
/research, /blog, /achievements, /open-source
```

## Navigation model

- **Sticky glass navbar:** Name/logo · About · Experience · Projects · Hardware · Contact · [Resume button] · [Fun Mode toggle] · social icons (mail, GitHub, LinkedIn).
- Nav items are generated from the content registry — a section with content auto-appears.
- Mobile: glass sheet menu, same order, Resume button prominent.
- Footer: full sitemap, "Built with Next.js · view source" link (engineer credibility).

## Content model (the extensibility core)

All content lives in `src/content/` as typed TypeScript objects (v1) with an easy migration path to MDX for long-form case studies.

```ts
// Every renderable item shares:
interface ContentBase {
  slug: string;
  title: string;
  date: string;          // ISO — powers "recently added" and timeline ordering
  published: boolean;    // false = exists in repo, hidden on site
  featured?: boolean;    // surfaces on homepage
}

Project      extends ContentBase { summary; description; languages: Language[];
              domains: Domain[]; techStack: Tech[]; repoUrl?; liveUrl?;
              media: Media[]; architecture?; challenges?; lessons?; future?; }
HardwareItem extends ContentBase { specs: SpecRow[]; buildLog?; media; }
Certificate  extends ContentBase { issuer; validUntil?; verifyUrl?; image; }
TimelineItem extends ContentBase { org; role; kind: 'education'|'experience'|
              'activity'|'achievement'; bullets: string[]; }
Skill        { name; category; level?; icon; }
```

**Rule:** components never contain content strings. Adding a hackathon win in 2027 = one new object in `timeline.ts`. This is the "no redesign for 4 years" guarantee.

## Seed content (from CV/LinkedIn — to be expanded by Abrar)

- **Identity:** Abrar Faiyaz · CSE @ IUT (2024–2028) · Cumilla/Gazipur, Bangladesh · focus: AI/ML, GenAI, prompt engineering, robotics, CP.
- **Education:** IUT BSc CSE (2024–present) · HSC Ibne Taimiya (GPA 5.00) · SSC (GPA 4.86).
- **Experience/activities:** Code Rush 2025 volunteer (IUTCS) · General Executive Member, Al Biruni Research Society · General Executive Member, IUT Robotics Society.
- **Achievements:** IUPC @ IUT — 26th (team) · Arduino & Robotics workshop.
- **Certificates:** Basic Arduino & Robotics (IEEE RAS IUT SBC) · AgentX (NetCom) · AI+ Prompt Engineer L1 (AI CERTs).
- **Skills:** C, Python, C++ · PostgreSQL, DSA, OOP · Git, VS Code, Arduino IDE · Codeforces, LeetCode.
- **Projects:** to be collected (GitHub: Abrar-Faiyaz07 — e.g. "People You May Know" Python recommendation engine, JavaFX student table, book recommendation OOP project). **Open question #1 in doc 08.**
