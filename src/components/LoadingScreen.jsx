import { useEffect, useState } from 'react'
import '../styles/loader.css'

const DURATION = 1900 // how long the loading takes, in ms
const R = 70 // radius of the progress ring
const C = 2 * Math.PI * R // length of the ring

// Lines of the little "boot log". Each one appears when the progress reaches `at`.
const STEPS = [
  { at: 0, text: 'npm run portfolio', type: 'cmd' },
  { at: 14, text: 'loading projects' },
  { at: 38, text: 'starting API server' },
  { at: 62, text: 'connecting database' },
  { at: 84, text: 'rendering interface' },
  { at: 100, text: 'ready', type: 'ready' },
]

const MARKS = { cmd: '$', ready: '●' }

export default function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }
    let raf
    let start
    let t1
    let t2
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min(1, (t - start) / DURATION)
      const eased = 0.5 - Math.cos(Math.PI * p) / 2 // starts and ends gently
      setPct(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        t1 = setTimeout(() => setLeaving(true), 350) // let "ready" show for a moment
        t2 = setTimeout(onDone, 350 + 900) // then the curtains open
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`boot ${leaving ? 'leaving' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="boot-half top" />
      <div className="boot-half bottom" />

      <div className="boot-content">
        <div className="boot-ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="ring-dash" cx="100" cy="100" r="90" />
            <circle className="ring-track" cx="100" cy="100" r={R} />
            <circle
              className="ring-bar"
              cx="100"
              cy="100"
              r={R}
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct / 100)}
            />
            <g className="ring-orbit">
              <circle cx="100" cy="10" r="4" />
            </g>
          </svg>
          <div className="boot-center">
            <div className="boot-mark">
              MV<span>.</span>
            </div>
            <div className="boot-pct">{pct}%</div>
          </div>
        </div>

        <ul className="boot-log" aria-hidden="true">
          {STEPS.filter((s) => pct >= s.at).map((s) => (
            <li key={s.text} className={s.type || ''}>
              <b>{MARKS[s.type] || '✓'}</b> {s.text}
            </li>
          ))}
        </ul>

        <p className="boot-foot">Python · FastAPI · PostgreSQL · AI . Full-Stack Developer</p>
      </div>
    </div>
  )
}