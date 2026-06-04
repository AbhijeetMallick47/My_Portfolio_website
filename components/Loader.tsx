import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../utils/data'

/**
 * Intro preloader. Simulates an asset-loading progress count, draws an
 * animated conic glow ring, then slides away to reveal the page. Calls
 * `onDone` once the exit animation can begin so the app can mount the hero.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      setProgress((p) => {
        // Ease toward 100 with a little randomness for a "real" feel.
        const next = Math.min(100, p + Math.random() * 9 + 2)
        if (next >= 100) return 100
        frame = requestAnimationFrame(tick)
        return next
      })
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const t = setTimeout(() => setVisible(false), 450)
    return () => clearTimeout(t)
  }, [progress])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[rgb(var(--bg))]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative grid h-28 w-28 place-items-center">
              {/* Spinning conic glow */}
              <motion.span
                className="absolute inset-0 rounded-full glow-ring opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <span className="absolute inset-[3px] rounded-full bg-[rgb(var(--bg))]" />
              <span className="relative font-display text-2xl font-bold text-gradient">
                {profile.initials}
              </span>
            </div>

            <div className="w-56">
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-current/50">
                <span>Loading experience</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
