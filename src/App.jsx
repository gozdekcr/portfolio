import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/projects/Projects'
import Experience from './sections/Experience'
import Events from './sections/Events'
import LearningPath from './sections/LearningPath'
import Contact from './sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="pill-brand sr-only px-5 py-2.5 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Events />
        <LearningPath />
        <Contact />
      </main>
    </MotionConfig>
  )
}
