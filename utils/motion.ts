import type { Variants } from 'framer-motion'

/** Shared Framer Motion variants used across sections for consistent motion. */

export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Fade in + rise. Use with `whileInView`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
}

/** Container that staggers its children's entrance. */
export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/** Scale + fade, good for cards and media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
}

/** Default viewport config so reveals trigger a touch before fully on-screen. */
export const viewportOnce = { once: true, amount: 0.25 } as const
