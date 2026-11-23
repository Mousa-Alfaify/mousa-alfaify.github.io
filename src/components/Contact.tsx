import { useEffect, useState } from 'react'
import { useLang } from '../lib/lang-context'
import { contact, identity } from '../data/profile'
import { ui } from '../data/ui'
import { Container, Eyebrow, Lines, Section } from './Shell'
import { useRevealGroup } from '../hooks/useReveal'

export function Contact() {
  const { t, lang } = useLang()
  const ref = useRevealGroup<HTMLDivElement>()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${identity.email}`
    }
  }

  const channels = [
    { label: ui.contactLabels.linkedin, value: identity.linkedinLabel, href: identity.linkedin, ext: true },
    { label: ui.contactLabels.whatsapp, value: identity.phone, href: identity.whatsapp, ext: true },
    { label: ui.contactLabels.phone, value: identity.phone, href: `tel:${identity.phoneRaw}`, ext: false },
  ]

  return (
    <Section id="contact" block="contact" tone="bark" className="u-grain overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] start-[-10%] h-[70vw] max-h-[760px] w-[70vw] max-w-[760px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(140,185,212,0.16), rgba(140,185,212,0) 68%)',
        }}
      />
      <Container className="relative z-[2] py-24 lg:py-36">
        <div ref={ref}>
          <div className="reveal">
            <Eyebrow tone="bark">{t(contact.eyebrow)}</Eyebrow>
          </div>

          <h2
            className="reveal u-head mt-8 text-[clamp(2.4rem,8vw,5.6rem)]"
            style={{ ['--reveal-delay' as string]: '70ms', textWrap: 'balance' }}
          >
            <Lines text={t(contact.title)} />
          </h2>

          <p
            className="reveal u-lede mt-8 max-w-[46ch] text-[clamp(1.02rem,1.6vw,1.22rem)] text-bark-ink-2"
            style={{ ['--reveal-delay' as string]: '150ms' }}
          >
            {t(contact.lede)}
          </p>

          {/* primary action — the email, oversized and copyable */}
          <div
            className="reveal mt-12 flex flex-wrap items-center gap-x-5 gap-y-4"
            style={{ ['--reveal-delay' as string]: '220ms' }}
          >
            <a
              href={`mailto:${identity.email}`}
              className="group inline-flex items-center gap-4 rounded-full bg-paper px-7 py-4 text-ink transition-colors duration-300 hover:bg-accent-3 hover:text-bark-2"
            >
              <span className="u-lat text-[clamp(0.95rem,2vw,1.15rem)] font-bold">
                {identity.email}
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
              >
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-bark-line px-5 py-4 text-[0.85rem] font-medium text-bark-ink-2 transition-colors duration-300 hover:border-accent-3 hover:text-accent-3"
            >
              <span
                className="inline-block transition-transform duration-200"
                style={{ transform: copied ? 'scale(1.04)' : 'none' }}
              >
                {copied ? `✓ ${t(ui.contactLabels.copied)}` : t(ui.contactLabels.copy)}
              </span>
            </button>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
            {/* channels */}
            <ul className="reveal lg:col-span-7">
              {channels.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center justify-between gap-6 border-t border-bark-line py-5 transition-colors duration-300 hover:border-accent-3"
                  >
                    <span className="u-mono text-bark-ink-3">{t(c.label)}</span>
                    <span className="flex items-center gap-3">
                      <span
                        className="u-lat text-[0.98rem] font-medium text-bark-ink transition-colors duration-300 group-hover:text-accent-3"
                        dir="ltr"
                      >
                        {c.value}
                      </span>
                      <span
                        aria-hidden
                        className="text-bark-ink-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-3 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      >
                        <svg width="14" height="9" viewBox="0 0 16 10" fill="none">
                          <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-t border-bark-line" />
            </ul>

            {/* what you get */}
            <div className="reveal lg:col-span-5">
              <p className="u-mono mb-5 text-bark-ink-3">{t(ui.contactLabels.expect)}</p>
              <ul className="space-y-3.5">
                {contact.expect[lang].map((e, i) => (
                  <li key={i} className="flex gap-3.5 text-[0.94rem] leading-relaxed text-bark-ink-2">
                    <span aria-hidden className="mt-2.5 h-px w-3.5 shrink-0 bg-accent-3" />
                    <span>{e}</span>
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
