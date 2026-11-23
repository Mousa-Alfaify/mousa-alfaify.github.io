import { useEffect, useRef } from 'react'
import { useLang } from '../lib/lang-context'
import { works } from '../data/works'
import { ui } from '../data/ui'
import { WorkVisual } from './WorkVisual'
import { MetricValue } from './Shell'
import { useReducedMotion } from '../hooks/useMedia'

/**
 * The case reader. Opens over the page rather than routing away, so the
 * visitor never loses their place in the work list.
 * Problem → Thinking → Role → Solution → Impact → Takeaway → Next.
 */
export function CaseStudy({
  openId,
  onClose,
  onNavigate,
}: {
  openId: string | null
  onClose: () => void
  onNavigate: (id: string) => void
}) {
  const { t, lang } = useLang()
  const reduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  const idx = works.findIndex((w) => w.id === openId)
  const work = idx >= 0 ? works[idx] : null
  const next = works[(idx + 1) % works.length]

  useEffect(() => {
    if (!openId) return
    restoreTo.current = document.activeElement as HTMLElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const f = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
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
      () => panelRef.current?.querySelector<HTMLElement>('button')?.focus(),
      90,
    )
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [openId, onClose])

  // A new case starts at its own beginning, not mid-scroll from the last one.
  useEffect(() => {
    if (openId && scrollRef.current) scrollRef.current.scrollTop = 0
  }, [openId])

  useEffect(() => {
    if (!openId && restoreTo.current) {
      restoreTo.current.focus?.()
      restoreTo.current = null
    }
  }, [openId])

  const open = !!work

  return (
    <div
      {...(!open && { inert: '' as unknown as boolean })}
      className={`fixed inset-0 z-[90] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-bark-2/70 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0, transitionTimingFunction: 'var(--ease-out-soft)' }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={work ? t(work.title) : t(ui.caseLabels.open)}
        className="absolute inset-x-0 bottom-0 top-[3vh] overflow-hidden rounded-t-[var(--radius-xl)] bg-paper shadow-lg sm:top-[5vh] lg:inset-x-[3vw]"
        style={{
          transform: open ? 'translateY(0)' : 'translateY(3%)',
          opacity: open ? 1 : 0,
          transition: reduced
            ? 'none'
            : 'transform 560ms var(--ease-out-soft), opacity 380ms var(--ease-out-soft)',
        }}
      >
        {/* header bar stays put while the case scrolls under it */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/92 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="u-mono shrink-0 text-accent" dir="ltr">
              {work?.index}
            </span>
            <span className="truncate text-[0.95rem] font-bold">{work && t(work.title)}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.close)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-paper"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[calc(100%-61px)] overflow-y-auto overscroll-contain"
        >
          {work && (
            <article className="mx-auto w-full max-w-[880px] px-5 py-12 sm:px-8 lg:py-16">
              <p className="u-mono text-ink-4">{t(work.period)}</p>
              <h2 className="u-head mt-4 text-[clamp(1.9rem,5vw,3.1rem)]">{t(work.title)}</h2>
              <p className="u-lede mt-5 max-w-[52ch] text-[clamp(1.02rem,1.6vw,1.2rem)] text-ink-2">
                {t(work.summary)}
              </p>

              <div className="mt-10">
                <WorkVisual work={work} />
              </div>

              {/* Impact stated early — the reason to keep reading */}
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-line py-8 sm:grid-cols-4">
                {work.impact.map((m, i) => (
                  <li key={i}>
                    <p className="text-[1.9rem] font-black leading-none text-ink">
                      <MetricValue metric={m} />
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-snug text-ink-3">{t(m.label)}</p>
                  </li>
                ))}
              </ul>

              <Block label={t(ui.caseLabels.problem)}>{t(work.problem)}</Block>
              <Block label={t(ui.caseLabels.approach)}>{t(work.approach)}</Block>
              <Block label={t(ui.caseLabels.role)}>{t(work.role)}</Block>

              <section className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-[minmax(0,150px)_1fr]">
                <p className="u-mono pt-1 text-ink-4">{t(ui.caseLabels.solution)}</p>
                <ul className="space-y-4">
                  {work.solution[lang].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="u-mono shrink-0 pt-1.5 text-accent" dir="ltr">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[1rem] leading-relaxed text-ink-2">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-[minmax(0,150px)_1fr]">
                <p className="u-mono pt-1 text-ink-4">{t(ui.caseLabels.tools)}</p>
                <ul className="flex flex-wrap gap-2">
                  {work.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[0.8rem] text-ink-2"
                    >
                      <span className="u-lat">{tool}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <blockquote className="mt-14 border-s-2 border-accent bg-paper-2/60 px-6 py-7 sm:px-8">
                <p className="u-mono mb-3 text-ink-4">{t(ui.caseLabels.insight)}</p>
                <p className="u-lede text-[clamp(1.05rem,1.8vw,1.28rem)] text-ink">
                  {t(work.insight)}
                </p>
              </blockquote>

              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="group mt-14 flex w-full items-center justify-between gap-6 border-t border-line pt-8 text-start"
              >
                <span>
                  <span className="u-mono text-ink-4">{t(ui.caseLabels.next)}</span>
                  <span className="u-head mt-2 block text-[clamp(1.2rem,2.6vw,1.8rem)] transition-colors duration-300 group-hover:text-accent">
                    {t(next.title)}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
                  style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
                >
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="rtl:-scale-x-100">
                    <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </button>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-[minmax(0,150px)_1fr]">
      <p className="u-mono pt-1 text-ink-4">{label}</p>
      <p className="text-[1rem] leading-relaxed text-ink-2">{children}</p>
    </section>
  )
}
