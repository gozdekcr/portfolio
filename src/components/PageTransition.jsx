import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Work from '../pages/Work'
import Contact from '../pages/Contact'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function RouteSet({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default function PageTransition() {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (reducedMotion) {
    return <RouteSet location={location} />
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="relative">
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[90] origin-bottom bg-lilac"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          exit={{ scaleY: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45 } }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
        >
          <RouteSet location={location} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
