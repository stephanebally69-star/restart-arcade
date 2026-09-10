'use client'

import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'

export type ShowcaseItem = { image: string; label: string; detail?: string }

const STEP_MS = 3600

/**
 * Visuel de hero des pages univers : un cadre navigateur (repris du gabarit
 * Solutions de Ma Belle Note) qui fait défiler les modèles de la gamme.
 * Défilement suspendu au survol et désactivé si l'utilisateur réduit les animations.
 */
export function UniversShowcase({
  items,
  url,
  fit = 'contain',
}: {
  items: ShowcaseItem[]
  url: string
  fit?: 'contain' | 'cover'
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % items.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, items.length])

  const current = items[active]
  if (!current) return null

  return (
    <div
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-paper-md)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#b3261e]/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-[#2f7d4f]/70" />
        </span>
        <span className="flex min-w-0 flex-1 justify-center">
          <span className="flex min-w-0 items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{url}</span>
          </span>
        </span>
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>

      <div className="relative bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.image}
          src={current.image}
          alt={current.label}
          fetchPriority={active === 0 ? 'high' : undefined}
          className={`animate-showcase-in aspect-[16/10] w-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-5'}`}
        />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/95 px-3.5 py-1.5 text-xs shadow-[var(--shadow-paper-sm)] backdrop-blur">
          <span className="font-semibold text-indigo-900">{current.label}</span>
          {current.detail && <span className="font-serif text-amber-700">{current.detail}</span>}
        </span>
      </div>

      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border bg-muted/60 p-3">
          {items.map((it, i) => (
            <button
              key={it.image}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Afficher ${it.label}`}
              aria-current={i === active}
              className={`relative shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${
                i === active ? 'border-indigo-900' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt=""
                loading="lazy"
                className={`size-14 ${fit === 'cover' ? 'object-cover' : 'object-contain p-1'}`}
              />
              {i === active && !paused && (
                <span
                  aria-hidden="true"
                  key={`bar-${active}`}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-900"
                  style={{ animation: `showcase-progress ${STEP_MS}ms linear` }}
                />
              )}
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes showcase-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  )
}
