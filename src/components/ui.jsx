import { motion } from 'framer-motion'

export const spring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }

/** Tiny pixel-art 4-point star. */
export function PixelStar({ size = 14, className = '', color = 'currentColor', delay = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      className={`animate-twinkle ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <g fill={color}>
        <rect x="3" y="0" width="1" height="7" />
        <rect x="0" y="3" width="7" height="1" />
        <rect x="2" y="2" width="3" height="3" />
      </g>
    </svg>
  )
}

/** Fade-and-rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const Cmp = motion[as]
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Cmp>
  )
}

export function SectionHeading({ id, eyebrow, title, text, dark = false, center = false }) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm font-bold ${
          dark ? 'bg-white/10 text-lav' : 'bg-lav-soft text-brand-deep'
        }`}
      >
        <PixelStar size={10} />
        {eyebrow}
      </span>
      <h2
        id={id}
        className={`mt-4 text-4xl leading-[1.1] md:text-5xl ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-lg ${dark ? 'text-white/75' : 'text-ink-soft'}`}>{text}</p>
      )}
    </Reveal>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>
}
