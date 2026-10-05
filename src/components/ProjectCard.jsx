import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, onOpen, className = '' }) {
  return (
    <motion.button
      type="button"
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface p-6 text-left transition-colors duration-200 hover:border-lilac/30 ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted">{project.number}</span>
        <ArrowUpRight
          size={16}
          className="text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-5 text-lg font-medium tracking-tight text-ink">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  )
}
