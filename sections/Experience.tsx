import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section } from '../components/Section'
import { achievements, experiences } from '../utils/data'
import { Sparkle } from '../components/Icons'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

/** A single timeline entry that reveals from the side as it scrolls in. */
function TimelineItem({ exp, index }: { exp: (typeof experiences)[number]; index: number }) {
  return (
    <motion.li
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative pl-12 sm:pl-0"
    >
      <div className="sm:grid sm:grid-cols-2 sm:gap-10">
        {/* Period — alternates sides on desktop for a zig-zag layout */}
        <div
          className={
            index % 2 === 0
              ? 'sm:col-start-1 sm:text-right'
              : 'sm:col-start-2 sm:row-start-1'
          }
        >
          <span className="font-mono text-sm text-[var(--color-cyan)]">{exp.period}</span>
        </div>

        {/* Card */}
        <div className={index % 2 === 0 ? 'sm:col-start-2' : 'sm:col-start-1 sm:text-right'}>
          <div className="glass gradient-border rounded-2xl p-6 text-left transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold">{exp.role}</h3>
            <p className="text-sm text-[var(--color-violet)]">{exp.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-current/60">{exp.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-current/10 px-2.5 py-0.5 font-mono text-[11px] text-current/55"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Node dot */}
      <span className="absolute left-3 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_14px_2px_var(--color-cyan)] sm:left-1/2" />
    </motion.li>
  )
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  // The vertical line "draws" itself as the section scrolls through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="experience"
      eyebrow="Career"
      title={
        <>
          My <span className="text-gradient">journey</span> so far
        </>
      }
    >
      <div ref={ref} className="relative">
        {/* Track + animated progress line */}
        <div className="absolute left-3 top-0 h-full w-px bg-current/10 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-3 top-0 h-full w-px origin-top bg-[linear-gradient(var(--color-violet),var(--color-cyan),var(--color-magenta))] sm:left-1/2"
        />

        <ol className="space-y-12">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </ol>
      </div>

      {/* Achievements grid */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16"
      >
        <motion.h3
          variants={fadeUp}
          className="mb-6 text-center font-mono text-sm uppercase tracking-[0.3em] text-current/50"
        >
          Achievements
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {achievements.map((a) => (
            <motion.div
              key={a.title}
              variants={fadeUp}
              className="glass gradient-border rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-violet)]/15 text-[var(--color-cyan)]">
                  <Sparkle width={16} height={16} />
                </span>
                <span className="font-mono text-xs text-current/45">{a.year}</span>
              </div>
              <h4 className="font-semibold">{a.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-current/60">{a.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
