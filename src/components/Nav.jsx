import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from './Container'
import { links } from '../data/links'

const routes = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <Container className="flex h-[72px] items-center justify-between">
          <NavLink to="/" className="text-base font-medium tracking-tight text-ink">
            Gözde K.
          </NavLink>

          <nav className="hidden items-center gap-7 sm:flex">
            {routes.map((route) => (
              <NavLink
                key={route.to}
                to={route.to}
                end={route.to === '/'}
                className="relative py-1 text-sm text-muted transition-colors hover:text-ink"
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-ink' : ''}>{route.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-1 h-px bg-lilac"
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center text-ink sm:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-bg sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Container className="flex h-[72px] items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </Container>
            <div className="flex flex-1 flex-col items-center justify-center gap-7">
              {routes.map((route, i) => (
                <motion.div
                  key={route.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.3 }}
                >
                  <NavLink
                    to={route.to}
                    end={route.to === '/'}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-medium tracking-tight text-ink"
                  >
                    {route.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                href={`mailto:${links.email}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.3 }}
                className="mt-4 text-sm text-muted"
              >
                {links.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
