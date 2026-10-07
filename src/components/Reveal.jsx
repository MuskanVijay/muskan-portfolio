import useReveal from '../hooks/useReveal'

// Wraps content so it fades and slides in when scrolled into view.
// `active={false}` holds it back (the hero uses this until the loading screen is done).
export default function Reveal({ as: Tag = 'div', delay = 0, active = true, className = '', children, ...rest }) {
  const [ref, seen] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`rv ${seen && active ? 'in' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
