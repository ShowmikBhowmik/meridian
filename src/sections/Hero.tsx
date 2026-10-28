import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Watch } from '../components/Watch'
import { prefersReducedMotion } from '../lib/motion'
import { scrollTo } from '../lib/scroll'
import './hero.css'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const watch = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      const w = watch.current!

      if (!reduced) {
        // one turn every ninety seconds
        gsap.to(w, { rotation: 360, duration: 90, ease: 'none', repeat: -1 })
      }

      // entrance: wordmark rises from the dark, watch settles.
      // Entrance animates the inner elements; the scroll parallax below animates
      // their wrappers, so the two never fight over the same properties.
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo('.hero__wordmark-inner', { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reduced ? 0 : 1.6 }, 0)
        .fromTo('.hero__watch', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: reduced ? 0 : 2 }, 0.1)
        .fromTo('.hero__line, .hero__cue', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: reduced ? 0 : 1, stagger: 0.1 }, 0.8)

      if (!reduced) {
        // scroll parallax: the watch drifts up and dims as the next chapter arrives,
        // and comes straight back when the visitor scrolls up
        gsap.fromTo(
          '.hero__stage',
          { yPercent: 0, scale: 1, opacity: 1 },
          {
            yPercent: -18,
            scale: 0.9,
            opacity: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          },
        )
        gsap.fromTo(
          '.hero__wordmark',
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -40,
            opacity: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
          },
        )
      }
    }, root)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <h1 className="hero__wordmark serif">
        <span className="hero__wordmark-inner">Meridian</span>
      </h1>
      <div className="hero__stage">
        <div className="hero__watch" ref={watch}>
          <Watch uid="hero" />
        </div>
      </div>
      <p className="hero__line">
        Calibre M-01 <span aria-hidden="true">·</span> 72-hour reserve <span aria-hidden="true">·</span> Made in series of 200
      </p>
      <a className="hero__cue" href="#anatomy" onClick={(e) => { e.preventDefault(); scrollTo('#anatomy') }}>
        <span>Scroll to disassemble</span>
        <span className="hero__cue-line" aria-hidden="true" />
      </a>
    </section>
  )
}
