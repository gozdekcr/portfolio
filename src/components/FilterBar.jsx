import { motion } from 'framer-motion'

export default function FilterBar({ filters, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = filter === active
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className="relative rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            {isActive && (
              <motion.span
                layoutId="filter-indicator"
                className="absolute inset-0 rounded-md border border-lilac/30"
                transition={{ type: 'spring', stiffness: 400, damping: 36 }}
              />
            )}
            <span className={`relative ${isActive ? 'text-ink' : ''}`}>{filter}</span>
          </button>
        )
      })}
    </div>
  )
}
