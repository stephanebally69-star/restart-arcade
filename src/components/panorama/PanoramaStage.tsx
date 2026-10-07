'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import type { Chapter, Hotspot, Scene } from '@/data/panorama'
import { ctaClick, selectAudience } from '@/lib/analytics'

type Product = { slug: string; name: string; price: string; href: string }

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => t * t * (3 - 2 * t)

/** Photo plein cadre : recadrée comme un `object-fit: cover`, mais les points produits restent sur leur objet. */
function Frame({ scene, children, priority }: { scene: Scene; children?: React.ReactNode; priority?: boolean }) {
  const style = { '--ar': scene.ratio, '--fx': scene.focus[0], '--fy': scene.focus[1] } as CSSProperties
  return (
    <div className="pano-frame" style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={scene.image}
        alt={scene.alt}
        className="pano-photo"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {children}
    </div>
  )
}

/**
 * Hero de la version Panorama : la pièce où se trouve tout ce que vend RESTART,
 * en plein écran, puis trois scènes qui la recouvrent au fil du défilement
 * (bar, entreprise, maison). La scène reste collée à l'écran ; le défilement
 * ne fait qu'avancer l'enchaînement. Les valeurs d'animation passent par des
 * variables CSS écrites directement sur les calques, sans rendu React par image.
 */
export function PanoramaStage({
  room,
  chapters,
  products,
}: {
  room: Scene & { hotspots: Hotspot[] }
  chapters: Chapter[]
  products: Product[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const layers = useRef<(HTMLDivElement | null)[]>([])
  const copies = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const steps = chapters.length

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = -1

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = clamp(-rect.top / Math.max(1, travel)) * steps
      const curve = reduce.matches ? (t: number) => (t < 0.5 ? 0 : 1) : ease

      // Calque k (k ≥ 1) : il monte par-dessus le précédent entre p = k - 0.8 et p = k - 0.2.
      const reveal = (k: number) => (k === 0 ? 1 : curve(clamp((p - (k - 1) - 0.2) / 0.6)))
      layers.current.forEach((el, k) => {
        if (!el) return
        el.style.setProperty('--in', String(reveal(k)))
        el.style.setProperty('--out', String(k < steps ? reveal(k + 1) : 0))
      })
      // Texte k : plein entre k - 0.25 et k + 0.25, éteint à 0.5 de distance.
      copies.current.forEach((el, k) => {
        if (!el) return
        const o = curve(clamp((0.5 - Math.abs(p - k)) / 0.25))
        el.style.setProperty('--o', String(o))
        el.style.visibility = o === 0 ? 'hidden' : 'visible'
      })
      section.style.setProperty('--p', String(p / steps))

      const now = Math.round(p)
      if (now !== last) {
        last = now
        setActive(now)
      }
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
  }, [steps])

  /** Amène le défilement sur la scène k. */
  const goTo = (k: number) => {
    const section = sectionRef.current
    if (!section) return
    const travel = section.offsetHeight - window.innerHeight
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: section.offsetTop + (travel * k) / steps, behavior: smooth ? 'smooth' : 'auto' })
  }

  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

  return (
    <section
      ref={sectionRef}
      id="panorama"
      className="pano-stage"
      style={{ '--scenes': steps + 1 } as CSSProperties}
      aria-label="La pièce RESTART, puis chaque univers"
    >
      <div className="pano-sticky">
        <div ref={(el) => void (layers.current[0] = el)} className="pano-layer pano-layer--room">
          <Frame scene={room} priority>
            <ul className="pano-hotspots" aria-label="Les équipements de la pièce">
              {room.hotspots.map((h) => {
                const product = bySlug[h.slug]
                if (!product) return null
                return (
                  <li key={h.slug} style={{ left: `${h.x}%`, top: `${h.y}%` }} className="pano-hotspot">
                    <Link href={product.href} className="pano-hotspot__link">
                      <span className="pano-hotspot__dot" aria-hidden="true" />
                      <span className="pano-hotspot__card">
                        <span className="pano-hotspot__name">{product.name}</span>
                        <span className="pano-hotspot__price">{product.price}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Frame>
        </div>
        {chapters.map((c, i) => (
          <div key={c.id} ref={(el) => void (layers.current[i + 1] = el)} className="pano-layer">
            <Frame scene={c} />
          </div>
        ))}

        <div className="pano-shade" aria-hidden="true" />

        <div ref={(el) => void (copies.current[0] = el)} className="pano-copy pano-copy--intro">
          <p className="pano-eyebrow">Billard · Baby-foot · Fléchettes · Fauteuil massant · Borne d&apos;arcade</p>
          <h1 className="pano-title">Transformez vos espaces avec RESTART</h1>
          <p className="pano-lead">
            Personnalisés à votre image, livrés montés, en vente ou en location.
          </p>
          <div className="pano-actions">
            <Link href="/contact/" className="pano-btn pano-btn--light" onClick={() => ctaClick('Demander un devis', 'panorama_hero')}>
              Demander un devis
            </Link>
            <button type="button" className="pano-btn pano-btn--ghost" onClick={() => goTo(1)}>
              Bar, entreprise ou maison
              <ArrowDown className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {chapters.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => void (copies.current[i + 1] = el)}
            className="pano-copy pano-copy--chapter"
            style={{ visibility: 'hidden' }}
          >
            <div className="pano-card">
              <p className="pano-card__count">
                <span>{String(i + 1).padStart(2, '0')}</span> / {String(steps).padStart(2, '0')}
              </p>
              <p className="pano-card__label">{c.label}</p>
              <h2 className="pano-card__title">{c.title}</h2>
              <p className="pano-card__text">{c.text}</p>
              <ul className="pano-card__points">
                {c.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <Link
                href={c.href}
                className="pano-link"
                onClick={() => selectAudience(c.audience, 'panorama_stage')}
              >
                Découvrir l&apos;univers {c.label.toLowerCase()}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}

        <nav className="pano-steps" aria-label="Univers">
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => goTo(i + 1)}
                  aria-current={active === i + 1 ? 'step' : undefined}
                  className="pano-step"
                >
                  <span className="pano-step__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pano-step__label">{c.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="pano-progress" aria-hidden="true">
          <span />
        </div>

        <button
          type="button"
          className="pano-cue"
          onClick={() => goTo(1)}
          data-hidden={active > 0 || undefined}
        >
          Faites défiler
          <span className="pano-cue__line" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
