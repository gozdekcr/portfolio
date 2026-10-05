import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import Container from './Container'
import { links } from '../data/links'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex items-center justify-between gap-6">
        <p className="text-sm text-muted">&copy; 2026 Gözde Kacar</p>

        <div className="flex items-center gap-5">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-ink"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            href={`mailto:${links.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-ink"
          >
            <Mail size={17} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
