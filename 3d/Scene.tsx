import { Sparkles } from '@react-three/drei'
import { Lights } from './Lights'
import { CrystalOrb } from './CrystalOrb'
import { FloatingBits } from './FloatingBits'
import { Rig } from './Rig'

/**
 * Composes the full hero 3D scene inside the parallax rig.
 * `lowPower` trims particle counts / geometry detail for mobile devices,
 * and `interactive` disables pointer tracking when reduced motion is preferred.
 */
export function Scene({
  lowPower = false,
  interactive = true,
}: {
  lowPower?: boolean
  interactive?: boolean
}) {
  return (
    <>
      <Lights />
      <Rig intensity={lowPower ? 0.5 : 1} interactive={interactive}>
        <CrystalOrb lowPower={lowPower} />
        <FloatingBits lowPower={lowPower} />
        {/* Ambient drifting particles add atmosphere & depth. */}
        <Sparkles
          count={lowPower ? 40 : 120}
          scale={[10, 8, 6]}
          size={2}
          speed={interactive ? 0.4 : 0}
          opacity={0.6}
          color="#a5b4fc"
        />
      </Rig>
    </>
  )
}
