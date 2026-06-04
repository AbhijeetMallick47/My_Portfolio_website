import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import type { Group } from 'three'

/**
 * Parallax rig: smoothly tilts its children toward the pointer position and
 * nudges the camera, creating an interactive depth/tilt effect on mouse move.
 * Uses framerate-independent damping (MathUtils.damp) so it feels consistent
 * regardless of the display's refresh rate.
 */
export function Rig({
  children,
  intensity = 1,
  interactive = true,
}: {
  children: ReactNode
  intensity?: number
  interactive?: boolean
}) {
  const group = useRef<Group>(null)
  const lambda = 3 // damping speed

  useFrame((state, delta) => {
    if (!group.current) return
    const px = interactive ? state.pointer.x : 0
    const py = interactive ? state.pointer.y : 0

    // Tilt the content group toward the pointer.
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      py * 0.18 * intensity,
      lambda,
      delta,
    )
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      px * 0.28 * intensity,
      lambda,
      delta,
    )

    // Subtle camera dolly for added parallax depth.
    state.camera.position.x = MathUtils.damp(state.camera.position.x, px * 0.6 * intensity, lambda, delta)
    state.camera.position.y = MathUtils.damp(state.camera.position.y, py * 0.4 * intensity, lambda, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return <group ref={group}>{children}</group>
}
