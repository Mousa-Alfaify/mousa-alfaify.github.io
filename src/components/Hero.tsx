import { useEffect, useRef } from 'react'
import { useLang } from '../lib/lang-context'
import { heroDomains, heroStatement, identity } from '../data/profile'
import { ui } from '../data/ui'
import { Container } from './Shell'
import { SystemField } from './SystemField'
import { useIsCoarse, useReducedMotion } from '../hooks/useMedia'

export function Hero() {
  const { lang, t, dir } = useLang()
  const reduced = useReducedMotion()
  const coarse = useIsCoarse()
  const wrapRef = useRef<HTMLDivElement>(null)


  // Pointer parallax — depth only, never displacement large enough to distract.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || reduced || coarse) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--px', nx.toFixed(4))
        el.style.setProperty('--py', ny.toFixed(4))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced, coarse])

  // Entrance order, expressed as a CSS variable the .hero-in animation reads.
  // Total entrance stays under ~0.6s so nothing important waits on motion.
  const stagger = (i: number): React.CSSProperties => ({
    ['--hero-delay' as string]: `${30 + i * 45}ms`,
  })

  return (
    <header
      id="home"
      data-block="hero"
      ref={wrapRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper pt-28 pb-14 lg:pt-32 lg:pb-20"
      style={{ ['--px' as string]: 0, ['--py' as string]: 0 }}
    >
      <SystemField className="opacity-[0.9]" />

      {/* atmospheric warmth, sits under everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[22%] end-[-14%] -z-10 h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(25,47,62,0.09), rgba(25,47,62,0) 68%)',
        }}
      />

      <Container className="relative z-10">
        <div
          className="hero-in mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mb-0"
          style={stagger(0)}
        >
          <span className="inline-flex items-center gap-2.5 text-[0.95rem] font-medium tracking-normal text-ink-2 sm:text-[1rem]">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t(ui.available)}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* ---------- Type block ---------- */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h1 className="lg:mt-2">
              <span className="sr-only">
                {t(identity.fullName)} — {t(identity.role)}
              </span>
              <span
                aria-hidden
                className="block"
                style={{
                  transform: reduced
                    ? undefined
                    : 'translate3d(calc(var(--px) * -7px), calc(var(--py) * -5px), 0)',
                  transition: 'transform 700ms var(--ease-out-soft)',
                }}
              >
                {lang === 'ar' ? (
                  /* The Arabic name is supplied as artwork, so it is placed
                     rather than typeset. Width-led sizing keeps it crisp and
                     proportional at every breakpoint. */
                  <img
                    src="/img/name-ar-900.webp"
                    srcSet="/img/name-ar-900.webp 900w, /img/name-ar-1400.webp 1400w"
                    sizes="(max-width: 639px) 272px, (max-width: 1023px) 336px, 448px"
                    width={3548}
                    height={759}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                    className="hero-in block h-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:max-w-[28rem]"
                    style={stagger(1)}
                  />
                ) : (
                  <span className="u-display block text-[clamp(3.4rem,13.5vw,10.5rem)] text-ink">
                    <span className="hero-in block" style={stagger(1)} dir={dir}>
                      {t(identity.first)}
                    </span>
                    <span className="hero-in block" style={stagger(2)} dir={dir}>
                      {t(identity.last)}
                    </span>
                  </span>
                )}
              </span>
            </h1>

            <div
              className="hero-in mt-7 max-w-[52ch] lg:mt-9"
              style={stagger(3)}
            >
              <p className="u-lede text-[clamp(0.95rem,1.15vw,1.06rem)] text-ink-2">
                {t(heroStatement)}
              </p>
            </div>

            <div
              className="hero-in mt-9 lg:mt-11"
              style={stagger(4)}
            >
              <p className="u-mono mb-3 text-ink-4">
                {t(identity.role)} · {t(identity.location)}
              </p>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {heroDomains.map((d, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="h-3 w-px bg-line" />
                    )}
                    <span className="text-[0.82rem] font-medium text-ink-2">{t(d)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------- Portrait ---------- */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <figure
              className="hero-in relative mx-auto w-full max-w-[330px] sm:max-w-[380px] lg:mx-0 lg:ms-auto lg:max-w-none"
              style={{
                ...stagger(1),
                transform: reduced
                  ? undefined
                  : 'translate3d(calc(var(--px) * 10px), calc(var(--py) * 8px), 0)',
                transition: 'transform 800ms var(--ease-out-soft)',
              }}
            >
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-bark shadow-lg">
                <img
                  src="/img/portrait-900.webp"
                  srcSet="/img/portrait-600.webp 600w, /img/portrait-900.webp 900w, /img/portrait-1400.webp 1400w"
                  sizes="(max-width: 1023px) 84vw, 34vw"
                  width={900}
                  height={1125}
                  alt={
                    lang === 'ar'
                      ? 'صورة شخصية لموسى الفيفي'
                      : 'Portrait of Mousa Alfaify'
                  }
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full"
                />
                {/* measurement overlay — the portrait read as an instrument */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(17,33,44,0.34) 0%, rgba(17,33,44,0) 34%)',
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.13]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(242,246,248,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,246,248,0.7) 1px, transparent 1px)',
                    backgroundSize: '46px 46px',
                    maskImage:
                      'radial-gradient(120% 90% at 50% 100%, black 8%, transparent 62%)',
                  }}
                />
              </div>

              {/* floating readout — a real number, not decoration */}
              <div
                className="absolute -bottom-6 start-0 flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-paper/92 px-4 py-3 shadow-md backdrop-blur-sm lg:-start-10"
                style={{
                  transform: reduced
                    ? undefined
                    : 'translate3d(calc(var(--px) * -18px), calc(var(--py) * -12px), 0)',
                  transition: 'transform 900ms var(--ease-out-soft)',
                }}
              >
                <Sparkline />
                <span className="leading-tight">
                  <span className="u-num block text-lg font-bold text-ink" dir="ltr">
                    99.2%
                  </span>
                  <span className="u-mono block text-ink-3">
                    {lang === 'ar' ? 'دقة البيانات' : 'Data accuracy'}
                  </span>
                </span>
              </div>
            </figure>
          </div>
        </div>
      </Container>

      {/* scroll cue */}
      <Container className="relative z-10 mt-14 lg:mt-16">
        <div className="hero-in" style={stagger(5)}>
          <div className="h-px w-full bg-line" />
          <a
            href="#impact"
            className="group mt-3 inline-flex min-h-[24px] items-center gap-2.5 py-1 text-ink-3 transition-colors hover:text-accent"
          >
            <span className="u-mono">{t(ui.scroll)}</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-y-1"
              style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
            >
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden>
                <path d="M5 0v12M1 8l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </a>
        </div>
      </Container>
    </header>
  )
}

/** 92% → 99.2%: the actual shape of the change, drawn once. */
function Sparkline() {
  return (
    <svg width="42" height="24" viewBox="0 0 42 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 19 L9 17.5 L17 15 L25 9 L33 5 L41 3"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="3" r="2.2" fill="var(--color-accent)" />
    </svg>
  )
}
