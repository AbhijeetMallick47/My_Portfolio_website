import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'
import { skills, skillBadges } from '../utils/data'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

/** Single skill with a proficiency bar that fills when scrolled into view. */
function SkillBar({ name, level, category }: (typeof skills)[number]) {
  return (
    <motion.div variants={fadeUp}>
      <TiltCard className="rounded-2xl" max={6}>
        <div className="glass gradient-border rounded-2xl p-5">
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-current/45">
                {category}
              </p>
            </div>
            <span className="font-display text-lg font-bold text-gradient">{level}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))]"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export function Skills() {
  // Duplicate the badge list so the marquee loops seamlessly.
  const marquee = [...skillBadges, ...skillBadges]

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title={
        <>
          A versatile <span className="text-gradient">tech stack</span>
        </>
      }
      subtitle="The tools and technologies I reach for to bring ambitious ideas to life."
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </motion.div>

      {/* Floating badge marquee */}
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max gap-3 animate-marquee">
          {marquee.map((badge, i) => (
            <span
              key={`${badge}-${i}`}
              className="whitespace-nowrap rounded-full glass px-5 py-2.5 text-sm font-medium text-current/70"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
