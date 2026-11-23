import { useLang } from '../lib/lang-context'
import { entityLogos, story } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, Lines, Section } from './Shell'
import { useReveal, useRevealGroup } from '../hooks/useReveal'

export function Story() {
  const { t, lang } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()
  const wallRef = useReveal<HTMLDivElement>()

  // No grain layer here: the section tone is baked into the portrait's studio
  // white, and a grain layer beneath the content would leave a visible edge
  // around the image.
  return (
    <Section id="about" block="about" tone="paper-2" className="overflow-hidden">
      <Container className="relative z-[2] py-24 lg:py-32">
        <div ref={ref} className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          {/* portrait — white studio ground dissolved into the paper */}
          <div className="lg:col-span-5">
            <figure className="reveal relative mx-auto max-w-[360px] lg:mx-0 lg:max-w-none">
              <img
                src="/img/story-640.webp"
                srcSet="/img/story-640.webp 640w, /img/story-1000.webp 1000w"
                sizes="(max-width: 1023px) 70vw, 32vw"
                width={1000}
                height={998}
                loading="lazy"
                decoding="async"
                alt={lang === 'ar' ? 'موسى الفيفي' : 'Mousa Alfaify'}
                className="w-full"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 opacity-45"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
                  backgroundSize: '52px 52px',
                  maskImage:
                    'radial-gradient(58% 58% at 50% 48%, transparent 30%, black 62%, transparent 92%)',
                }}
              />
            </figure>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="reveal">
              <Eyebrow>{t(story.eyebrow)}</Eyebrow>
            </div>
            <h2
              className="reveal u-head mt-7 text-[clamp(2rem,4.8vw,3.4rem)]"
              style={{ ['--reveal-delay' as string]: '70ms', textWrap: 'balance' }}
            >
              <Lines text={t(story.title)} />
            </h2>

            <div className="mt-8 space-y-5">
              {story.body[lang].map((p, i) => (
                <p
                  key={i}
                  className="reveal u-lede text-[clamp(1rem,1.5vw,1.14rem)] text-ink-2"
                  style={{ ['--reveal-delay' as string]: `${140 + i * 80}ms` }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* The marks get the full measure of the page rather than a column. */}
        <div ref={wallRef} className="reveal mt-16 lg:mt-24">
          <div className="mb-6 flex items-center gap-4">
            <p className="u-mono shrink-0 text-ink-4">{t(ui.entitiesLabel)}</p>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <LogoWall />
        </div>
      </Container>
    </Section>
  )
}

/**
 * The official marks of entities Mousa has worked with. A hairline grid on the
 * line colour gives each mark the same room; `object-contain` keeps every one
 * at its true aspect ratio.
 */
function LogoWall() {
  const { t } = useLang()
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-4">
      {entityLogos.map((e) => (
        <li
          key={e.file}
          className="group flex min-h-[112px] items-center justify-center bg-paper px-5 py-7 transition-colors duration-300 hover:bg-paper-2 sm:min-h-[140px] sm:px-8"
        >
          <img
            src={`/img/logos/${e.file}.svg`}
            alt={t(e.name)}
            width={e.w}
            height={e.h}
            loading="lazy"
            decoding="async"
            className="h-auto w-auto max-h-[calc(46px*var(--logo-scale))] max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:max-h-[calc(62px*var(--logo-scale))]"
            style={{
              ['--logo-scale' as string]: e.scale ?? 1,
              transitionTimingFunction: 'var(--ease-out-soft)',
            }}
          />
        </li>
      ))}
    </ul>
  )
}
