import { useEffect, useState } from 'react'
import { useLang } from '../lib/lang-context'
import { education, roles } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, Lines, MetricValue, Section } from './Shell'
import { useIsDesktop } from '../hooks/useMedia'
import { useRevealGroup } from '../hooks/useReveal'

export function Experience() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()
  const [current, setCurrent] = useState(roles[0].id)

  useEffect(() => {
    const nodes = roles
      .map((r) => document.getElementById(`role-${r.id}`))
      .filter((n): n is HTMLElement => !!n)
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (best) setCurrent(best.target.id.replace('role-', ''))
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.25, 0.7] },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <Section id="experience" block="experience" tone="paper">
      <Container className="py-24 lg:py-32">
        <div ref={ref}>
          <div className="reveal">
            <Eyebrow>{t(ui.sections.experience)}</Eyebrow>
          </div>
          <h2
            className="reveal u-head mt-7 max-w-[16ch] text-[clamp(2.1rem,5.4vw,3.9rem)]"
            style={{ ['--reveal-delay' as string]: '70ms', textWrap: 'balance' }}
          >
            <Lines text={t(ui.expTitle)} />
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-14">
            {/* sticky index — desktop only */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28">
                <ol className="space-y-1">
                  {roles.map((r) => {
                    const on = current === r.id
                    return (
                      <li key={r.id}>
                        <a
                          href={`#role-${r.id}`}
                          className={`group block border-s-2 py-4 ps-5 transition-all duration-400 ${
                            on ? 'border-accent' : 'border-line hover:border-ink-4'
                          }`}
                          style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
                        >
                          <span
                            className={`u-mono block transition-colors duration-300 ${
                              on ? 'text-accent' : 'text-ink-4'
                            }`}
                            dir="ltr"
                          >
                            {r.years}
                          </span>
                          <span
                            className={`mt-1.5 block text-[1.02rem] font-bold leading-snug transition-colors duration-300 ${
                              on ? 'text-ink' : 'text-ink-3'
                            }`}
                          >
                            {t(r.title)}
                          </span>
                          <span className="mt-0.5 block text-[0.84rem] text-ink-3">
                            {t(r.org)}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ol>

                <div className="mt-12 border-t border-line pt-6">
                  <p className="u-mono mb-4 text-ink-4">{t(ui.education)}</p>
                  {education.map((e, i) => (
                    <div key={i} className="mb-5 last:mb-0">
                      <p className="text-[0.9rem] font-medium leading-snug text-ink-2">
                        {t(e.degree)}
                      </p>
                      <p className="mt-0.5 text-[0.8rem] text-ink-3">
                        {t(e.org) && <>{t(e.org)} · </>}
                        {t(e.period)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              {roles.map((r, i) => (
                <RoleEntry key={r.id} role={r} first={i === 0} />
              ))}

              {/* education, mobile placement */}
              <div className="mt-4 border-t border-line pt-8 lg:hidden">
                <p className="u-mono mb-5 text-ink-4">{t(ui.education)}</p>
                {education.map((e, i) => (
                  <div key={i} className="mb-5 last:mb-0">
                    <p className="text-[0.95rem] font-medium leading-snug text-ink-2">
                      {t(e.degree)}
                    </p>
                    <p className="mt-0.5 text-[0.82rem] text-ink-3">
                      {t(e.org) && <>{t(e.org)} · </>}
                      {t(e.period)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function RoleEntry({ role, first }: { role: (typeof roles)[number]; first: boolean }) {
  const { t, lang } = useLang()
  const isDesktop = useIsDesktop()
  const [open, setOpen] = useState(first)
  const expanded = isDesktop || open
  const panelId = `role-panel-${role.id}`

  return (
    <article
      id={`role-${role.id}`}
      className="reveal scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-14"
    >
      <p className="u-mono text-ink-4" dir="auto">
        {t(role.period)}
      </p>
      <h3 className="u-head mt-3 text-[clamp(1.45rem,3vw,2.15rem)]">{t(role.title)}</h3>
      <p className="mt-2 text-[0.98rem] font-medium text-accent">{t(role.org)}</p>
      {role.unit && <p className="mt-1 text-[0.88rem] text-ink-3">{t(role.unit)}</p>}

      <p className="u-lede mt-7 max-w-[62ch] text-[1.02rem] text-ink-2">{t(role.context)}</p>

      {/* impact rail */}
      <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-line py-6">
        {role.impact.map((m, i) => (
          <li key={i}>
            <p className="text-[1.8rem] font-black leading-none text-ink">
              <MetricValue metric={m} />
            </p>
            <p className="mt-1.5 text-[0.8rem] text-ink-3">{t(m.label)}</p>
          </li>
        ))}
      </ul>

      {!isDesktop && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 flex w-full items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-line px-4 py-3 text-start text-[0.88rem] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          <span>{open ? t(ui.close) : t(ui.caseLabels.contribution)}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden
            className="shrink-0 transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'none' }}
          >
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      )}

      <div id={panelId} hidden={!expanded}>
        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <p className="u-mono mb-3 text-ink-4">{t(ui.caseLabels.challenge)}</p>
            <p className="text-[0.94rem] leading-relaxed text-ink-2">{t(role.challenge)}</p>
          </div>
          <div>
            <p className="u-mono mb-3 text-ink-4">{t(ui.caseLabels.contribution)}</p>
            <ul className="space-y-2.5">
              {role.contribution[lang].map((c, i) => (
                <li key={i} className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-9 flex flex-wrap gap-2">
          {role.capabilities[lang].map((c, i) => (
            <li
              key={i}
              className="rounded-full border border-line px-3 py-1 text-[0.76rem] text-ink-3"
            >
              <span className={/^[A-Za-z0-9]/.test(c) ? 'u-lat' : ''}>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
