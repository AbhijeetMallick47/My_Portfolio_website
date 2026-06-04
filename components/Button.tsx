import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

type Variant = 'primary' | 'glow' | 'ghost'

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  icon?: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
  newTab?: boolean
}

const variants: Record<Variant, string> = {
  // Solid gradient with a soft outer glow.
  primary:
    'text-white bg-[linear-gradient(120deg,var(--color-violet),var(--color-brand-600))] shadow-[0_8px_30px_-8px_var(--color-violet)] hover:shadow-[0_14px_44px_-10px_var(--color-violet)]',
  // Transparent glass with an animated gradient border that lights up on hover.
  glow: 'glass text-current gradient-border hover:shadow-[0_0_30px_-6px_var(--color-cyan)]',
  ghost: 'text-current/80 hover:text-current hover:bg-white/5',
}

/**
 * Primary CTA / link button with hover scale + glow micro-interactions.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  icon,
  type = 'button',
  disabled,
  ariaLabel,
  newTab,
}: ButtonProps) {
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-shadow duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:pointer-events-none',
    variants[variant],
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        className={classes}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  )
}
