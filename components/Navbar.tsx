import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, profile } from '../utils/data'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../utils/cn'
import { Close, Menu } from './Icons'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'
import { Magnetic } from './Magnetic'

const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

/**
 * Sticky navbar.
 *  - Transparent at the top; gains a glass/blur background once scrolled.
 *  - Highlights the link of the section currently in view.
 *  - Collapses into an animated full-screen menu on mobile.
 */
export function Navbar({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean
  onToggleTheme: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-3.5 transition-all duration-500 sm:px-6',
          scrolled ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]' : 'bg-transparent',
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight"
        >
          <span className="relative grid h-10 w-10 place-items-center transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-105">
            {/* Soft conic glow that blooms behind the mark on hover */}
            <span className="absolute -inset-1 rounded-2xl glow-ring opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />
            {/* Gradient base + inner top highlight for a sculpted feel */}
            <span className="absolute inset-0 rounded-xl bg-[linear-gradient(140deg,var(--color-violet),var(--color-brand-600)_45%,var(--color-cyan))] shadow-[0_6px_18px_-6px_var(--color-violet),inset_0_1px_0_0_rgba(255,255,255,0.4)]" />
            {/* Glossy top sheen */}
            <span className="absolute inset-0 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent_55%)] opacity-70" />
            {/* Hairline ring for crisp edge definition */}
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
            {/* Monogram */}
            <span className="relative font-display text-lg font-extrabold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {profile.firstName[0]}
            </span>
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-gradient">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors',
                    isActive ? 'text-current' : 'text-current/55 hover:text-current',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <div className="hidden md:block">
            <Magnetic>
              <Button href="#contact" variant="glow" className="px-5 py-2.5">
                Let&apos;s talk
              </Button>
            </Magnetic>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full glass text-current md:hidden"
          >
            {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-4 top-20 z-50 md:hidden"
          >
            <ul className="glass-strong flex flex-col gap-1 rounded-3xl p-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-current/80 transition-colors hover:bg-white/5 hover:text-current"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2">
                <Button href="#contact" variant="primary" className="w-full" >
                  Let&apos;s talk
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
