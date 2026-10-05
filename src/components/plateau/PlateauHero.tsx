'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'

/** Durée d'affichage de chaque produit sur le plateau, en millisecondes. */
const SLIDE_MS = 3800

export type PlateauProduct = { name: string; image: string }

export function PlateauHero({ products }: { products: PlateauProduct[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(motion.matches)
    sync()
    motion.addEventListener('change', sync)
    return () => motion.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced || paused || products.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % products.length), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, products.length])

  return (
    <section className="pl-hero relative overflow-hidden">
      <div aria-hidden="true" className="pl-hero-glow" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        <div>
          <p aria-hidden="true" className="pl-display text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[4.9rem]">
            Transformez vos espaces avec RESTART
          </p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-pl-ink/60">
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
              className="inline-flex h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-pl-ink/75 transition hover:text-pl-ink"
            >
              Le catalogue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Plateau : les produits du catalogue, photos détourées, en fondu enchaîné. */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[560px]"
          role="img"
          aria-label={`Produits RESTART : ${products.map((p) => p.name).join(', ')}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div aria-hidden="true" className="pl-stage-light" />
          <div aria-hidden="true" className="pl-stage-floor" />
          {products.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.name}
              src={p.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`pl-stage-item ${i === index ? 'is-on' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
