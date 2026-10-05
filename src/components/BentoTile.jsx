import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function BentoTile({ to, className = '', children }) {
  const Component = to ? Link : 'div'

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`glass group relative overflow-hidden rounded-xl p-7 transition-colors duration-200 hover:border-lilac/30 ${className}`}
    >
      <Component
        to={to}
        className={to ? 'absolute inset-0 z-10' : 'hidden'}
        aria-hidden={to ? undefined : true}
      />
      {children}
    </motion.div>
  )
}
