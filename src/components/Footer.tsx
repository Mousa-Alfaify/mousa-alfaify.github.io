import { useLang } from '../lib/lang-context'
import { identity } from '../data/profile'
import { ui } from '../data/ui'
import { Container } from './Shell'

export function Footer() {
  const { t, lang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer data-block="footer" className="bg-bark-2 text-bark-ink on-bark">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 border-t border-bark-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="#home"
              dir="ltr"
              className="group inline-flex items-baseline leading-none"
              aria-label={lang === 'ar' ? 'MO — العودة إلى الأعلى' : 'MO — back to top'}
            >
              <span
                className="text-[2.6rem] font-black tracking-[-0.05em] transition-colors duration-300 group-hover:text-accent-3"
              >
                MO
              </span>
              <span
                aria-hidden
                className="ml-1.5 inline-block h-2 w-2 rounded-full bg-accent-3 transition-transform duration-500 group-hover:translate-y-[-6px]"
                style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
              />
            </a>
            <p className="mt-4 text-[0.95rem] font-medium text-bark-ink">
              {t(identity.fullName)}
            </p>
            <p className="mt-1 text-[0.85rem] text-bark-ink-3">{t(identity.location)}</p>
          </div>

          <div className="sm:text-end">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 sm:justify-end">
              <li>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[24px] items-center text-[0.85rem] text-bark-ink-2 transition-colors hover:text-accent-3"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={identity.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[24px] items-center text-[0.85rem] text-bark-ink-2 transition-colors hover:text-accent-3"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="u-lat inline-flex min-h-[24px] items-center text-[0.85rem] text-bark-ink-2 transition-colors hover:text-accent-3"
                >
                  {identity.email}
                </a>
              </li>
            </ul>
            <p className="u-mono mt-6 text-bark-ink-3">
              © <span className="u-num">{year}</span> {t(identity.name)} · {t(ui.rights)}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
