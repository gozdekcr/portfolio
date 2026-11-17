import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/experience'
import { Container, SectionHeading, spring } from '../components/ui'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-gradient-to-b from-page via-lav-mist/70 to-page py-24 md:py-32"
    >
      <Container>
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've been building"
        />

        <div ref={listRef} className="relative mx-auto max-w-3xl">
          {/* track + animated line */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-1 rounded-full bg-lav-soft md:left-[19px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[15px] w-1 origin-top rounded-full bg-gradient-to-b from-brand to-lav md:left-[19px]"
          />

          <ol className="space-y-8 md:space-y-10">
            {experience.map((item, i) => (
              <li key={item.org} className="relative pl-12 md:pl-16">
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute top-5 left-0 grid size-[34px] place-items-center rounded-full bg-white shadow-md ring-4 ring-lav-soft md:size-[42px]"
                >
                  <span
                    className={`size-3 rounded-full md:size-3.5 ${i === experience.length - 1 ? 'bg-brand' : 'bg-lav'}`}
                  />
                </motion.span>

                <motion.article
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  transition={spring}
                  whileHover={{ y: -4 }}
                  className="card p-6 md:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="text-xl text-ink md:text-2xl">{item.org}</h3>
                    <span className="rounded-full bg-lav-soft px-3 py-1 text-sm font-bold text-brand-deep">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-brand-deep">
                    {item.role}
                    {item.note && <span className="font-normal text-ink-soft"> · {item.note}</span>}
                  </p>
                  {item.points.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-ink-soft">
                          <span
                            aria-hidden
                            className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-brand"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
