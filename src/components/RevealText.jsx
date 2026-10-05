import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const word = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function RevealText({ text, as: Component = 'span', className = '' }) {
  const reducedMotion = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return <Component className={className}>{text}</Component>
  }

  return (
    <Component className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}
