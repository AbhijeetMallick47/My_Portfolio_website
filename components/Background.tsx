import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Fixed, full-viewport ambient background:
 *  - Three large blurred "aurora" blobs that drift (CSS keyframes) and parallax
 *    slowly on scroll (background moves slower than the foreground).
 *  - A faint perspective grid + radial vignette for a futuristic tech feel.
 * Sits behind everything (`-z-10`) and ignores pointer events.
 */
export function Background() {
  const { scrollYProgress } = useScroll()
  // Parallax: blobs move only a fraction of the scroll distance.
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[rgb(var(--bg))]" />

      {/* Aurora blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_60%)] opacity-30 blur-3xl animate-float-slow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,var(--color-cyan),transparent_60%)] opacity-25 blur-3xl animate-float"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--color-magenta),transparent_60%)] opacity-20 blur-3xl animate-float-slow"
      />

      {/* Perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(var(--fg)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--fg)) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgb(var(--bg))_100%)]" />
    </div>
  )
}
