import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GithubIcon } from './icons'

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            layoutId={`card-${project.id}`}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>

            <span className="text-sm text-muted">{project.number}</span>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-ink transition-colors hover:border-lilac/30"
              >
                <GithubIcon size={15} />
                View on GitHub
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
