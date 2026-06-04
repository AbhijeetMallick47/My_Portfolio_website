import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

/**
 * Standard section wrapper: consistent vertical rhythm, max-width container,
 * an optional eyebrow + heading, and a staggered scroll-reveal for its header.
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: {
  id: string
  eyebrow?: string
  title?: ReactNode
  subtitle?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-24 sm:py-32', className)}
    >
      <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', containerClassName)}>
        {(eyebrow || title) && (
          <motion.header
            className="mb-14 max-w-2xl"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {eyebrow && (
              <motion.p
                variants={fadeUp}
                className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-cyan)]"
              >
                <span className="h-px w-8 bg-[var(--color-cyan)]" />
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-relaxed text-current/60"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}
