'use client'

import { useEffect, useState } from 'react'

export type FilmShot = { src: string; alt: string }

const SHOT_MS = 6000

/**
 * Bandeau plein écran en tête d'accueil, à la place du film de poltronesofa.com : les
 * photos en situation se succèdent en fondu, avec un lent travelling avant. Une seule
 * image fixe si l'utilisateur réduit les animations.
 */
export function HeroFilm({ shots }: { shots: FilmShot[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % shots.length), SHOT_MS)
    return () => window.clearInterval(id)
  }, [shots.length])

  return (
    <div className="sr-film relative h-[min(56.25vw,calc(100svh-7rem))] min-h-[300px] w-full overflow-hidden bg-[#283444]">
      {shots.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt={i === 0 ? s.alt : ''}
          aria-hidden={i === 0 ? undefined : true}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : undefined}
          className={`sr-film-shot absolute inset-0 size-full object-cover ${i === index ? 'is-on' : ''}`}
        />
      ))}
    </div>
  )
}
