import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Preloader
 * High-end circular loader with:
 * 1. Dual orbiting glowing SVG rings with dash array animation
 * 2. Real-feeling percentage counter ticking from 00 to 100%
 * 3. Central pulsing KS emblem with ember accent dot
 * 4. Ambient radial flare backdrop
 * 5. Smooth exit curtain unveiling the 3D scene & portfolio
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing Engine')

  useEffect(() => {
    const start = performance.now()
    const duration = 3200 // 3.2 seconds duration for smooth cinematic counting

    const update = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)

      // Smooth custom easing curve: gentle acceleration then steady deceleration into 100%
      const eased = Math.round(
        t < 0.5
          ? 4 * t * t * t * 100
          : (1 - Math.pow(-2 * t + 2, 3) / 2) * 100
      )
      const clamped = Math.min(Math.max(eased, 0), 100)
      setProgress(clamped)

      // Dynamic cinematic status messages matching progress
      if (clamped < 25) setStatus('Mounting 3D Neural Canvas')
      else if (clamped < 55) setStatus('Compiling Shaders & Stations')
      else if (clamped < 85) setStatus('Syncing Inertia Curves')
      else setStatus('System Ready')

      if (t < 1) {
        requestAnimationFrame(update)
      } else {
        setTimeout(onComplete, 400)
      }
    }

    const rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  // Circular calculations: radius 74px, circumference = 2 * PI * 74 ≈ 464.95px
  const radius = 74
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-[100] bg-[#0c0b0a] flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label="Loading portfolio"
    >
      {/* Ambient background glow flare */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 46, 0.14) 0%, rgba(255, 77, 46, 0.03) 45%, transparent 70%)',
          filter: 'blur(30px)'
        }}
      />

      {/* Circular UI loader container */}
      <div className="relative flex items-center justify-center">
        {/* SVG Circular Track & Progress Arc */}
        <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 176 176">
          {/* Faint static background track */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="rgba(242, 236, 228, 0.08)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Secondary subtle dash ring */}
          <circle
            cx="88"
            cy="88"
            r={radius + 8}
            stroke="rgba(255, 77, 46, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 8"
            fill="none"
            className="animate-spin"
            style={{ animationDuration: '18s' }}
          />

          {/* Primary Ember Animated Progress Arc */}
          <motion.circle
            cx="88"
            cy="88"
            r={radius}
            stroke="#ff4d2e"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              filter: 'drop-shadow(0 0 8px rgba(255, 77, 46, 0.65))'
            }}
          />
        </svg>

        {/* Orbiting Pulsing Beacon Dot at Tip of Progress */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `rotate(${(progress / 100) * 360 - 90}deg)` }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_12px_#ff4d2e]"
          />
        </div>

        {/* Center Logo KS & subtle glow */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-light text-3xl tracking-tight text-paper flex items-baseline"
          >
            KS<span className="text-ember ml-0.5 animate-pulse">.</span>
          </motion.div>
        </div>
      </div>

      {/* Percentage Counter and Status readout */}
      <div className="mt-8 flex flex-col items-center gap-1.5 font-mono text-xs text-mute tracking-widest">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-ping opacity-75" />
          <span className="text-paper/85 font-semibold tabular-nums text-sm">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-paper/40 h-4">
          {status}
        </span>
      </div>
    </motion.div>
  )
}
