import Reveal from '../components/Reveal'
import { profile } from '../data/profile'
import { channel } from '../data/teaching'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <Reveal as="h2">Let's work together</Reveal>
      <Reveal as="p" className="sub" delay={0.05}>
        I'm looking for a junior Python or backend developer role, an SQA engineer role, or an internship. Based in {profile.location}.
      </Reveal>
      <Reveal as="a" className="big" delay={0.1} href={`mailto:${profile.email}`}>
        {profile.email}
      </Reveal>
      <Reveal className="btns" delay={0.15}>
        <a className="btn primary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {channel.url && (
          <a className="btn" href={channel.url} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          
        )}
      </Reveal>
    </section>
  )
}