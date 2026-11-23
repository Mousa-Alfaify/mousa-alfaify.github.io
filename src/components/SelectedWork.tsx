import { useState } from 'react'
import { useLang } from '../lib/lang-context'
import { works } from '../data/works'
import { ui } from '../data/ui'
import type { Work } from '../data/types'
import { Container, Eyebrow, Lines, MetricValue, Section } from './Shell'
import { WorkVisual } from './WorkVisual'
import { CaseStudy } from './CaseStudy'
import { useRevealGroup } from '../hooks/useReveal'

export function SelectedWork() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()
  const [openId, setOpenId] = useState<string | null>(null)

  const hero = works.find((w) => w.scale === 'hero')!
  const wide = works.filter((w) => w.scale === 'wide')
  const half = works.filter((w) => w.scale === 'half')

  return (
    <>
      <Section id="work" block="work" tone="paper">
        <Container className="py-24 lg:py-32">
          <div ref={ref}>
            <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div>
                <Eyebrow>{t(ui.sections.work)}</Eyebrow>
                <h2
                  className="u-head mt-7 text-[clamp(2.1rem,5.4vw,3.9rem)]"
                  style={{ textWrap: 'balance' }}
                >
                  <Lines text={t(ui.workTitle)} />
                </h2>
              </div>
              <p className="u-lede max-w-[36ch] text-[0.98rem] text-ink-3">{t(ui.workLede)}</p>
            </div>

            {/* 01 — the flagship, given the room it earns */}
            <div className="reveal mt-16 lg:mt-24">
              <WorkCard work={hero} onOpen={setOpenId} variant="hero" />
            </div>

            {/* 02 — wide */}
            <div className="reveal mt-6 lg:mt-8">
              <WorkCard work={wide[0]} onOpen={setOpenId} variant="wide" />
            </div>

            {/* 03 · 04 · 05 — the three assistants, read as a set */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-8">
              {half.map((w, i) => (
                <div
                  key={w.id}
                  className="reveal"
                  style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                >
                  <WorkCard work={w} onOpen={setOpenId} variant="half" />
                </div>
              ))}
            </div>

            {/* 06 — wide, with the only photographic evidence on the site */}
            {wide[1] && (
              <div className="reveal mt-6 lg:mt-8">
                <WorkCard work={wide[1]} onOpen={setOpenId} variant="wide" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <CaseStudy openId={openId} onClose={() => setOpenId(null)} onNavigate={setOpenId} />
    </>
  )
}

function WorkCard({
  work,
  onOpen,
  variant,
}: {
  work: Work
  onOpen: (id: string) => void
  variant: 'hero' | 'wide' | 'half'
}) {
  const { t } = useLang()

  const Meta = (
    <>
      <div className="flex items-center gap-3">
        <span className="u-mono text-accent" dir="ltr">
          {work.index}
        </span>
        <span aria-hidden className="h-px w-5 bg-line" />
        <span className="u-mono text-ink-4">{t(work.kind)}</span>
      </div>
      <h3
        className={`u-head mt-4 ${
          variant === 'hero'
            ? 'text-[clamp(1.7rem,3.6vw,2.7rem)]'
            : variant === 'wide'
              ? 'text-[clamp(1.4rem,2.6vw,2rem)]'
              : 'text-[1.22rem]'
        }`}
      >
        {t(work.title)}
      </h3>
      <p
        className={`u-lede mt-3 text-ink-2 ${
          variant === 'hero' ? 'max-w-[46ch] text-[1.05rem]' : 'text-[0.93rem]'
        }`}
      >
        {t(work.summary)}
      </p>
    </>
  )

  const Impacts = (
    <ul
      className={`flex flex-wrap gap-x-8 gap-y-4 ${variant === 'hero' ? 'mt-9' : 'mt-6'}`}
    >
      {work.impact.slice(0, variant === 'half' ? 2 : 4).map((m, i) => (
        <li key={i}>
          <p
            className={`font-black leading-none text-ink ${
              variant === 'hero' ? 'text-[2rem]' : 'text-[1.4rem]'
            }`}
          >
            <MetricValue metric={m} />
          </p>
          <p className="mt-1.5 text-[0.78rem] leading-snug text-ink-3">{t(m.label)}</p>
        </li>
      ))}
    </ul>
  )

  const Open = (
    <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
      {t(ui.caseLabels.open)}
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
      >
        <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  )

  // Starts with the visible call to action so the accessible name and the
  // rendered label agree.
  const label = `${t(ui.caseLabels.open)} — ${t(work.title)}`

  if (variant === 'half') {
    return (
      <button
        type="button"
        onClick={() => onOpen(work.id)}
        aria-label={label}
        className="group flex h-full w-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper-2/50 p-6 text-start transition-all duration-500 hover:border-ink-4 hover:bg-paper-2 lg:p-7"
        style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
      >
        <WorkVisual work={work} tall />
        <div className="mt-6 flex flex-1 flex-col">
          {Meta}
          <div className="mt-auto">
            {Impacts}
            {Open}
          </div>
        </div>
      </button>
    )
  }

  const shell =
    'group w-full rounded-[var(--radius-xl)] border border-line p-6 text-start transition-all duration-500 hover:border-ink-4 sm:p-8 lg:p-10'

  // The campaign case carries real artwork — it gets a full-width strip
  // instead of being squeezed into a side column.
  if (work.visual === 'campaign') {
    return (
      <button
        type="button"
        onClick={() => onOpen(work.id)}
        aria-label={label}
        className={`${shell} bg-paper-2/40 hover:bg-paper-2/80`}
        style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>{Meta}</div>
          <div className="lg:pb-1 lg:[&>ul]:mt-0">{Impacts}</div>
        </div>
        <div className="mt-9">
          <WorkVisual work={work} />
        </div>
        <div>{Open}</div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(work.id)}
      aria-label={label}
      className={`${shell} grid grid-cols-1 gap-8 lg:gap-12 ${
        variant === 'hero'
          ? 'bg-paper-2/60 hover:bg-paper-2 lg:grid-cols-2 lg:items-center'
          : 'bg-paper-2/40 hover:bg-paper-2/80 lg:grid-cols-[1.05fr_1fr] lg:items-center'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
    >
      <div className={variant === 'hero' ? 'lg:order-2' : ''}>
        <WorkVisual work={work} />
      </div>
      <div className={variant === 'hero' ? 'lg:order-1' : ''}>
        {Meta}
        {Impacts}
        {Open}
      </div>
    </button>
  )
}
