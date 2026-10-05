import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import FilterBar from './FilterBar'

export default function ProjectsBrowser({ projects, filters, onOpen }) {
  const [active, setActive] = useState('All')
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))

  return (
    <div>
      <div className="mb-8">
        <FilterBar filters={filters} active={active} onChange={setActive} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} onOpen={onOpen} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
