import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import { learning } from '../data/learning'
import { Container, PixelStar, SectionHeading } from '../components/ui'

const GROUP_H = 120
const ITEM_H = 100

function buildRows(narrow) {
  const rows = []
  learning.forEach((group) => {
    rows.push({ type: 'group', group, key: group.id })
    group.items.forEach((text, i) => rows.push({ type: 'item', group, text, i, key: `${group.id}-${i}` }))
  })
  let y = 0
  let zig = 0
  return rows.map((r) => {
    const h = r.type === 'group' ? GROUP_H + (r.group.note ? 36 : 0) : narrow ? ITEM_H - 6 : ITEM_H
    let x
    if (narrow) x = r.type === 'group' ? 0.1 : zig++ % 2 ? 0.1 : 0.2
    else x = r.type === 'group' ? 0.5 : zig++ % 2 ? 0.76 : 0.24
    if (r.type === 'group') zig = 0
    const row = { ...r, x, y: y + h / 2, h }
    y += h
    return row
  })
}

function pathFor(rows, w) {
  return rows
    .map((r, i) => {
      const x = r.x * w
      if (i === 0) return `M ${x} ${r.y}`
      const p = rows[i - 1]
      const px = p.x * w
      const dy = (r.y - p.y) / 2
      return `C ${px} ${p.y + dy}, ${x} ${r.y - dy}, ${x} ${r.y}`
    })
    .join(' ')
}

function Node({ row }) {
  const { group } = row
  if (row.type === 'group') {
    const style =
      group.id === 'done'
        ? 'bg-brand text-white'
        : group.id === 'now'
          ? 'bg-brand-deep text-white'
          : group.id === 'later'
            ? 'bg-lav-soft text-brand-deep border-[3px] border-lav'
            : 'bg-white text-brand border-[3px] border-dashed border-lav'
    return (
      <span
        className={`grid size-12 place-items-center rounded-full text-xl font-bold shadow-lg ring-4 ring-page ${style}`}
      >
        {group.symbol}
      </span>
    )
  }
  if (group.id === 'done')
    return (
      <span className="grid size-9 place-items-center rounded-full bg-brand text-white shadow-md ring-4 ring-page">
        <Check size={18} strokeWidth={3} />
      </span>
    )
  if (group.id === 'now')
    return (
      <span className="relative grid size-9 place-items-center rounded-full bg-white shadow-md ring-4 ring-brand">
        <span className="animate-ring-pulse absolute inset-0 rounded-full bg-brand/40" />
        <span className="relative size-3 rounded-full bg-brand" />
      </span>
    )
  if (group.id === 'later')
    return (
      <span className="grid size-9 place-items-center rounded-full bg-lav-soft text-brand shadow-md ring-4 ring-page">
        <PixelStar size={14} />
      </span>
    )
  return (
    <span className="grid size-9 place-items-center rounded-full border-[3px] border-dashed border-lav bg-white" />
  )
}

export default function LearningPath() {
  const wrapRef = useRef(null)
  const [w, setW] = useState(800)
  const narrow = w < 640
  const rows = useMemo(() => buildRows(narrow), [narrow])
  const height = rows.reduce((s, r) => s + r.h, 0)
  const d = useMemo(() => pathFor(rows, w), [rows, w])

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 70%', 'end 70%'] })
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })

  return (
    <section
      id="learning"
      aria-labelledby="learning-title"
      className="relative bg-gradient-to-b from-page via-lav-mist to-page py-24 md:py-32"
    >
      <Container>
        <SectionHeading
          id="learning-title"
          eyebrow="Learning path"
          title="My little roadmap"
          text="What I've learned, what I'm on right now, and where I'm heading next."
        />

        <div ref={wrapRef} className="relative mx-auto max-w-4xl" style={{ height }}>
          <svg
            aria-hidden
            className="absolute inset-0 overflow-visible"
            width={w}
            height={height}
            viewBox={`0 0 ${w} ${height}`}
          >
            <defs>
              <linearGradient id="lp-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9047FF" />
                <stop offset="100%" stopColor="#B99AFF" />
              </linearGradient>
            </defs>
            <path
              d={d}
              fill="none"
              stroke="#E3D6FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="2 14"
            />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#lp-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <ol className="absolute inset-0">
            {learning.map((group) => (
              <li key={group.id}>
                <ul aria-label={`${group.label}`}>
                  {rows
                    .filter((r) => r.group.id === group.id)
                    .map((row) => {
                      const right = row.x <= 0.5
                      const isGroup = row.type === 'group'
                      return (
                        <motion.li
                          key={row.key}
                          className="absolute size-px"
                          style={{ left: row.x * w, top: row.y }}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        >
                          <div aria-hidden className="absolute -translate-x-1/2 -translate-y-1/2">
                            <Node row={row} />
                          </div>
                          <div
                            className={`absolute top-0 -translate-y-1/2 ${
                              right ? 'left-8 text-left' : 'right-8 text-right'
                            }`}
                            style={{ width: narrow ? w - row.x * w - 44 : Math.min(340, w * 0.4) }}
                          >
                            {isGroup ? (
                              <>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-lg font-bold text-ink shadow-sm ring-1 ring-[#e3d6ff]">
                                  {group.label}
                                  <PixelStar size={10} className="text-brand" />
                                </span>
                                {group.note && (
                                  <span className="mt-2 block w-fit -rotate-1 rounded-xl bg-[#FFF4CC] px-3 py-1.5 text-sm text-ink shadow-sm">
                                    ✎ {group.note}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span
                                className={`inline-block rounded-2xl px-4 py-2.5 text-[15px] leading-snug md:text-base ${
                                  group.id === 'next' || group.id === 'later'
                                    ? 'bg-white/70 text-ink-soft ring-1 ring-[#e9e1f8]'
                                    : 'bg-white text-ink shadow-[0_8px_20px_-12px_rgba(64,32,128,0.3)] ring-1 ring-[#ece6f8]'
                                }`}
                              >
                                <span className="sr-only">{group.label}: </span>
                                {row.text}
                              </span>
                            )}
                          </div>
                        </motion.li>
                      )
                    })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
