'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { WaveField, type FieldMode } from '@/components/WaveField'
import { site } from '@/lib/site'
import { ctaClick } from '@/lib/analytics'

export type HeroUnivers = {
  slug: string
  name: string
  count: string
  from: string
  line: string
  image?: string
}

const STEP_MS = 4800
const EQ = [0.55, 0.9, 0.4, 1, 0.65, 0.8, 0.35, 0.7, 0.5]

/**
 * Hero de l'accueil, d'après le « Digital Wave Field Hero » de HorizonX : une
 * grille de pixels pleine page qui réagit au curseur, un titre léger qui monte
 * ligne à ligne, et un panneau d'instrument qui fait défiler les univers.
 */
export function PixelHero({ items }: { items: HeroUnivers[] }) {
  const [mode, setMode] = useState<FieldMode>('demo')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = items.length

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, n])

  const u = items[active]
  const pad = (x: number) => String(x).padStart(2, '0')

  return (
    <section className="relative isolate -mt-16 overflow-hidden border-b border-border pt-16">
      <WaveField className="-z-20" onModeChange={setMode} />
      <div aria-hidden="true" className="ox-shade absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-7xl flex-col px-4 sm:px-8 lg:min-h-[max(720px,calc(100svh-2.5rem))]">
        <div className="grid flex-1 content-end items-end gap-12 pb-10 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div>
            <p className="ox-mono ox-fade flex flex-wrap items-center gap-x-3 gap-y-1 text-accent">
              <span>Arcade · Fléchettes · Baby-foot · Flippers</span>
              <span className="text-foreground/30" aria-hidden="true">
                ·
              </span>
              <span>Est lyonnais</span>
            </p>
            <h1 className="mt-6 text-[clamp(2.25rem,1rem+6vw,6.25rem)] font-light leading-[0.94] tracking-[-0.06em]">
              <span className="ox-line">
                <span style={{ '--d': '80ms' } as CSSProperties}>Le jeu qui fait</span>
              </span>
              <span className="ox-line">
                <span style={{ '--d': '200ms' } as CSSProperties}>revenir les gens</span>
              </span>
              <span className="ox-line">
                <span
                  style={{ '--d': '320ms' } as CSSProperties}
                  className="bg-gradient-to-r from-heading/70 to-heading/25 bg-clip-text text-transparent"
                >
                  dans vos espaces.
                </span>
              </span>
            </h1>

            <div
              className="ox-fade mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12"
              style={{ '--d': '520ms' } as CSSProperties}
            >
              <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
                Bornes d&apos;arcade, fléchettes, baby-foot et flippers personnalisés à votre image,
                livrés montés et installés partout en France, en vente ou en location.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/contact/"
                  onClick={() => ctaClick('Demander un devis gratuit', 'hero')}
                  className="ox-btn ox-btn-lg"
                >
                  <span>Demander un devis</span>
                  <span aria-hidden="true">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
                <Link href="/produits/" className="ox-link">
                  Voir le catalogue
                </Link>
              </div>
            </div>
          </div>

          {/* --- Instrument : les univers défilent ------------------------ */}
          {u && (
            <aside
              aria-label="Nos univers"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="ox-fade relative border border-border bg-background/70 backdrop-blur-md"
              style={{ '--d': '700ms' } as CSSProperties}
            >
              <div className="ox-mono flex items-center justify-between border-b border-border px-5 py-3 text-muted-foreground">
                <span>
                  Univers / <span className="text-heading">{pad(active + 1)}</span>
                  <span className="text-foreground/30"> · {pad(n)}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-accent">
                  <span className="ox-led" aria-hidden="true" />
                  {mode === 'joueur' ? 'Joueur 1' : 'Mode démo'}
                </span>
              </div>

              <div className="flex items-end justify-between border-b border-border px-5 py-4">
                <span className="ox-eq" aria-hidden="true">
                  {EQ.map((h, i) => (
                    <i
                      key={i}
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * -0.23}s`,
                        animationDuration: `${1.1 + (i % 4) * 0.25}s`,
                      }}
                    />
                  ))}
                </span>
                <span className="ox-mono text-foreground/40">Live</span>
              </div>

              <Link
                key={u.slug}
                href={`/produits/${u.slug}/`}
                className="ox-swap group flex gap-4 border-b border-border px-5 py-5"
              >
                {u.image && (
                  <span className="product-shot inline-flex size-16 shrink-0 border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u.image} alt="" className="size-full object-contain p-1" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3 text-lg tracking-tight text-heading">
                    {u.name}
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 line-clamp-2 block font-mono text-[12px] leading-relaxed text-muted-foreground">
                    {u.line}
                  </span>
                </span>
              </Link>

              <dl key={`specs-${u.slug}`} className="ox-swap grid grid-cols-3 px-5 py-4">
                <div>
                  <dt className="ox-mono text-foreground/40">Modèles</dt>
                  <dd className="mt-1 font-mono text-[13px] text-heading">{u.count}</dd>
                </div>
                <div>
                  <dt className="ox-mono text-foreground/40">Prix</dt>
                  <dd className="mt-1 font-mono text-[13px] text-heading">{u.from}</dd>
                </div>
                <div>
                  <dt className="ox-mono text-foreground/40">Devis</dt>
                  <dd className="mt-1 font-mono text-[13px] text-heading">48 h</dd>
                </div>
              </dl>

              <div className="absolute inset-x-0 bottom-0 flex gap-1 px-5 pb-2" aria-hidden="true">
                {items.map((it, i) => (
                  <span key={it.slug} className="relative h-px flex-1 overflow-hidden bg-foreground/15">
                    {i < active && <span className="absolute inset-0 bg-accent" />}
                    {i === active && !paused && (
                      <span
                        key={`p-${active}`}
                        className="ox-progress absolute inset-0 bg-accent"
                        style={{ animationDuration: `${STEP_MS}ms` }}
                      />
                    )}
                    {i === active && paused && <span className="absolute inset-0 bg-accent" />}
                  </span>
                ))}
              </div>
            </aside>
          )}
        </div>

        <div className="ox-mono flex items-center justify-between gap-4 border-t border-border py-4 text-foreground/45">
          <span>
            {site.address.lat.toFixed(4)}° N / {site.address.lng.toFixed(4)}° E
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <span className="text-accent" aria-hidden="true">
              ↘
            </span>
            <span className="[@media(hover:none)]:hidden">Bougez le curseur pour faire vibrer la grille</span>
            <span className="hidden [@media(hover:none)]:inline">Touchez la grille pour la faire vibrer</span>
          </span>
          <span>Atelier · {site.address.city}</span>
        </div>
      </div>
    </section>
  )
}
