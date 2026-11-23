import { useEffect, useRef } from 'react'

/**
 * Adds `.is-in` once an element scrolls into view. One observer per element,
 * disconnected after firing — nothing keeps running behind the scroll.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}

/** Same behaviour, applied to every `.reveal` descendant of a container. */
export function useRevealGroup<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (!items.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((i) => i.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return ref
}
