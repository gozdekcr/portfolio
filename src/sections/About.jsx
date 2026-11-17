import { motion } from 'framer-motion'
import { about } from '../data/site'
import Icon from '../components/Icon'
import { Container, PixelStar, Reveal, SectionHeading, spring } from '../components/ui'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative bg-gradient-to-b from-page via-lav-mist to-page py-24 md:py-32"
    >
      <Container>
        <div>
            <SectionHeading id="about-title" eyebrow="About me" title="Nice to meet you!" />
            <Reveal delay={0.1}>
              <p className="-mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
                {about.intro}
              </p>
            </Reveal>
          </div>

        <Reveal className="mt-16 mb-8 flex items-center gap-3">
          <h3 className="text-2xl text-ink md:text-3xl">What I&apos;m into</h3>
          <PixelStar className="text-brand" size={14} />
          <PixelStar className="text-lav" size={10} delay={0.7} />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.interests.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ ...spring, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="card wiggle-hover group flex items-center gap-4 p-5 hover:shadow-[0_18px_40px_-16px_rgba(144,71,255,0.35)]"
            >
              <div className="wiggle-target grid size-14 shrink-0 place-items-center rounded-2xl bg-lav-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon name={item.icon} size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-lg leading-tight text-ink">{item.title}</h4>
                <p className="mt-1 text-ink-soft">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
