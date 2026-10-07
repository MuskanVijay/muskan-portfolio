import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

// Types out each role, deletes it, then moves to the next
function Typed({ words, start }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    let w = 0
    let c = 0
    let deleting = false
    let timer
    const tick = () => {
      const word = words[w]
      setText(word.slice(0, c))
      let wait = deleting ? 35 : 75
      if (!deleting && c === word.length) {
        deleting = true
        wait = 1600
      } else if (deleting && c === 0) {
        deleting = false
        w = (w + 1) % words.length
        wait = 350
      } else {
        c += deleting ? -1 : 1
      }
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [start, words])

  return (
    <>
      <span>{text}</span>
      <span className="caret" />
    </>
  )
}

export default function Hero({ ready }) {
  const [first, last] = profile.name.split(' ')
  const lines = [first, last]

  return (
    <div className={`hero ${ready ? 'go' : ''}`} id="top">
      <h1 className="name" aria-label={profile.name}>
        {lines.map((word, li) => {
          const offset = li === 0 ? 0 : lines[0].length
          return (
            <span className="line" aria-hidden="true" key={word}>
              {[...word].map((ch, i) => (
                <span className="ch" key={i} style={{ '--i': offset + i }}>
                  {ch}
                </span>
              ))}
            </span>
          )
        })}
      </h1>

      <Reveal as="p" className="role" delay={0.9} active={ready} aria-hidden="true">
        <span className="prompt">&gt;</span>
        <Typed words={profile.roles} start={ready} />
      </Reveal>

      <Reveal as="p" className="lede" delay={1.05} active={ready}>
        {profile.lede}
      </Reveal>

      <Reveal className="btns" delay={1.2} active={ready}>
        <a className="btn primary" href="#projects">
          See my projects
        </a>
          {profile.resume && (
          <a className="btn" href={profile.resume} download>
            Download resume
          </a>
        )}
        <a className="btn" href="#contact">
          Get in touch
        </a>
      </Reveal>

      <div className="scroll-cue" aria-hidden="true" />
    </div>
  )
}
