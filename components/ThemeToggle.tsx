import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from './Icons'

/** Animated dark / light mode toggle. */
export function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative grid h-10 w-10 place-items-center rounded-full glass text-current/80 transition-colors hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Moon width={18} height={18} /> : <Sun width={18} height={18} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
