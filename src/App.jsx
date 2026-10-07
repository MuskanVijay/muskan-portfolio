import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import { profile } from './data/profile'
import Teaching from './sections/Teaching'
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage can be unavailable; fall back to the system setting */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [ready, setReady] = useState(false) // true once the loading screen has finished

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  // Stop the page from scrolling behind the loading screen
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  const handleDone = useCallback(() => setReady(true), [])
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return (
    <div className="app">
      {!ready && <LoadingScreen onDone={handleDone} />}
      <CustomCursor />
      <Background theme={theme} />

      <div className="page">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="wrap">
          <Hero ready={ready} />
          <About />
          <Projects />
          <Teaching />
          <Skills />
          <Contact />
        </main>
        <footer className="wrap footer">
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </footer>
      </div>
    </div>
  )
}
