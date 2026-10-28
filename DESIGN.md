---
name: Meridian
description: One mechanical watch, seen in the dark and taken apart by the visitor's own scroll.
colors:
  ground: "#0a0c10"
  ground-2: "#0e1116"
  surface: "#121519"
  surface-2: "#181c22"
  bone: "#ede6da"
  bone-2: "#b9b2a5"
  bone-3: "#8a847a"
  rule: "rgba(237, 230, 218, 0.14)"
  rule-soft: "rgba(237, 230, 218, 0.08)"
  lume: "#cff2b0"
  lume-bright: "#dcf8c4"
  lume-dim: "rgba(207, 242, 176, 0.45)"
  lume-glow: "rgba(207, 242, 176, 0.22)"
  steel-light: "#dfe1e3"
  steel: "#8d9096"
  steel-dark: "#2d3137"
  blued-steel: "#2b3f8f"
  grey-gold: "#caa15c"
typography:
  display:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(5.5rem, 17.5vw, 21rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.035em"
    fontVariation: "'opsz' 96"
  headline:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
    fontVariation: "'opsz' 96"
  figure:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(3rem, 5.5vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.03em"
    fontFeature: "lining-nums tabular-nums"
  title:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 48"
  part-name:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.005em"
    fontVariation: "'opsz' 24"
  aside:
    fontFamily: "Bodoni Moda Variable, Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    fontVariation: "'opsz' 48"
  body:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum' 1, 'ss01' 1"
  body-small:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  label:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  reference:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  hairline: "2px"
  scrollbar: "8px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  gutter: "clamp(20px, 4vw, 64px)"
  chapter: "clamp(96px, 14vh, 180px)"
  chapter-mobile: "96px"
  row: "28px"
  tile-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.lume}"
    textColor: "{colors.ground}"
    typography: "{typography.part-name}"
    rounded: "{rounded.full}"
    padding: "24px"
    size: "clamp(200px, 22vw, 260px)"
  button-primary-hover:
    backgroundColor: "{colors.lume-bright}"
    textColor: "{colors.ground}"
  nav-link:
    textColor: "{colors.bone-2}"
    typography: "{typography.nav}"
    padding: "6px 0"
  nav-link-hover:
    textColor: "{colors.bone}"
  nav-cta:
    textColor: "{colors.lume}"
    typography: "{typography.nav}"
    padding: "6px 0"
  spec-row:
    textColor: "{colors.bone}"
    padding: "28px 0"
  material-tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.hairline}"
    padding: "48px 22px 18px"
  part-label:
    textColor: "{colors.bone}"
    typography: "{typography.part-name}"
    padding: "0 0 0 18px"
---

# Design System: Meridian

## Overview

**Creative North Star: "The Manufacture's Drawing"**

Meridian is one object seen in the dark. The page is a graphite-night ground on which a single watch, drawn entirely in layered SVG, is turned, taken apart, annotated and reassembled. Everything else on the page behaves like the engineering drawing around that object: hairline rules, pinned part labels with leader lines ending in a dot, tabular numerals that count themselves up, and a display Didone that reads like engraving rather than advertising. Density is low on purpose; chapters begin with roughly a viewport of air and nothing competes with the watch for light.

Light is rationed. Warm bone type on near-black carries almost every word; the one accent, lume phosphor, is spent only where a watch would actually glow: index plots and hand tips, leader-line nodes, unit abbreviations beside the live figures, the scroll cue, the nav's "Private viewing" link, and the single circular button at the end. Metals (brushed titanium, grey gold, blued steel) exist only inside the SVG watch and never leak into the UI chrome. The build confirms the direction contract's refusals: no split hero with copy beside product, no row of equal feature cards, no second accent.

**Key Characteristics:**
- Graphite ground, warm bone type, one phosphor accent; metals live only in the drawn watch.
- Bodoni Moda at optical size 96 for display, 48 for titles, 24 for labels; Hanken Grotesk with tabular numerals for everything that must be read.
- 1px hairline rules at 14% bone are the only structural lines; there are no boxes or borders around content.
- Depth is ambient (soft drop shadows under the watch, a phosphor halo under the button); no hard or offset shadows anywhere.
- Motion is scrub-bound to the scroll or runs as slow continuous mechanism; entrances use expo.out once and never repeat.

## Colors

A near-monochrome of graphite and warm bone with one phosphor, lit the way a watch dial is lit in the dark.

### Primary
- **Lume Phosphor** (`{colors.lume}`): the only accent. Used at full strength for lume plots and hand tips inside the SVG, leader-line dot nodes, the unit abbreviation beside each counted figure ("H", "VPH", "MM"), the scroll cue, the nav CTA, the collection rail hint, the materials lamp, text selection, and the single circular button's fill. **Lume Bright** (`{colors.lume-bright}`) exists only as that button's hover fill.
- **Lume Dim** (`{colors.lume-dim}`) strokes the leader lines; **Lume Glow** (`{colors.lume-glow}`) is the halo colour of the materials lamp and (at a different alpha, see Elevation) the button's shadow and the footer's floor glow.

### Neutral
- **Graphite Night** (`{colors.ground}`): the page ground, the HTML background, the theme-color, and the text colour on the lume button. Gradients that fade content to the ground use this colour's rgb at varying alpha (hero floor, nav scrim, material caption scrim).
- **Graphite Night 2** (`{colors.ground-2}`), **Raised Surface** (`{colors.surface}`), **Raised Surface 2** (`{colors.surface-2}`): tonal steps for raised planes. In the build only `surface` is used, as the base of each material tile beneath its photograph.
- **Bone** (`{colors.bone}`): primary type, the wordmark, headlines, figures, part names, hover state of nav links, favicon stroke.
- **Bone 2** (`{colors.bone-2}`): secondary text: body paragraphs under headlines, nav links at rest, spec labels, the hero's calibre line, footer links, italic asides, material titles before they are lit.
- **Bone 3** (`{colors.bone-3}`): tertiary text: spec notes, collection references, footer legal, the italic subhead beside "Materials", separators in the hero line, the scrollbar track colour.
- **Hairline** (`{colors.rule}`): every 1px structural rule (spec rows, collection meta, footer foot). **Hairline Soft** (`{colors.rule-soft}`) is defined for lighter dividers and currently unused by any surface.

### Watch metals (SVG only)
- **Brushed Titanium** (`{colors.steel-light}` to `{colors.steel}` to `{colors.steel-dark}`): the gradient stops of case, bezel, lugs, crown and crystal rim.
- **Blued Steel** (`{colors.blued-steel}`): hands, screws, hairspring and the central pivot.
- **Grey Gold** (`{colors.grey-gold}`): gear train and rotor accents in the movement layer.
These stops are the watch's material palette and are never used for UI.

### Named Rules
**The Lume Budget Rule.** Phosphor appears where a watch would glow and nowhere else: plots, tips, nodes, units, one cue, one CTA link, one button. If a new surface wants a second lume element in the same viewport, one of them is wrong.

**The Metals Stay in the Case Rule.** Titanium, gold and blued-steel values exist only inside `Watch.tsx` gradients. UI chrome is graphite, bone and lume only.

**The Fade-to-Ground Rule.** Content never ends with a hard edge against the page; it fades into Graphite Night via a vertical gradient (hero floor 28vh, nav scrim, material captions).

## Typography

**Display Font:** Bodoni Moda Variable (with Bodoni 72, Didot, Georgia, serif)
**Body Font:** Hanken Grotesk Variable (with Helvetica Neue, Arial, sans-serif)

**Character:** A hairline Didone that behaves like engraving, paired with a quiet grotesk carrying tabular numerals. The serif is always weight 400 and always sets its optical size explicitly: 96 for display and headlines, 48 for titles and italic asides, 24 for part names, the nav and footer wordmark, and the button. The grotesk never shouts; it is the voice of the calibre sheet.

### Hierarchy
- **Display** (400, `clamp(5.5rem, 17.5vw, 21rem)`, 0.82, -0.035em, opsz 96): the hero wordmark only, spanning the viewport width with the watch overlapping its lower half.
- **Headline** (400, `clamp(2.5rem, 5vw, 5rem)`, 0.95, -0.025em, opsz 96): chapter headings ("The collection", "Calibre M-01", "Materials"). The footer invitation runs larger (`clamp(2.75rem, 6.5vw, 6.5rem)`, -0.03em); the pinned exploded chapter runs smaller (`clamp(2rem, 3.6vw, 3.5rem)`, line-height 1, max 12ch) so it clears the stage. On phones all headlines collapse to 2.75rem (exploded: 1.75rem).
- **Figure** (400, `clamp(3rem, 5.5vw, 5.25rem)`, 0.9, -0.03em, tabular lining nums): the counted specification values, right-aligned on desktop, with a lume unit beside them at 0.875rem / 0.08em uppercase.
- **Title** (400, 1.75rem, opsz 48, -0.01em): collection piece names and material tile names (`clamp(1.25rem, 1.8vw, 1.75rem)` in tiles).
- **Part Name** (400, 1.125rem, 1.15, opsz 24): the exploded-view labels pinned to parts; also the nav wordmark (1.375rem), footer wordmark (1.5rem) and button text (`clamp(1.125rem, 1.5vw, 1.375rem)`).
- **Aside** (400 italic, `clamp(1.25rem, 2.2vw, 1.75rem)`, opsz 48, bone-2 or bone-3): the one-line italic closers ("Reassembled by hand…", "Two hundred of each…") and the subhead beside "Materials" (1.25rem, opsz 24).
- **Body** (400, 1rem, 1.6): paragraphs under headlines, max 40 to 42ch, always bone-2. **Body Small** (0.9375rem, 1.5 to 1.55) for notes under figures, piece descriptions and material captions, max 40 to 48ch.
- **Nav** (400, 0.8125rem, 0.08em, uppercase): nav links and CTA; also the hero calibre line at 0.06em without uppercase.
- **Label** (500, 0.6875rem, 0.14em, uppercase, bone-2): spec row terms (`dt`), the scroll cue (lume, 0.12em), the collection rail hint (lume).
- **Reference** (400, 0.75rem, 0.1em, uppercase): collection references ("M-01 · 40 mm", bone-3) and footer links (bone-2); footer legal at the same size without tracking.

### Named Rules
**The Optical Size Rule.** Every serif setting declares `font-variation-settings: 'opsz'` (96 / 48 / 24). Never let the serif render at its default optical size; the hairlines only work when the size is told.

**The Tabular Rule.** Numbers are always tabular (`tnum` on body, `tabular-nums` on figures) so counted values and references do not shift width.

**The Labels Describe Rule.** Uppercase tracked labels exist only as definition terms, references, nav and cues. No headline carries an eyebrow or kicker above it; the build has none.

## Layout

One continuous page, no routing, six chapters: hero, pinned exploded view, horizontal collection rail, specs, materials, footer. The horizontal container is a single fluid gutter (`{spacing.gutter}`) on every chapter with no max-width; the type scale is what limits measure, not a container. Chapters open with `{spacing.chapter}` of top padding (96px on phones).

Chapter grids are asymmetric and part-led rather than card grids: exploded view is `1fr minmax(0, 36%)` (stage left, absolute-positioned labels right, labels placed by the part they point to); specs is `5fr / 7fr` with a sticky heading at `top: 18vh` and a definition list of rows divided by hairlines; the footer invitation is `7fr / 5fr` with the invitation heading left, copy right, and the button centred beneath. Materials is a 12-column mosaic (`repeat(4, minmax(220px, 26vh))` rows, 12px gaps) with a 7/5 split and one full-width tile. The collection rail is a `max-content` flex track of 34vw / 440px pieces, each a viewport tall, pinned and scrubbed sideways on desktop.

The hero stacks absolutely: wordmark centred at `top: 27vh`, watch stage at `top: 68%` and `min(82vh, 760px)` tall with a 400/600 aspect ratio, calibre line bottom-left and scroll cue bottom-right at 36px from the floor.

Vertical rhythm inside chapters is 8 / 16 / 24 / 32 / 48px, with 28px spec rows and 18px nav padding. The watch stage is always a 400 × 600 aspect box; the SVG never stretches.

**Breakpoint:** one, at 900px (`max-width: 899px` is the phone sheet). Below it: nav links hide (wordmark and CTA remain), all grids collapse to one column, the collection rail becomes a native scroll-snap track (78vw / 340px pieces, 20px gap, no scrollbar), exploded-view leader lines and labels are replaced by a single live caption under the stage, headlines drop to fixed 2.75rem, the spotlight becomes an automatic 22-second sweep, and the button shrinks to 180px.

## Elevation & Depth

Depth is ambient, not structural. There are no borders, no card edges, and no hard shadows. The only raised plane is the material tile's `{colors.surface}` base, and it is immediately covered by a photograph. Depth is conveyed three ways: the SVG watch casts a soft black drop shadow onto the ground, the lume button and lamp glow with their own light, and content fades into the ground rather than ending on an edge. The exploded chapter also uses real perspective (`perspective: 1400px`, layers spread along z) as the one place where depth is literal.

### Shadow Vocabulary
- **Watch Drop** (`filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7))`): under the hero watch. The collection pieces use the lighter `drop-shadow(0 24px 40px rgba(0, 0, 0, 0.65))`.
- **Lume Halo** (`box-shadow: 0 24px 60px -10px rgba(207, 242, 176, 0.28)`, hover `0 30px 80px -10px rgba(207, 242, 176, 0.4)`): the button glows on the ground beneath it.
- **Lamp Glow** (`box-shadow: 0 0 24px 6px {colors.lume-glow}`): the 10px cursor lamp in the materials chapter.
- **Floor Glow** (`radial-gradient(ellipse at center, rgba(207, 242, 176, 0.09), transparent 60%)`): a 90vw × 60vh ellipse under the footer, the faint light the button leaves on the floor.

### Named Rules
**The Light Not Edge Rule.** Elevation comes from light (glow, drop shadow, fade) never from edges (borders, outlines, hard offsets). The only outline is the 1.5px lume focus ring at 4px offset.

## Shapes

Square by default. Text, rules, rows and the nav have no radius. Two exceptions, both derived from the watch: the circle (the button is a perfect disc at `{rounded.full}`; leader-line nodes and the lamp are dots) and the hairline (`{rounded.hairline}` on material tiles and the focus ring, just enough to stop the corner from reading as a cut). Lines are 1px: hairline rules, leader lines (1px lume-dim), the nav underline (1px, scales in from the left on hover, out to the right), the scroll cue (1px vertical gradient from lume to transparent), and the 48px lume dash after the collection hint. Photographs are square-cornered, desaturated to greyscale at 32% brightness, and revealed in colour only inside a radial mask.

## Components

### Buttons
There is one button. It is a disc, it glows, and it follows the cursor.
- **Shape:** perfect circle (`{rounded.full}`), `clamp(200px, 22vw, 260px)` square on desktop, 180px on phones.
- **Primary:** `{colors.lume}` fill, `{colors.ground}` text in the serif at opsz 24, centred, text wrapped to 11ch, 24px inner padding. Sits inside a 48px magnetic field (`.magnet` padding).
- **Hover / Focus:** fill lifts to `{colors.lume-bright}`, halo widens (see Elevation); both over 0.5s `ease-out`. Within the field the button is pulled toward the pointer with `power3.out` quickTo at 0.6s (text at a smaller amplitude); on leave it springs back with `elastic.out(1, 0.45)` over 1.1s. Focus shows the global 1.5px lume ring.
- **Secondary / Ghost:** none. Secondary actions are text links (see Navigation).

### Navigation
- **Style:** fixed, full-width, three-column grid (wordmark / chapter links / CTA), 18px vertical padding on the gutter. Transparent at the top; after 80px of scroll a graphite scrim fades in (`rgba(10, 12, 16, 0.96)` to transparent, extending 64px below the bar). Scrolling down past 160px slides the bar off (`translateY(-110%)`, 0.6s `ease-out`); scrolling up returns it.
- **Typography:** wordmark in the serif at 1.375rem opsz 24; links in `{typography.nav}` uppercase, 32px apart, `{colors.bone-2}`; CTA identical but `{colors.lume}` and right-aligned.
- **Hover:** colour rises to `{colors.bone}` over 0.3s; a 1px `currentColor` underline scales in from the left over 0.45s and leaves to the right.
- **Mobile:** links hidden; wordmark and CTA remain with 14px padding. Links are anchors into chapters driven by Lenis `scrollTo` at 1.4s.

### Spec Rows
A definition list that reads like a calibre sheet.
- **Structure:** hairline above the list and below every row (`{colors.rule}`), 28px vertical padding, two columns: label and note left, figure right.
- **Label:** `{typography.label}` uppercase in `{colors.bone-2}`. **Note:** `{typography.body-small}` in `{colors.bone-3}`, max 44ch. **Figure:** `{typography.figure}` in `{colors.bone}` with a lume unit.
- **Behaviour:** on entering the viewport (once) each figure counts from 0 to its value over 1.8s + 0.1s per row with `expo.out`, and the row rises 18px from 35% opacity over 1.1s. Reduced motion sets the final value immediately.
- **Mobile:** single column, figure left-aligned at 3.25rem, 22px padding.

### Material Tiles
Dark photographs in a mosaic, lit only where the lamp is.
- **Corner Style:** `{rounded.hairline}`.
- **Background:** `{colors.surface}` under a greyscale photograph (`grayscale(1) brightness(0.32) contrast(1.05)`); a second colour copy is masked by a 300px radial spotlight (200px on phones) that follows the pointer via `power3.out` quickTo at 0.5s. Photographs are toned to their subject (`material--dark`, `material--steel` filter variants).
- **Shadow Strategy:** none; the tile is flat. The 10px lume lamp with its glow is the cursor, and the system cursor is hidden over the chapter.
- **Copy:** anchored to the bottom, 48px 22px 18px padding, title in the serif at opsz 48 in `{colors.bone-2}`; when lit, the title rises to `{colors.bone}`, a graphite scrim fades in behind, and the caption appears (6px rise, 0.5 to 0.6s `ease-out`).
- **Touch / mobile:** `materials--auto` runs the lamp on a 22-second looping path and keeps all captions visible.

### Part Labels (Exploded View)
The signature annotation: labels obey the part, not a text grid.
- **Structure:** absolute `li` positioned to its part's projected screen position, 18px left padding, part name in `{typography.part-name}` over its spec in the grotesk at 0.71rem / 0.06em in `{colors.bone-2}`, no wrapping.
- **Leader:** an SVG overlay draws a 1px `{colors.lume-dim}` path from the part to the label, ending at the part in a `{colors.lume}` dot node.
- **Behaviour:** the whole chapter is one pinned timeline scrubbed by scroll (scrub 0.6, `ease: none`): the rig tilts (`rotateX`, `rotateZ`, scale 0.92) over the first quarter, the ten layers spread along z with a 0.012 stagger from the centre, labels and leaders fade in (14px slide, 0.08 each), hold, fade out, layers close with a stagger from the edges, the rig rights itself, and the italic closer rises 10px into place. Phones replace labels and leaders with one centred live caption (`aria-live`).

### Collection Pieces
- **Structure:** each piece is a viewport-tall column (`min(34vw, 440px)` wide) with the watch centred (`min(58vh, 560px)` tall, drop shadow) and a meta block at the bottom: hairline on top, 16px padding, name in `{typography.title}` beside its reference in `{typography.reference}` (`{colors.bone-3}`), description in `{typography.body-small}` (`{colors.bone-2}`, max 40ch).
- **Variants:** five dial colourways (`nocturne`, `glacier`, `oxblood`, `verdant`, `salmon`) defined as `WatchVariant` objects (dial, dialEdge, strap, stitch, ink) in `Watch.tsx`; the case metals never change.
- **Behaviour:** on desktop the track is pinned and translated sideways by vertical scroll (scrub 0.8); each watch is given a slight parallax by a container-animation trigger. On phones it is a native scroll-snap rail.

### The Watch (signature component)
A 400 × 600 SVG in ten stacked layers, bottom to top: strap, caseback, mainplate, train, dial, hands, case, crown, bezel, crystal. Each layer is an absolutely positioned SVG with `transform-style: preserve-3d` so the exploded view can spread them along z. Metals are SVG gradients (see Colors). The hero instance is live: the whole watch rotates once per 90s (`ease: none`, infinite), the seconds hand sweeps once per 60s, and the balance oscillates ±24° every 0.36s. All three stop under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set every serif with an explicit optical size (96 display and headlines, 48 titles and asides, 24 labels, wordmarks and button) and weight 400 only.
- **Do** keep the one accent to where a watch glows: plots, tips, nodes, units, one cue, one CTA link, one button.
- **Do** divide with 1px hairlines at 14% bone (`{colors.rule}`) and fade content into the ground with a graphite gradient rather than ending it on an edge.
- **Do** bind chapter motion to the scroll (`scrub`, `ease: none`) and reserve `expo.out` for a single entrance per element; continuous motion is slow mechanism only (90s rotation, 60s sweep).
- **Do** give the watch its 400/600 aspect box and a soft black drop shadow; keep the SVG crisp and never stretch or rasterise it.
- **Do** provide the phone fallback that ships: one column, native snap rail, live caption instead of leader lines, automatic lamp instead of pointer tracking, and zero-duration animation under reduced motion.

### Don't:
- **Don't** introduce a second accent, a coloured UI surface, or use the watch's titanium, gold or blued-steel values outside `Watch.tsx`.
- **Don't** add borders, outlines, card edges, or hard or offset shadows; elevation is light (glow, drop shadow, fade) or real perspective.
- **Don't** put an eyebrow or kicker above a headline; uppercase tracked text is for definition terms, references, nav and cues only.
- **Don't** repeat section entrances on re-scroll, or animate anything on a loop faster than the balance wheel except the 2.4s scroll cue.
- **Don't** use a max-width container or equal-width card rows; chapters are asymmetric grids led by the object, inside the fluid gutter.
- **Don't** build the hero as copy-left, product-right; the wordmark spans the width and the watch overlaps it.
