import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { fadeUp, viewportOnce } from '../utils/motion'

/**
 * Scroll-reveal wrapper. Animates its children in (fade + rise by default)
 * the first time they enter the viewport. `delay` lets callers stagger
 * sibling reveals.
 */
export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  variants?: Variants
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
