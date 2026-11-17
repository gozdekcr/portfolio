import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion'
import ProjectCover from './ProjectCover'

const STEP_DEG = 24 // angle between neighbouring cards on the cylinder
const VISIBLE = 3.2 // how many cards on each side stay visible
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/**
 * Cards on a convex cylinder (CSS 3D). A single spring value `pos` (a float
 * card index) drives every card's transform/opacity imperatively, so motion
 * runs without React re-renders.
 */
export default function Gallery3D({ items, active, onActiveChange, onOpen }) {
  const reduced = useReducedMotion()
  const pos = useSpring(active, { stiffness: 160, damping: 26, mass: 0.9 })
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const cardRefs = useRef(new Map())
  const [width, setWidth] = useState(1200)

  // live values for event handlers
  const live = useRef({})
  const cardW = clamp(Math.round(width * 0.27), 230, 330)
  const cardH = Math.round(cardW * 1.3)
  const radius = (cardW / 2 + 22) / Math.tan(((STEP_DEG / 2) * Math.PI) / 180)
  live.current = { items, active, onActiveChange, onOpen, cardW, radius, reduced }

  const moveTo = useCallback(
    (v) => {
      if (live.current.reduced) pos.jump(v)
      else pos.set(v)
    },
    [pos],
  )

  const layout = useCallback(() => {
    const p = pos.get()
    const { items: list, radius: R } = live.current
    list.forEach((item, i) => {
      const el = cardRefs.current.get(item.slug)
      if (!el) return
      const o = i - p
      const a = Math.abs(o)
      const scale = 1.06 - Math.min(a, 1) * 0.14
      el.style.transform = `translateZ(${-R}px) rotateY(${o * STEP_DEG}deg) translateZ(${R}px) scale(${scale})`
      el.style.opacity = String(clamp(VISIBLE - a, 0, 1))
      el.style.pointerEvents = a > VISIBLE - 0.5 ? 'none' : 'auto'
      el.style.zIndex = String(100 - Math.round(a * 10))
      const shade = el.firstElementChild?.querySelector('[data-shade]')
      if (shade) shade.style.opacity = String(Math.min(a * 0.32, 0.72))
    })
  }, [pos])

  useMotionValueEvent(pos, 'change', layout)
  useLayoutEffect(layout)

  // external changes (buttons, keys, filter) -> animate
  useEffect(() => {
    moveTo(active)
  }, [active, moveTo])

  useEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const commit = useCallback(
    (target) => {
      const n = live.current.items.length
      const t = clamp(target, 0, n - 1)
      moveTo(t)
      if (t !== live.current.active) live.current.onActiveChange(t)
    },
    [moveTo],
  )

  /* ---------- drag ---------- */
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.button !== 0) return
    const card = e.target.closest('[data-index]')
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      start: pos.get(),
      moved: false,
      cardIndex: card ? Number(card.dataset.index) : null,
      samples: [{ x: e.clientX, t: performance.now() }],
    }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      stageRef.current.setPointerCapture(e.pointerId)
      stageRef.current.dataset.dragging = 'true'
    }
    if (!d.moved) return
    const n = live.current.items.length
    let v = d.start - dx / (live.current.cardW * 0.85)
    // rubber band past the ends
    if (v < 0) v = v * 0.3
    if (v > n - 1) v = n - 1 + (v - (n - 1)) * 0.3
    moveTo(v)
    d.samples.push({ x: e.clientX, t: performance.now() })
    if (d.samples.length > 5) d.samples.shift()
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    delete stageRef.current.dataset.dragging
    if (!d.moved) {
      if (d.cardIndex == null) return
      if (d.cardIndex === live.current.active) live.current.onOpen()
      else commit(d.cardIndex)
      return
    }
    const first = d.samples[0]
    const last = d.samples[d.samples.length - 1]
    const vx = (last.x - first.x) / Math.max(1, last.t - first.t) // px/ms
    const projected = pos.get() - (vx * 160) / (live.current.cardW * 0.85)
    commit(Math.round(projected))
  }

  /* ---------- wheel / trackpad ---------- */
  useEffect(() => {
    const el = stageRef.current
    let timer
    let target = null
    let dir = 0
    const onWheel = (e) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const delta = horizontal ? e.deltaX : e.deltaY
      if (!delta) return
      const n = live.current.items.length
      const cur = target ?? live.current.active
      // let the page scroll when we're at either end (vertical wheel only)
      if (!horizontal && ((delta > 0 && cur >= n - 1) || (delta < 0 && cur <= 0))) return
      e.preventDefault()
      const unit = e.deltaMode === 1 ? 40 : 1
      dir = Math.sign(delta)
      target = clamp(cur + (delta * unit) / 170, 0, n - 1)
      moveTo(target)
      clearTimeout(timer)
      timer = setTimeout(() => {
        const snap = dir > 0 ? Math.ceil(target - 0.25) : Math.floor(target + 0.25)
        target = null
        commit(snap)
      }, 130)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      clearTimeout(timer)
    }
  }, [commit, moveTo])

  /* ---------- keyboard ---------- */
  const onKeyDown = (e) => {
    const n = items.length
    const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen()
      return
    }
    if (e.key in map) {
      e.preventDefault()
      commit(map[e.key])
    }
  }

  const stageH = Math.round(cardH * 1.5)

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* glow + floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-brand opacity-50 blur-[90px]"
        style={{ top: cardH * 0.55, width: cardW * 2.6, height: cardH * 0.7 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-lav/40 to-transparent"
        style={{ top: 40 + cardH * 1.03 + 6 }}
      />

      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects gallery. Use the left and right arrow keys to browse, Enter to open details."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative cursor-grab [&_[data-index]]:cursor-pointer touch-pan-y select-none data-[dragging]:cursor-grabbing focus-visible:rounded-3xl"
        style={{ height: stageH, perspective: 1500, perspectiveOrigin: '50% 35%' }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <div
                key={item.slug}
                data-index={i}
                ref={(el) => {
                  if (el) cardRefs.current.set(item.slug, el)
                  else cardRefs.current.delete(item.slug)
                }}
                className="absolute top-10 left-1/2 will-change-transform"
                style={{ width: cardW, height: cardH, marginLeft: -cardW / 2 }}
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 30 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                >
                  <div className="h-full w-full shadow-[0_30px_60px_-20px_rgba(144,71,255,0.45)] rounded-3xl">
                    <ProjectCover project={item} />
                  </div>
                  <div
                    data-shade
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-[#05040a]"
                    style={{ opacity: 0 }}
                  />
                  {/* floor reflection */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-[calc(100%+10px)] h-[45%] overflow-hidden rounded-3xl"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.32), transparent 75%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,0.32), transparent 75%)',
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 -scale-y-100" style={{ height: cardH }}>
                      <ProjectCover project={item} />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
