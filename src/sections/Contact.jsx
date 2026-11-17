import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { contact, links } from '../data/site'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { Container, PixelStar, Reveal, spring } from '../components/ui'

function CardShell({ children, i }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ ...spring, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      className="card wiggle-hover group relative flex flex-col p-6 hover:shadow-[0_20px_44px_-16px_rgba(144,71,255,0.4)] md:p-7"
    >
      {children}
    </motion.li>
  )
}

function IconTile({ children }) {
  return (
    <span className="wiggle-target grid size-14 place-items-center rounded-2xl bg-lav-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
      {children}
    </span>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  const social = [
    {
      label: 'GitHub',
      value: links.github.replace('https://', ''),
      href: links.github,
      icon: <GithubIcon size={24} />,
    },
    { label: 'LinkedIn', value: 'LinkedIn', href: links.linkedin, icon: <LinkedinIcon size={24} /> },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-gradient-to-b from-page to-lav-soft/60 pt-24 md:pt-32"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <PixelStar size={14} className="text-lav" />
            <h2 id="contact-title" className="text-5xl text-ink md:text-7xl">
              {contact.heading}
            </h2>
            <PixelStar size={18} className="text-brand" delay={0.8} />
          </div>
          <p className="mt-5 text-lg text-ink-soft md:text-xl">{contact.text}</p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          <CardShell i={0}>
            <IconTile>
              <Mail size={24} aria-hidden />
            </IconTile>
            <h3 className="mt-5 text-xl text-ink">Email</h3>
            <a
              href={`mailto:${links.email}`}
              className="mt-1 break-all text-ink-soft underline decoration-lav decoration-2 underline-offset-4 hover:text-brand-deep"
            >
              {links.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${links.email}`} className="pill-brand px-4 py-2 text-sm">
                Say hi
              </a>
              <button
                type="button"
                onClick={copy}
                className="pill bg-lav-soft px-4 py-2 text-sm text-brand-deep hover:bg-[#e2d4ff]"
              >
                {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </CardShell>

          {social.map((s, i) => (
            <CardShell key={s.label} i={i + 1}>
              <IconTile>{s.icon}</IconTile>
              <h3 className="mt-5 text-xl text-ink">{s.label}</h3>
              <p className="mt-1 text-ink-soft">{s.value}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 font-bold text-brand-deep after:absolute after:inset-0 after:rounded-3xl"
              >
                Open {s.label}
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </CardShell>
          ))}
        </ul>
      </Container>

      <footer className="mt-24 border-t border-[#e3d6ff]">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-sm text-ink-soft">{contact.copyright}</p>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${links.email}`}
              aria-label="Email"
              className="grid size-10 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-[#e3d6ff] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-brand hover:text-white"
            >
              <Mail size={18} aria-hidden />
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-[#e3d6ff] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-brand hover:text-white"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-[#e3d6ff] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-brand hover:text-white"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </Container>
      </footer>

      {/* toast */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center">
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            <div className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white shadow-xl">
              <Check size={18} className="text-lav" aria-hidden />
              Copied!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  )
}
