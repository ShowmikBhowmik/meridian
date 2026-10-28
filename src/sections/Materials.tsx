import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { isTouchPrimary, prefersReducedMotion } from '../lib/motion'
import './materials.css'

const BASE = import.meta.env.BASE_URL

const MATERIALS: { key: string; name: string; text: string; img: string; span: string; tone?: 'dark' | 'steel' }[] = [
  {
    key: 'titanium',
    name: 'Grade 5 titanium',
    text: 'Ti-6Al-4V. Half the weight of steel and warmer against the skin. Brushed on the flanks, polished on the bevels, and it keeps that line for decades.',
    img: `${BASE}img/titanium.webp`,
    span: 'ti',
  },
  {
    key: 'sapphire',
    name: 'Domed sapphire',
    text: 'Grown as a single crystal, cut, domed and anti-reflective coated on both faces. It will scratch a kitchen knife before a kitchen knife scratches it.',
    img: `${BASE}img/sapphire.webp`,
    span: 'sa',
  },
  {
    key: 'calibre',
    name: 'Calibre M-01',
    text: 'Bevelled bridges, polished screw heads, Côtes de Genève laid by hand. Finished where you will see it and where you will not.',
    img: `${BASE}img/calibre.webp`,
    span: 'ca',
    tone: 'steel',
  },
  {
    key: 'alligator',
    name: 'Alligator, hand-sewn',
    text: 'Cut from the belly so the scales run straight. Lined in calf, stitched with waxed linen, fitted to a titanium pin buckle.',
    img: `${BASE}img/alligator.webp`,
    span: 'al',
    tone: 'dark',
  },
  {
    key: 'components',
    name: 'Every wheel, in-house',
    text: 'One hundred and eighty-four parts. Each wheel cut, deburred and inspected under the loupe before it meets a pivot.',
    img: `${BASE}img/components.webp`,
    span: 'co',
  },
]

/**
 * Materials, lit by a spotlight that follows the pointer. Every tile ships
 * dim; the spotlight reveals the full-colour photograph and the copy.
 * On touch the light drifts on its own path.
 */
export function Materials() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const reduced = prefersReducedMotion()
    const pos = { x: 0, y: 0 }
    const tiles = Array.from(el.querySelectorAll<HTMLElement>('.material'))
    const set = () => {
      el.style.setProperty('--mx', `${pos.x}px`)
      el.style.setProperty('--my', `${pos.y}px`)
      // each tile masks in its own box, so hand it the light in its own coordinates
      const host = el.getBoundingClientRect()
      for (const tile of tiles) {
        const r = tile.getBoundingClientRect()
        const lx = pos.x - (r.left - host.left)
        const ly = pos.y - (r.top - host.top)
        tile.style.setProperty('--mx', `${lx}px`)
        tile.style.setProperty('--my', `${ly}px`)
        // the tile under the lamp (with a little reach past its edge) shows its copy in full
        const reach = 40
        tile.classList.toggle('is-lit', lx > -reach && ly > -reach && lx < r.width + reach && ly < r.height + reach)
      }
    }

    if (isTouchPrimary() || reduced) {
      // slow lissajous sweep so the section still reveals itself
      const r = el.getBoundingClientRect()
      const path = { t: 0 }
      const tween = gsap.to(path, {
        t: Math.PI * 2,
        duration: 22,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          const w = el.clientWidth
          const h = el.clientHeight
          pos.x = w / 2 + Math.sin(path.t) * w * 0.4
          pos.y = h / 2 + Math.sin(path.t * 2 + 1) * h * 0.38
          set()
        },
      })
      pos.x = r.width / 2
      pos.y = r.height / 2
      set()
      el.classList.add('materials--auto')
      return () => tween.kill()
    }

    const quick = {
      x: gsap.quickTo(pos, 'x', { duration: 0.5, ease: 'power3.out', onUpdate: set }),
      y: gsap.quickTo(pos, 'y', { duration: 0.5, ease: 'power3.out', onUpdate: set }),
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      quick.x(e.clientX - r.left)
      quick.y(e.clientY - r.top)
      el.classList.add('materials--lit')
    }
    const onLeave = () => el.classList.remove('materials--lit')
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section className="materials" id="materials" ref={root}>
      <div className="materials__head">
        <h2 className="serif">Materials</h2>
        <p>Bring the light closer.</p>
      </div>
      <div className="materials__grid">
        {MATERIALS.map((m) => (
          <article className={`material material--${m.span} ${'tone' in m ? `material--${m.tone}` : ''}`} key={m.key}>
            <div className="material__base" aria-hidden="true">
              <img src={m.img} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="material__reveal" aria-hidden="true">
              <img src={m.img} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="material__copy">
              <p>{m.text}</p>
              <h3 className="serif">{m.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
