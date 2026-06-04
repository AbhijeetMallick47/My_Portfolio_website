import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { Button } from '../components/Button'
import { Magnetic } from '../components/Magnetic'
import { projects, socials } from '../utils/data'
import { ArrowUpRight } from '../components/Icons'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={
        <>
          Projects I&apos;m <span className="text-gradient">proud of</span>
        </>
      }
      subtitle="A selection of products and experiences I've designed and built — from 3D storefronts to data-rich dashboards."
    >
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUp} className="[perspective:1200px]">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <Magnetic>
          <Button
            href={socials.find((s) => s.icon === 'github')?.href ?? '#'}
            variant="glow"
            icon={<ArrowUpRight width={18} height={18} />}
          >
            See more on GitHub
          </Button>
        </Magnetic>
      </div>
    </Section>
  )
}
