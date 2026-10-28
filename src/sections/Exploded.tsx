import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PARTS, Watch } from '../components/Watch'
import { BREAKPOINT_DESKTOP, prefersReducedMotion } from '../lib/motion'
import './exploded.css'

gsap.registerPlugin(ScrollTrigger)

/** Where each leader line meets its part, in the watch's 400×600 SVG space. */
const ANCHORS: Record<string, [number, number]> = {
  strap: [256, 500],
  caseback: [340, 300],
  mainplate: [316, 300],
  train: [280, 338],
  dial: [328, 300],
  hands: [300, 244],
  case: [354, 300],
  crown: [380, 300],
  bezel: [348, 300],
  crystal: [328, 300],
}

/**
 * The signature chapter. One pinned timeline, scrubbed by scroll:
 * tilt the watch into perspective, spread its ten layers along z,
 * pin a leader-line label to each part, hold, then reassemble.
 */
export function Exploded() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const rig = useRef<HTMLDivElement>(null)
  const labels = useRef<HTMLUListElement>(null)
  const lines = useRef<SVGSVGElement>(null)
  const [caption, setCaption] = useState<{ name: string; spec: string } | null>(null)

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<SVGSVGElement>('.watch__layer', rig.current!)
      const labelEls = gsap.utils.toArray<HTMLLIElement>('li', labels.current!)
      const lineEls = gsap.utils.toArray<SVGGElement>('g', lines.current!)
      const n = layers.length
      const mid = (n - 1) / 2
      const layerIdx = layers.map((_, i) => i)

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: `(min-width: ${BREAKPOINT_DESKTOP}px)`,
          mobile: `(max-width: ${BREAKPOINT_DESKTOP - 1}px)`,
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean }
          const gap = desktop ? Math.min(window.innerHeight * 0.075, 64) : Math.min(window.innerHeight * 0.048, 40)
          const tiltX = desktop ? 56 : 42
          const tiltZ = desktop ? -16 : 0

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current,
              pin: pin.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * (desktop ? 4 : 3.2)}`,
              scrub: reduced ? false : 0.6,
              anticipatePin: 1,
              onRefresh: desktop ? drawLeaders : undefined,
            },
            // redraw from the timeline, not the scroll event: with a smoothed scrub the
            // layers keep moving after the wheel stops, and the leaders must follow them
            onUpdate: desktop ? drawLeaders : updateCaption,
          })

          // 0 → 0.25: tilt into perspective
          tl.to(rig.current, { rotateX: tiltX, rotateZ: tiltZ, scale: desktop ? 0.92 : 0.96, duration: 0.25 }, 0)
          // 0.1 → 0.55: spread along z, bottom layers away, top layers towards the viewer
          tl.to(
            layers,
            { z: (i: number) => (i - mid) * gap, duration: 0.45, stagger: { each: 0.012, from: 'center' } },
            0.1,
          )
          // labels arrive as their part separates (desktop only; mobile reads a caption)
          if (desktop) {
            // DOM order of labels is crystal → strap; layers are strap → crystal
            labelEls.forEach((el, k) => {
              const i = n - 1 - k
              const at = 0.22 + (k / n) * 0.3
              tl.fromTo(el, { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.08 }, at)
              tl.fromTo(lineEls[i], { opacity: 0 }, { opacity: 1, duration: 0.08 }, at + 0.02)
            })
          }
          // 0.55 → 0.68: hold
          tl.to({}, { duration: 0.13 }, 0.55)
          // 0.68 → 1: reassemble and settle flat
          if (desktop) {
            tl.to([labelEls, lineEls], { opacity: 0, duration: 0.08, stagger: 0.006 }, 0.68)
          }
          tl.to(layers, { z: 0, duration: 0.24, stagger: { each: 0.008, from: 'edges' } }, 0.72)
          tl.to(rig.current, { rotateX: 0, rotateZ: 0, scale: 1, duration: 0.22 }, 0.78)
          tl.to('.exploded__title', { opacity: 1, y: 0, duration: 0.1 }, 0.9)

          function drawLeaders() {
            const svg = lines.current!
            const host = pin.current!.getBoundingClientRect()
            const column = labels.current!.getBoundingClientRect()
            svg.setAttribute('viewBox', `0 0 ${host.width} ${host.height}`)
            // 1. project each part's anchor to the screen
            const pts = layers.map((layer) => {
              const r = layer.getBoundingClientRect()
              const [ax, ay] = ANCHORS[layer.dataset.part!]
              return { x: r.left + (r.width * ax) / 400 - host.left, y: r.top + (r.height * ay) / 600 - host.top }
            })
            // 2. labels follow their part's height, ordered by where the part actually is, never overlapping
            const order = [...layerIdx].sort((a, b) => pts[a].y - pts[b].y)
            // a leader is level with its part wherever the parts leave room; level lines never cross
            const minGap = 44
            const want = order.map((i) => pts[i].y)
            for (let k = 1; k < want.length; k++) want[k] = Math.max(want[k], want[k - 1] + minGap)
            // keep the block centred on the parts, then inside the viewport
            const partsMid = (pts[order[0]].y + pts[order[order.length - 1]].y) / 2
            const labelsMid = (want[0] + want[want.length - 1]) / 2
            let shift = partsMid - labelsMid
            shift = Math.min(shift, host.height - 36 - want[want.length - 1])
            shift = Math.max(shift, 90 - want[0])
            for (let k = 0; k < want.length; k++) want[k] += shift
            order.forEach((i, k) => {
              const el = labelEls[n - 1 - i]
              const h = el.offsetHeight
              gsap.set(el, { y: want[k] - h / 2 - (column.top - host.top) })
              const lx = column.left - host.left + 6
              const ly = want[k]
              const g = lineEls[i]
              const path = g.querySelector('path')!
              const dot = g.querySelector('circle')!
              path.setAttribute('d', `M${lx} ${ly} L${pts[i].x} ${pts[i].y}`)
              dot.setAttribute('cx', String(pts[i].x))
              dot.setAttribute('cy', String(pts[i].y))
            })
          }

          function updateCaption() {
            const p = tl.progress()
            if (p < 0.2 || p > 0.74) {
              setCaption(null)
              return
            }
            const t = gsap.utils.clamp(0, 0.999, (p - 0.2) / 0.5)
            // read top-down: crystal first, strap last
            const idx = n - 1 - Math.floor(t * n)
            setCaption({ name: PARTS[idx].name, spec: PARTS[idx].spec })
          }

          return () => {
            tl.kill()
          }
        },
      )

      return () => mm.revert()
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="exploded" id="anatomy" ref={root}>
      <div className="exploded__pin" ref={pin}>
        <h2 className="exploded__heading serif">
          Ten parts.
          <br />
          One intention.
        </h2>

        <div className="exploded__stage">
          <div className="exploded__rig" ref={rig}>
            <Watch uid="anatomy" />
          </div>
        </div>

        <svg className="exploded__lines" ref={lines} aria-hidden="true">
          {PARTS.map((p) => (
            <g key={p.id}>
              <path d="" />
              <circle r="3" />
            </g>
          ))}
        </svg>

        <ul className="exploded__labels" ref={labels} aria-label="Components of the Calibre M-01">
          {[...PARTS].reverse().map((p) => (
            <li key={p.id} data-part={p.id}>
              <span className="exploded__name">{p.name}</span>
              <span className="exploded__spec">{p.spec}</span>
            </li>
          ))}
        </ul>

        <p className="exploded__caption" aria-live="polite">
          {caption ? (
            <>
              <span className="exploded__name">{caption.name}</span>
              <span className="exploded__spec">{caption.spec}</span>
            </>
          ) : null}
        </p>

        <p className="exploded__title serif">Reassembled by hand. Regulated in six positions.</p>
      </div>
    </section>
  )
}
