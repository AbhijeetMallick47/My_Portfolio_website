/**
 * Scene lighting. A soft ambient base plus a key directional light and two
 * coloured rim/point lights that give the glassy material its neon glow and
 * sense of depth — no HDR environment map required (keeps it offline-safe).
 */
export function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      {/* Violet key light from the left */}
      <pointLight position={[-6, 2, 3]} intensity={45} color="#7c5cff" distance={22} />
      {/* Cyan rim light from the right */}
      <pointLight position={[6, -2, 2]} intensity={40} color="#22d3ee" distance={22} />
      {/* Magenta back light for separation */}
      <pointLight position={[0, 3, -6]} intensity={30} color="#f472b6" distance={20} />
    </>
  )
}
