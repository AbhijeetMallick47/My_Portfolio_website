import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { cn } from '../utils/cn'

/**
 * 3D tilt card with a cursor-following radial glow.
 *
 * - Tracks the pointer within the card and maps it to rotateX/rotateY,
 *   producing a parallax tilt (the z-index/depth illusion).
 * - A spotlight gradient follows the cursor for a premium sheen.
 * - All transforms are spring-damped and reset on mouse leave.
 */
export function TiltCard({
  children,
  className,
  glowColor = '#7c5cff',
  max = 10,
}: {
  children: ReactNode
  className?: string
  glowColor?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springRx = useSpring(rx, { stiffness: 200, damping: 18 })
  const springRy = useSpring(ry, { stiffness: 200, damping: 18 })

  // Cursor position (in %) for the spotlight glow.
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, ${glowColor}26, transparent 60%)`

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * (max * 2))
    rx.set(-(py - 0.5) * (max * 2))
    gx.set(px * 100)
    gy.set(py * 100)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      className={cn('group relative', className)}
    >
      {/* Cursor spotlight overlay */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  )
}
