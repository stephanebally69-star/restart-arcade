'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

/*
 * Carrousel d'accueil : une photo en situation par gamme RESTART. Diapositive
 * centrale large, voisines visibles et atténuées de chaque côté, lent zoom
 * façon caméra sur la photo active, pagination en pastille sous la scène.
 * Défilement automatique suspendu au survol, au focus clavier, sur demande
 * (bouton pause) et si l'utilisateur réduit les animations.
 */

export type HeroSlide = {
  slug: string
  image: string
  alt: string
  name: string
  title: string
  detail: string
  href: string
}

const STEP_MS = 7000

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [reduced, setReduced] = useState(false)
  const prevRel = useRef<number[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const playing = !hover && !stopped && !reduced
  useEffect(() => {
    if (!playing || n < 2) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => window.clearTimeout(t)
  }, [playing, active, n])

  const go = (d: number) => setActive((i) => (i + d + n) % n)
  // Position relative à la diapositive active : négatif à gauche, 0 au centre, positif à droite.
  const rel = slides.map((_, i) => {
    let r = (i - active + n) % n
    if (r > n / 2) r -= n
    return r
  })
  // Une diapositive qui passe d'un bord à l'autre se replace sans animation.
  const jumped = rel.map((r, i) => prevRel.current[i] !== undefined && Math.abs(r - prevRel.current[i]) > 1)
  useEffect(() => {
    prevRel.current = rel
  })

  const pad = (x: number) => String(x).padStart(2, '0')

  return (
    <div
      className="hs-stage"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      aria-roledescription="carrousel"
      aria-label="Les gammes RESTART"
    >
      <div className="hs-track">
        {slides.map((s, i) => {
          const r = rel[i]
          const isActive = r === 0
          return (
            <div
              key={s.slug}
              className={`hs-slide ${isActive ? 'is-active' : ''} ${jumped[i] ? 'no-anim' : ''} ${
                Math.abs(r) > 1 ? 'is-far' : ''
              }`}
              style={{ ['--rel' as string]: r }}
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${n} : ${s.name}`}
              aria-hidden={!isActive}
              onClick={isActive ? undefined : () => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                // Remontée à chaque activation : le zoom repart du début.
                key={isActive ? `on-${active}` : 'off'}
                src={s.image}
                alt={s.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
                className={`hs-photo ${isActive && playing ? '' : 'is-paused'}`}
              />
              {isActive && (
                <div className="hs-caption" key={`cap-${active}`}>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/75">
                      {pad(i + 1)} / {pad(n)} · {s.name}
                    </p>
                    <p className="mt-1 max-w-xl text-balance text-base font-semibold leading-snug tracking-tight text-white sm:mt-1.5 sm:text-[1.75rem] sm:leading-tight">
                      {s.title}
                    </p>
                    <p className="mt-1.5 hidden text-sm font-medium text-white/80 sm:block">{s.detail}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#141414] shadow-lg transition hover:bg-white/90 sm:h-10"
                  >
                    Voir la gamme
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
              {isActive && playing && (
                <span
                  key={`bar-${active}`}
                  aria-hidden="true"
                  className="hs-progress"
                  style={{ animationDuration: `${STEP_MS}ms` }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Gamme précédente" className="hs-btn">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <div className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 shadow-[var(--shadow-paper-sm)]">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir : ${s.name}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-foreground' : 'w-2 bg-foreground/25 hover:bg-foreground/45'
              }`}
            />
          ))}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? 'Relancer le défilement' : 'Mettre le défilement en pause'}
            className="inline-flex size-5 items-center justify-center text-foreground/70 transition hover:text-foreground"
          >
            {stopped ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Gamme suivante" className="hs-btn">
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {slides[active]?.name}
      </p>
    </div>
  )
}
