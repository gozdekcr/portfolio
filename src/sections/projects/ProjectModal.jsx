import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { GithubIcon } from '../../components/icons'
import ProjectCover from './ProjectCover'
import { statusStyle } from './ProjectDetails'

function Dialog({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      // simple focus trap
      const f = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[#07050d]/70 backdrop-blur-sm"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative flex max-h-[90svh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_40px_100px_-30px_rgba(144,71,255,0.6)] ring-4 ring-brand/30 md:flex-row"
      >
        <div className="relative h-44 shrink-0 sm:h-56 md:h-auto md:w-[38%]">
          <ProjectCover project={project} showTitle={false} className="rounded-none" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow ring-1 ring-[#ece6f8] transition-transform hover:rotate-90 hover:bg-lav-soft"
          >
            <X size={18} aria-hidden />
          </button>

          <div className="flex flex-wrap items-center gap-2 pr-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-lav-soft px-3 py-1 text-sm font-bold text-brand-deep">
              <span className={`size-2 rounded-full ${statusStyle[project.status]}`} aria-hidden />
              {project.status}
            </span>
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full px-3 py-1 text-sm font-bold text-ink-soft ring-1 ring-[#e3d6ff]"
              >
                {c}
              </span>
            ))}
          </div>

          <h3 id="project-modal-title" className="mt-4 text-2xl leading-tight md:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 leading-relaxed text-ink-soft">{project.details}</p>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-bold text-brand-deep">My role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-brand-deep">Status</dt>
              <dd className="mt-1">{project.status}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-bold text-brand-deep">Tech stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-lav-mist px-3 py-1 text-sm text-ink ring-1 ring-[#e3d6ff]"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="pill-brand group mt-7 px-5 py-2.5 hover:-translate-y-0.5"
            >
              <GithubIcon size={18} />
              View on GitHub
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectModal({ project, onClose }) {
  return createPortal(
    <AnimatePresence>
      {project && <Dialog key={project.slug} project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body,
  )
}
