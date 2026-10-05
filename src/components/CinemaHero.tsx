'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Pause, Play, Snowflake } from 'lucide-react'
import { asset } from '@/lib/site'
import { currentVersion, VERSION_EVENT, type VersionId } from '@/lib/version'
import { ctaClick } from '@/lib/analytics'

/**
 * Repères du film (secondes), alignés sur le modèle BulletTime du studio de
 * l'agence (mbn-ads-agency/studio, `BEATS`). Si le film est re-rendu avec
 * d'autres temps, ces valeurs suivent.
 */
const FREEZE = { from: 1.66, to: 7.26 }
const SCENES = [
  { until: 9.2, label: 'Fléchettes électroniques', detail: '30 modes de jeu', href: '/produits/flechettes/' },
  { until: 14.2, label: 'Baby-foot', detail: 'Intérieur et extérieur', href: '/produits/baby-foot/' },
  { until: Infinity, label: 'Flipper numérique', detail: '500 tables en une', href: '/produits/flipper-numerique/' },
]

export type FreezeLine = { at: number; title: string; detail: string; href: string }

const SOURCES = {
  wide: { video: '/video/hero-cinema-16x9.mp4', poster: '/video/hero-cinema-16x9.jpg' },
  tall: { video: '/video/hero-cinema-9x16.mp4', poster: '/video/hero-cinema-9x16.jpg' },
}

/**
 * Hero de la version « Cinéma » (le H1 de la page reste celui, masqué, de
 * l'accueil ; le titre affiché ici en est la version visible) : le film du studio en fond, plein cadre dans
 * une grande carte arrondie. Pendant le gel de la fléchette, les produits
 * RESTART s'affichent un à un ; ensuite une étiquette nomme le jeu à l'écran.
 * Le texte vit dans le DOM (lisible et indexable), la vidéo n'est chargée que
 * si la version Cinéma est active. Mouvement réduit : pas de lecture
 * automatique, l'image du gel et la liste complète s'affichent.
 */
export function CinemaHero({ lines, closing }: { lines: FreezeLine[]; closing: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [version, setVersion] = useState<VersionId | null>(null)
  const [source, setSource] = useState<keyof typeof SOURCES>('wide')
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setVersion(currentVersion())
    const onVersion = (e: Event) => setVersion((e as CustomEvent<VersionId>).detail)
    window.addEventListener(VERSION_EVENT, onVersion)
    const tall = window.matchMedia('(max-aspect-ratio: 4/5)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setSource(tall.matches ? 'tall' : 'wide')
      setReduced(motion.matches)
    }
    sync()
    tall.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      window.removeEventListener(VERSION_EVENT, onVersion)
      tall.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

  const active = version === 'cinema'

  // Lecture pilotée par l'état : on ne lit que si la version est visible et que
  // le visiteur n'a pas demandé de mouvement réduit.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return
    if (reduced) {
      video.pause()
      return
    }
    video.play().catch(() => setPlaying(false))
  }, [active, reduced, source])

  // Les textes suivent le film à l'image près (timeupdate est trop espacé).
  useEffect(() => {
    if (!active || !playing) return
    let frame = 0
    const tick = () => {
      const video = videoRef.current
      if (video) setTime((prev) => (Math.abs(prev - video.currentTime) > 0.04 ? video.currentTime : prev))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, playing])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => undefined)
    else video.pause()
  }, [])

  const frozen = reduced || (time >= FREEZE.from && time < FREEZE.to)
  const lineVisible = (at: number) => (reduced ? true : frozen && time >= at)
  const closingVisible = reduced || (frozen && time >= FREEZE.to - 1.3)
  const scene = SCENES.find((s) => time < s.until) ?? SCENES[SCENES.length - 1]
  const showScene = !reduced && playing && !frozen && time > 0.6
  const src = SOURCES[source]

  return (
    <section className="mx-auto w-full max-w-[1400px] px-3 pb-6 sm:px-6" aria-label="Film de présentation RESTART">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#070606] text-white shadow-[0_40px_90px_-40px_rgba(17,17,17,0.55)] sm:rounded-[32px]">
        <div className="relative h-[min(86svh,46rem)] min-h-[34rem] w-full md:aspect-video md:h-auto md:max-h-[86svh] md:min-h-[30rem]">
          {active && (
            <video
              key={source}
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              src={asset(src.video)}
              poster={asset(src.poster)}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          )}

          {/* Lisibilité : voile en bas à gauche pour le titre, en haut à droite pour le gel. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.35)_38%,transparent_62%)] md:bg-[radial-gradient(ellipse_at_0%_100%,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.4)_42%,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(4,10,18,0.75)_0%,transparent_60%)] transition-opacity duration-500 ${
              frozen ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Gel : les produits RESTART, un par un. */}
          <div className={`absolute inset-x-0 top-0 justify-end p-5 sm:p-8 md:flex md:p-10 ${reduced ? 'hidden' : 'flex'}`}>
            <div className="w-full max-w-sm md:max-w-md">
              <p
                className={`cinema-fade mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cfe9ff] backdrop-blur-md ${
                  frozen ? 'is-on' : ''
                }`}
              >
                <Snowflake className="size-3.5" aria-hidden="true" />
                Le temps s&apos;arrête
              </p>
              <ul className="flex flex-col gap-2.5 md:gap-3">
                {lines.map((l) => (
                  <li key={l.title} className={`cinema-line ${lineVisible(l.at) ? 'is-on' : ''}`}>
                    <Link
                      href={l.href}
                      tabIndex={lineVisible(l.at) ? 0 : -1}
                      onClick={() => ctaClick(l.title, 'cinema_hero')}
                      className="group flex items-baseline justify-between gap-4 border-b border-white/15 pb-2"
                    >
                      <span className="text-lg font-semibold tracking-tight sm:text-xl text-white [text-shadow:0_0_24px_rgba(150,210,255,0.45)] md:text-[1.7rem]">
                        {l.title}
                      </span>
                      <span className="shrink-0 text-right text-[13px] text-white/70 md:text-sm">{l.detail}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={`cinema-line mt-4 hidden text-sm text-[#cfe9ff] md:block md:text-base ${closingVisible ? 'is-on' : ''}`}>
                {closing}
              </p>
            </div>
          </div>

          {/* Titre et appels à l'action, toujours visibles. */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 sm:p-8 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="max-w-xl">
              <div className={`transition-opacity duration-500 ${frozen && !reduced ? 'max-md:opacity-0 md:opacity-60' : ''}`}>
              <p className="mb-3 text-sm text-white/70">Fléchettes, baby-foot, flippers et bornes d&apos;arcade</p>
              <p
                aria-hidden="true"
                className="text-balance text-[2rem] font-semibold leading-[1.04] tracking-tight sm:text-[2.6rem] lg:text-[3.2rem]"
              >
                Le jeu qui fait revenir les gens dans vos espaces.
              </p>
              <p className="mt-3 max-w-lg text-base text-white/75 sm:text-lg">
                Personnalisés à votre image, livrés montés et installés partout en France, en vente
                ou en location.
              </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/contact/"
                  onClick={() => ctaClick('Demander un devis gratuit', 'cinema_hero')}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#111] transition hover:bg-white/90"
                >
                  Demander un devis gratuit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/produits/"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Le catalogue
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <Link
                href={scene.href}
                tabIndex={showScene ? 0 : -1}
                aria-hidden={!showScene}
                className={`cinema-fade inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-black/35 pl-4 pr-3 text-sm backdrop-blur-md transition hover:bg-black/50 ${
                  showScene ? 'is-on' : ''
                }`}
              >
                <span className="size-1.5 rounded-full bg-[#E7A64B]" aria-hidden="true" />
                <span className="font-semibold">{scene.label}</span>
                <span className="hidden text-white/65 sm:inline">{scene.detail}</span>
                <ArrowRight className="size-3.5 text-white/70" aria-hidden="true" />
              </Link>
              {active && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Mettre l'animation en pause" : "Lire l'animation"}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-md transition hover:bg-black/50"
                >
                  {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
