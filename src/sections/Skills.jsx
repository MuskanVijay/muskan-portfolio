import Reveal from '../components/Reveal'
import { skillGroups } from '../data/profile'

export default function Skills() {
  return (
    <section id="skills">
      <Reveal as="h2">Skills</Reveal>
      <Reveal as="p" className="sub" delay={0.05}>
        What I work with day to day.
      </Reveal>
      <div className="skills">
        {skillGroups.map((g) => (
          <Reveal className="skill-row" key={g.title}>
            <h3>{g.title}</h3>
            <ul className="chips">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
