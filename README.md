# Meridian

A fictional watchmaker, built as a single scroll-driven page.

**Live:** https://showmikbhowmik.github.io/meridian/

## What's on the page

- **Hero** — a wordmark the width of the screen and a watch that turns once every ninety seconds.
- **Anatomy** — the signature chapter. The watch is ten stacked SVG layers (strap, caseback, mainplate, calibre, dial, hands, case, crown, bezel, crystal). One pinned GSAP timeline tilts it into perspective, spreads the layers along z, pins a leader-line label to each part, holds, then reassembles. On phones the labels become a single caption that follows the part being separated.
- **Collection** — five dials on a horizontal rail. Pinned and scrubbed sideways on desktop; a native scroll-snap rail on touch.
- **Calibre** — the spec sheet, with numbers that count up as they enter.
- **Materials** — five photographs lit by a spotlight that follows the pointer (or drifts on its own on touch).
- **Private viewing** — a magnetic button that leans toward the cursor.

## Stack

Vite · React 18 · TypeScript · GSAP 3 + ScrollTrigger · Lenis · self-hosted variable fonts (Bodoni Moda, Hanken Grotesk).

```bash
npm install
npm run dev      # local dev server
npm run build    # static build in dist/
npm run preview  # serve the build
```

Deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`. The Vite `base` is `/meridian/`.

## Notes

- `prefers-reduced-motion` disables the smooth scroll, the rotation, the count-ups and the scrubbed timelines; every chapter still reads.
- The watch is drawn, not photographed: every layer is hand-authored SVG in `src/components/Watch.tsx`, so it stays crisp at any size and weighs nothing.
- Photographs in `public/img` are from Unsplash; see `public/img/CREDITS.md`.
- Meridian is a concept study. The brand, the calibre and every number on the page are invented.
