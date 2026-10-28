import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, Copy, Check, ChevronDown, Download, ExternalLink } from 'lucide-react'
import Lenis from 'lenis'
import Scene3D from './Scene3D.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import Preloader from './Preloader.jsx'
import Network from './Network.jsx'
import { LINKS, chapters, projects, skills, timeline } from './data.js'

const NAV = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

function Reveal({ children, className = '', delay = 0 }) {
  const rm = useReducedMotion()
  return <motion.div className={className} initial={rm ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7, delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>
}
function Section({ id, n, label, title, children }) {
  return <section id={id} aria-labelledby={id + '-h'} className="max-w-6xl mx-auto px-6 py-28 border-t border-line">
    <Reveal><p className="label mb-6"><span className="text-ember">{n}</span> — {label}</p>
      <h2 id={id + '-h'} className="font-display font-light text-4xl md:text-6xl leading-tight max-w-3xl">{title}</h2></Reveal>
    <div className="mt-14">{children}</div></section>
}

function Nav() {
  const [solid, setSolid] = useState(false), [open, setOpen] = useState(false), btn = useRef(null)
  useEffect(() => { const f = () => setSolid(scrollY > 24); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; const k = e => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [open])
  return <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid || open ? 'bg-ink/85 backdrop-blur border-b border-line' : ''}`}>
    <nav aria-label="Primary" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#top" className="font-display text-xl" aria-label="Kashyap Sharma, back to top">KS<span className="text-ember">.</span></a>
      <ul className="hidden md:flex items-center gap-8 text-sm">
        {NAV.map(n => <li key={n}><a className="link-u py-1" href={`#${n.toLowerCase()}`}>{n}</a></li>)}
        <li><a href={LINKS.resume} download className="border border-paper/30 hover:border-ember hover:text-ember transition px-4 py-1.5 rounded-full">Résumé</a></li></ul>
      <button ref={btn} className="md:hidden p-2" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        <AnimatePresence mode="wait" initial={false}><motion.span key={open} initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 0 }} transition={{ duration: .15 }} className="block">{open ? <X /> : <Menu />}</motion.span></AnimatePresence></button>
    </nav>
    <AnimatePresence>{open && <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:hidden h-[calc(100vh-4rem)] px-6 pt-10">
      <ul className="space-y-6 font-display text-4xl">{NAV.map((n, i) => <li key={n}><a autoFocus={i === 0} onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`}>{n}</a></li>)}
        <li><a href={LINKS.resume} download className="text-ember">Résumé</a></li></ul></motion.div>}</AnimatePresence>
  </header>
}

function ChapterStrip() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <div ref={targetRef} className="relative h-[240vh] hidden md:block">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full mb-8">
          <p className="label flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ember" />Specialized Disciplines</p>
          <h2 className="font-display font-light text-3xl md:text-5xl mt-2">Core Areas of Focus</h2>
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-6 max-w-6xl mx-auto w-full">
          {chapters.map((c, i) => (
            <SpotlightCard
              key={c}
              className="w-[320px] md:w-[420px] shrink-0 p-8"
            >
              <span className="font-display text-4xl text-ember font-light">0{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-paper">{c}</h3>
              <p className="mt-4 text-sm text-paper/70 leading-relaxed">
                {i === 0 && 'Retrieval-augmented generation, multi-model failover architectures, structured streaming, and low-latency evaluation.'}
                {i === 1 && 'Production web applications, role-based security, relational data design, and responsive client experiences.'}
                {i === 2 && 'JWT authentication, 2FA workflows, scheduled background jobs, automated cloud backups, and hardened API endpoints.'}
                {i === 3 && 'Real-time video inference with YOLOv8, OpenCV frame processing, zone compliance, and automated safety alerts.'}
              </p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function Hero() {
  const rm = useReducedMotion()
  const words = 'Building practical AI systems and reliable web products.'.split(' ')
  return <section id="top" aria-labelledby="hero-h" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 70% 35%, rgba(255,77,46,.16), transparent 70%)' }} />
    <Network />
    <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
      <p className="label mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ember" />Full-stack developer · AI engineer</p>
      <h1 id="hero-h" className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[1.02] max-w-4xl">
        {words.map((w, i) => <span key={i} className="inline-block overflow-hidden align-bottom mr-[.25em]">
          <motion.span className="inline-block" initial={rm ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, delay: .15 + i * .07, ease: [.2, .7, .2, 1] }}>{w}</motion.span></span>)}</h1>
      <p className="mt-8 max-w-xl text-lg text-paper/75">I’m Kashyap Sharma, a Computer Engineering graduate focused on full-stack applications, retrieval-augmented AI, computer vision, and secure backend systems.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href="#projects" className="bg-ember text-ink font-medium px-6 py-3 rounded-full hover:bg-paper transition">View projects</a>
        <a href={LINKS.resume} download className="border border-paper/30 px-6 py-3 rounded-full hover:border-ember hover:text-ember transition inline-flex items-center gap-2"><Download size={16} />Download résumé</a></div>
      <div className="mt-8 flex gap-6 text-sm text-mute">
        <a className="link-u hover:text-paper inline-flex gap-2 items-center" href={LINKS.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub</a>
        <a className="link-u hover:text-paper inline-flex gap-2 items-center" href={LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a>
        <a className="link-u hover:text-paper inline-flex gap-2 items-center" href={`mailto:${LINKS.email}`}><Mail size={16} />Email</a></div>
      <ol className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line md:hidden">
        {chapters.map((c, i) => <li key={c} className="bg-ink/90 p-5 hover:bg-[#161412] transition"><span className="label text-ember">0{i + 1}</span><p className="mt-3 font-display text-xl">{c}</p></li>)}</ol>
    </div></section>
}

function About() {
  const hl = ['Computer Engineering, Gujarat Technological University', 'CGPA: 8.50 / 10.00', 'PHP Developer Intern at Jemistry Info Solutions LLP', 'Intel AI for Manufacturing program participant', 'Focused on AI systems, backend reliability, automation, and product-minded development']
  return <Section id="about" n="01" label="About" title="Engineering systems that are useful outside a demo.">
    <div className="grid md:grid-cols-2 gap-12">
      <Reveal><p className="text-lg text-paper/80 leading-relaxed">Kashyap combines practical web development with AI engineering. His work ranges from secure PHP and MySQL applications with role-based access control, JWT, and 2FA to full-stack RAG chatbots and real-time computer-vision safety systems.</p>
        <p className="mt-8 inline-flex items-center gap-3 border border-line rounded-full px-4 py-2 text-sm"><span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-ember animate-ping motion-reduce:animate-none opacity-60" /><span className="h-2 w-2 rounded-full bg-ember" /></span>Open to software engineering and AI development opportunities</p></Reveal>
      <Reveal delay={.1}><ul className="divide-y divide-line border-y border-line">{hl.map(h => <li key={h} className="py-4 text-paper/85">{h}</li>)}</ul></Reveal></div></Section>
}

function RoverVisual({ box }) {
  const [blueprintMode, setBlueprintMode] = useState(false)
  const [activePin, setActivePin] = useState(null)

  const pins = [
    {
      id: 'bt',
      title: 'HC-05 Bluetooth Module',
      spec: 'SPP 2.4GHz · 38400 Baud UART',
      x: '21%',
      y: '52%',
      badgeAlign: 'left',
      tooltipDir: 'top',
    },
    {
      id: 'shield',
      title: 'HW-130 / L293D Shield + Uno',
      spec: 'Dual H-Bridge · 4-Ch PWM Driver',
      x: '46%',
      y: '48%',
      badgeAlign: 'center',
      tooltipDir: 'top',
    },

    {
      id: 'battery',
      title: '2x 18650 Li-ion Pack',
      spec: '7.4V 2600mAh · High-Drain Cells',
      x: '79%',
      y: '52%',
      badgeAlign: 'right',
      tooltipDir: 'top',
    },
    {
      id: 'switch',
      title: 'Master Rocker Switch',
      spec: 'Circuit Isolation & Safety Cutoff',
      x: '78%',
      y: '27%',
      badgeAlign: 'right',
      tooltipDir: 'bottom',
    },
    {
      id: 'motor',
      title: '4WD TT Geared Motors',
      spec: 'Differential Steering · High-Traction',
      x: '11%',
      y: '16%',
      badgeAlign: 'left',
      tooltipDir: 'bottom',
    },
  ]

  const activeData = activePin ? pins.find(p => p.id === activePin) : null

  return (
    <div className={box}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#181512] via-[#0f0e0d] to-[#080707]" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ff4d2e 1px, transparent 1px), linear-gradient(90deg, #ff4d2e 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header Telemetry */}
      <div className="relative z-20 flex items-center justify-between pb-2.5 border-b border-line/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
          </span>
          <span className="text-[11px] font-mono tracking-wider text-paper/90 font-medium">
            SKELETAL_HARDWARE · TOP_VIEW
          </span>
        </div>
        <button
          type="button"
          onClick={() => setBlueprintMode(!blueprintMode)}
          aria-label="Toggle blueprint HUD filter"
          className="text-[10px] font-mono px-2 py-0.5 rounded border border-line/80 bg-ink/70 hover:border-ember hover:text-ember transition flex items-center gap-1.5 text-mute"
        >
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${blueprintMode ? 'bg-ember' : 'bg-mute'}`} />
          <span>{blueprintMode ? 'BLUEPRINT HUD' : 'HARDWARE PHOTO'}</span>
        </button>
      </div>

      {/* Rover Image Frame with Skeletal HUD Callouts */}
      <div className="relative z-10 my-3 rounded-lg overflow-hidden border border-line/70 bg-black/50 flex items-center justify-center min-h-[190px]">
        {/* CAD Reticles */}
        <div className="absolute top-1.5 left-2 text-[9px] font-mono text-ember/70 pointer-events-none z-20">┌ HC05:OK</div>
        <div className="absolute top-1.5 right-2 text-[9px] font-mono text-ember/70 pointer-events-none z-20">BAT:7.4V ┐</div>
        <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-paper/40 pointer-events-none z-20">└ 4WD_TT</div>
        <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-paper/40 pointer-events-none z-20">38.4k ┘</div>

        {/* Laser Diagnostics Scanline */}
        <motion.div
          animate={{ y: ['-100%', '280%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-ember/25 to-transparent pointer-events-none z-10"
        />

        {/* Rover Photograph */}
        <picture className="w-full h-full flex items-center justify-center p-1">
          <source srcSet="/Rover-optimized.webp" type="image/webp" />
          <img
            src="/Rover.png"
            alt="Skeletal hardware photograph of Smart Bluetooth Rover chassis"
            className={`w-full max-h-[200px] sm:max-h-[220px] object-contain transition-all duration-500 ${blueprintMode
              ? 'filter contrast-150 brightness-90 saturate-50 hue-rotate-[190deg] invert-[0.1]'
              : 'filter brightness-95 hover:brightness-105'
              }`}
          />
        </picture>

        {/* Interactive Hotspot Pins on Hardware Components */}
        {pins.map((pin) => {
          const isHovered = activePin === pin.id
          return (
            <div
              key={pin.id}
              style={{ left: pin.x, top: pin.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
              onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
            >
              <button
                type="button"
                aria-label={pin.title}
                className="relative group/pin flex items-center justify-center p-1.5 cursor-pointer focus:outline-none"
              >
                <span className="absolute h-4 w-4 rounded-full bg-ember/35 animate-ping opacity-75" />
                <span className={`relative h-2.5 w-2.5 rounded-full border border-ink shadow-[0_0_8px_#ff4d2e] transition-transform ${isHovered ? 'scale-125 bg-paper' : 'bg-ember'}`} />
              </button>

              {/* Tooltip / Badge */}
              <div
                className={`pointer-events-none absolute z-30 transition-all duration-200 ${pin.tooltipDir === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
                  } ${pin.badgeAlign === 'left'
                    ? 'left-0'
                    : pin.badgeAlign === 'right'
                      ? 'right-0'
                      : 'left-1/2 -translate-x-1/2'
                  } ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
              >
                <div className="bg-ink/95 border border-ember/60 px-2.5 py-1.5 rounded shadow-2xl text-left whitespace-nowrap backdrop-blur-md">
                  <p className="text-[10px] font-mono font-semibold text-paper flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    {pin.title}
                  </p>
                  <p className="text-[9px] font-mono text-mute">{pin.spec}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dynamic Telemetry / Component Readout */}
      <div className="relative z-10 pt-2 border-t border-line/60 flex items-center justify-between text-xs font-mono text-mute">
        <span className="text-paper/90 truncate max-w-[65%]">
          {activeData ? activeData.title : 'HC-05 · L293D / HW-130 · 7.4V LI-ION'}
        </span>
        <span className="text-ember font-medium shrink-0">
          {activeData ? activeData.spec.split('·')[0] : 'TELEMETRY OK'}
        </span>
      </div>
    </div>
  )
}

// Scroll-reactive interactive visual mockup
function Visual({ kind, title, progress }) {
  const box = 'rounded-xl border border-line bg-[#141210] p-6 h-full min-h-[260px] flex flex-col justify-between overflow-hidden relative'

  // Scroll scrubbed values
  const chatLine1Width = useTransform(progress, [0.1, 0.35], ['0%', '75%'])
  const chatLine2Width = useTransform(progress, [0.25, 0.55], ['0%', '100%'])
  const chatLine3Width = useTransform(progress, [0.45, 0.8], ['0%', '85%'])
  const failoverColor = useTransform(progress, [0.5, 0.75], ['#524d47', '#ff4d2e'])

  const cctvBox1Scale = useTransform(progress, [0.15, 0.45], [0.6, 1])
  const cctvBox2Scale = useTransform(progress, [0.35, 0.65], [0.6, 1])
  const cctvOpacity = useTransform(progress, [0.1, 0.3], [0, 1])

  const dashBar1 = useTransform(progress, [0.1, 0.4], ['0%', '45%'])
  const dashBar2 = useTransform(progress, [0.2, 0.55], ['0%', '75%'])
  const dashBar3 = useTransform(progress, [0.3, 0.7], ['0%', '60%'])
  const dashBar4 = useTransform(progress, [0.4, 0.85], ['0%', '95%'])

  return <figure role="img" aria-label={`Interactive preview for ${title}`} className="relative h-full">
    {kind === 'chat' && <div className={box}>
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Ask about admissions…', 'Fees, labs, policies'].map(t => <span key={t} className="text-xs border border-line rounded-full px-3 py-1 text-mute bg-ink/50">{t}</span>)}
        </div>
        <div className="space-y-3 mt-4">
          <div className="h-3 w-2/3 rounded bg-paper/20 ml-auto" />
          <motion.div style={{ width: chatLine1Width }} className="h-3.5 rounded bg-paper/15" />
          <motion.div style={{ width: chatLine2Width }} className="h-3.5 rounded bg-paper/15" />
          <motion.div style={{ width: chatLine3Width }} className="h-3.5 rounded bg-ember/70" />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-mute font-mono">
        <span>Gemini 1.5</span>
        <span className="flex-1 mx-3 border-t border-dashed border-line" />
        <motion.span style={{ color: failoverColor }} className="px-2 py-0.5 rounded border border-line bg-ink">auto-failover</motion.span>
        <span className="flex-1 mx-3 border-t border-dashed border-line" />
        <span>Groq LLaMA-3</span>
      </div>
    </div>}

    {kind === 'cctv' && <div className={box}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d1a17] to-[#0c0b0a]" />
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
        <span className="text-[11px] font-mono text-paper/80 uppercase tracking-widest">LIVE · CAM_04</span>
      </div>

      <motion.div style={{ opacity: cctvOpacity }} className="relative z-10 h-44 w-full">
        <motion.div style={{ scale: cctvBox1Scale }} className="absolute left-[16%] top-[18%] w-[32%] h-[60%] border-2 border-ember rounded">
          <span className="absolute -top-5 left-0 text-[10px] bg-ember text-ink px-1.5 py-0.5 font-mono font-semibold">HELMET 0.94</span>
        </motion.div>
        <motion.div style={{ scale: cctvBox2Scale }} className="absolute left-[58%] top-[26%] w-[28%] h-[55%] border-2 border-paper/70 rounded">
          <span className="absolute -top-5 left-0 text-[10px] bg-paper text-ink px-1.5 py-0.5 font-mono font-semibold">VEST 0.91</span>
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-t border-line pt-3 flex items-center justify-between text-xs text-mute font-mono">
        <span>Model: YOLOv8-Safety</span>
        <span className="text-ember">mAP 92%</span>
      </div>
    </div>}

    {kind === 'dash' && <div className={box}>
      <div>
        <div className="grid grid-cols-3 gap-2">
          {[['Applied', '48'], ['Interview', '14'], ['Offer', '3']].map(([s, val]) => (
            <div key={s} className="border border-line rounded-lg p-2.5 bg-ink/40">
              <span className="text-[11px] text-mute">{s}</span>
              <div className="font-display text-xl text-paper mt-1">{val}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-end gap-3 h-24 border-b border-line pb-2">
          {[{ h: dashBar1, label: 'W1' }, { h: dashBar2, label: 'W2' }, { h: dashBar3, label: 'W3' }, { h: dashBar4, label: 'W4' }].map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
              <motion.div style={{ height: b.h }} className={`w-full rounded-sm ${i === 3 ? 'bg-ember shadow-[0_0_10px_#ff4d2e]' : 'bg-paper/25'}`} />
              <span className="text-[10px] text-mute mt-1 font-mono">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-mute font-mono">
        <span>Automated Cron Sync</span>
        <span className="text-paper/80">RBAC + 2FA Active</span>
      </div>
    </div>}

    {kind === 'rover' && <RoverVisual box={box} />}
  </figure>
}

function ProjectCard({ p, i }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 80%', 'end 30%']
  })

  return (
    <Reveal>
      <div ref={cardRef}>
        <SpotlightCard className="p-6 md:p-10">
          <article className="grid lg:grid-cols-2 gap-10">
            <div className={i % 2 ? 'lg:order-2' : ''}><Visual kind={p.kind} title={p.title} progress={scrollYProgress} /></div>
            <div>
              <p className="label text-ember">{p.cat}</p>
              <h3 className="font-display text-3xl md:text-4xl mt-3 leading-tight">{p.title}</h3>
              <p className="mt-4 text-paper/75 leading-relaxed">{p.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map(t => <li key={t} className="text-xs border border-line rounded-full px-3 py-1 text-mute bg-ink/40">{t}</li>)}
              </ul>
              <ul className="mt-6 space-y-2 text-sm">
                {p.results.map(r => <li key={r} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />{r}</li>)}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-sm">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-paper/30 hover:border-ember hover:text-ember px-4 py-2 rounded-full transition inline-flex items-center gap-2 text-paper text-sm font-medium"
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                    <ExternalLink size={13} className="text-mute group-hover:text-ember" />
                  </a>
                )}
                <button onClick={() => setOpen(!open)} aria-expanded={open} className="link-u inline-flex items-center gap-1">
                  View case study<ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pt-5 text-paper/70 border-t border-line mt-5 leading-relaxed">{p.study}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </article>
        </SpotlightCard>
      </div>
    </Reveal>
  )
}

function Skills() {
  return <Section id="skills" n="03" label="Capabilities" title="The tools behind the work.">
    <dl className="border-t border-line">{skills.map(([k, v]) => <Reveal key={k}><div className="group grid md:grid-cols-[240px_1fr] gap-2 md:gap-10 py-6 border-b border-line hover:pl-3 transition-all duration-300">
      <dt className="font-display text-2xl group-hover:text-ember transition">{k}</dt><dd className="text-paper/75">{v}</dd></div></Reveal>)}</dl></Section>
}

function TimelineItem({ item, index, total }) {
  const itemRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 80%", "center center"]
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.25])
  const glow = useTransform(scrollYProgress, [0, 1], ['0 0 0px transparent', '0 0 14px #ff4d2e'])

  return (
    <li ref={itemRef} className="pl-8 pb-12 last:pb-0 relative">
      <motion.span
        style={{ scale, boxShadow: glow }}
        className="absolute -left-[5px] top-2.5 h-3 w-3 rounded-full bg-ember transition-colors"
      />
      <Reveal>
        <p className="label">{item.d}</p>
        <h3 className="font-display text-2xl md:text-3xl mt-1">{item.t}</h3>
        <p className="text-mute">{item.o}</p>
        <ul className="mt-4 space-y-1 text-paper/80 list-disc ml-5 marker:text-ember">
          {item.p.map(x => <li key={x}>{x}</li>)}
        </ul>
      </Reveal>
    </li>
  )
}

function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"]
  })
  const pathHeight = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  return <Section id="experience" n="04" label="Experience" title="Where I’ve learned and shipped.">
    <div ref={containerRef} className="relative ml-2">
      {/* Background line */}
      <div className="absolute left-[1px] top-3 bottom-3 w-[1px] bg-line" />
      {/* Animated glowing progress line */}
      <motion.div
        style={{ scaleY: pathHeight }}
        className="absolute left-[1px] top-3 bottom-3 w-[2px] bg-ember origin-top shadow-[0_0_12px_#ff4d2e]"
      />
      <ol className="relative">
        {timeline.map((e, idx) => (
          <TimelineItem key={e.t} item={e} index={idx} total={timeline.length} />
        ))}
      </ol>
    </div>
  </Section>
}

function Contact() {
  const [toast, setToast] = useState(''), [err, setErr] = useState({})
  const copy = async () => { try { await navigator.clipboard.writeText(LINKS.email); setToast('Email copied') } catch { setToast('Copy failed — select the address manually') } setTimeout(() => setToast(''), 2200) }
  const submit = e => {
    e.preventDefault(); const f = new FormData(e.target), v = Object.fromEntries(f), er = {}
    if (!v.name.trim()) er.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = 'Enter a valid email address'
    if (v.message.trim().length < 10) er.message = 'Write at least 10 characters'
    setErr(er); if (Object.keys(er).length) return
    location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent('Portfolio message from ' + v.name)}&body=${encodeURIComponent(v.message + '\n\n' + v.email)}`
  }
  const field = 'w-full bg-transparent border-b border-line focus:border-ember py-3 outline-none'
  return <section id="contact" aria-labelledby="contact-h" className="max-w-6xl mx-auto px-6 py-28 border-t border-line">
    <Reveal><h2 id="contact-h" className="font-display font-light text-5xl md:text-8xl leading-none">Let’s build something useful.</h2>
      <p className="mt-8 max-w-xl text-lg text-paper/75">I’m interested in full-stack engineering, applied AI, backend systems, and opportunities where software can solve real operational problems.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={`mailto:${LINKS.email}`} className="bg-ember text-ink font-medium px-6 py-3 rounded-full hover:bg-paper transition">{LINKS.email}</a>
        <button onClick={copy} className="border border-paper/30 px-5 py-3 rounded-full hover:border-ember hover:text-ember transition inline-flex gap-2 items-center"><Copy size={16} />Copy email</button>
        <a href={LINKS.github} target="_blank" rel="noreferrer" className="border border-paper/30 px-5 py-3 rounded-full hover:border-ember hover:text-ember transition inline-flex gap-2 items-center"><Github size={16} />GitHub</a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="border border-paper/30 px-5 py-3 rounded-full hover:border-ember hover:text-ember transition inline-flex gap-2 items-center"><Linkedin size={16} />LinkedIn</a></div></Reveal>
    <form onSubmit={submit} noValidate className="mt-16 grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl">
      {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([n, l, t]) => <div key={n}><label htmlFor={n} className="label">{l}</label><input id={n} name={n} type={t} className={field} aria-invalid={!!err[n]} aria-describedby={err[n] ? n + '-e' : undefined} />{err[n] && <p id={n + '-e'} role="alert" className="text-ember text-sm mt-1">{err[n]}</p>}</div>)}
      <div className="md:col-span-2"><label htmlFor="message" className="label">Message</label><textarea id="message" name="message" rows={4} className={field} aria-invalid={!!err.message} aria-describedby={err.message ? 'message-e' : undefined} />{err.message && <p id="message-e" role="alert" className="text-ember text-sm mt-1">{err.message}</p>}</div>
      <button className="justify-self-start border border-paper/30 px-6 py-3 rounded-full hover:border-ember hover:text-ember transition">Send message</button></form>
    <div aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">{toast && <div className="bg-paper text-ink px-5 py-3 rounded-full text-sm inline-flex gap-2 items-center"><Check size={16} />{toast}</div>}</div></section>
}

export default function App() {
  const [ready, setReady] = useState(false)
  const rm = useReducedMotion()

  useEffect(() => {
    if (rm) return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [rm])

  return <>
    <AnimatePresence mode="wait">
      {!ready && <Preloader onComplete={() => setReady(true)} />}
    </AnimatePresence>
    <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:z-[80] focus:top-3 focus:left-3 bg-paper text-ink px-4 py-2 rounded">Skip to content</a>
    <Scene3D />
    <Nav /><main className="relative z-10"><Hero /><ChapterStrip /><About />
      <Section id="projects" n="02" label="Selected work" title="Featured projects, built to be used.">
        <div className="space-y-10">{projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}</div></Section>
      <Skills /><Experience /><Contact /></main>
    <footer className="relative z-10 border-t border-line"><div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 justify-between text-sm text-mute">
      <div><p className="text-paper font-display text-xl">Kashyap Sharma</p><p>Full-stack Developer · AI Engineer</p></div>
      <div className="flex gap-6 items-start"><a className="link-u hover:text-paper" href={LINKS.github}>GitHub</a><a className="link-u hover:text-paper" href={LINKS.linkedin}>LinkedIn</a><a className="link-u hover:text-paper" href={`mailto:${LINKS.email}`}>Email</a></div>
      <p>© {new Date().getFullYear()} · Designed and built by Kashyap Sharma</p></div></footer>
  </>
}

