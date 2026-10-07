import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import '../styles/nav.css'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false) // is the phone menu open?

  // Highlight the link of the section currently in the middle of the screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Close the phone menu with Escape or a tap outside the navbar
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e) => {
      if (!e.target.closest('.nav')) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const isDark = theme === 'dark'

  return (
    <header className="nav">
      <a className="brand" href="#top">
        {profile.name}
      </a>

      <div className="nav-right">
        {/* Full links: shown on tablets and computers */}
        <nav aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {isDark ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </>
            ) : (
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            )}
          </svg>
        </button>

        {/* Menu button: shown on phones only */}
        <button
          type="button"
          className="icon-btn nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* Phone menu: lists every section */}
      <div id="mobile-menu" className={`nav-menu ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            aria-current={active === l.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        {profile.resume && (
          <a href={profile.resume} download onClick={() => setOpen(false)}>
            Download resume
          </a>
        )}
      </div>
    </header>
  )
}