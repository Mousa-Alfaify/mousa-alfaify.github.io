import { useLang } from '../lib/lang-context'
import { impact, impactSecondary } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, MetricValue, Section } from './Shell'
import { useRevealGroup } from '../hooks/useReveal'

export function Impact() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()

  return (
    <Section id="impact" block="impact" tone="paper-2" className="u-grain">
      <Container className="relative z-[2] py-20 lg:py-28">
        <div ref={ref}>
          <div className="reveal">
            <Eyebrow>{t(ui.sections.impact)}</Eyebrow>
          </div>

          {/* Primary — four numbers, each with the context that makes it mean something */}
          <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {impact.map((m, i) => (
              <div
                key={i}
                className="reveal border-t border-ink-4/45 pt-6 sm:pt-7"
                style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
              >
                <p className="u-display text-[clamp(2.9rem,6.4vw,4.4rem)] tracking-[-0.05em]">
                  <MetricValue metric={m} count />
                </p>
                <p className="mt-3 text-[0.95rem] font-medium leading-snug text-ink">
                  {t(m.label)}
                </p>
                {m.note && (
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-3">
                    {t(m.note)}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Secondary — a quiet rail, not four more cards */}
          <ul className="reveal mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6 lg:mt-16 lg:gap-x-14">
            {impactSecondary.map((m, i) => (
              <li key={i} className="flex items-baseline gap-2.5">
                <MetricValue metric={m} className="text-[1.35rem] font-bold text-ink" />
                <span className="text-[0.85rem] text-ink-3">{t(m.label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
