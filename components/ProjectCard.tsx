import { motion } from 'framer-motion'
import type { Project } from '../utils/data'
import { TiltCard } from './TiltCard'
import { ArrowUpRight, Code, Github } from './Icons'

/**
 * Project card with 3D tilt, animated reveal overlay and a glowing,
 * accent-tinted preview surface generated purely from the project's accent
 * colour (no image assets needed — keeps the bundle light & always sharp).
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard
      glowColor={project.accent}
      className="h-full rounded-3xl"
      max={8}
    >
      <article className="glass gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl">
        {/* Preview surface */}
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Accent gradient wash */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: `radial-gradient(120% 120% at 20% 0%, ${project.accent}55, transparent 55%), linear-gradient(160deg, rgb(var(--bg)), color-mix(in oklab, ${project.accent} 12%, rgb(var(--bg))))`,
            }}
          />
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Big monogram */}
          <span
            className="absolute bottom-3 right-4 font-display text-7xl font-extrabold leading-none opacity-15"
            aria-hidden
          >
            {project.title.charAt(0)}
          </span>
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-current/70">
            <Code width={13} height={13} />
            {project.category}
          </div>

          {/* Hover overlay with quick links */}
          <motion.div
            initial={false}
            className="absolute inset-0 flex items-center justify-center gap-3 bg-[rgb(var(--bg))]/55 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <a
              href={project.link}
              aria-label={`View ${project.title} live`}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition-transform hover:scale-110"
            >
              <ArrowUpRight width={20} height={20} />
            </a>
            <a
              href={project.repo}
              aria-label={`View ${project.title} source`}
              className="grid h-12 w-12 place-items-center rounded-full glass-strong text-current transition-transform hover:scale-110"
            >
              <Github width={20} height={20} />
            </a>
          </motion.div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-current/60">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-current/10 px-3 py-1 font-mono text-[11px] text-current/55"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  )
}
