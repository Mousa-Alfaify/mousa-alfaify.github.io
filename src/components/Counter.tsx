import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useMedia'

/**
 * Counts a numeric string up on first view. Non-numeric values (e.g. "24/7")
 * are printed as-is, so the component never mangles a label.
 */
export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const numeric = /^\d+(\.\d+)?$/.test(value)
  const target = numeric ? parseFloat(value) : 0
  const decimals = numeric && value.includes('.') ? value.split('.')[1].length : 0
  const reduced = useReducedMotion()
  // Starts at the true value. It only rewinds to zero when the element is
  // genuinely about to be watched, so a fast scroll or a screenshot never
  // shows a fake 0.
  const [shown, setShown] = useState(() => (numeric ? target.toFixed(decimals) : value))

  useEffect(() => {
    // Non-numeric values (e.g. "24/7") and reduced-motion visitors keep the
    // value the initial state already holds — nothing to animate.
    if (!numeric || reduced) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        setShown('0')
        const dur = 1250
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          // easeOutExpo — fast settle, no bounce
          const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setShown((target * e).toFixed(decimals))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [numeric, target, decimals, reduced, value])

  return (
    <span ref={ref} className={`u-num ${className}`} dir="ltr">
      {shown}
    </span>
  )
}
