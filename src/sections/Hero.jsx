import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../data/site'
import { PixelStar } from '../components/ui'

const line = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 18 } },
}

export default function Hero() {
  const [imgOk, setImgOk] = useState(true)
  const src = `${import.meta.env.BASE_URL}${hero.image}`

  return (
    <section id="home" aria-label="Introduction" className="px-3 pb-6 md:px-6">
      <div
        className="on-dark relative mx-auto flex max-w-[1600px] flex-col overflow-hidden rounded-[28px] md:min-h-[calc(100svh-104px)] md:flex-row md:items-center"
      >
        <div aria-hidden className="hero-bg absolute inset-0" />
        {/* pixel sparkles */}
        <PixelStar className="absolute top-[12%] left-[46%] text-lav" size={16} />
        <PixelStar className="absolute top-[22%] right-[8%] text-white" size={12} delay={0.8} />
        <PixelStar className="absolute bottom-[16%] left-[38%] text-lav" size={10} delay={1.5} />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="relative z-10 px-6 pt-14 pb-8 sm:px-10 md:w-[52%] md:py-20 md:pl-14 lg:pl-20 xl:w-[46%]"
        >
          <motion.p variants={line} className="text-base text-white/90 md:text-lg">
            {hero.label}
          </motion.p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,7rem)] leading-[1.02] font-extrabold tracking-tight text-white">
            {hero.headline.map((l) => (
              <motion.span key={l} variants={line} className="block">
                {l}
              </motion.span>
            ))}
          </h1>
          <motion.div variants={line} className="mt-8">
            <a
              href={hero.cta.href}
              className="pill-brand group px-6 py-3 text-base hover:-translate-y-0.5"
            >
              {hero.cta.label}
              <ArrowDown
                size={18}
                className="transition-transform group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          </motion.div>
          <motion.p
            variants={line}
            className="mt-8 max-w-md text-base leading-relaxed text-white/85 md:text-lg"
          >
            {hero.text}
          </motion.p>
        </motion.div>

        {imgOk && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.3 }}
            className="relative md:absolute md:inset-y-0 md:right-0 md:w-[62%]"
          >
            <img
              src={src}
              alt={hero.imageAlt}
              onError={() => setImgOk(false)}
              fetchPriority="high"
              className="hero-fade block h-auto w-full object-cover object-center md:h-full"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
