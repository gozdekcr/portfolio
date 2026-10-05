import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let frameId
    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [enabled])
}
