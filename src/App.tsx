import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './lib/useLenis'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Exploded } from './sections/Exploded'
import { Collection } from './sections/Collection'
import { Specs } from './sections/Specs'
import { Materials } from './sections/Materials'
import { Footer } from './sections/Footer'

export default function App() {
  useLenis()

  useEffect(() => {
    // fonts change layout heights; re-measure every pin once they are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Exploded />
        <Collection />
        <Specs />
        <Materials />
      </main>
      <Footer />
    </>
  )
}
