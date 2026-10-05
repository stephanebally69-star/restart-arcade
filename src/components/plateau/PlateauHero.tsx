'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronRight, Pause, Play } from 'lucide-react'
import { asset } from '@/lib/site'
import { currentVersion, VERSION_EVENT, type VersionId } from '@/lib/version'
import { ctaClick } from '@/lib/analytics'

/**
 * Repères du film du plateau (modèle Turntable du studio de l'agence) : chaque
 * produit occupe SLOT secondes, et le film démarre LEAD secondes dans le premier.
 */
const SLOT = 4
const LEAD = 2

export type PlateauProduct = { name: string; detail: string; href: string }

export function PlateauHero({ products }: { products: PlateauProduct[] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [version, setVersion] = useState<VersionId | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setVersion(currentVersion())
    const onVersion = (e: Event) => setVersion((e as CustomEvent<VersionId>).detail)
    window.addEventListener(VERSION_EVENT, onVersion)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(motion.matches)
    sync()
    motion.addEventListener('change', sync)
    return () => {
      window.removeEventListener(VERSION_EVENT, onVersion)
      motion.removeEventListener('change', sync)
    }
  }, [])

  const active = version === 'plateau'

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active || reduced) return
    video.play().catch(() => setPlaying(false))
  }, [active, reduced])

  useEffect(() => {
    if (!active || !playing) return
    let frame = 0
    const tick = () => {
      const video = videoRef.current
      if (video && products.length) {
        const total = SLOT * products.length
        const i = Math.floor((((video.currentTime + LEAD) % total) + total) % total / SLOT)
        setIndex((prev) => (prev === i ? prev : i))
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, playing, products.length])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => undefined)
    else video.pause()
  }

  const current = products[index]

  return (
    <section className="pl-hero relative overflow-hidden">
      <div aria-hidden="true" className="pl-hero-glow" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        <div>
          <Link
            href="/produits/flipper-numerique/"
            className="pl-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] text-white/85 transition hover:text-white"
          >
            Nouveau : le flipper numérique, 500 tables en une
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Link>
          <p aria-hidden="true" className="pl-display mt-7 text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[4.9rem]">
            Le jeu qui fait revenir les gens
          </p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/60">
            Bornes d&apos;arcade, fléchettes, baby-foot, billards et flippers. Personnalisés à votre
            image, livrés montés et installés partout en France.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact/"
              onClick={() => ctaClick('Demander un devis', 'plateau_hero')}
              className="pl-btn-primary inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
            >
              Demander un devis
            </Link>
            <Link
              href="/produits/"
              className="inline-flex h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              Le catalogue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="pl-stage relative aspect-square w-full">
            {active ? (
              <video
                ref={videoRef}
                className="absolute inset-0 size-full object-cover"
                src={asset('/video/hero-plateau.mp4')}
                poster={asset('/video/hero-plateau.jpg')}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            ) : null}
          </div>
          <div className="relative -mt-10 flex flex-col items-center gap-3 sm:-mt-14">
            <p className="h-6 text-center text-sm text-white/55" aria-live="off">
              {current && !reduced ? (
                <Link key={current.name} href={current.href} className="pl-caption transition hover:text-white">
                  <span className="font-semibold text-white">{current.name}</span> · {current.detail}
                </Link>
              ) : (
                'Baby-foot, flipper, fléchettes, borne d’arcade, billard'
              )}
            </p>
            <div className="flex items-center gap-3">
              <ol className="flex items-center gap-1.5" aria-label="Produits présentés">
                {products.map((p, i) => (
                  <li key={p.name}>
                    <Link
                      href={p.href}
                      aria-label={p.name}
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        i === index && playing ? 'w-6 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  </li>
                ))}
              </ol>
              {active && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Mettre l'animation en pause" : "Lire l'animation"}
                  className="inline-flex size-7 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  {playing ? <Pause className="size-3" aria-hidden="true" /> : <Play className="size-3" aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
