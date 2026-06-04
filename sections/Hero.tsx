import { Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, stats } from '../utils/data'
import { Button } from '../components/Button'
import { Magnetic } from '../components/Magnetic'
import { SocialLinks } from '../components/SocialLinks'
import { ArrowRight, ArrowUpRight, Sparkle } from '../components/Icons'
import { EASE_PREMIUM } from '../utils/motion'

// Lazy-load the WebGL canvas so the heavy 3D bundle never blocks first paint.
const HeroCanvas = lazy(() =>
  import('../3d/HeroCanvas').then((m) => ({ default: m.HeroCanvas })),
)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } },
}

export function Hero() {
  // Fade + lift the hero content as the user scrolls past it.
  const { scrollYProgress } = useScroll()
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* 3D layer */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
        {/* Readability scrim so text stays legible over the canvas */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_30%,rgb(var(--bg))_85%)] md:bg-[linear-gradient(90deg,rgb(var(--bg))_25%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Availability pill */}
          {profile.available && (
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-current/80"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-aqua)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-aqua)]" />
              </span>
              {profile.availabilityText}
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mb-4 inline-flex items-center gap-2 font-mono text-sm text-[var(--color-cyan)]"
          >
            <Sparkle width={16} height={16} />
            Hi, I&apos;m {profile.name}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">{profile.role}</span>
            <br />
            {profile.heroLine}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-current/65 sm:text-lg"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href="#work" variant="primary" icon={<ArrowRight width={18} height={18} />}>
                View my work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href={profile.resumeUrl}
                variant="glow"
                newTab
                icon={<ArrowUpRight width={18} height={18} />}
              >
                Download CV
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          variants={item}
          initial="hidden"
          animate="visible"
          className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-current/10 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl font-bold text-gradient">{stat.value}</dt>
              <dd className="mt-1 text-xs text-current/55">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-current/50 md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-current/25 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-current/60" />
        </span>
      </motion.a>
    </section>
  )
}
