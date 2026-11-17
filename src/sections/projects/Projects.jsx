import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { filters, projects } from '../../data/projects'
import { useMediaQuery } from '../../hooks/useActiveSection'
import { Container, PixelStar, SectionHeading } from '../../components/ui'
import ProjectDetails from './ProjectDetails'
import ProjectModal from './ProjectModal'
import SwipeCarousel from './SwipeCarousel'

const Gallery3D = lazy(() => import('./Gallery3D'))
const pad = (n) => String(n).padStart(2, '0')

function FilterPill({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="project-filter"
        className="pill bg-white/10 px-4 py-2.5 text-sm text-white ring-1 ring-white/15 hover:bg-white/15"
      >
        <SlidersHorizontal size={16} aria-hidden />
        Filter<span className="text-lav">· {value}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="project-filter"
            role="group"
            aria-label="Filter projects"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="absolute right-0 bottom-[calc(100%+10px)] z-20 flex w-max max-w-[calc(100vw-2.5rem)] origin-bottom-right flex-wrap gap-1.5 rounded-3xl bg-[#1c1630] p-1.5 shadow-2xl ring-1 ring-white/10"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={value === f}
                onClick={() => {
                  onChange(f)
                  setOpen(false)
                }}
                className={`pill px-3.5 py-1.5 text-sm ${
                  value === f ? 'bg-brand text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Progress({ index, total }) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-bold text-white tabular-nums" aria-hidden>
        {pad(index + 1)} <span className="text-white/50">/ {pad(total)}</span>
      </p>
      <div className="flex h-5 items-end gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`block w-[3px] origin-bottom rounded-full transition-[transform,background-color] duration-300 ${
              i === index ? 'scale-y-100 bg-brand' : i < index ? 'scale-y-50 bg-lav/70' : 'scale-y-50 bg-white/25'
            }`}
            style={{ height: 20 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const galleryRef = useRef(null)
  const near = useInView(galleryRef, { once: true, margin: '600px 0px' })

  const items = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )
  const current = items[Math.min(active, items.length - 1)]

  const changeFilter = (f) => {
    setFilter(f)
    setActive(0)
  }
  const openCurrent = useCallback(() => setOpened(current), [current])
  const closeModal = useCallback(() => setOpened(null), [])
  const go = useCallback(
    (i) => setActive(Math.max(0, Math.min(items.length - 1, i))),
    [items.length],
  )

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="on-dark relative overflow-hidden bg-night py-24 text-white md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 0%, rgba(144,71,255,0.22), transparent 70%), radial-gradient(40% 30% at 85% 90%, rgba(185,154,255,0.10), transparent 70%)',
        }}
      />
      <PixelStar className="absolute top-24 left-[8%] text-lav" size={12} />
      <PixelStar className="absolute top-40 right-[12%] text-white" size={10} delay={1} />
      <PixelStar className="absolute bottom-40 left-[18%] text-brand" size={14} delay={1.8} />

      <Container className="relative">
        <SectionHeading
          id="projects-title"
          dark
          center
          eyebrow="Projects"
          title="Things I've built"
          text={
            isDesktop
              ? 'Drag, scroll or use the arrow keys to spin through my work. Click a card for details.'
              : 'Swipe through my work. Tap a card for details.'
          }
        />
      </Container>

      <div ref={galleryRef} className="relative mx-auto max-w-[1600px] px-5 md:px-8">
        {isDesktop ? (
          near ? (
            <Suspense fallback={<div style={{ height: 560 }} />}>
              <Gallery3D items={items} active={active} onActiveChange={go} onOpen={openCurrent} />
            </Suspense>
          ) : (
            <div style={{ height: 560 }} />
          )
        ) : (
          <SwipeCarousel items={items} active={active} onActiveChange={go} onOpen={openCurrent} />
        )}
      </div>

      <Container className="relative">
        <div className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center justify-between gap-4 md:mt-6">
          <Progress index={active} total={items.length} />
          <div className="order-3 flex w-full items-center justify-center gap-2 sm:order-none sm:w-auto">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous project"
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-[background-color,transform] hover:-translate-x-0.5 hover:bg-brand disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active >= items.length - 1}
              aria-label="Next project"
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-[background-color,transform] hover:translate-x-0.5 hover:bg-brand disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
          <div className="order-2 sm:order-none">
            <FilterPill value={filter} onChange={changeFilter} />
          </div>
        </div>

        <div className="mt-12">
          <ProjectDetails
            project={current}
            index={active}
            total={items.length}
            onOpen={openCurrent}
          />
          <ProjectModal project={opened} onClose={closeModal} />
        </div>
      </Container>
    </section>
  )
}
