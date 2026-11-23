import { useEffect, useState } from 'react'

export function useMedia(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback)

  // Deliberate: matchMedia only exists in the browser, so the first real value
  // can only be read after mount. The fallback covers the prerendered pass.
  useEffect(() => {
    const mq = window.matchMedia(query)
    // oxlint-disable-next-line react/set-state-in-effect
    setMatches(mq.matches)
    const on = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])

  return matches
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
export const useIsDesktop = () => useMedia('(min-width: 1024px)')
export const useIsCoarse = () => useMedia('(pointer: coarse)', true)
