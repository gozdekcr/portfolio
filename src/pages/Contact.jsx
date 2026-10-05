import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'
import CopyEmail from '../components/CopyEmail'
import Container from '../components/Container'
import { links } from '../data/links'

const rows = [
  { label: 'GitHub', value: 'gozdekcr', href: links.github, icon: GithubIcon },
  { label: 'LinkedIn', value: 'Gözde Kacar', href: links.linkedin, icon: LinkedinIcon },
]

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Gözde Kacar." />

      <section className="pt-40 pb-20">
        <Container>
          <ScrollReveal>
            <h1 className="relative inline-block text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
              Let's build
              <br />
              something.
              <svg
                viewBox="0 0 320 16"
                className="absolute -bottom-2 left-0 w-1/2 text-lilac/60"
                aria-hidden
              >
                <motion.path
                  d="M4 10 C 80 2, 240 2, 316 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                />
              </svg>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-14">
            <p className="text-sm text-muted">Email me</p>
            <div className="mt-3">
              <CopyEmail email={links.email} />
            </div>
            <a
              href={`mailto:${links.email}`}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-lilac px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <Mail size={15} />
              Say hello
            </a>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-28">
        <Container>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {rows.map((row) => (
              <a
                key={row.label}
                href={row.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-7 transition-colors hover:text-lilac"
              >
                <div className="flex items-center gap-4">
                  <row.icon className="text-muted transition-colors group-hover:text-lilac" size={18} />
                  <div>
                    <p className="text-xs text-muted">{row.label}</p>
                    <p className="mt-1 text-xl font-medium tracking-tight text-ink">
                      {row.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-colors group-hover:text-lilac"
                />
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
