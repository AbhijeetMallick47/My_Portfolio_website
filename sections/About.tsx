import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { profile } from '../utils/data'
import { Code, MapPin, Sparkle } from '../components/Icons'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

const highlights = [
  'Final-year B.Tech in Information Technology at NIT Kurukshetra',
  'Building responsive single-page apps with React & vanilla JS',
  'Comfortable across the stack — Node.js, Express & MySQL',
  '3★ coder on CodeChef with a strong DSA & problem-solving base',
]

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title={
        <>
          Designing &amp; engineering <span className="text-gradient">immersive</span> digital
          experiences
        </>
      }
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-current/70">
            I&apos;m a final-year Information Technology student at NIT Kurukshetra and a front-end
            developer who enjoys turning designs into clean, responsive interfaces. I care about the
            details — accessible markup, smooth interactions and code that stays easy to maintain.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-current/60">
            I work across the modern web stack — React on the front end, Node.js, Express and MySQL
            behind it — and I keep my fundamentals sharp through competitive programming and
            hackathons.
          </motion.p>

          <motion.ul variants={staggerContainer(0.1)} className="mt-8 space-y-3">
            {highlights.map((h) => (
              <motion.li
                key={h}
                variants={fadeUp}
                className="flex items-start gap-3 text-sm text-current/75"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-violet)]/15 text-[var(--color-cyan)]">
                  <Sparkle width={12} height={12} />
                </span>
                {h}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual column */}
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            {/* Glow ring behind the card */}
            <div className="absolute -inset-6 rounded-[2rem] glow-ring opacity-30 animate-pulse-glow" />

            <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] p-7">
              {/* Avatar / monogram */}
              <div className="relative mb-6 grid h-40 place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(140deg,var(--color-violet),var(--color-brand-700))]">
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 20%, white 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                  }}
                />
                <span className="font-display text-6xl font-extrabold text-white/90">
                  {profile.firstName[0]}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-current/60">
                <Code width={15} height={15} className="text-[var(--color-cyan)]" />
                {profile.role}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-current/60">
                <MapPin width={15} height={15} className="text-[var(--color-magenta)]" />
                {profile.location}
              </p>

              {/* Animated code-style footer */}
              <div className="mt-6 rounded-xl bg-black/30 p-4 font-mono text-xs leading-relaxed text-current/60">
                <span className="text-[var(--color-magenta)]">const</span>{' '}
                <span className="text-[var(--color-cyan)]">dev</span> = {'{'}
                <br />
                &nbsp;&nbsp;stack: <span className="text-[var(--color-aqua)]">&apos;React&apos;</span>,
                <br />
                &nbsp;&nbsp;learning: <span className="text-[var(--color-aqua)]">true</span>,
                <br />
                {'}'}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
