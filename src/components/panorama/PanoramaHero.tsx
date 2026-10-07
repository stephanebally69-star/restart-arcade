'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { Chapter, Hotspot, Scene } from '@/data/panorama'
import { ctaClick } from '@/lib/analytics'

type Product = { slug: string; name: string; price: string; href: string }

/** Défile jusqu'à la section `id`, sans animation si l'utilisateur les réduit. */
export function scrollToSection(id: string) {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
}

/**
 * Hero de la version Panorama : la pièce où se trouve tout ce que vend RESTART,
 * en plein écran, avec un point sur chaque produit. En quittant l'écran, la
 * photo défile moins vite que la page (variable --s écrite au défilement).
 */
export function PanoramaHero({
  room,
  chapters,
  products,
}: {
  room: Scene & { hotspots: Hotspot[] }
  chapters: Chapter[]
  products: Product[]
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      el.style.setProperty('--s', String(Math.min(1, window.scrollY / el.offsetHeight)))
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
    }
  }, [])

  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]))
  const frameStyle = { '--ar': room.ratio, '--fx': room.focus[0], '--fy': room.focus[1] } as CSSProperties

  return (
    <section ref={ref} id="panorama" className="pano-hero" aria-label="La pièce RESTART">
      <div className="pano-hero__frame" style={frameStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt={room.alt} className="pano-photo" fetchPriority="high" decoding="async" />
        <ul className="pano-hotspots" aria-label="Les équipements de la pièce">
          {room.hotspots.map((h) => {
            const product = bySlug[h.slug]
            if (!product) return null
            return (
              <li
                key={h.slug}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="pano-hotspot"
                data-flip={h.x > 62 || undefined}
              >
                <Link href={product.href} className="pano-hotspot__link" aria-label={`${product.name}, ${product.price}`}>
                  <span className="pano-hotspot__dot" aria-hidden="true" />
                  <span className="pano-hotspot__card" aria-hidden="true">
                    <span className="pano-hotspot__body">
                      <span className="pano-hotspot__name">{product.name}</span>
                      <span className="pano-hotspot__price">{product.price}</span>
                    </span>
                    <span className="pano-hotspot__go">
                      <ArrowUpRight className="size-4" strokeWidth={2} />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pano-shade" aria-hidden="true" />

      <div className="pano-copy">
        <p className="pano-eyebrow">Billard · Baby-foot · Fléchettes · Flipper · Fauteuil massant · Borne d&apos;arcade</p>
        <h1 className="pano-title">Transformez vos espaces avec RESTART</h1>
        <p className="pano-lead">Personnalisés à votre image, livrés montés, en vente ou en location.</p>
        <div className="pano-actions">
          <Link
            href="/contact/"
            className="pano-btn pano-btn--light"
            onClick={() => ctaClick('Demander un devis', 'panorama_hero')}
          >
            Demander un devis
          </Link>
          <button type="button" className="pano-btn pano-btn--ghost" onClick={() => scrollToSection(chapters[0].id)}>
            Bar, entreprise ou maison
            <ArrowDown className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav className="pano-index" aria-label="Univers">
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="pano-index__item"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(c.id)
                }}
              >
                <span className="pano-index__n">{String(i + 1).padStart(2, '0')}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <button type="button" className="pano-cue" onClick={() => scrollToSection(chapters[0].id)}>
        Faites défiler
        <span className="pano-cue__line" aria-hidden="true" />
      </button>
    </section>
  )
}
