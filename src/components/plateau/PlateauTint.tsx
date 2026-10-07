'use client'

import { useEffect, useRef } from 'react'

/**
 * Passage du noir au blanc piloté par le défilement : posé en tête de la zone
 * claire, il mesure sa position et écrit --pl-t (0 → 1) sur .pl-root. Le fond
 * de toute la page change alors de teinte d'un bloc, sans bande de dégradé :
 * la bascule commence quand la zone claire entre par le bas de l'écran et se
 * termine quand elle arrive vers la moitié de l'écran. Les règles qui s'en
 * servent sont dans globals.css (version Plateau sombre seulement).
 */
export function PlateauTint() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const zone = ref.current?.parentElement
    const root = zone?.closest<HTMLElement>('.pl-root')
    if (!zone || !root) return
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const x = Math.min(1, Math.max(0, (vh * 0.9 - zone.getBoundingClientRect().top) / (vh * 0.38)))
      root.style.setProperty('--pl-t', (x * x * (3 - 2 * x)).toFixed(4))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <span ref={ref} hidden />
}
