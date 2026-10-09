import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import { filters, projects } from '../data/projects'
import { profile } from '../data/profile'

// A project can have one `link` or a list of `links`
const getLinks = (p) => p.links || (p.link ? [{ label: p.linkLabel, url: p.link }] : [])

export default function Projects() {
  const [filter, setFilter] = useState('all') // the button that is selected
  const [shown, setShown] = useState('all') // the filter actually applied (changes after the fade-out)
  const [fading, setFading] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const choose = (id) => {
    if (id === filter) return
    setFilter(id)
    setFading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setShown(id)
      setFading(false)
    }, 220)
  }

  // Soft light that follows the pointer inside a card
  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const visible = projects.filter((p) => shown === 'all' || p.category === shown)

  return (
    <section id="projects">
      <Reveal as="h2">Things I've built</Reveal>
      <Reveal as="p" className="sub" delay={0.05}>
      Full-stack apps, AI features, Python backends, and test automation. Pick a focus to filter.
      </Reveal>

      <Reveal className="filters" delay={0.1} role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
            {f.label}
          </button>
        ))}
      </Reveal>

      <Reveal delay={0.15}>
        <div className={`grid ${fading ? 'fading' : ''}`}>
          {visible.map((p, i) => (
            <article
              className={`card ${p.featured ? 'featured' : ''}`.trim()}
              key={p.id}
              onPointerMove={glow}
              style={{ '--d': `${Math.min(i, 6) * 0.05}s` }}
            >
              <p className="kind">{p.featured ? `Featured · ${p.kind}` : p.kind}</p>
              <h3>{p.title}</h3>
              {p.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
              <ul className="chips">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {getLinks(p).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem 1.2rem' }}>
                  {getLinks(p).map((l) => (
                    <a key={l.url} className="view" href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label || 'View project'} →
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Reveal>

      <p className="more">
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
          Browse code on GitHub
        </a>
      </p>
    </section>
  )
}