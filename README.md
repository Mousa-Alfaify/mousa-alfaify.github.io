# Mousa Alfaify — Personal Site

A bilingual (Arabic-first / English) portfolio for Mousa Alfaify, Operations Control
Specialist at the Saudi Red Crescent Authority.

Live: <https://mousa-alfaify.github.io/>

---

## Development

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build

```bash
npm run build        # type-check, bundle, prerender -> dist/
npm run preview      # serve dist/ locally
npm run typecheck
npm run lint
```

`npm run build` runs four steps:

1. `tsc -b` — type-checks the project.
2. `vite build` — bundles the client and inlines the stylesheet into `index.html`.
3. `vite build --ssr src/entry-server.tsx` — builds a server bundle.
4. `node scripts/prerender.mjs` — renders the Arabic edition to static HTML, injects it
   into `dist/index.html`, and deletes the temporary SSR bundle.

The result is a fully static `dist/` that renders without JavaScript and hydrates on load.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push
to `main`. Enable it once under **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

The site is served from the domain root, so `vite.config.ts` sets `base: '/'`. If it ever
moves to a project page (`user.github.io/repo/`), change `base` to `'/repo/'` and update the
absolute URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.

`public/.nojekyll` stops GitHub Pages from running Jekyll over the output.

---

## Architecture

```
src/
  components/     one file per section, plus shared primitives
  data/           all content — the single source of truth
  hooks/          reveal-on-scroll, media queries
  lib/            language provider and context
  styles/         design tokens
scripts/
  prerender.mjs   static HTML generation
```

### Content

Every string lives in `src/data/`, typed and bilingual:

- `profile.ts` — identity, philosophy, impact figures, roles, education, credentials, tools
- `works.ts` — the six case studies and the capability map
- `ui.ts` — navigation, section titles and interface labels
- `types.ts` — the shared shapes

Each entry carries `{ ar, en }`, so adding or editing copy never means touching a component.

### Design tokens

`src/styles/tokens.css` holds colour, type, spacing, radius, motion and z-index as CSS
variables consumed through Tailwind v4's `@theme`. The palette is white plus one brand
colour: `#192F3E`. That navy carries headings, buttons, icons, links, interactive and hover
states, and the dark sections; everything between is a cool neutral grey derived from it.
`--color-accent-2` (`#2F5B77`) is the hover step on light grounds, `--color-accent-3`
(`#8CB9D4`) the legible step on dark ones.

Every text/background pair in the palette meets WCAG 2.2 AA.

The English display name is set in black — a single, deliberate exception, made at the
owner's request. The Arabic name is supplied artwork (`public/img/name-ar-*.webp`) rather
than live type, so it is placed as an image with the same responsive rules as any other.

### Typography

Thmanyah Sans is the only typeface, in four weights (300 / 500 / 700 / 900), self-hosted as
WOFF2 from `public/fonts/`. Light, Medium and Black are preloaded — the three the first
screen is set in — which is what holds cumulative layout shift at zero. Hierarchy comes from weight and scale rather than from mixing
families. Line height and letter spacing are set per direction — Arabic gets more leading,
English gets tighter tracking.

### Motion

One motion language, defined in tokens:

| Purpose | Duration |
| --- | --- |
| Fast (hover, state) | 170 ms |
| Standard (transitions) | 380 ms |
| Slow (layered moves) | 700 ms |
| Editorial reveal | 880 ms |
| Hero entrance | 430 ms |

The hero entrance is a pure CSS animation with no JavaScript gate, so it starts at first
paint. Everything below the fold reveals through a single `IntersectionObserver` helper that
disconnects after firing. `prefers-reduced-motion: reduce` disables all of it and shows the
page in its final state.

The hero's node field is a hand-written canvas (`SystemField.tsx`) rather than a 3D library:
device-pixel-ratio capped at 2, node count scaled to viewport, and the loop paused whenever
the section leaves the viewport or the tab is hidden.

### Language

`src/lib/lang.tsx` provides the language; `src/lib/lang-context.ts` exposes `useLang()`.
Switching updates `<html lang>` and `<html dir>`, the document title and meta description,
and persists to `localStorage`. `?lang=ar` / `?lang=en` force an edition. Arabic is the
default and the prerendered edition. Layout mirrors through CSS logical properties, and the
capability diagram mirrors its own x-axis so the flow still reads from the start edge.

---

## Measured

Lighthouse against the production build:

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 92 | 100 | 100 | 100 |

Total blocking time 0 ms, cumulative layout shift 0. Shipped weight is ~38 kB of gzipped
JavaScript (Preact via `preact/compat`) plus an inlined stylesheet.

Verified: no horizontal overflow at 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728,
in both languages; full render with JavaScript disabled; keyboard traps handled in the case
reader and the mobile menu.

---

## Content accuracy

Every fact on this site is drawn from one of three sources: the previous version of the
site, Mousa's CV, or his 2025 work profile. No figure, employer, credential or project has
been invented or extrapolated.

## Entity marks

`public/img/logos/` holds the eight official marks supplied by the site owner. Each SVG is
unmodified apart from its root `<svg>` tag, where the `viewBox` was tightened to the mark's
real bounding box and fixed `width`/`height` removed so CSS controls the rendered size.
Colours, paths and proportions are untouched; the `scale` field in `entityLogos` is an
optical balance only and never distorts a mark.

## Typeface licence

Thmanyah Sans is bundled in `public/fonts/`. The WOFF2 files are unmodified conversions of
the supplied family. If Thmanyah's licence permits subsetting, subsetting these files to the
glyphs the site actually uses would cut roughly 200 kB from the fonts and is the single
largest remaining mobile performance win.
