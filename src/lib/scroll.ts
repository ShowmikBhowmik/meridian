import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Smooth-scroll to a selector through Lenis when it is running, else natively. */
export function scrollTo(selector: string) {
  const node = document.querySelector<HTMLElement>(selector)
  if (!node) return
  if (lenis) {
    lenis.scrollTo(node, { duration: 1.4 })
  } else {
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
