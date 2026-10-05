'use client'

import { useEffect } from 'react'

const TARGETS = '.card, .card-paper, .card-brand, .ox-glow'

/**
 * Halo qui suit le curseur à l'intérieur des cartes : un seul écouteur pour
 * toute la page, qui écrit la position dans --mx / --my de la carte survolée.
 * Le rendu du halo est en CSS (globals.css).
 */
export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(TARGETS) as HTMLElement | null
      if (!el) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onMove)
    }
  }, [])
  return null
}
