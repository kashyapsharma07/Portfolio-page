import { useEffect, useRef } from 'react'
// Lightweight decorative canvas network. Static fallback when reduced motion is on.
export default function Network() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, raf
    const n = innerWidth < 700 ? 28 : 55
    const pts = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * 2e-4, vy: (Math.random() - .5) * 2e-4 }))
    const size = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach((p, i) => {
        if (!still) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1 }
        for (let j = i + 1; j < n; j++) {
          const q = pts[j], d = Math.hypot((p.x - q.x) * w, (p.y - q.y) * h)
          if (d < 160) { ctx.strokeStyle = `rgba(242,236,228,${.12 * (1 - d / 160)})`; ctx.beginPath(); ctx.moveTo(p.x * w, p.y * h); ctx.lineTo(q.x * w, q.y * h); ctx.stroke() }
        }
        ctx.fillStyle = i % 9 === 0 ? '#ff4d2e' : 'rgba(242,236,228,.5)'
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, i % 9 === 0 ? 2.5 : 1.5, 0, 7); ctx.fill()
      })
      if (!still) raf = requestAnimationFrame(draw)
    }
    size(); draw(); addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />
}
