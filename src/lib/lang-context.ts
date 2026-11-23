import { createContext, useContext } from 'react'
import type { Bi, Lang } from '../data/types'

export interface LangCtx {
  lang: Lang
  dir: 'rtl' | 'ltr'
  t: (b: Bi) => string
  setLang: (l: Lang) => void
  toggle: () => void
}

export const LangContext = createContext<LangCtx | null>(null)

export function useLang(): LangCtx {
  const c = useContext(LangContext)
  if (!c) throw new Error('useLang must be used inside LangProvider')
  return c
}
