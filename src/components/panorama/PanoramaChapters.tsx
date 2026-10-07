'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowRight, Check } from 'lucide-react'
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
export function PanoramaChapters({
  chapters,
  products,
}: {
  chapters: Chapter[]
  products: { slug: string; short: string; href: string }[]
}) {
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
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

  return (
    <div className="pano-chapters">
      {chapters.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          ref={(el) => void (refs.current[i] = el)}
          className="pano-ch"
          data-side={i % 2 === 0 ? 'left' : 'right'}
          data-tone={c.tone}
          aria-labelledby={`${c.id}-titre`}
        >
          <div className="pano-ch__text">
            <div className="pano-ch__head pano-in" style={d(0)}>
              <span className="pano-ch__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="pano-ch__tag">
                <strong>{c.label}</strong>
                <span>{c.short}</span>
              </span>
            </div>
            <h2 id={`${c.id}-titre`} className="pano-ch__title pano-in" style={d(1)}>
              {c.title}
            </h2>
            <p className="pano-ch__lead pano-in" style={d(2)}>
              {c.text}
            </p>
            <ul className="pano-ch__points pano-in" style={d(3)}>
              {c.points.map((pt) => (
                <li key={pt}>
                  <span className="pano-ch__tick" aria-hidden="true">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="pano-ch__scene pano-in" style={d(4)}>
              <p>Dans la scène</p>
              <ul>
                {c.products.map((slug) =>
                  bySlug[slug] ? (
                    <li key={slug}>
                      <Link href={bySlug[slug].href}>{bySlug[slug].short}</Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
            <div className="pano-ch__actions pano-in" style={d(5)}>
              <Link
                href={c.href}
                className="pano-ch__cta"
                onClick={() => selectAudience(c.audience, 'panorama_chapters')}
              >
                Découvrir l&apos;univers {c.label.toLowerCase()}
                <span className="pano-ch__cta-arrow" aria-hidden="true">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link href="/contact/" className="pano-ch__quote">
                Demander un devis
              </Link>
            </div>
          </div>
          <figure className="pano-ch__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt={c.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: `${c.focus[0] * 100}% ${c.focus[1] * 100}%` }}
            />
            <figcaption className="pano-ch__caption">{c.caption}</figcaption>
          </figure>
        </section>
      ))}
    </div>
  )
}
