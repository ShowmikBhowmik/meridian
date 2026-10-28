# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, GSAP + ScrollTrigger, Lenis smooth scroll. Static build deployed to GitHub Pages. (Pinned by the user's brief.)

## Users

*Inferred from the brief; the interview was skipped at the user's request.*
Primary: visitors evaluating the builder's front-end craft (a portfolio showcase piece). Secondary, in-fiction: prospective buyers of a high-end mechanical watch browsing on desktop and phone.

## Product Purpose

Meridian is a fictional independent watchmaker. The site is a single-page brand experience whose job is to look expensive and run flawlessly on desktop and mobile, demonstrating scroll-driven motion craft (GSAP ScrollTrigger) and production-grade front-end engineering.

## Positioning

The signature moment is an exploded-view scroll: the watch separates into its layered components on the z-axis as the visitor scrolls, each part labelled, then reassembles. No real watchmaker site is cloned; the brand, calibres, and names are invented.

## Operating Context

Visited from a portfolio link or GitHub README, often on a phone. One continuous scroll, no routing. Served statically from GitHub Pages under a sub-path.

## Capabilities and Constraints

- Chapters, in order: hero (giant serif wordmark, slow-rotating watch); exploded-view pinned section; horizontal-scroll collection rail; specs with count-up numbers; materials with cursor-following spotlight; footer with magnetic button.
- Watch parts are authored as layered SVG (8 to 12 parts) so they stay crisp and light.
- Mobile must work fully: pinned scroll, horizontal rail, and hover-only effects need touch fallbacks.
- Reduced-motion preference must be respected.
- No backend, no forms that submit anywhere, no real commerce.

## Brand Commitments

- Name: Meridian. Fictional; do not borrow a real watchmaker's name, layout, or wordmark.
- Dark ground, one accent colour, one display serif plus one grotesk, generous whitespace (pinned by the brief).
- Voice: restrained, technical, confident. Specs read like a calibre sheet.

## Evidence on Hand

None. All product copy, calibre names, specifications, and collection pieces are invented and must read as fiction. No testimonials, prices, awards, or retailer claims may be presented as real. Imagery is either authored SVG or openly licensed stock.

## Product Principles

1. The scroll is the product: every chapter earns its motion by revealing something about the watch.
2. Precision over noise: one accent, one rhythm, type that behaves like engraving.
3. Never break on a phone: motion degrades gracefully, content is always reachable.
4. Invented, but internally consistent: calibre numbers, reserves, and materials agree everywhere they appear.

## Accessibility & Inclusion

Honour `prefers-reduced-motion`. Keyboard-reachable interactive elements. Text contrast meets WCAG AA against the dark ground.
