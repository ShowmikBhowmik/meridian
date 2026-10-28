import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'
import './specs.css'

gsap.registerPlugin(ScrollTrigger)

type Spec = { value: number; decimals?: number; unit: string; label: string; note: string }

const SPECS: Spec[] = [
  { value: 72, unit: 'h', label: 'Power reserve', note: 'A single barrel, long mainspring, slow unwinding. Set it down Friday evening and it is still right on Monday.' },
  { value: 28800, unit: 'vph', label: 'Frequency', note: 'Four hertz. Enough inertia to shrug off a wrist, not so much that it eats the reserve.' },
  { value: 31, unit: '', label: 'Jewels', note: 'Synthetic ruby at every pivot that turns more than once an hour.' },
  { value: 40, unit: 'mm', label: 'Case diameter', note: 'Lug to lug, 47. It sits flat on a 16 cm wrist and does not fight a cuff.' },
  { value: 10.4, decimals: 1, unit: 'mm', label: 'Case height', note: 'Crystal included. The movement is 4.2 of that.' },
  { value: 100, unit: 'm', label: 'Water resistance', note: 'Screw-down crown, two gaskets. Swim; do not dive.' },
]

function format(n: number, decimals = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function Specs() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      gsap.utils.toArray<HTMLElement>('.spec', root.current!).forEach((row, i) => {
        const num = row.querySelector<HTMLElement>('.spec__value')!
        const target = Number(num.dataset.value)
        const decimals = Number(num.dataset.decimals || 0)
        const counter = { v: 0 }
        num.textContent = reduced ? format(target, decimals) : format(0, decimals)
        ScrollTrigger.create({
          trigger: row,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            if (reduced) return
            gsap.to(counter, {
              v: target,
              duration: 1.8 + i * 0.1,
              ease: 'expo.out',
              onUpdate: () => {
                num.textContent = format(counter.v, decimals)
              },
            })
            gsap.fromTo(row, { opacity: 0.35, y: 18 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' })
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="specs" id="calibre" ref={root}>
      <div className="specs__head">
        <h2 className="serif">Calibre M-01</h2>
        <p>
          Manual winding. Designed, machined and assembled under one roof. Every number here is measured on the
          finished watch, not the drawing.
        </p>
      </div>
      <dl className="specs__list">
        {SPECS.map((s) => (
          <div className="spec" key={s.label}>
            <dt className="spec__label">{s.label}</dt>
            <dd className="spec__figure">
              <span className="spec__value serif" data-value={s.value} data-decimals={s.decimals ?? 0}>
                {format(s.value, s.decimals)}
              </span>
              {s.unit && <span className="spec__unit">{s.unit}</span>}
            </dd>
            <dd className="spec__note">{s.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
