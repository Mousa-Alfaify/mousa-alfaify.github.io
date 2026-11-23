import { useLang } from '../lib/lang-context'
import { philosophy } from '../data/profile'
import { Container, Eyebrow, Lines, Section } from './Shell'
import { useRevealGroup } from '../hooks/useReveal'

export function Philosophy() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()

  return (
    <Section block="practice" tone="bark" className="u-grain overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-3/40 to-transparent"
      />
      <Container className="relative z-[2] py-24 lg:py-36">
        <div ref={ref} className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <div className="reveal">
              <Eyebrow tone="bark">{t(philosophy.eyebrow)}</Eyebrow>
            </div>
            <h2
              className="reveal u-head mt-8 text-[clamp(2.1rem,5vw,3.6rem)]"
              style={{ ['--reveal-delay' as string]: '80ms', textWrap: 'balance' }}
            >
              <Lines text={t(philosophy.title)} />
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="reveal u-lede text-[clamp(1.02rem,1.5vw,1.22rem)] text-bark-ink-2"
              style={{ ['--reveal-delay' as string]: '160ms' }}
            >
              {t(philosophy.lede)}
            </p>

            <dl className="mt-12 space-y-0">
              {philosophy.pillars.map((p, i) => (
                <div
                  key={p.k}
                  className="reveal group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-bark-line py-7 transition-colors duration-300 hover:border-accent-3/50"
                  style={{ ['--reveal-delay' as string]: `${220 + i * 90}ms` }}
                >
                  <dt className="col-span-2 grid grid-cols-subgrid items-baseline text-[1.05rem] font-bold text-bark-ink">
                    <span className="u-mono text-bark-ink-3 transition-colors duration-300 group-hover:text-accent-3">
                      {p.k}
                    </span>
                    <span>{t(p.t)}</span>
                  </dt>
                  <dd className="col-start-2 mt-2 text-[0.94rem] leading-relaxed text-bark-ink-2">
                    {t(p.d)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  )
}
