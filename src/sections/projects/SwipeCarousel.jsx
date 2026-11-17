import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import ProjectCover from './ProjectCover'

/** Mobile fallback: native horizontal scroll with snap. */
export default function SwipeCarousel({ items, active, onActiveChange, onOpen }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const fromScroll = useRef(false)
  const activeRef = useRef(active)
  activeRef.current = active

  // scroll -> active
  useEffect(() => {
    const el = ref.current
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2
        let best = 0
        let bestD = Infinity
        Array.from(el.children).forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center)
          if (d < bestD) {
            bestD = d
            best = i
          }
        })
        if (best !== activeRef.current) {
          fromScroll.current = true
          onActiveChange(best)
        }
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [onActiveChange])

  // active (buttons / filter) -> scroll
  useEffect(() => {
    if (fromScroll.current) {
      fromScroll.current = false
      return
    }
    const el = ref.current
    const card = el?.children[active]
    if (!card) return
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [active, items, reduced])

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects gallery. Swipe to browse."
      tabIndex={0}
      className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] pt-4 pb-10"
    >
      {items.map((item, i) => (
        <div
          key={item.slug}
          aria-hidden
          onClick={() => (i === active ? onOpen() : onActiveChange(i))}
          className={`aspect-[10/13] w-[78vw] max-w-[320px] shrink-0 snap-center transition-[transform,opacity] duration-300 ${
            i === active ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-60'
          }`}
        >
          <div className="h-full rounded-3xl shadow-[0_24px_50px_-18px_rgba(144,71,255,0.6)]">
            <ProjectCover project={item} />
          </div>
        </div>
      ))}
    </div>
  )
}
