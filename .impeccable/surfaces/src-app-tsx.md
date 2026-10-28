---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["index.html"]
---

# Surface: the Meridian single page (index route)

Scope: one continuous Persuade page. Visitor: someone judging the brand (in fiction) or the builder's craft (in truth), usually from a portfolio link, half the time on a phone. Action: scroll the whole thing; secondary action: "Request a private viewing" (nav + footer, no backend).

Constraints: user-pinned stack (Vite + React + TS, GSAP ScrollTrigger, Lenis), dark ground, one accent, one display serif + one grotesk, SVG watch parts, must work on mobile, reduced motion honoured.

## Direction contract

THESIS: The watch is the page. One object seen in the dark, taken apart by the visitor's own scroll and put back together, annotated like a manufacture's engineering drawing. It refuses the luxury split hero (copy left, product right) and the row of equal feature cards.

OWN-WORLD: Ground is graphite night (#0A0C10) with raised surfaces at #121519; type is warm bone (#EDE6DA) with secondary tinted to #9A9588; the single accent is lume phosphor (#CFF2B0), spent only where a watch would glow: lume plots and hand tips, leader-line nodes, live numerals, and the one button. Metals are drawn in SVG gradients (brushed steel, grey gold). Bodoni Moda carries display (hairline Didone, optical size on), Hanken Grotesk carries text and tabular numerals. Hairline rules at 1px, 14% bone. Labels are pinned to parts with leader lines ending in a dot node (raise: tensegrity's node annotation; layout obeys the part, not a text grid).

STORY: A watch turns slowly in the dark under a wordmark the width of the screen. Scrolling pulls it apart into ten named components and closes it again. The collection slides past sideways. The calibre's numbers count themselves up. A spotlight under the cursor reveals the materials. The page ends with one invitation.

FIRST VIEWPORT: Full-bleed graphite. Hairline nav at top: wordmark small left, four chapter links centre, "Private viewing" right. "Meridian" in Bodoni at ~17vw spans the width, baseline near 42vh. The assembled watch (SVG, ~72vh tall) sits centred and overlaps the wordmark's lower half, rotating once per 90s, seconds hand sweeping. Bottom-left: "Calibre M-01 · 72-hour reserve"; bottom-right: "Scroll to disassemble" with a thin vertical scroll line. Primary action on this surface is the scroll itself.

FORM: Brief-pinned exploded-object page (user-supplied; not from the ranked list). seed:f5fd897bf7bd9e13. Signature interaction: a pinned GSAP timeline, scrubbed, separating ten SVG layers in perspective with leader-line labels drawing in, then reassembling. Motion grammar: expo.out, scrub-bound, continuous hero rotation, no repeated section entrances.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
