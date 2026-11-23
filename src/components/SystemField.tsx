import { useEffect, useRef } from 'react'

/**
 * A slow field of connected nodes — governance as a network of dependencies
 * rather than a decorative particle toy.
 *
 * Cost control: node count scales with viewport, the loop is paused when the
 * section leaves the viewport or the tab is hidden, DPR is capped at 2, and
 * reduced-motion renders one static frame and stops.
 */

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  seed: number
}

interface Pulse {
  a: number
  b: number
  t: number
  speed: number
}

export function SystemField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let raf = 0
    let running = false
    let t0 = performance.now()

    const pointer = { x: -9999, y: -9999, active: false }

    function count() {
      if (w < 640) return 16
      if (w < 1024) return 26
      return 40
    }

    function build() {
      const n = count()
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
        r: 1 + Math.random() * 1.7,
        seed: Math.random() * Math.PI * 2,
      }))
      pulses = []
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = rect.width
      h = rect.height
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const LINK = () => (w < 640 ? 132 : 178)

    function draw(now: number) {
      const dt = Math.min(34, now - t0)
      t0 = now
      const k = dt / 16.666
      ctx!.clearRect(0, 0, w, h)

      const link = LINK()

      // move
      for (const p of nodes) {
        p.x += p.vx * k
        p.y += p.vy * k
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        if (pointer.active) {
          const dx = pointer.x - p.x
          const dy = pointer.y - p.y
          const d2 = dx * dx + dy * dy
          if (d2 < 44000 && d2 > 1) {
            const d = Math.sqrt(d2)
            const f = (1 - d / 210) * 0.24
            p.x += (dx / d) * f * k
            p.y += (dy / d) * f * k
          }
        }
      }

      // edges
      ctx!.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d > link) continue
          const alpha = (1 - d / link) * 0.2
          ctx!.strokeStyle = `rgba(25, 47, 62, ${alpha.toFixed(3)})`
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.stroke()
        }
      }

      // data pulses travelling along links
      if (!reduced && pulses.length < 4 && Math.random() < 0.014 && nodes.length > 3) {
        const a = (Math.random() * nodes.length) | 0
        let b = (Math.random() * nodes.length) | 0
        if (b === a) b = (b + 1) % nodes.length
        if (Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) < link) {
          pulses.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.008 })
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed * k
        if (p.t >= 1) {
          pulses.splice(i, 1)
          continue
        }
        const a = nodes[p.a]
        const b = nodes[p.b]
        if (!a || !b) {
          pulses.splice(i, 1)
          continue
        }
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const fade = Math.sin(p.t * Math.PI)
        ctx!.fillStyle = `rgba(47, 91, 119, ${(0.85 * fade).toFixed(3)})`
        ctx!.beginPath()
        ctx!.arc(x, y, 2.1, 0, Math.PI * 2)
        ctx!.fill()
      }

      // nodes
      for (const p of nodes) {
        const breathe = reduced ? 1 : 1 + Math.sin(now / 1400 + p.seed) * 0.16
        ctx!.fillStyle = 'rgba(25, 47, 62, 0.38)'
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * breathe, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (running) raf = requestAnimationFrame(draw)
    }

    function start() {
      if (running || reduced) return
      running = true
      t0 = performance.now()
      raf = requestAnimationFrame(draw)
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    if (reduced) {
      draw(performance.now())
    } else {
      start()
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisible = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisible)

    let onMove: ((e: PointerEvent) => void) | undefined
    let onLeave: (() => void) | undefined
    if (!coarse && !reduced) {
      onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect()
        pointer.x = e.clientX - r.left
        pointer.y = e.clientY - r.top
        pointer.active = true
      }
      onLeave = () => {
        pointer.active = false
        pointer.x = -9999
        pointer.y = -9999
      }
      const parent = canvas.parentElement ?? window
      parent.addEventListener('pointermove', onMove as EventListener)
      parent.addEventListener('pointerleave', onLeave)
    }

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisible)
      if (onMove) {
        const parent = canvas.parentElement ?? window
        parent.removeEventListener('pointermove', onMove as EventListener)
        if (onLeave) parent.removeEventListener('pointerleave', onLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
