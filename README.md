# Mohammad KaraBala — Portfolio

Personal site of an AI & Automation Engineer. Designed from first principles as a
premium, fast, data-driven developer portfolio: a graphite-and-ivory visual system
with one signal accent, editorial typography, generated pipeline schematics for
every project, and a hand-written WebGL "lattice" as the hero object.

Live: https://karabala-portfolio.vercel.app/

## Highlights

- **Zero UI/animation/3D libraries.** React 18 + TypeScript + Vite only. The 3D hero
  is ~4 kB of raw WebGL (`src/gl/lattice.ts`); motion is CSS transitions,
  scroll-driven animations and one IntersectionObserver.
- **Prerendered.** The build renders the app to static HTML and hydrates on the
  client, so crawlers and no-JS readers get the full content.
- **Adaptive quality.** `src/lib/device.ts` derives a tier (`high` / `low` /
  `static`) from reduced-motion, save-data, cores, memory and viewport. The
  lattice, cursor light and parallax all consult it.
- **Data-driven content.** Everything visible comes from `src/content/*.ts`.
  Adding a project, skill, role or section is a data change.
- **Accessible.** Semantic landmarks, skip link, visible focus rings, keyboard
  command menu (⌘K / Ctrl+K), reduced-motion fallbacks, no hover-only content.

## Structure

```
portfolio/
  index.html              meta, fonts, theme + JS-gating inline script, LCP preload
  scripts/
    prerender.mjs         injects SSR markup into dist/index.html after build
    portrait.sh           generates responsive WebP/JPEG portrait variants
  src/
    content/              the content model (types + data) — edit these
    styles/               tokens.css (design tokens) · base.css · utilities.css
    ui/                   primitives: Button, Tag, TextLink, Kbd, Icon, SectionShell
    chrome/               site chrome: TopBar, Rail (desktop nav), Dock (mobile nav),
                          CommandMenu, Atmosphere (background system), Footer
    sections/             Hero, Work (+ Schematic), Capabilities, Track, Approach, Contact
    gl/                   WebGL lattice (framework-agnostic) + React wrapper
    lib/                  hooks & utilities (theme, reveal, active section, dates, …)
```

### Design system

Tokens live in `src/styles/tokens.css`: colour (dark + paper themes), a fluid type
scale, spacing, radii, elevation, motion easings/durations and z-layers. Components
use CSS Modules and read tokens only — no hard-coded values.

### Sections & navigation

`src/content/sections.ts` is the registry. The rail, dock, command menu, active-
section observer and the atmosphere glow position all derive from it.

## Development

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck → client build → SSR build → prerender into dist/
npm run preview    # serve dist/
npm run lint
npm run assets:portrait   # regenerate public/portrait/* from public/karabala.jpeg
```

Node 22 (see `portfolio/.nvmrc`).

## Updating content

| What | Where |
| --- | --- |
| Name, title, headline, availability, contact, "now" | `src/content/profile.ts` |
| Projects (case rows + ledger, schematic flow, links) | `src/content/projects.ts` |
| Capability pillars and skill levels | `src/content/capabilities.ts` |
| Experience & education | `src/content/experience.ts` |
| Engineering principles | `src/content/principles.ts` |
| Social profiles | `src/content/profile.ts` (`socials`) |
| Sections / order / nav | `src/content/sections.ts` + `src/App.tsx` |

Set `featured: true` on a project to render it as a full case row; the rest appear in
the compact ledger. The `flow` array drives the generated schematic.
