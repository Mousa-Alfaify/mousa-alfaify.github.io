import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../lib/lang-context'
import { ui } from '../data/ui'
import { identity } from '../data/profile'
import { Wordmark } from './Wordmark'
import { useReducedMotion } from '../hooks/useMedia'

const LINKS = [
  { id: 'work', label: ui.nav.work },
  { id: 'experience', label: ui.nav.experience },
  { id: 'capabilities', label: ui.nav.capabilities },
  { id: 'about', label: ui.nav.about },
  { id: 'contact', label: ui.nav.contact },
]

export function Nav() {
  const { t, lang, toggle } = useLang()
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 40)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, y / max) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    // The hero is observed too, so nothing is marked current at the top.
    const ids = ['home', ...LINKS.map((l) => l.id)]
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n)
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id === 'home' ? '' : visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )
    targets.forEach((t2) => io.observe(t2))
    return () => io.disconnect()
  }, [])

  // Body scroll lock + focus management for the full-screen menu
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab') return
      const focusables = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const id = window.setTimeout(
      () => menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus(),
      80,
    )
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [open])

  const close = useCallback(() => {
    setOpen(false)
    openerRef.current?.focus()
  }, [])

  return (
    <>
      <a
        href="#impact"
        className="sr-only rounded-sm bg-accent px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
      >
        {t(ui.skip)}
      </a>

      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[61] h-[2px] origin-[left_center] bg-accent rtl:origin-[right_center]"
        style={{
          transform: `scaleX(${progress})`,
          opacity: progress > 0.005 ? 1 : 0,
          transition: reduced ? 'none' : 'opacity 200ms linear',
        }}
      />

      <nav
        data-block="nav"
        aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border border-line-soft bg-paper/85 shadow-md backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
          style={{
            maxWidth: scrolled ? '860px' : 'var(--shell)',
            transitionTimingFunction: 'var(--ease-out-soft)',
          }}
        >
          <Wordmark />

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-colors duration-200 ${
                    active === l.id ? 'text-ink' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  {t(l.label)}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={t(ui.langSwitchLabel)}
              className="rounded-full border border-line px-3 py-1.5 text-[0.75rem] font-medium text-ink-2 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <span className={lang === 'ar' ? 'u-lat' : ''}>{t(ui.langSwitch)}</span>
            </button>

            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-[0.78rem] font-medium text-paper transition-colors duration-200 hover:bg-accent-2 sm:inline-block"
            >
              {t(ui.ctaShort)}
            </a>

            <button
              ref={openerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t(ui.menu)}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent md:hidden"
            >
              <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden>
                <path d="M0 1h16M0 9h11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Full-screen mobile menu ---------- */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(ui.menu)}
        {...(!open && { inert: '' as unknown as boolean })}
        className={`fixed inset-0 z-[90] flex flex-col bg-bark text-bark-ink on-bark transition-opacity duration-400 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="u-mono text-bark-ink-3">{t(ui.menu)}</span>
          <button
            type="button"
            onClick={close}
            aria-label={t(ui.close)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bark-line text-bark-ink transition-colors hover:border-accent-3 hover:text-accent-3"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
          {LINKS.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-bark-line py-4 transition-all duration-500"
                style={{
                  transform: open ? 'none' : 'translateY(14px)',
                  opacity: open ? 1 : 0,
                  transitionDelay: open && !reduced ? `${90 + i * 55}ms` : '0ms',
                  transitionTimingFunction: 'var(--ease-out-soft)',
                }}
              >
                <span className="u-mono text-bark-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="u-head text-[2rem] transition-colors group-hover:text-accent-3">
                  {t(l.label)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-10">
          <a
            href={`mailto:${identity.email}`}
            onClick={close}
            className="block rounded-[var(--radius-md)] bg-paper px-5 py-4 text-center font-medium text-ink transition-colors hover:bg-accent-3"
          >
            {t(ui.cta)}
          </a>
          <p className="u-mono mt-4 text-center text-bark-ink-3" dir="ltr">
            {identity.email}
          </p>
        </div>
      </div>
    </>
  )
}
