import { useLang } from '../lib/lang-context'
import { credentialGroups, credentials } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, Lines, Section } from './Shell'
import { useRevealGroup } from '../hooks/useReveal'

/**
 * Typographic credential marks — no borrowed certification logos.
 * Credibility here comes from the full name and the category, not a badge.
 */
export function Credentials() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()

  return (
    <Section block="credentials" tone="paper" className="border-t border-line">
      <Container className="py-24 lg:py-32">
        <div ref={ref}>
          <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <Eyebrow>{t(ui.sections.credentials)}</Eyebrow>
              <h2
                className="u-head mt-7 text-[clamp(2rem,5vw,3.5rem)]"
                style={{ textWrap: 'balance' }}
              >
                <Lines text={t(ui.credTitle)} />
              </h2>
            </div>
            <p className="u-lede max-w-[38ch] text-[0.96rem] text-ink-3">{t(ui.credLede)}</p>
          </div>

          <ul className="mt-14 lg:mt-16">
            {credentials.map((c, i) => (
              <li
                key={c.abbr}
                className="reveal group grid grid-cols-[minmax(0,5.5rem)_1fr] items-baseline gap-x-5 border-t border-line py-5 transition-colors duration-300 hover:border-accent sm:grid-cols-[minmax(0,7.5rem)_1fr_minmax(0,10rem)] sm:gap-x-8 sm:py-6"
                style={{ ['--reveal-delay' as string]: `${i * 45}ms` }}
              >
                <span
                  className="u-lat text-[1.15rem] font-black tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.4rem]"
                  dir="ltr"
                >
                  {c.abbr}
                </span>
                <span className="text-[0.92rem] leading-snug text-ink-2 sm:text-[1rem]">
                  {t(c.name)}
                </span>
                <span className="u-mono col-span-2 mt-1 text-ink-4 sm:col-span-1 sm:mt-0 sm:text-end">
                  {t(credentialGroups[c.group])}
                </span>
              </li>
            ))}
          </ul>
          <div className="u-rule" />
        </div>
      </Container>
    </Section>
  )
}
