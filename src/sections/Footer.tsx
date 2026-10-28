import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { isTouchPrimary, prefersReducedMotion } from '../lib/motion'
import { scrollTo } from '../lib/scroll'
import './footer.css'

/** A button that leans toward the pointer and springs back when it leaves. */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLAnchorElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (isTouchPrimary() || prefersReducedMotion()) return
    const w = wrap.current!
    const b = btn.current!
    const t = text.current!
    const xTo = gsap.quickTo(b, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(b, 'y', { duration: 0.6, ease: 'power3.out' })
    const txTo = gsap.quickTo(t, 'x', { duration: 0.6, ease: 'power3.out' })
    const tyTo = gsap.quickTo(t, 'y', { duration: 0.6, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      const r = w.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      xTo(dx * 0.32)
      yTo(dy * 0.32)
      txTo(dx * 0.12)
      tyTo(dy * 0.12)
    }
    const onLeave = () => {
      gsap.to([b, t], { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.45)' })
    }
    w.addEventListener('pointermove', onMove)
    w.addEventListener('pointerleave', onLeave)
    return () => {
      w.removeEventListener('pointermove', onMove)
      w.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="magnet" ref={wrap}>
      <a className="magnet__btn" href="mailto:viewing@meridian.example" ref={btn}>
        <span className="magnet__text" ref={text}>
          {children}
        </span>
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer" id="viewing">
      <div className="footer__invite">
        <h2 className="serif">
          Seen in person,
          <br />
          by appointment.
        </h2>
        <p>
          We do not sell online. Write to us, and we will arrange an hour at the atelier or send a
          watchmaker to you with the pieces you would like to see.
        </p>
        <MagneticButton>Request a private viewing</MagneticButton>
      </div>

      <div className="footer__foot">
        <span className="footer__mark serif">Meridian</span>
        <nav className="footer__links" aria-label="Footer">
          <a href="#anatomy" onClick={(e) => { e.preventDefault(); scrollTo('#anatomy') }}>Anatomy</a>
          <a href="#collection" onClick={(e) => { e.preventDefault(); scrollTo('#collection') }}>Collection</a>
          <a href="#calibre" onClick={(e) => { e.preventDefault(); scrollTo('#calibre') }}>Calibre</a>
          <a href="#materials" onClick={(e) => { e.preventDefault(); scrollTo('#materials') }}>Materials</a>
        </nav>
        <p className="footer__legal">
          © 2026 Meridian. A concept study; no watches are for sale.
        </p>
      </div>
    </footer>
  )
}
