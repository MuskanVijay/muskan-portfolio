import { useEffect, useRef } from 'react'
import {
  siPython, siGit, siJavascript, siReact, siFastapi, siPostgresql, siDocker, siNodedotjs,
  siTypescript, siGithub, siDjango, siFirebase, siPostman, siRedis, siPandas, siTailwindcss,
  siHtml5, siCss, siMysql, siFlask, siGooglegemini, siGithubactions, siPytest, siNumpy,
} from 'simple-icons'

// Logos to float in the background. The first ones in the list are used most.
const TECH_ICONS = [
  siPython, siGit, siJavascript, siReact, siFastapi, siPostgresql, siDocker, siNodedotjs,
  siTypescript, siGithub, siDjango, siFirebase, siPostman, siRedis, siPandas, siTailwindcss,
  siHtml5, siCss, siMysql, siFlask, siGooglegemini, siGithubactions, siPytest, siNumpy,
].map((i) => ({ name: i.title, hex: `#${i.hex}`, path: i.path }))

// ---------- Settings you can change ----------
const BRAND_COLORS = true // true: each logo uses its own brand color. false: all logos use the theme color.
const LOGO_ALPHA = { dark: 0.3, light: 0.24 } // how visible the logos are (0 to 1)
const LOGO_SIZE = [30, 54] // smallest and largest logo size in pixels
const LOGO_SPEED = 1 // 1 = normal, 0.5 = slower, 2 = faster

// Network colors per theme. Keep these in sync with --accent2 (line) and --accent (hot) in variables.css
const PALETTE = {
  dark: { line: '#4fd1c5', hot: '#ff7a59' },
  light: { line: '#0f766e', hot: '#c2410c' },
}

const LABELS = ['API', 'DB', 'Cache', 'Queue', 'Auth', 'pytest', 'CI', 'LLM', 'SQL', 'Docker', 'REST', 'Git', 'JSON', 'Redis']
const TAU = Math.PI * 2

// Make a brand color readable on the current background
function tint(hex, theme) {
  const n = parseInt(hex.slice(1), 16)
  let r = n >> 16
  let g = (n >> 8) & 255
  let b = n & 255
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (theme === 'dark' && lum < 0.5) {
    r += (255 - r) * 0.45
    g += (255 - g) * 0.45
    b += (255 - b) * 0.45
  } else if (theme === 'light' && lum > 0.6) {
    r *= 0.72
    g *= 0.72
    b *= 0.72
  }
  return `rgb(${r | 0}, ${g | 0}, ${b | 0})`
}

// Layer 1: tech logos floating upward. Layer 2: a tiny network of "services" passing requests.
export default function Background({ theme }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)
  const redrawRef = useRef(null)

  // Keep the latest theme available to the animation loop without restarting it
  useEffect(() => {
    themeRef.current = theme
    if (redrawRef.current) redrawRef.current()
  }, [theme])

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let L = 180
    let nodes = []
    let packets = []
    let logos = []
    let spawn = 0
    let last = 0
    let clock = 0
    let raf = 0
    const mouse = { x: -999, y: -999 }
    const colors = () => PALETTE[themeRef.current] || PALETTE.dark
    const icons = TECH_ICONS.map((ic) => ({ ...ic, shape: new Path2D(ic.path) }))

    function build() {
      const count = Math.max(16, Math.min(54, Math.round((W * H) / 24000)))
      L = Math.max(120, Math.min(210, W * 0.22))
      const labelCount = Math.min(LABELS.length, Math.round(count * 0.45))
      nodes = Array.from({ length: count }, (_, i) => {
        const labelled = i < labelCount
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: labelled ? 3.4 : 1.8 + Math.random() * 1.4,
          label: labelled ? LABELS[i] : null,
          pulse: 0,
        }
      })
      packets = []

      const logoCount = Math.max(8, Math.min(icons.length, Math.round(W / 85)))
      logos = Array.from({ length: logoCount }, (_, i) => ({
        icon: icons[i % icons.length],
        x: Math.random() * W,
        y: Math.random() * H,
        size: LOGO_SIZE[0] + Math.random() * (LOGO_SIZE[1] - LOGO_SIZE[0]),
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.1 + Math.random() * 0.22),
        rot: (Math.random() - 0.5) * 0.6,
        vr: (Math.random() - 0.5) * 0.003,
        phase: Math.random() * TAU,
      }))
    }

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      if (nodes.length && w === W && Math.abs(h - H) < 160) return
      W = w
      H = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      if (reduce) {
        seedStatic()
        draw()
      }
    }

    function neighbours(n) {
      return nodes.filter((m) => {
        if (m === n) return false
        const dx = m.x - n.x
        const dy = m.y - n.y
        return dx * dx + dy * dy < L * L
      })
    }

    function emit(from, to, hops) {
      if (packets.length < 18) packets.push({ a: from, b: to, t: 0, s: 0.006 + Math.random() * 0.008, hops })
    }

    function seed() {
      const n = nodes[(Math.random() * nodes.length) | 0]
      const nb = neighbours(n)
      if (nb.length) emit(n, nb[(Math.random() * nb.length) | 0], 2 + ((Math.random() * 3) | 0))
    }

    function seedStatic() {
      for (let k = 0; k < 8; k++) seed()
      packets.forEach((p) => {
        p.t = Math.random()
      })
    }

    function step(dt) {
      clock += dt

      for (const g of logos) {
        g.x += g.vx * dt * LOGO_SPEED
        g.y += g.vy * dt * LOGO_SPEED
        g.rot += g.vr * dt * LOGO_SPEED
        // gently move away from the pointer
        const dx = g.x - mouse.x
        const dy = g.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 22500 && d2 > 1) {
          const d = Math.sqrt(d2)
          const f = ((150 - d) / 150) * 0.8 * dt
          g.x += (dx / d) * f
          g.y += (dy / d) * f
        }
        // when a logo floats off the top, bring it back in from the bottom
        if (g.y < -g.size) {
          g.y = H + g.size
          g.x = Math.random() * W
        }
        if (g.x < -g.size) g.x = W + g.size
        if (g.x > W + g.size) g.x = -g.size
      }

      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < 10 || n.x > W - 10) n.vx *= -1
        if (n.y < 10 || n.y > H - 10) n.vy *= -1
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 19600 && d2 > 1) {
          const d = Math.sqrt(d2)
          const f = ((140 - d) / 140) * 0.6 * dt
          n.x += (dx / d) * f
          n.y += (dy / d) * f
        }
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - 0.02 * dt)
      }
      spawn -= dt
      if (spawn <= 0) {
        seed()
        spawn = 35 + Math.random() * 35
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.t += p.s * dt
        if (p.t >= 1) {
          p.b.pulse = 1
          if (p.hops > 0 && Math.random() < 0.8) {
            const nb = neighbours(p.b).filter((m) => m !== p.a)
            if (nb.length) emit(p.b, nb[(Math.random() * nb.length) | 0], p.hops - 1)
          }
          packets.splice(i, 1)
        }
      }
    }

    function drawLogos(col) {
      const theme = themeRef.current === 'light' ? 'light' : 'dark'
      const base = LOGO_ALPHA[theme]
      for (const g of logos) {
        const breathe = 0.82 + 0.18 * Math.sin(g.phase + clock * 0.02)
        ctx.save()
        ctx.translate(g.x, g.y)
        ctx.rotate(g.rot)
        const s = g.size / 24
        ctx.scale(s, s)
        ctx.translate(-12, -12)
        ctx.globalAlpha = base * breathe
        ctx.fillStyle = BRAND_COLORS ? tint(g.icon.hex, theme) : col.line
        ctx.fill(g.icon.shape)
        ctx.restore()
      }
    }

    function draw() {
      const col = colors()
      ctx.clearRect(0, 0, W, H)

      drawLogos(col)

      ctx.lineWidth = 1
      ctx.strokeStyle = col.line

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < L * L) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / L) * 0.24
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.font = '11px ui-monospace, Menlo, Consolas, monospace'
      for (const n of nodes) {
        ctx.globalAlpha = 0.6
        ctx.fillStyle = col.line
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, TAU)
        ctx.fill()
        if (n.pulse > 0) {
          ctx.globalAlpha = n.pulse * 0.7
          ctx.strokeStyle = col.hot
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + (1 - n.pulse) * 16, 0, TAU)
          ctx.stroke()
          ctx.lineWidth = 1
          ctx.strokeStyle = col.line
        }
        if (n.label) {
          ctx.globalAlpha = 0.5
          ctx.fillStyle = col.line
          ctx.fillText(n.label, n.x + 8, n.y - 7)
        }
      }

      for (const p of packets) {
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        const t0 = Math.max(0, p.t - 0.12)
        const x0 = p.a.x + (p.b.x - p.a.x) * t0
        const y0 = p.a.y + (p.b.y - p.a.y) * t0
        ctx.strokeStyle = col.hot
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fillStyle = col.hot
        ctx.globalAlpha = 0.22
        ctx.beginPath()
        ctx.arc(x, y, 7, 0, TAU)
        ctx.fill()
        ctx.globalAlpha = 0.95
        ctx.beginPath()
        ctx.arc(x, y, 2.4, 0, TAU)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.lineWidth = 1
    }

    function frame(ts) {
      const dt = Math.min(3, (ts - last) / 16.67 || 1)
      last = ts
      step(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onUp = () => {
      mouse.x = -999
      mouse.y = -999
    }

    redrawRef.current = reduce ? draw : null
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onUp)
    if (!reduce) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onUp)
      redrawRef.current = null
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
}