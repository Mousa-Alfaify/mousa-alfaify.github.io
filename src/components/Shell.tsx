import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useLang } from '../lib/lang-context'
import { Counter } from './Counter'
import type { Bi } from '../data/types'

export function Container({
  children,
  narrow = false,
  className = '',
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${className}`}
      style={{ maxWidth: narrow ? 'var(--shell-narrow)' : 'var(--shell)' }}
    >
      {children}
    </div>
  )
}

export function Eyebrow({
  children,
  className = '',
  tone = 'ink',
}: {
  children: ReactNode
  className?: string
  tone?: 'ink' | 'bark' | 'accent'
}) {
  const color =
    tone === 'bark' ? 'text-bark-ink-3' : tone === 'accent' ? 'text-accent' : 'text-ink-3'
  return (
    <span className={`u-mono inline-flex items-center gap-2.5 ${color} ${className}`}>
      <span aria-hidden className="inline-block h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  )
}

/** Renders a Bi string that may contain \n as intentional line breaks. */
export function Lines({ text }: { text: string }) {
  const parts = text.split('\n')
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className="block">
          {p}
        </span>
      ))}
    </>
  )
}

export function SectionTitle({
  text,
  as: Tag = 'h2',
  className = '',
  style,
}: {
  text: Bi
  as?: ElementType
  className?: string
  style?: CSSProperties
}) {
  const { t } = useLang()
  return (
    <Tag
      className={`u-head text-[clamp(2rem,5.2vw,3.9rem)] ${className}`}
      style={{ textWrap: 'balance', ...style }}
    >
      <Lines text={t(text)} />
    </Tag>
  )
}

export function Section({
  id,
  block,
  children,
  tone = 'paper',
  className = '',
  as: Tag = 'section',
}: {
  id?: string
  block: string
  children: ReactNode
  tone?: 'paper' | 'paper-2' | 'bark'
  className?: string
  as?: ElementType
}) {
  const bg =
    tone === 'bark'
      ? 'bg-bark text-bark-ink on-bark'
      : tone === 'paper-2'
        ? 'bg-paper-2 text-ink'
        : 'bg-paper text-ink'
  return (
    <Tag
      id={id}
      data-block={block}
      className={`relative isolate ${bg} ${className}`}
      style={{ scrollMarginTop: '5rem' }}
    >
      {children}
    </Tag>
  )
}

/**
 * A measured value. Prefix, number and suffix are one LTR run, so "+500" and
 * "99.2%" keep their shape inside right-to-left copy.
 */
export function MetricValue({
  metric,
  className = '',
  count = false,
}: {
  metric: { value: string; prefix?: string; suffix?: string }
  className?: string
  count?: boolean
}) {
  return (
    <span dir="ltr" className={`u-num inline-flex items-baseline ${className}`}>
      {metric.prefix && <span className="text-ink-4">{metric.prefix}</span>}
      {count ? <Counter value={metric.value} /> : <span>{metric.value}</span>}
      {metric.suffix && <span className="text-[0.62em] font-bold text-accent-2">{metric.suffix}</span>}
    </span>
  )
}
