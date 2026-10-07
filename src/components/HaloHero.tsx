'use client'

import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/site'
import { currentVersion, VERSION_EVENT, type VersionId } from '@/lib/version'

const SOURCES = {
  wide: { video: '/video/hero-halo-16x9.mp4', poster: '/video/hero-halo-16x9.jpg' },
  tall: { video: '/video/hero-halo-9x16.mp4', poster: '/video/hero-halo-9x16.jpg' },
}

/**
 * Hero de la version « Halo » : un film monté à partir de vraies vidéos, dans
 * une ambiance de fête : flipper, fléchettes, baby-foot, rires et verres qui
 * trinquent, en boucle sans couture. Le film occupe
 * tout l'écran et remonte sous l'en-tête (marge négative de la hauteur de
 * l'en-tête) ; rien ne s'y superpose, l'en-tête n'y montre que le logo.
 * Mouvement réduit : pas de lecture automatique, l'image fixe du plan large.
 */
export function HaloHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [version, setVersion] = useState<VersionId | null>(null)
  const [source, setSource] = useState<keyof typeof SOURCES>('wide')
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

  const active = version === 'halo'

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return
    if (reduced) {
      video.pause()
      return
    }
    video.play().catch(() => undefined)
  }, [active, reduced, source])

  const src = SOURCES[source]

  return (
    <section
      className="relative -mt-[76px] h-[100svh] min-h-[34rem] w-full overflow-hidden bg-[#141414] sm:-mt-20 md:max-h-[64rem]"
      aria-label="Film de présentation RESTART : flipper, fléchettes et baby-foot entre amis, dans une ambiance festive"
    >
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
        />
      )}

      {/* En haut, un voile clair garde le logo lisible pendant l'ouverture sombre du film ;
          en bas, le film se fond dans la page. */}
      <div aria-hidden="true" className="halo-veil-top pointer-events-none absolute inset-x-0 top-0 h-36" />
      <div aria-hidden="true" className="halo-veil-bottom pointer-events-none absolute inset-x-0 bottom-0 h-40" />
    </section>
  )
}
