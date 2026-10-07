import { useEffect, useRef } from 'react'

// A small dot that follows the pointer exactly, plus a ring that trails behind it.
// Only runs on devices with a real mouse; touch screens keep the normal behaviour.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dot = dotRef.current
    const ring = ringRef.current
    const root = document.documentElement
    root.classList.add('has-cursor')

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
      dot.classList.remove('hide')
      ring.classList.remove('hide')
      const target = e.target instanceof Element ? e.target.closest('a, button, .card') : null
      ring.classList.toggle('big', Boolean(target))
    }
    const onLeave = () => {
      dot.classList.add('hide')
      ring.classList.add('hide')
    }
    const loop = () => {
      rx += (x - rx) * (reduce ? 1 : 0.18)
      ry += (y - ry) * (reduce ? 1 : 0.18)
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring hide" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hide" aria-hidden="true" />
    </>
  )
}
