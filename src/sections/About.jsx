import Reveal from '../components/Reveal'
import { aboutText, facts } from '../data/profile'

export default function About() {
  return (
    <section id="about">
      <Reveal as="h2">About me</Reveal>
      <Reveal as="p" className="sub" delay={0.05}>
        A quick introduction.
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-text" delay={0.1}>
          {aboutText.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal as="dl" className="facts" delay={0.2}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
