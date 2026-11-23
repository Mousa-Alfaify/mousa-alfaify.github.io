import { useMemo, useState } from 'react'
import { useLang } from '../lib/lang-context'
import { capabilityEdges, capabilityNodes } from '../data/works'
import { tools } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, Lines, Section } from './Shell'
import { useRevealGroup } from '../hooks/useReveal'

const W = 100
const H = 100

export function CapabilityMap() {
  const { t, lang, dir } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()
  const [activeId, setActive] = useState<string | null>(null)

  const byId = useMemo(
    () => Object.fromEntries(capabilityNodes.map((n) => [n.id, n])),
    [],
  )
  const linked = useMemo(() => {
    if (!activeId) return null
    const s = new Set<string>([activeId])
    for (const [a, b] of capabilityEdges) {
      if (a === activeId) s.add(b)
      if (b === activeId) s.add(a)
    }
    return s
  }, [activeId])

  const active = activeId ? byId[activeId] : null

  // SVG does not follow the document direction. Mirror the x axis in Arabic so
  // the diagram still reads from the reader's start edge toward the outcome.
  const mx = (x: number) => (dir === 'rtl' ? 100 - x : x)

  return (
    <Section id="capabilities" block="capabilities" tone="bark" className="u-grain">
      <Container className="relative z-[2] py-24 lg:py-32">
        <div ref={ref}>
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-12">
            <div className="lg:col-span-5">
              <div className="reveal">
                <Eyebrow tone="bark">{t(ui.sections.capabilities)}</Eyebrow>
              </div>
              <h2
                className="reveal u-head mt-7 text-[clamp(2rem,4.8vw,3.4rem)]"
                style={{ ['--reveal-delay' as string]: '70ms', textWrap: 'balance' }}
              >
                <Lines text={t(ui.capTitle)} />
              </h2>
              <p
                className="reveal u-lede mt-6 max-w-[42ch] text-[0.99rem] text-bark-ink-2"
                style={{ ['--reveal-delay' as string]: '140ms' }}
              >
                {t(ui.capLede)}
              </p>

              {/* readout — replaces the diagram's tooltip, always in the same place */}
              <div
                className="reveal mt-9 hidden min-h-[104px] border-s-2 ps-5 transition-colors duration-300 lg:block"
                style={{
                  borderColor: active ? 'var(--color-accent-3)' : 'var(--color-bark-line)',
                  ['--reveal-delay' as string]: '200ms',
                }}
              >
                {active ? (
                  <>
                    <p className="text-[1.05rem] font-bold text-bark-ink">{t(active.label)}</p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-bark-ink-2">
                      {t(active.detail)}
                    </p>
                  </>
                ) : (
                  <p className="u-mono pt-1 text-bark-ink-3">{t(ui.capHint)}</p>
                )}
              </div>
            </div>

            {/* ---------- the map: interactive on desktop, a layered read on phones ---------- */}
            <div
              className="reveal hidden lg:col-span-7 lg:block"
              style={{ ['--reveal-delay' as string]: '120ms' }}
            >
              <div
                className="relative w-full"
                onMouseLeave={() => setActive(null)}
              >
                <svg
                  viewBox="-11 -6 122 108"
                  className="w-full"
                  role="img"
                  aria-label={
                    lang === 'ar'
                      ? 'خريطة القدرات: الحوكمة والمخاطر والامتثال والعمليات والبيانات تتصل عبر طبقة الذكاء الاصطناعي والأتمتة لتنتج ذكاءً تشغيلياً'
                      : 'Capability map: governance, risk, compliance, operations and data connect through an AI and automation layer to produce operational intelligence'
                  }
                >
                  {/* edges */}
                  <g>
                    {capabilityEdges.map(([a, b], i) => {
                      const na = byId[a]
                      const nb = byId[b]
                      if (!na || !nb) return null
                      const on = linked ? linked.has(a) && linked.has(b) : false
                      const dim = !!linked && !on
                      return (
                        <line
                          key={i}
                          x1={(mx(na.x) / 100) * W}
                          y1={(na.y / 100) * H}
                          x2={(mx(nb.x) / 100) * W}
                          y2={(nb.y / 100) * H}
                          stroke={on ? 'var(--color-accent-3)' : 'var(--color-bark-ink-3)'}
                          strokeWidth={on ? 0.75 : 0.4}
                          opacity={dim ? 0.14 : on ? 0.95 : 0.5}
                          style={{ transition: 'all 320ms var(--ease-out-soft)' }}
                        />
                      )
                    })}
                  </g>

                  {/* nodes */}
                  <g>
                    {capabilityNodes.map((n) => {
                      const on = linked ? linked.has(n.id) : false
                      const isActive = activeId === n.id
                      const dim = !!linked && !on
                      const r = n.layer === 'enable' ? 7.2 : n.layer === 'outcome' ? 6.4 : 4.6
                      return (
                        <g
                          key={n.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`${t(n.label)} — ${t(n.detail)}`}
                          onMouseEnter={() => setActive(n.id)}
                          onFocus={() => setActive(n.id)}
                          onBlur={() => setActive(null)}
                          onClick={() => setActive((c) => (c === n.id ? null : n.id))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setActive((c) => (c === n.id ? null : n.id))
                            }
                          }}
                          className="cursor-pointer outline-none [&:focus-visible_circle:first-of-type]:stroke-accent-3"
                          style={{
                            opacity: dim ? 0.3 : 1,
                            transition: 'opacity 320ms var(--ease-out-soft)',
                          }}
                        >
                          {/* generous invisible hit target */}
                          <circle cx={mx(n.x)} cy={n.y} r={11} fill="transparent" strokeWidth={0.6} stroke="transparent" />
                          {(n.layer === 'enable' || isActive) && (
                            <circle
                              cx={mx(n.x)}
                              cy={n.y}
                              r={r + 4}
                              fill="none"
                              stroke="var(--color-accent-3)"
                              strokeWidth={0.35}
                              strokeDasharray="1.2 2"
                              opacity={isActive ? 0.9 : 0.45}
                              className={n.layer === 'enable' ? 'cm-orbit' : undefined}
                              style={{ transformOrigin: `${mx(n.x)}px ${n.y}px` }}
                            />
                          )}
                          <circle
                            cx={mx(n.x)}
                            cy={n.y}
                            r={r}
                            fill={
                              // On the navy ground the enabling hub needs the
                              // light brand step to read as the highlight.
                              n.layer === 'enable'
                                ? 'var(--color-accent-3)'
                                : n.layer === 'outcome'
                                  ? 'var(--color-bark-ink)'
                                  : 'var(--color-bark-2)'
                            }
                            stroke={
                              isActive || on
                                ? 'var(--color-accent-3)'
                                : 'var(--color-bark-ink-3)'
                            }
                            strokeWidth={isActive ? 0.9 : 0.5}
                            style={{ transition: 'all 320ms var(--ease-out-soft)' }}
                          />
                          <text
                            x={mx(n.x)}
                            y={n.layer === 'enable' ? n.y + 16 : n.y - r - 6}
                            textAnchor="middle"
                            fontSize="3.5"
                            fontWeight={isActive ? 700 : 500}
                            fill={
                              isActive || on
                                ? 'var(--color-accent-3)'
                                : n.layer === 'core'
                                  ? 'var(--color-bark-ink-2)'
                                  : 'var(--color-bark-ink)'
                            }
                            style={{ transition: 'fill 320ms var(--ease-out-soft)' }}
                          >
                            {t(n.label)}
                          </text>
                        </g>
                      )
                    })}
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* ---------- mobile: the same system, read top to bottom ---------- */}
          <div className="reveal mt-10 lg:hidden">
              <ul className="space-y-px">
                {capabilityNodes
                  .filter((n) => n.layer === 'core')
                  .map((n) => (
                    <li key={n.id} className="border-t border-bark-line py-4">
                      <p className="text-[0.98rem] font-bold text-bark-ink">{t(n.label)}</p>
                      <p className="mt-1 text-[0.86rem] leading-relaxed text-bark-ink-2">
                        {t(n.detail)}
                      </p>
                    </li>
                  ))}
              </ul>

              <Connector />

              {capabilityNodes
                .filter((n) => n.layer === 'enable')
                .map((n) => (
                  <div
                    key={n.id}
                    className="rounded-[var(--radius-md)] border border-accent-3/45 bg-accent-3/12 px-5 py-4"
                  >
                    <p className="text-[0.98rem] font-bold text-accent-3">{t(n.label)}</p>
                    <p className="mt-1 text-[0.86rem] leading-relaxed text-bark-ink-2">
                      {t(n.detail)}
                    </p>
                  </div>
                ))}

              <Connector />

              {capabilityNodes
                .filter((n) => n.layer === 'outcome')
                .map((n) => (
                  <div
                    key={n.id}
                    className="rounded-[var(--radius-md)] bg-bark-ink px-5 py-4 text-bark-2"
                  >
                    <p className="text-[0.98rem] font-bold">{t(n.label)}</p>
                    <p className="mt-1 text-[0.86rem] leading-relaxed opacity-80">{t(n.detail)}</p>
                  </div>
                ))}
          </div>

          {/* ---------- tools rail ---------- */}
          <div className="reveal mt-16 border-t border-bark-line pt-8 lg:mt-20">
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5">
              <p className="u-mono text-bark-ink-3">{t(ui.sections.tools)}</p>
              <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                {tools.map((tool) => (
                  <li key={tool.name} className="flex items-baseline gap-2">
                    <span className="u-lat text-[1.02rem] font-medium text-bark-ink">
                      {tool.name}
                    </span>
                    {t(tool.level) && (
                      <span className="u-mono text-bark-ink-3">{t(tool.level)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** The downward flow between layers on the stacked mobile view. */
function Connector() {
  return (
    <div aria-hidden className="flex justify-center py-3">
      <svg width="12" height="30" viewBox="0 0 12 30" fill="none">
        <path
          d="M6 0v22M1 18l5 5 5-5"
          stroke="var(--color-accent-3)"
          strokeWidth="1.3"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}
