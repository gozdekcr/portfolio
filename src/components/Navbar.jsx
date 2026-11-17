import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { about, navItems } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = navItems.map((n) => n.id)

const avatarSrc = `${import.meta.env.BASE_URL}${about.avatar}`

function Logo() {
  return (
    <a
      href="#home"
      aria-label="Gözde Kacar, back to top"
      className="block shrink-0 rounded-[12px] transition-transform hover:-rotate-3 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <img
        src={avatarSrc}
        alt=""
        width={42}
        height={56}
        className="h-14 w-[42px] rounded-[12px] bg-[#45375f] object-contain shadow-sm ring-2 ring-white"
        style={{ imageRendering: 'pixelated' }}
      />
    </a>
  )
}

export default function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'bg-page/75 shadow-[0_8px_30px_-18px_rgba(64,32,128,0.35)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-6"
      >
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full bg-[#f0ebfa] p-1.5 ring-1 ring-[#e6ddf7] lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="pill relative bg-brand px-4 py-2 text-[15px] text-white hover:-translate-y-0.5"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-brand-deep ring-2 ring-white shadow-[0_0_0_3px_rgba(144,71,255,0.35)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="pill-brand px-5 py-2.5 text-[15px] hover:-translate-y-0.5">
            Let&apos;s Talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-full bg-lav-soft text-brand-deep transition-colors hover:bg-[#e2d4ff] lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-3 shadow-lg ring-1 ring-[#ece6f8] sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`pill w-full px-4 py-2.5 text-white ${
                      active === item.id ? 'bg-brand-deep ring-2 ring-lav' : 'bg-brand'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
