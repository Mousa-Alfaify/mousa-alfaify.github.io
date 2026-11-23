import { useEffect, useRef, useState } from 'react'
import { useLang } from '../lib/lang-context'
import { ui } from '../data/ui'

/**
 * MO. — the wordmark, and the site's one hidden interaction.
 * Three clicks reveal the structural grid the page is built on:
 * governance made literal.
 */
export function Wordmark({ onStructure }: { onStructure?: (on: boolean) => void }) {
  const { lang, t } = useLang()
  const [, setTaps] = useState(0)
  const [on, setOn] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    document.documentElement.classList.toggle('structure-on', on)
    onStructure?.(on)
  }, [on, onStructure])

  useEffect(() => {
    if (!on) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOn(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [on])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function handle() {
    if (on) {
      setOn(false)
      setTaps(0)
      return
    }
    window.clearTimeout(timer.current)
    // Functional update: three taps inside one tick must still count as three.
    setTaps((prev) => {
      const next = prev + 1
      if (next >= 3) {
        setOn(true)
        return 0
      }
      timer.current = window.setTimeout(() => setTaps(0), 700)
      return next
    })
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={lang === 'ar' ? 'MO — موسى الفيفي، الصفحة الرئيسية' : 'MO — Mousa Alfaify, home'}
      title={on ? t(ui.structureHint) : undefined}
      dir="ltr"
      className="group relative -m-2 flex items-baseline p-2 leading-none"
    >
      <span className="text-[1.35rem] font-black tracking-[-0.06em] transition-colors duration-200 group-hover:text-accent">
        MO
      </span>
      <span
        aria-hidden
        className={`ml-[3px] inline-block h-[6px] w-[6px] rounded-full transition-all duration-300 ${
          on ? 'scale-125 bg-accent' : 'bg-accent group-hover:scale-125'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
      />
    </button>
  )
}
