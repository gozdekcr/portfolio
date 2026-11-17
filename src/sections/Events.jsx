import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { events } from '../data/events'
import Icon from '../components/Icon'
import { GithubIcon } from '../components/icons'
import { Container, PixelStar, SectionHeading } from '../components/ui'

const tilts = [-3, 2.5, -1.5, 3, -2.5, 1.5]

export default function Events() {
  return (
    <section id="events" aria-labelledby="events-title" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="events-title"
          eyebrow="Competitions & Bootcamps"
          title="Stickers I've collected"
        />

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => {
            const tilt = tilts[i % tilts.length]
            return (
              <motion.li
                key={ev.title}
                initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ type: 'spring', stiffness: 220, damping: 16, delay: i * 0.06 }}
                className="relative flex flex-col rounded-3xl border-4 border-white bg-gradient-to-br from-lav-soft to-white p-6 pt-7 shadow-[0_14px_30px_-12px_rgba(110,43,217,0.35)] ring-1 ring-[#e3d6ff]"
              >
                {/* sticker tape */}
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 rounded-md bg-lav/50"
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                    <Icon name={ev.icon} size={26} />
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-right text-xs font-bold text-brand-deep ring-1 ring-[#e3d6ff]">
                    {ev.badge}
                  </span>
                </div>
                {ev.date && <p className="mt-5 text-sm font-bold text-brand-deep">{ev.date}</p>}
                <h3 className={`text-xl text-ink ${ev.date ? 'mt-1' : 'mt-5'}`}>{ev.title}</h3>
                {ev.project && (
                  <p className="mt-2 text-ink">
                    Project <span className="font-bold">{ev.project}</span>
                  </p>
                )}
                {ev.text && <p className="mt-2 text-ink-soft">{ev.text}</p>}
                {ev.github && (
                  <a
                    href={ev.github}
                    target="_blank"
                    rel="noreferrer"
                    className="pill group mt-5 self-start bg-white px-4 py-2 text-sm text-ink ring-1 ring-[#e3d6ff] hover:-translate-y-0.5 hover:bg-lav-soft"
                  >
                    <GithubIcon size={16} />
                    GitHub
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <PixelStar className="absolute right-5 bottom-5 text-brand" size={12} />
              </motion.li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
