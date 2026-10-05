import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Sparkles, Briefcase, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import RevealText from '../components/RevealText'
import StatusPill from '../components/StatusPill'
import Marquee from '../components/Marquee'
import ScrollReveal from '../components/ScrollReveal'
import BentoTile from '../components/BentoTile'
import Container from '../components/Container'
import { stack } from '../data/links'
import { useLocalTime } from '../hooks/useLocalTime'

export default function Home() {
  const time = useLocalTime()

  return (
    <>
      <SEO
        title="Home"
        description="Computer Engineering student & software intern building AI-powered tools."
      />

      <section className="pt-40 pb-20">
        <Container>
          <StatusPill>Currently interning at Iceberg Digital</StatusPill>

          <RevealText
            as="h1"
            text="Gözde Kacar"
            className="mt-6 text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          />

          <ScrollReveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Computer Engineering student &amp; software intern building{' '}
              <span className="text-lilac">AI-powered tools</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-md bg-lilac px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              See my work
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-lilac/30"
            >
              Get in touch
            </Link>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-10">
        <ScrollReveal>
          <Marquee items={stack} />
        </ScrollReveal>
      </section>

      <section className="py-20">
        <Container>
          <ScrollReveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              I'm a second-year Computer Engineering student and a software intern, and
              I learn best by building. Most of my work sits at the intersection of AI
              and everyday problems: turning messy, unstructured information into clean
              data, automating repetitive design work, and making tools that save people
              time. I care about the details. A tool should work well under the hood and
              still feel simple and pleasant to use. Right now I'm sharpening my backend
              and data skills, with the long-term goal of growing into data science and
              building products people actually rely on.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal className="lg:col-span-2 lg:row-span-2">
              <BentoTile to="/work" className="h-full min-h-[260px]">
                <Sparkles className="text-lilac" size={18} />
                <p className="mt-6 text-xs text-muted">Featured project</p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  figma-component-generator
                </h3>
                <p className="mt-3 max-w-sm text-sm text-muted">
                  A Figma plugin that turns structured input into ready-made
                  components.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-lilac">
                  See more <ArrowRight size={13} />
                </span>
              </BentoTile>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <BentoTile to="/work" className="h-full">
                <Briefcase className="text-lilac" size={17} />
                <p className="mt-5 text-xs text-muted">Experience</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">
                  Software Intern
                </h3>
                <p className="mt-1 text-sm text-muted">Iceberg Digital &middot; since June 2026</p>
              </BentoTile>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <BentoTile className="h-full">
                <MapPin className="text-lilac" size={17} />
                <p className="mt-5 text-xs text-muted">Based in</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">
                  Istanbul / Muğla
                </h3>
                <p className="mt-1 text-sm text-muted">Local time &middot; {time}</p>
              </BentoTile>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <BentoTile to="/contact" className="h-full">
                <MessageCircle className="text-lilac" size={17} />
                <p className="mt-5 text-xs text-muted">Say hello</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">
                  Let's talk
                </h3>
                <p className="mt-1 text-sm text-muted">Open to feedback & new ideas</p>
              </BentoTile>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  )
}
