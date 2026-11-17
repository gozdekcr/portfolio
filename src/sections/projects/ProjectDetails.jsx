import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { GithubIcon } from '../../components/icons'

export const statusStyle = {
  Live: 'bg-emerald-400',
  'In progress': 'bg-amber-300',
  Internship: 'bg-lav',
}

export default function ProjectDetails({ project, index, total, onOpen }) {
  return (
    <div aria-live="polite" className="relative mx-auto min-h-[260px] max-w-3xl text-center">
      <AnimatePresence mode="wait" initial={false}>
        {project && (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <p className="sr-only">
              Project {index + 1} of {total}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white ring-1 ring-white/15">
                <span className={`size-2 rounded-full ${statusStyle[project.status]}`} aria-hidden />
                {project.status}
              </span>
              {project.role && (
                <span className="rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
                  {project.role}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-3xl text-white md:text-4xl">{project.title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Tech used">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-lav/40 px-3 py-1 text-sm text-lav-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="pill-brand px-5 py-2.5 hover:-translate-y-0.5"
              >
                <Maximize2 size={16} aria-hidden />
                View details
              </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="pill group bg-white px-5 py-2.5 text-ink hover:-translate-y-0.5 hover:bg-lav-soft"
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
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  )
}
