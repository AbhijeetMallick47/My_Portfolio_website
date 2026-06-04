import { motion } from 'framer-motion'
import { socials } from '../utils/data'
import { iconMap, type IconName } from './iconMap'
import { cn } from '../utils/cn'

/** Row of social icon links with a lift + glow hover animation. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {socials.map((social) => {
        const Icon = iconMap[social.icon as IconName]
        return (
          <li key={social.label}>
            <motion.a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="grid h-11 w-11 place-items-center rounded-full glass text-current/70 transition-colors hover:text-current hover:shadow-[0_0_22px_-4px_var(--color-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
            >
              <Icon width={18} height={18} />
            </motion.a>
          </li>
        )
      })}
    </ul>
  )
}
