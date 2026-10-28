import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollTo } from '../lib/scroll'
import './nav.css'

export function Nav() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current!
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        el.classList.toggle('nav--scrolled', y > 80)
        // step aside while the visitor reads downward; return on the way up
        el.classList.toggle('nav--hidden', self.direction === 1 && y > 160)
      },
    })
    return () => st.kill()
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollTo(target)
  }

  return (
    <header className="nav" ref={ref}>
      <a className="nav__mark serif" href="#top" onClick={(e) => go(e, '#top')} aria-label="Meridian, back to top">
        Meridian
      </a>
      <nav className="nav__links" aria-label="Sections">
        <a href="#anatomy" onClick={(e) => go(e, '#anatomy')}>Anatomy</a>
        <a href="#collection" onClick={(e) => go(e, '#collection')}>Collection</a>
        <a href="#calibre" onClick={(e) => go(e, '#calibre')}>Calibre</a>
        <a href="#materials" onClick={(e) => go(e, '#materials')}>Materials</a>
      </nav>
      <a className="nav__cta" href="#viewing" onClick={(e) => go(e, '#viewing')}>
        Private viewing
      </a>
    </header>
  )
}
