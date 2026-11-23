import { useLang } from '../lib/lang-context'
import type { Work } from '../data/types'

/**
 * Each project gets a diagram of its own mechanism — drawn, not photographed.
 * No fabricated screenshots: the only photographic evidence on this site is
 * real campaign artwork, used for the campaign case only.
 */

const CAMPAIGNS = [
  { slug: 'haq-wa-wajib', w: 1100, h: 674, ar: 'حملة حق وواجب', en: 'Haq wa Wajib campaign' },
  { slug: 'energy-efficiency', w: 1100, h: 674, ar: 'سلسلة ترشيد الطاقة', en: 'Energy efficiency series' },
  { slug: 'sum-bi-sihha', w: 1100, h: 688, ar: 'حملة صم بصحة', en: 'Sum bi Sihha campaign' },
]

export function WorkVisual({ work, tall = false }: { work: Work; tall?: boolean }) {
  const { lang } = useLang()

  if (work.visual === 'campaign') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {CAMPAIGNS.map((c) => (
          /* The artwork fills its frame edge to edge — no inner padding and no
             border, so nothing reads as a white margin around the design. */
          <div
            key={c.slug}
            className="aspect-16/10 overflow-hidden rounded-[var(--radius-sm)] bg-paper-3"
          >
            <img
              src={`/img/campaigns/${c.slug}-700.webp`}
              srcSet={`/img/campaigns/${c.slug}-700.webp 700w, /img/campaigns/${c.slug}-1100.webp 1100w`}
              sizes="(max-width: 639px) 88vw, (max-width: 1023px) 30vw, 380px"
              width={c.w}
              height={c.h}
              loading="lazy"
              decoding="async"
              alt={lang === 'ar' ? c.ar : c.en}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[var(--radius-md)] border border-line-soft bg-paper ${
        tall ? 'aspect-4/3' : 'aspect-16/10'
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <svg
        viewBox="0 0 400 250"
        direction="ltr"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={
          lang === 'ar'
            ? `رسم تخطيطي يمثل ${work.title.ar}`
            : `Schematic representing ${work.title.en}`
        }
      >
        <Diagram kind={work.visual} />
      </svg>
    </div>
  )
}

const MUT = 'var(--color-ink-4)'
const ACC = 'var(--color-accent)'

function Diagram({ kind }: { kind: Work['visual'] }) {
  switch (kind) {
    /* 12 KPIs validated, then surfaced as one rising trend */
    case 'dashboard':
      return (
        <g fill="none" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 40 + (i % 6) * 54
            const y = 34 + Math.floor(i / 6) * 28
            return (
              <g key={i}>
                <rect x={x} y={y} width="38" height="14" rx="2" stroke={MUT} strokeWidth="1" />
                <rect
                  x={x}
                  y={y}
                  width={10 + ((i * 7) % 26)}
                  height="14"
                  rx="2"
                  fill={i % 4 === 0 ? ACC : 'var(--color-paper-3)'}
                  opacity={i % 4 === 0 ? 0.9 : 1}
                />
              </g>
            )
          })}
          <path d="M40 104h320" stroke={MUT} strokeWidth="1" strokeDasharray="3 4" />
          <path
            className="wv-draw"
            d="M46 198 C 110 194, 150 186, 190 168 S 280 146, 356 136"
            stroke={ACC}
            strokeWidth="2.2"
          />
          <circle cx="356" cy="136" r="4" fill={ACC} />
          <circle cx="46" cy="198" r="3" fill={MUT} />
          <text x="40" y="216" fontSize="9" fill={MUT} fontWeight="500">92%</text>
          <text x="316" y="126" fontSize="10" fill={ACC} fontWeight="700">99.2%</text>
        </g>
      )

    /* one board, many indicators, live */
    case 'network':
      return (
        <g fill="none">
          <circle cx="200" cy="125" r="30" stroke={ACC} strokeWidth="1.6" />
          <circle cx="200" cy="125" r="5" fill={ACC} />
          {Array.from({ length: 15 }).map((_, i) => {
            const a = (i / 15) * Math.PI * 2 - Math.PI / 2
            const r1 = 30
            const r2 = 78 + (i % 3) * 16
            const x1 = 200 + Math.cos(a) * r1
            const y1 = 125 + Math.sin(a) * r1
            const x2 = 200 + Math.cos(a) * r2
            const y2 = 125 + Math.sin(a) * r2
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={MUT} strokeWidth="1" opacity="0.65" />
                <circle cx={x2} cy={y2} r={i % 4 === 0 ? 4 : 2.6} fill={i % 4 === 0 ? ACC : MUT} />
              </g>
            )
          })}
          <circle
            className="wv-ring"
            cx="200"
            cy="125"
            r="56"
            stroke={ACC}
            strokeWidth="1"
            strokeDasharray="2 7"
            opacity="0.7"
          />
        </g>
      )

    /* question in, grounded answer out */
    case 'assistant':
      return (
        <g fill="none" strokeLinecap="round">
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.28}>
              <rect x="34" y={54 + i * 34} width="118" height="22" rx="11" stroke={MUT} strokeWidth="1" />
              <line x1="48" y1={65 + i * 34} x2={48 + 60 - i * 14} y2={65 + i * 34} stroke={MUT} strokeWidth="2" />
            </g>
          ))}
          <path d="M160 88 h44" stroke={ACC} strokeWidth="1.4" strokeDasharray="3 4" />
          <rect x="208" y="46" width="158" height="130" rx="8" stroke={ACC} strokeWidth="1.6" />
          <line x1="226" y1="76" x2="330" y2="76" stroke={ACC} strokeWidth="2.4" />
          <line x1="226" y1="96" x2="348" y2="96" stroke={MUT} strokeWidth="2" />
          <line x1="226" y1="114" x2="308" y2="114" stroke={MUT} strokeWidth="2" />
          <line x1="226" y1="132" x2="336" y2="132" stroke={MUT} strokeWidth="2" />
          <circle className="wv-pulse" cx="287" cy="158" r="4" fill={ACC} />
          <text x="34" y="212" fontSize="9" fill={MUT} fontWeight="500">500+ / day</text>
          <text x="300" y="212" fontSize="10" fill={ACC} fontWeight="700">94%</text>
        </g>
      )

    /* many raw series collapse into one read */
    case 'analyst':
      return (
        <g fill="none" strokeLinecap="round">
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 36 + i * 13
            const h = 16 + ((i * 37) % 62)
            return <line key={i} x1={x} y1={132} x2={x} y2={132 - h} stroke={MUT} strokeWidth="4" opacity="0.5" />
          })}
          <path d="M36 132 h228" stroke={MUT} strokeWidth="1" />
          <path
            className="wv-draw"
            d="M36 116 C 90 104, 132 96, 180 82 S 246 62, 264 56"
            stroke={ACC}
            strokeWidth="2.4"
          />
          <rect x="286" y="52" width="80" height="122" rx="6" stroke={ACC} strokeWidth="1.5" />
          <line x1="300" y1="74" x2="352" y2="74" stroke={ACC} strokeWidth="2.6" />
          <line x1="300" y1="92" x2="340" y2="92" stroke={MUT} strokeWidth="2" />
          <line x1="300" y1="108" x2="352" y2="108" stroke={MUT} strokeWidth="2" />
          <line x1="300" y1="124" x2="326" y2="124" stroke={MUT} strokeWidth="2" />
          <text x="286" y="196" fontSize="9" fill={MUT} fontWeight="500">20 hrs / week</text>
        </g>
      )

    /* the standard moved inside the writing path */
    case 'documents':
      return (
        <g fill="none" strokeLinecap="round">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={64 + i * 16}
              y={44 + i * 12}
              width="150"
              height="164"
              rx="6"
              stroke={i === 2 ? ACC : MUT}
              strokeWidth={i === 2 ? 1.8 : 1}
              fill="var(--color-paper)"
              opacity={i === 2 ? 1 : 0.7}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="114"
              y1={90 + i * 22}
              x2={i === 1 ? 210 : i === 3 ? 178 : 232}
              y2={90 + i * 22}
              stroke={MUT}
              strokeWidth="2"
            />
          ))}
          <circle cx="286" cy="128" r="26" stroke={ACC} strokeWidth="1.6" />
          <path className="wv-draw" d="M275 128 l8 9 15-18" stroke={ACC} strokeWidth="2.4" />
          <text x="252" y="182" fontSize="9" fill={MUT} fontWeight="500">200+ types</text>
        </g>
      )

    default:
      return <g />
  }
}
