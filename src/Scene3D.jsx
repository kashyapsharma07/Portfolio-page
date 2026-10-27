import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * 3D Background with Camera Stations keyed to scroll progress.
 * Smoothly transitions through 4 visual camera stations:
 * Station 0 (Hero): Central view looking into a rotating constellation of neural nodes & lattices.
 * Station 1 (Disciplines/About): Camera swings into orbit, lattice aligns into structured computational layers.
 * Station 2 (Projects): Camera focuses closely with ember nodes highlighting active pipelines.
 * Station 3 (Skills & Experience): Deep perspective pull-back with ambient ember particle drift.
 */
export default function Scene3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0c0b0a, 0.05)

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Construct 3D Neural Constellation & Particle Ring
    const nodeCount = window.innerWidth < 768 ? 90 : 160
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(nodeCount * 3)
    const colors = new Float32Array(nodeCount * 3)
    const basePositions = []

    const emberColor = new THREE.Color(0xff4d2e)
    const paperColor = new THREE.Color(0xf2ece4)
    const muteColor = new THREE.Color(0x8a847c)

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.7
      const z = (radius * Math.cos(phi)) * 0.8

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      basePositions.push(new THREE.Vector3(x, y, z))

      // Assign node palette: 20% vibrant ember, 40% paper, 40% subtle mute
      let c
      if (i % 5 === 0) c = emberColor
      else if (i % 2 === 0) c = paperColor
      else c = muteColor

      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle Texture for soft circular points
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    const pointTexture = new THREE.CanvasTexture(canvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const pointCloud = new THREE.Points(geometry, particleMaterial)
    scene.add(pointCloud)

    // Dynamic Connections (Lattice lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff4d2e,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })

    const lineGeometry = new THREE.BufferGeometry()
    const maxLineSegments = nodeCount * 4
    const linePositions = new Float32Array(maxLineSegments * 6)
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineMesh)

    // Camera Stations along Scroll Path
    const stations = [
      { progress: 0.0, pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3(0, 0, 0), rotSpeed: 0.001 },
      { progress: 0.25, pos: new THREE.Vector3(3.2, 1.2, 6.5), look: new THREE.Vector3(0, 0, 0), rotSpeed: 0.002 },
      { progress: 0.6, pos: new THREE.Vector3(-2.8, -1.0, 5.0), look: new THREE.Vector3(0.5, 0, 0), rotSpeed: 0.0015 },
      { progress: 1.0, pos: new THREE.Vector3(0, 2.5, 9.5), look: new THREE.Vector3(0, 0, 0), rotSpeed: 0.0008 }
    ]

    const targetPos = new THREE.Vector3(0, 0, 8)
    const targetLook = new THREE.Vector3(0, 0, 0)
    let currentLook = new THREE.Vector3(0, 0, 0)

    // Mouse Parallax
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId
    let time = 0

    const animate = () => {
      time += 0.01

      // 1. Calculate Scroll Progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0

      // 2. Interpolate between stations
      let currentStation = stations[0]
      let nextStation = stations[stations.length - 1]

      for (let i = 0; i < stations.length - 1; i++) {
        if (scrollProgress >= stations[i].progress && scrollProgress <= stations[i + 1].progress) {
          currentStation = stations[i]
          nextStation = stations[i + 1]
          break
        }
      }

      const segmentRange = (nextStation.progress - currentStation.progress) || 1
      const segmentT = (scrollProgress - currentStation.progress) / segmentRange

      // Smooth step
      const smoothT = segmentT * segmentT * (3 - 2 * segmentT)

      targetPos.lerpVectors(currentStation.pos, nextStation.pos, smoothT)
      targetLook.lerpVectors(currentStation.look, nextStation.look, smoothT)

      // Apply mouse parallax smoothly
      camera.position.x += (targetPos.x + mouseX - camera.position.x) * 0.04
      camera.position.y += (targetPos.y - mouseY - camera.position.y) * 0.04
      camera.position.z += (targetPos.z - camera.position.z) * 0.04

      currentLook.lerp(targetLook, 0.05)
      camera.lookAt(currentLook)

      // 3. Gentle rotation & breathing pulsation
      if (!reducedMotion) {
        const rotSpeed = THREE.MathUtils.lerp(currentStation.rotSpeed, nextStation.rotSpeed, smoothT)
        pointCloud.rotation.y += rotSpeed
        pointCloud.rotation.x += rotSpeed * 0.4
        lineMesh.rotation.y = pointCloud.rotation.y
        lineMesh.rotation.x = pointCloud.rotation.x
      }

      // 4. Update dynamic lines connecting nearby nodes
      let lineIndex = 0
      const currentPositions = pointCloud.geometry.attributes.position.array
      const distThreshold = 1.9

      for (let i = 0; i < nodeCount; i++) {
        if (lineIndex >= maxLineSegments * 6 - 6) break
        const x1 = currentPositions[i * 3]
        const y1 = currentPositions[i * 3 + 1]
        const z1 = currentPositions[i * 3 + 2]

        for (let j = i + 1; j < Math.min(i + 12, nodeCount); j++) {
          const x2 = currentPositions[j * 3]
          const y2 = currentPositions[j * 3 + 1]
          const z2 = currentPositions[j * 3 + 2]

          const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2)
          if (dist < distThreshold) {
            linePositions[lineIndex++] = x1
            linePositions[lineIndex++] = y1
            linePositions[lineIndex++] = z1
            linePositions[lineIndex++] = x2
            linePositions[lineIndex++] = y2
            linePositions[lineIndex++] = z2
          }
        }
      }

      lineMesh.geometry.attributes.position.needsUpdate = true
      lineMesh.geometry.setDrawRange(0, lineIndex / 3)

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  )
}
