import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VARIANTS, Watch } from '../components/Watch'
import { BREAKPOINT_DESKTOP, prefersReducedMotion } from '../lib/motion'
import './collection.css'

gsap.registerPlugin(ScrollTrigger)

const PIECES = [
  { key: 'nocturne', name: 'Nocturne', ref: 'M-01 · 40 mm', line: 'Graphite sunburst. The first dial we made and the one we still wear.' },
  { key: 'glacier', name: 'Glacier', ref: 'M-01 · 40 mm', line: 'Ice-silver lacquer under a brushed titanium case. Reads in any light.' },
  { key: 'oxblood', name: 'Oxblood', ref: 'M-01 · 40 mm', line: 'Eleven coats of translucent red over black. Deep at noon, near black at dusk.' },
  { key: 'verdant', name: 'Verdant', ref: 'M-01 · 40 mm', line: 'A green that keeps its distance. Lume plots in the same tone, charged by day.' },
  { key: 'salmon', name: 'Salmon', ref: 'M-01 · 40 mm', line: 'Copper lacquer, dark print. Made in a single run of sixty.' },
] as const

/**
 * Horizontal rail. Desktop: pinned, scrubbed sideways by vertical scroll.
 * Phone: a native scroll-snap rail, because fingers already know that gesture.
 */
export function Collection() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(`(min-width: ${BREAKPOINT_DESKTOP}px)`, () => {
        const t = track.current!
        const distance = () => t.scrollWidth - window.innerWidth
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: prefersReducedMotion() ? false : 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        // each piece rises slightly as it crosses the centre
        gsap.utils.toArray<HTMLElement>('.piece', t).forEach((piece) => {
          gsap.fromTo(
            piece.querySelector('.piece__watch'),
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: 'none',
              scrollTrigger: { trigger: piece, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
        return () => tween.kill()
      })
      return () => mm.revert()
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="collection" id="collection" ref={root}>
      <div className="collection__track" ref={track}>
        <div className="collection__intro">
          <h2 className="serif">The collection</h2>
          <p>
            One calibre, one case, five dials. Each dial is lacquered, cured and inspected by the same two
            people, which is why there are five and not fifty.
          </p>
          <span className="collection__hint label" aria-hidden="true">
            Scroll
          </span>
        </div>
        {PIECES.map((p, i) => (
          <article className="piece" key={p.key}>
            <div className="piece__watch">
              <Watch uid={`c-${p.key}`} variant={VARIANTS[p.key]} live={i === 0} />
            </div>
            <div className="piece__meta">
              <h3 className="serif">{p.name}</h3>
              <span className="piece__ref">{p.ref}</span>
              <p>{p.line}</p>
            </div>
          </article>
        ))}
        <div className="collection__end">
          <p className="serif">Two hundred of each. Numbered on the caseback.</p>
        </div>
      </div>
    </section>
  )
}
