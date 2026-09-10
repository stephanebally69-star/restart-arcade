'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type ShowcaseItem = { image: string; label: string; detail?: string }

const STEP_MS = 3600

/**
 * Vitrine de hero : le produit mis en scène sur fond blanc éclairé, avec un
 * liseré et un halo à la couleur du thème, un compteur façon borne d'arcade
 * et des flèches. Défilement automatique, suspendu au survol et
 * désactivé si l'utilisateur réduit les animations.
 */
export function UniversShowcase({
  items,
  fit = 'contain',
}: {
  items: ShowcaseItem[]
  fit?: 'contain' | 'cover'
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = items.length

  useEffect(() => {
    if (paused || n < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, n])

  const current = items[active]
  if (!current) return null
  const go = (d: number) => setActive((i) => (i + d + n) % n)
  const pad = (x: number) => String(x).padStart(2, '0')
  const arrow =
    'absolute top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition hover:bg-black group-hover/vitrine:opacity-100 focus-visible:opacity-100'

  return (
    <div
      className="group/vitrine relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_30%_20%,color-mix(in_srgb,var(--primary)_35%,transparent),transparent_70%),radial-gradient(60%_60%_at_80%_90%,color-mix(in_srgb,var(--accent)_25%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border border-primary/25 bg-card shadow-[var(--shadow-paper-lg)]">
        <div className="relative bg-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/[0.06] to-transparent"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.image}
            src={current.image}
            alt={current.label}
            fetchPriority={active === 0 ? 'high' : undefined}
            className={`animate-showcase-in relative aspect-[16/10] w-full ${
              fit === 'cover' ? 'object-cover' : 'object-contain p-6'
            }`}
          />

          {n > 1 && (
            <span className="absolute left-4 top-4 rounded-md bg-black/80 px-2 py-1 font-mono text-[11px] font-semibold tracking-wider text-white">
              <span className="text-[color:var(--accent)]">{pad(active + 1)}</span> / {pad(n)}
            </span>
          )}

          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/80 px-3.5 py-1.5 text-xs text-white backdrop-blur">
            <span className="font-semibold">{current.label}</span>
            {current.detail && (
              <span className="font-semibold text-[color:var(--t-price)]">{current.detail}</span>
            )}
          </span>

          {n > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Précédent" className={`${arrow} left-3`}>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Suivant" className={`${arrow} right-3`}>
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}

          {n > 1 && !paused && (
            <span
              key={`bar-${active}`}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-primary"
              style={{ animation: `showcase-progress ${STEP_MS}ms linear` }}
            />
          )}
        </div>

      </div>
      <style>{`@keyframes showcase-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  )
}
