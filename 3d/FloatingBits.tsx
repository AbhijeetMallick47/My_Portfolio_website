import { useMemo } from 'react'
import { Float, Octahedron, Torus } from '@react-three/drei'

type Bit = {
  position: [number, number, number]
  scale: number
  color: string
  shape: 'octa' | 'torus'
  speed: number
}

/**
 * Small geometric shapes orbiting the central orb. They add depth layering
 * and reinforce the "tech object" aesthetic. Count is reduced on low-power
 * devices for performance.
 */
export function FloatingBits({ lowPower = false }: { lowPower?: boolean }) {
  const bits = useMemo<Bit[]>(() => {
    const all: Bit[] = [
      { position: [-3.1, 1.6, -1], scale: 0.36, color: '#22d3ee', shape: 'octa', speed: 2 },
      { position: [3.2, -1.3, -0.5], scale: 0.28, color: '#f472b6', shape: 'torus', speed: 1.6 },
      { position: [2.6, 1.8, -1.5], scale: 0.22, color: '#7c5cff', shape: 'octa', speed: 2.4 },
      { position: [-2.8, -1.7, 0.4], scale: 0.3, color: '#a5b4fc', shape: 'torus', speed: 1.8 },
      { position: [0.4, 2.5, -2], scale: 0.2, color: '#2dd4bf', shape: 'octa', speed: 2.2 },
      { position: [-1.6, -2.4, -1], scale: 0.18, color: '#818cf8', shape: 'octa', speed: 2.6 },
    ]
    return lowPower ? all.slice(0, 3) : all
  }, [lowPower])

  return (
    <>
      {bits.map((bit, i) => (
        <Float
          key={i}
          speed={bit.speed}
          rotationIntensity={1.4}
          floatIntensity={1.6}
        >
          {bit.shape === 'octa' ? (
            <Octahedron args={[bit.scale]} position={bit.position}>
              <meshStandardMaterial
                color={bit.color}
                emissive={bit.color}
                emissiveIntensity={0.4}
                roughness={0.2}
                metalness={0.6}
              />
            </Octahedron>
          ) : (
            <Torus args={[bit.scale, bit.scale * 0.35, 16, 32]} position={bit.position}>
              <meshStandardMaterial
                color={bit.color}
                emissive={bit.color}
                emissiveIntensity={0.4}
                roughness={0.25}
                metalness={0.5}
              />
            </Torus>
          )}
        </Float>
      ))}
    </>
  )
}
