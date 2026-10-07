import Reveal from '../components/Reveal'
import { channel, teaching, videos } from '../data/teaching'
import '../styles/teaching.css'

// Works with watch?v=ID, youtu.be/ID, /shorts/ID, and /embed/ID links
function getVideoId(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    if (u.pathname.startsWith('/shorts/') || u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] || null
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

export default function Teaching() {
  const items = videos
    .map((v) => ({ ...v, id: v.url ? getVideoId(v.url) : null }))
    .filter((v) => v.id)

  // Hide the whole section until at least one real video link is added
  if (items.length === 0) return null

  return (
    <section id="teaching">
      <Reveal as="h2">{teaching.title}</Reveal>
      <Reveal as="p" className="sub" delay={0.05}>
        {teaching.intro}
      </Reveal>

      <div className="teach-grid">
        {items.map((v, i) => (
          <Reveal
            as="a"
            key={v.id}
            className="video"
            delay={0.08 * i}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch on YouTube: ${v.title}`}
          >
            <span className="thumb">
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="play" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            {v.topic && <span className="topic">{v.topic}</span>}
            <span className="vtitle">{v.title}</span>
            <span className="ai-note">AI narration</span>
          </Reveal>
        ))}
      </div>

      {channel.url && (
        <Reveal as="p" className="more" delay={0.1}>
          <a className="btn" href={channel.url} target="_blank" rel="noopener noreferrer">
            Visit my YouTube channel
          </a>
        </Reveal>
      )}
    </section>
  )
}