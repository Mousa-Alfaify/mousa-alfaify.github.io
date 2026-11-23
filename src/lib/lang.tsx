import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Bi, Lang } from '../data/types'
import { LangContext, type LangCtx } from './lang-context'

const STORAGE_KEY = 'ma-lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'ar'
  const url = new URLSearchParams(window.location.search).get('lang')
  if (url === 'en' || url === 'ar') return url
  const saved = window.localStorage?.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ar') return saved
  // Arabic is the primary edition; only a clearly non-Arabic browser starts in English.
  const nav = window.navigator.language?.toLowerCase() ?? 'ar'
  return nav.startsWith('ar') ? 'ar' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')

  // Deliberate: the build prerenders the Arabic edition, so the stored or
  // browser preference can only be applied once we are in the browser.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setLangState(initialLang())
  }, [])

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title =
      lang === 'ar'
        ? 'موسى الفيفي — حوكمة وذكاء تشغيلي'
        : 'Mousa Alfaify — Governance & Operational Intelligence'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        'content',
        lang === 'ar'
          ? 'موسى الفيفي — أخصائي رقابة عمليات في هيئة الهلال الأحمر السعودي. متخصص معتمد في الحوكمة والامتثال وإدارة المخاطر بثمان شهادات دولية، وخلفية تحليلية في القطاع الصحي. منفتح على فرص الحوكمة والمخاطر والتحول الرقمي.'
          : 'Mousa Alfaify — Operations Control Specialist at the Saudi Red Crescent Authority. A certified governance, risk and compliance specialist with 8 international credentials and deep analytical grounding in healthcare. Open to GRC, risk and digital transformation roles.',
      )
    }
    try {
      window.localStorage?.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable — language still applies for this visit */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), [])
  const t = useCallback((b: Bi) => b[lang], [lang])

  const value = useMemo<LangCtx>(
    () => ({ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', t, setLang, toggle }),
    [lang, t, setLang, toggle],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
