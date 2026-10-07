'use client'

import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { track } from '@/lib/analytics'

const FRAME_MS = 2400

/**
 * Moitié gauche du bandeau marine : sur poltronesofa.com, une vidéo derrière un gros
 * bouton lecture rouge. Ici le bouton lance le défilé des photos en situation, en
 * fondu ; un second clic le met en pause.
 */
export function PlayPanel({ photos, label }: { photos: string[]; label: string }) {
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), FRAME_MS)
    return () => window.clearInterval(id)
  }, [playing, photos.length])

  const toggle = () => {
    if (!playing) track('video_start', { video_title: label })
    setPlaying((p) => !p)
  }

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[#1d2733]">
      {photos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[#283444] transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-35'}`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Mettre en pause : ${label}` : `Lancer : ${label}`}
        className={`absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c4262e] text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:scale-105 md:size-20 ${playing ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : ''}`}
      >
        {playing ? (
          <Pause className="size-7 fill-current md:size-8" aria-hidden="true" />
        ) : (
          <Play className="ml-1 size-7 fill-current md:size-8" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
