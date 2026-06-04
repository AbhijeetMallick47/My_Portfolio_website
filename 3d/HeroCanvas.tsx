import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor, Preload } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Scene } from './Scene'
import { useIsMobile } from '../hooks/useMediaQuery'

/**
 * The R3F <Canvas> for the hero.
 *
 * Performance handling baked in:
 *  - `dpr` is capped (lower on mobile) to limit fragment work.
 *  - <AdaptiveDpr> + <PerformanceMonitor> drop resolution if FPS dips.
 *  - The whole scene is wrapped in <Suspense> so it streams in without
 *    blocking the page, and <Preload all> warms GPU resources.
 *  - `frameloop` switches to "demand" when the user prefers reduced motion,
 *    so the scene renders a single static frame instead of animating.
 */
export function HeroCanvas() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion() ?? false
  const lowPower = isMobile

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 38 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <PerformanceMonitor>
        <Suspense fallback={null}>
          <Scene lowPower={lowPower} interactive={!reducedMotion} />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
    </Canvas>
  )
}
