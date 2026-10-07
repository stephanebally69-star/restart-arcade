'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '@/data/panorama'
import { selectAudience } from '@/lib/analytics'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Les trois univers sous le hero : une grande photo collée au bord de l'écran
 * (environ 60 % de la largeur) et le texte de l'autre côté, en alternance
 * (texte à gauche, à droite, puis à gauche). L'entrée suit le défilement :
 * --p passe de 0 à 1 pendant que la section monte dans l'écran ; la photo
 * arrive d'en dessous, le texte glisse depuis son bord, ligne après ligne.
 */
export function PanoramaChapters({ chapters }: { chapters: Chapter[] }) {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      refs.current.forEach((el) => {
        if (!el) return
        // 0 quand le haut de la section touche le bas de l'écran, 1 quand il atteint 10 % de sa hauteur.
        const top = el.getBoundingClientRect().top
        el.style.setProperty('--p', clamp((vh - top) / (vh * 0.9)).toFixed(4))
      })
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  // Délai de chaque ligne de texte, en part de la progression : la photo part la première.
  const d = (n: number) => ({ '--d': 0.15 + n * 0.07 }) as CSSProperties

  return (
    <div className="pano-chapters">
      {chapters.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          ref={(el) => void (refs.current[i] = el)}
          className="pano-ch"
          data-side={i % 2 === 0 ? 'left' : 'right'}
          aria-labelledby={`${c.id}-titre`}
        >
          <div className="pano-ch__text">
            <p className="pano-ch__count pano-in" style={d(0)}>
              <span>{String(i + 1).padStart(2, '0')}</span> / {String(chapters.length).padStart(2, '0')}
            </p>
            <p className="pano-kicker pano-in" style={d(1)}>
              {c.label}
            </p>
            <h2 id={`${c.id}-titre`} className="pano-ch__title pano-in" style={d(2)}>
              {c.title}
            </h2>
            <p className="pano-ch__lead pano-in" style={d(3)}>
              {c.text}
            </p>
            <ul className="pano-ch__points pano-in" style={d(4)}>
              {c.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <Link
              href={c.href}
              className="pano-link pano-link--dark pano-in"
              style={d(5)}
              onClick={() => selectAudience(c.audience, 'panorama_chapters')}
            >
              Découvrir l&apos;univers {c.label.toLowerCase()}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="pano-ch__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt={c.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: `${c.focus[0] * 100}% ${c.focus[1] * 100}%` }}
            />
          </div>
        </section>
      ))}
    </div>
  )
}
