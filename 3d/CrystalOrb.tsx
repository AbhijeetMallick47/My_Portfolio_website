import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import type { Group, Mesh } from 'three'

type CrystalOrbProps = {
  /** Lower quality for mobile: less distortion + fewer subdivisions. */
  lowPower?: boolean
}

/**
 * The hero centrepiece: a slowly morphing, glowing crystalline orb.
 *
 * - An inner distorted icosahedron with a glossy, slightly metallic material
 *   gives the "liquid glass" body.
 * - A larger wireframe shell adds a techy, holographic overlay.
 * - `<Float>` provides the gentle, continuous floating motion.
 * - useFrame slowly rotates the whole group for life.
 */
export function CrystalOrb({ lowPower = false }: CrystalOrbProps) {
  const group = useRef<Group>(null)
  const shell = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x += delta * 0.04
    }
    // Counter-rotate the wireframe shell for a parallax-in-depth feel.
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.1
      shell.current.rotation.z += delta * 0.05
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <group ref={group} scale={lowPower ? 1.5 : 1.65}>
        {/* Solid morphing body */}
        <Icosahedron args={[1, lowPower ? 6 : 14]}>
          <MeshDistortMaterial
            color="#5b3df5"
            emissive="#3b1ec7"
            emissiveIntensity={0.45}
            roughness={0.12}
            metalness={0.85}
            distort={lowPower ? 0.25 : 0.4}
            speed={lowPower ? 1 : 1.8}
          />
        </Icosahedron>

        {/* Holographic wireframe shell */}
        <Icosahedron ref={shell} args={[1.32, 1]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.28}
          />
        </Icosahedron>

        {/* Inner glow core */}
        <Icosahedron args={[0.55, 2]}>
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.5} />
        </Icosahedron>
      </group>
    </Float>
  )
}
