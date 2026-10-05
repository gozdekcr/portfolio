import { HashRouter } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { useLenis } from './hooks/useLenis'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  useLenis(!reducedMotion)

  return (
    <HashRouter>
      <Nav />
      <main className="relative z-0">
        <PageTransition />
      </main>
      <Footer />
    </HashRouter>
  )
}
