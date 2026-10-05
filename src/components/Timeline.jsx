import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function Timeline({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className="relative pl-8 sm:pl-10">
      <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-border" />
      <motion.div
        className="absolute left-0 top-1 w-px origin-top bg-lilac"
        style={{ scaleY: pathLength, height: 'calc(100% - 0.5rem)' }}
      />

      <div className="flex flex-col gap-14">
        {items.map((item) => (
          <ScrollReveal key={item.company} className="relative">
            <span className="absolute -left-8 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-lilac sm:-left-10" />
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {item.period}
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-ink sm:text-2xl">
              {item.role} &middot; {item.company}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.location}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {item.highlights.map((h) => (
                <li key={h} className="max-w-2xl text-sm leading-relaxed text-muted">
                  {h}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
