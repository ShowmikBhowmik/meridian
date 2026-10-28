import { memo } from 'react'
import './watch.css'

export type WatchVariant = {
  /** dial centre colour */
  dial: string
  /** dial edge colour (sunburst falloff) */
  dialEdge: string
  /** strap colour */
  strap: string
  /** strap stitch colour */
  stitch: string
  /** index / text colour on the dial */
  ink: string
}

export const VARIANTS: Record<string, WatchVariant> = {
  nocturne: { dial: '#2a2e35', dialEdge: '#0c0e12', strap: '#17140f', stitch: '#5a4e3a', ink: '#ede6da' },
  glacier: { dial: '#d9dde3', dialEdge: '#8d939c', strap: '#2b2f36', stitch: '#7d848e', ink: '#1a1d22' },
  oxblood: { dial: '#5a1a22', dialEdge: '#22080c', strap: '#1b1210', stitch: '#6b4a3a', ink: '#ede6da' },
  verdant: { dial: '#1f4a3c', dialEdge: '#081a14', strap: '#141a16', stitch: '#4f6a5a', ink: '#ede6da' },
  salmon: { dial: '#d9957a', dialEdge: '#8a4f3a', strap: '#2a1d18', stitch: '#8a6a55', ink: '#2a1810' },
}

export type PartId =
  | 'strap'
  | 'caseback'
  | 'mainplate'
  | 'train'
  | 'dial'
  | 'hands'
  | 'case'
  | 'crown'
  | 'bezel'
  | 'crystal'

export type Part = { id: PartId; name: string; spec: string }

/** Bottom to top. The exploded view spreads these along z in this order. */
export const PARTS: Part[] = [
  { id: 'strap', name: 'Strap', spec: 'Hand-sewn alligator, 20 mm' },
  { id: 'caseback', name: 'Caseback', spec: 'Exhibition sapphire, engraved' },
  { id: 'mainplate', name: 'Mainplate', spec: 'Rhodium-plated, Côtes de Genève' },
  { id: 'train', name: 'Calibre M-01', spec: '28,800 vph · 72 h reserve' },
  { id: 'dial', name: 'Dial', spec: 'Sunburst lacquer, applied indices' },
  { id: 'hands', name: 'Hands', spec: 'Thermally blued steel, lume-filled' },
  { id: 'case', name: 'Case', spec: 'Grade 5 titanium, 40 mm' },
  { id: 'crown', name: 'Crown', spec: 'Screw-down, signed' },
  { id: 'bezel', name: 'Bezel', spec: 'Polished, stepped' },
  { id: 'crystal', name: 'Crystal', spec: 'Domed sapphire, double AR' },
]

const CX = 200
const CY = 300
const LUME = '#cff2b0'

/* ---------- geometry helpers ---------- */

function annulus(rOuter: number, rInner: number): string {
  return [
    `M ${CX + rOuter} ${CY}`,
    `A ${rOuter} ${rOuter} 0 1 0 ${CX - rOuter} ${CY}`,
    `A ${rOuter} ${rOuter} 0 1 0 ${CX + rOuter} ${CY}`,
    `M ${CX + rInner} ${CY}`,
    `A ${rInner} ${rInner} 0 1 1 ${CX - rInner} ${CY}`,
    `A ${rInner} ${rInner} 0 1 1 ${CX + rInner} ${CY}`,
    'Z',
  ].join(' ')
}

function spiral(cx: number, cy: number, turns: number, a: number, b: number): string {
  const pts: string[] = []
  const steps = turns * 48
  for (let i = 0; i <= steps; i++) {
    const t = (i / 48) * Math.PI * 2
    const r = a + b * t
    const x = cx + r * Math.cos(t)
    const y = cy + r * Math.sin(t)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

const HAIRSPRING = spiral(150, 330, 6, 3, 0.75)

function mulberry(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Alligator belly scales: rectangular, irregular in width, rows narrowing
 * toward the strap tip. Deterministic per seed so hydration never flickers.
 */
function scaleField(x0: number, x1: number, y0: number, y1: number, tipAtEnd: boolean, seed: number) {
  const rnd = mulberry(seed)
  const out: { x: number; y: number; w: number; h: number }[] = []
  let y = y0
  while (y < y1) {
    const f = (y - y0) / (y1 - y0)
    const toward = tipAtEnd ? f : 1 - f
    const h = 14 - 5 * toward + (rnd() - 0.5) * 1.2
    let x = x0 - rnd() * 16
    while (x < x1) {
      const w = 17 + rnd() * 12 - 5 * toward
      out.push({ x, y, w, h })
      x += w
    }
    y += h
  }
  return out
}

const SCALES_TOP = scaleField(140, 262, -6, 172, false, 11)
const SCALES_BOTTOM = scaleField(140, 262, 428, 606, true, 23)

function toothed(cx: number, cy: number, r: number, teeth: number, width = 3) {
  const circ = 2 * Math.PI * r
  const seg = circ / teeth
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      strokeWidth={width}
      strokeDasharray={`${(seg * 0.55).toFixed(2)} ${(seg * 0.45).toFixed(2)}`}
    />
  )
}

/* ---------- layers ---------- */

type LayerProps = { v: WatchVariant; uid: string }

function Strap({ v, uid }: LayerProps) {
  const pat = `${uid}-scales`
  return (
    <>
      <defs>
        <clipPath id={`${pat}-top`}>
          <path d="M146 0 H254 L258 150 Q258 170 238 170 H162 Q142 170 142 150 Z" />
        </clipPath>
        <clipPath id={`${pat}-bottom`}>
          <path d="M142 450 Q142 430 162 430 H238 Q258 430 258 450 L254 600 H146 Z" />
        </clipPath>
        <linearGradient id={`${uid}-strapshade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(0,0,0,0.6)" />
          <stop offset="0.42" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="0.6" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.6)" />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.09)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      {/* top strap */}
      <path d="M146 0 H254 L258 150 Q258 170 238 170 H162 Q142 170 142 150 Z" fill={v.strap} />
      <g clipPath={`url(#${pat}-top)`}>
        {SCALES_TOP.map((r, i) => (
          <rect key={i} x={r.x + 0.8} y={r.y + 0.8} width={r.w - 1.6} height={r.h - 1.6} rx="3.5" fill="rgba(255,255,255,0.045)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
        ))}
        <path d="M146 0 H254 L258 150 Q258 170 238 170 H162 Q142 170 142 150 Z" fill={`url(#${uid}-sheen)`} />
      </g>
      <path d="M146 0 H254 L258 150 Q258 170 238 170 H162 Q142 170 142 150 Z" fill={`url(#${uid}-strapshade)`} />
      <path d="M154 4 L156 152 M246 4 L244 152" stroke={v.stitch} strokeWidth="1.2" strokeDasharray="4 5" fill="none" opacity="0.9" />
      {/* keeper */}
      <rect x="140" y="56" width="120" height="14" rx="3" fill={v.strap} stroke="rgba(0,0,0,0.5)" />
      {/* bottom strap */}
      <path d="M142 450 Q142 430 162 430 H238 Q258 430 258 450 L254 600 H146 Z" fill={v.strap} />
      <g clipPath={`url(#${pat}-bottom)`}>
        {SCALES_BOTTOM.map((r, i) => (
          <rect key={i} x={r.x + 0.8} y={r.y + 0.8} width={r.w - 1.6} height={r.h - 1.6} rx="3.5" fill="rgba(255,255,255,0.045)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
        ))}
        <path d="M142 450 Q142 430 162 430 H238 Q258 430 258 450 L254 600 H146 Z" fill={`url(#${uid}-sheen)`} />
      </g>
      <path d="M142 450 Q142 430 162 430 H238 Q258 430 258 450 L254 600 H146 Z" fill={`url(#${uid}-strapshade)`} />
      <path d="M156 448 L154 596 M244 448 L246 596" stroke={v.stitch} strokeWidth="1.2" strokeDasharray="4 5" fill="none" opacity="0.9" />
      {/* strap holes */}
      {[500, 522, 544, 566].map((y) => (
        <circle key={y} cx="200" cy={y} r="3.2" fill="#05060a" stroke="rgba(255,255,255,0.08)" />
      ))}
    </>
  )
}

function Caseback({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-cb`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.6" stopColor="#34373d" />
          <stop offset="0.92" stopColor="#1f2227" />
          <stop offset="1" stopColor="#111317" />
        </radialGradient>
        <path id={`${uid}-cbtext`} d={`M ${CX} ${CY - 122} a 122 122 0 1 1 -0.01 0`} />
      </defs>
      <circle cx={CX} cy={CY} r="142" fill={`url(#${uid}-cb)`} stroke="#0b0d10" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="131" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="109" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <text
        fontFamily="var(--grotesk)"
        fontSize="10.5"
        letterSpacing="2.4"
        fill="#9a9588"
        fontWeight="500"
      >
        <textPath href={`#${uid}-cbtext`} startOffset="0">
          MERIDIAN · CALIBRE M-01 · SEVENTY-TWO HOURS · ONE HUNDRED METRES · No. 0141 ·
        </textPath>
      </text>
      {/* exhibition window */}
      <circle cx={CX} cy={CY} r="96" fill="#0c0e12" />
      <circle cx={CX} cy={CY} r="96" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      {/* caseback screws */}
      {[45, 135, 225, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x = CX + 133 * Math.cos(rad)
        const y = CY + 133 * Math.sin(rad)
        return (
          <g key={deg} transform={`translate(${x} ${y}) rotate(${deg})`}>
            <circle r="4" fill="#4a4e55" stroke="#0b0d10" strokeWidth="0.8" />
            <path d="M-2.6 0 H2.6" stroke="#0b0d10" strokeWidth="1" />
          </g>
        )
      })}
    </>
  )
}

function Mainplate({ uid }: LayerProps) {
  const stripes = `${uid}-stripes`
  const clip = `${uid}-plateclip`
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-rhod`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#b3b7bc" />
          <stop offset="0.6" stopColor="#7f848a" />
          <stop offset="1" stopColor="#4d5157" />
        </radialGradient>
        <pattern id={stripes} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="7" height="14" fill="rgba(255,255,255,0.09)" />
          <rect x="7" width="7" height="14" fill="rgba(0,0,0,0.08)" />
        </pattern>
        <clipPath id={clip}>
          <circle cx={CX} cy={CY} r="118" />
        </clipPath>
      </defs>
      <circle cx={CX} cy={CY} r="118" fill={`url(#${uid}-rhod)`} />
      <circle cx={CX} cy={CY} r="118" fill={`url(#${stripes})`} />
      <circle cx={CX} cy={CY} r="118" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <g clipPath={`url(#${clip})`}>
        {/* barrel bridge */}
        <path
          d="M230 196 Q300 210 306 290 Q306 320 282 330 L250 332 Q238 300 246 262 Q240 230 230 196 Z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="1"
        />
        {/* ratchet wheel */}
        <g stroke="#8d9197" fill="#5e6368">
          {toothed(268, 262, 30, 36, 4)}
          <circle cx="268" cy="262" r="26" fill="#6a6f75" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
          <circle cx="268" cy="262" r="7" fill="#2b3f8f" stroke="#0b0d10" strokeWidth="0.8" />
          <path d="M263 262 H273" stroke="#0b0d10" strokeWidth="1.2" />
        </g>
        {/* crown wheel */}
        <g stroke="#8d9197" fill="#5e6368">
          {toothed(292, 322, 16, 22, 3)}
          <circle cx="292" cy="322" r="13" fill="#6a6f75" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
        </g>
      </g>
      {/* jewels */}
      {[
        [200, 300],
        [146, 226],
        [252, 376],
        [160, 372],
        [230, 236],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6.5" fill="#caa15c" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <circle cx={x} cy={y} r="3.6" fill="#8e1b2d" />
          <circle cx={x - 1} cy={y - 1.2} r="1" fill="rgba(255,255,255,0.7)" />
        </g>
      ))}
      {/* blued screws */}
      {[
        [182, 206, 20],
        [296, 236, 60],
        [128, 318, 110],
        [214, 398, 15],
        [304, 346, 80],
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <circle r="4.6" fill="#2b3f8f" stroke="#0b0d10" strokeWidth="0.8" />
          <path d="M-3 0 H3" stroke="#0b0d10" strokeWidth="1.2" />
          <circle cx="-1.4" cy="-1.4" r="1" fill="rgba(255,255,255,0.35)" />
        </g>
      ))}
    </>
  )
}

function Train({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2c58a" />
          <stop offset="0.5" stopColor="#b8924f" />
          <stop offset="1" stopColor="#8a6a36" />
        </linearGradient>
        <linearGradient id={`${uid}-bridge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a4a8ae" />
          <stop offset="1" stopColor="#5d6268" />
        </linearGradient>
      </defs>
      {/* centre wheel */}
      <g stroke="#caa15c" fill="none">
        {toothed(CX, CY, 46, 60, 3.5)}
        <circle cx={CX} cy={CY} r="42" fill="url(#g)" stroke="url(#g)" />
        <circle cx={CX} cy={CY} r="42" fill={`url(#${uid}-gold)`} stroke="none" opacity="0.95" />
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            d={`M ${CX} ${CY} m 0 -10 l -6 -26 a 34 34 0 0 1 12 0 z`}
            transform={`rotate(${a} ${CX} ${CY})`}
            fill="#0c0e12"
            stroke="none"
            opacity="0.55"
          />
        ))}
        <circle cx={CX} cy={CY} r="8" fill="#6a6f75" stroke="#0b0d10" strokeWidth="1" />
      </g>
      {/* third wheel */}
      <g stroke="#caa15c">
        {toothed(254, 348, 26, 40, 3)}
        <circle cx="254" cy="348" r="22" fill={`url(#${uid}-gold)`} stroke="none" />
        <circle cx="254" cy="348" r="4.5" fill="#6a6f75" stroke="#0b0d10" strokeWidth="1" />
      </g>
      {/* escape wheel */}
      <g stroke="#9a9ea4">
        {toothed(206, 250, 14, 15, 3)}
        <circle cx="206" cy="250" r="10" fill="#7d8187" stroke="none" />
        <circle cx="206" cy="250" r="3" fill="#2b3f8f" />
      </g>
      {/* balance cock */}
      <path
        d="M110 250 Q98 300 118 350 L172 372 Q186 356 190 340 L160 318 Q150 296 160 280 L148 254 Z"
        fill={`url(#${uid}-bridge)`}
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="1"
        opacity="0.92"
      />
      {/* balance wheel */}
      <g className="watch__balance" style={{ transformOrigin: '150px 330px' }}>
        <circle cx="150" cy="330" r="40" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="6" />
        <circle cx="150" cy="330" r="40" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        <path d="M110 330 H190 M150 290 V370" stroke="#caa15c" strokeWidth="2.5" />
        <path d={HAIRSPRING} fill="none" stroke="#2b3f8f" strokeWidth="1.1" />
        <circle cx="150" cy="330" r="4" fill="#8e1b2d" stroke="#caa15c" strokeWidth="1.5" />
      </g>
      {/* regulator pointer */}
      <path d="M150 288 L146 276 L154 276 Z" fill="#2b3f8f" />
      <path d="M135 275 H165" stroke="rgba(0,0,0,0.45)" strokeWidth="1" />
    </>
  )
}

function Dial({ v, uid }: LayerProps) {
  const r = 130
  const ticks = `${uid}-ticks`
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-dial`} cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor={v.dial} />
          <stop offset="1" stopColor={v.dialEdge} />
        </radialGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="0.45" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.55" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.28)" />
        </linearGradient>
        <linearGradient id={`${uid}-index`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f0" />
          <stop offset="0.5" stopColor="#9a9ea3" />
          <stop offset="1" stopColor="#dfe1e3" />
        </linearGradient>
        <pattern id={ticks} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" />
        </pattern>
      </defs>
      <circle cx={CX} cy={CY} r={r} fill={`url(#${uid}-dial)`} />
      <circle cx={CX} cy={CY} r={r} fill={`url(#${uid}-sheen)`} />
      {/* minute track */}
      <circle
        cx={CX}
        cy={CY}
        r="120"
        fill="none"
        stroke={v.ink}
        strokeOpacity="0.55"
        strokeWidth="5"
        strokeDasharray={`0.9 ${(2 * Math.PI * 120) / 60 - 0.9}`}
      />
      <circle cx={CX} cy={CY} r="117" fill="none" stroke={v.ink} strokeOpacity="0.12" strokeWidth="0.6" />
      {/* applied indices */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 30
        const double = i === 0
        return (
          <g key={i} transform={`rotate(${a} ${CX} ${CY})`}>
            {double ? (
              <>
                <rect x={CX - 7.5} y={CY - 112} width="5" height="24" rx="0.8" fill={`url(#${uid}-index)`} />
                <rect x={CX + 2.5} y={CY - 112} width="5" height="24" rx="0.8" fill={`url(#${uid}-index)`} />
                <rect x={CX - 6} y={CY - 110} width="2" height="20" fill={LUME} />
                <rect x={CX + 4} y={CY - 110} width="2" height="20" fill={LUME} />
              </>
            ) : (
              <>
                <rect x={CX - 2.6} y={CY - 112} width="5.2" height={i % 3 === 0 ? 24 : 18} rx="0.8" fill={`url(#${uid}-index)`} />
                <rect x={CX - 1} y={CY - 110} width="2" height={i % 3 === 0 ? 20 : 14} fill={LUME} />
              </>
            )}
          </g>
        )
      })}
      <text
        x={CX}
        y={CY - 54}
        textAnchor="middle"
        fontFamily="var(--serif)"
        fontSize="17"
        letterSpacing="4"
        fill={v.ink}
        fontWeight="500"
        style={{ fontVariationSettings: '"opsz" 11, "wght" 500' }}
      >
        MERIDIAN
      </text>
      <text x={CX} y={CY - 40} textAnchor="middle" fontFamily="var(--grotesk)" fontSize="6.5" letterSpacing="2.2" fill={v.ink} fillOpacity="0.7">
        MANUFACTURE
      </text>
      <text x={CX} y={CY + 62} textAnchor="middle" fontFamily="var(--grotesk)" fontSize="7" letterSpacing="2.4" fill={v.ink} fillOpacity="0.8">
        CALIBRE M-01
      </text>
      <text x={CX} y={CY + 74} textAnchor="middle" fontFamily="var(--grotesk)" fontSize="6.5" letterSpacing="2" fill={v.ink} fillOpacity="0.6">
        SEVENTY-TWO HOURS
      </text>
      {/* small seconds at 6: a recessed ring */}
      <circle cx={CX} cy={CY + 92} r="1.6" fill={v.ink} fillOpacity="0.5" />
    </>
  )
}

function Hands({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-blue`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d2b66" />
          <stop offset="0.5" stopColor="#4a63c4" />
          <stop offset="1" stopColor="#1d2b66" />
        </linearGradient>
      </defs>
      {/* hour hand at ~10 */}
      <g transform={`rotate(-50 ${CX} ${CY})`}>
        <path d={`M ${CX - 5} ${CY + 12} L ${CX - 5} ${CY - 56} L ${CX} ${CY - 74} L ${CX + 5} ${CY - 56} L ${CX + 5} ${CY + 12} Z`} fill={`url(#${uid}-blue)`} stroke="#0b0d10" strokeWidth="0.6" />
        <rect x={CX - 1.8} y={CY - 58} width="3.6" height="42" fill={LUME} />
      </g>
      {/* minute hand at ~2 */}
      <g transform={`rotate(54 ${CX} ${CY})`}>
        <path d={`M ${CX - 4.2} ${CY + 14} L ${CX - 4.2} ${CY - 92} L ${CX} ${CY - 112} L ${CX + 4.2} ${CY - 92} L ${CX + 4.2} ${CY + 14} Z`} fill={`url(#${uid}-blue)`} stroke="#0b0d10" strokeWidth="0.6" />
        <rect x={CX - 1.5} y={CY - 94} width="3" height="66" fill={LUME} />
      </g>
      {/* seconds hand, sweeping */}
      <g className="watch__seconds" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <path d={`M ${CX} ${CY + 30} L ${CX} ${CY - 118}`} stroke="#d8d4cc" strokeWidth="1.2" />
        <circle cx={CX} cy={CY - 104} r="3.2" fill={LUME} />
        <circle cx={CX} cy={CY + 22} r="4.5" fill="#d8d4cc" />
      </g>
      <circle cx={CX} cy={CY} r="6" fill="#c8ccd1" stroke="#0b0d10" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="2" fill="#2b3f8f" />
    </>
  )
}

function Case({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-ti`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d9096" />
          <stop offset="0.5" stopColor="#4c5057" />
          <stop offset="1" stopColor="#2d3137" />
        </linearGradient>
        <linearGradient id={`${uid}-lug`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c8086" />
          <stop offset="1" stopColor="#33373d" />
        </linearGradient>
      </defs>
      {/* lugs */}
      {[
        { x: 140, y: 150, r: -14 },
        { x: 260, y: 150, r: 14 },
        { x: 140, y: 450, r: 14 },
        { x: 260, y: 450, r: -14 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
          <rect x="-13" y="-32" width="26" height="64" rx="7" fill={`url(#${uid}-lug)`} stroke="#0b0d10" strokeWidth="1" />
          <rect x="-7" y="-30" width="2" height="60" fill="rgba(255,255,255,0.18)" />
        </g>
      ))}
      {/* mid-case */}
      <path d={annulus(156, 136)} fill={`url(#${uid}-ti)`} fillRule="evenodd" stroke="#0b0d10" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="156" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="136" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
      {/* back ring through the middle for the exploded read */}
      <circle cx={CX} cy={CY} r="136" fill="#0c0e12" fillOpacity="0.001" />
    </>
  )
}

function Crown({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-crown`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9da1a7" />
          <stop offset="0.5" stopColor="#5b5f66" />
          <stop offset="1" stopColor="#2e3238" />
        </linearGradient>
      </defs>
      <rect x="352" y="293" width="12" height="14" fill="#3a3e45" />
      <rect x="360" y="286" width="20" height="28" rx="5" fill={`url(#${uid}-crown)`} stroke="#0b0d10" strokeWidth="1" />
      {[289, 293, 297, 301, 305, 309].map((y) => (
        <path key={y} d={`M362 ${y} H378`} stroke="rgba(0,0,0,0.55)" strokeWidth="1" />
      ))}
      <circle cx="370" cy="300" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    </>
  )
}

function Bezel({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bz`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3e5e8" />
          <stop offset="0.35" stopColor="#8a8e94" />
          <stop offset="0.65" stopColor="#3c4046" />
          <stop offset="1" stopColor="#b4b8bd" />
        </linearGradient>
      </defs>
      <path d={annulus(150, 130)} fill={`url(#${uid}-bz)`} fillRule="evenodd" />
      <circle cx={CX} cy={CY} r="150" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="141" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r="130" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" />
    </>
  )
}

function Crystal({ uid }: LayerProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-cr`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="0.38" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="0.62" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
        <radialGradient id={`${uid}-crEdge`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.86" stopColor="rgba(255,255,255,0)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.12)" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="130" fill={`url(#${uid}-cr)`} />
      <circle cx={CX} cy={CY} r="130" fill={`url(#${uid}-crEdge)`} />
      <circle cx={CX} cy={CY} r="129.5" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />
      <path d="M118 236 Q150 190 214 184" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" />
    </>
  )
}

const LAYERS: Record<PartId, (p: LayerProps) => JSX.Element> = {
  strap: Strap,
  caseback: Caseback,
  mainplate: Mainplate,
  train: Train,
  dial: Dial,
  hands: Hands,
  case: Case,
  crown: Crown,
  bezel: Bezel,
  crystal: Crystal,
}

type WatchProps = {
  /** unique id for gradient/pattern ids; must differ per instance on a page */
  uid: string
  variant?: WatchVariant
  className?: string
  /** render only these parts (defaults to all) */
  parts?: PartId[]
  /** animate the seconds hand and balance wheel */
  live?: boolean
}

/**
 * The watch as ten stacked SVG layers. Each layer is a full-size SVG so the
 * exploded view can push it along z with a 3D transform.
 */
function WatchBase({ uid, variant = VARIANTS.nocturne, className = '', parts, live = true }: WatchProps) {
  const ids = parts ?? PARTS.map((p) => p.id)
  return (
    <div className={`watch ${live ? 'watch--live' : ''} ${className}`} data-watch={uid} aria-hidden="true">
      {ids.map((id) => {
        const Layer = LAYERS[id]
        return (
          <svg key={id} className="watch__layer" data-part={id} viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <Layer v={variant} uid={`${uid}-${id}`} />
          </svg>
        )
      })}
    </div>
  )
}

export const Watch = memo(WatchBase)
