import { useRef } from 'react'

/**
 * SpotlightCard
 * Creates a dynamic cursor-following spotlight effect:
 * 1. An ambient surface illumination following the mouse
 * 2. A radiant border highlight matching the cursor position
 * Runs purely on CSS Custom Properties to avoid React re-renders.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 77, 46, 0.12)',
  borderColor = 'rgba(255, 77, 46, 0.5)'
}) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-[#13110f]/85 backdrop-blur transition-all duration-300 ${className}`}
    >
      {/* Dynamic Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${borderColor}, transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />

      {/* Dynamic Surface Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${spotlightColor}, transparent 70%)`
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
