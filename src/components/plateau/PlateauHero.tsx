'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'
import { VERSION_EVENT } from '@/lib/version'
import type { TurntableControl } from './three/Turntable3D'

/**
 * Plateau tournant en 3D (three.js) : un produit à la fois, en relief, posé
 * sur le disque qui tourne. Il pivote doucement pour montrer son volume, puis
 * s'efface et le suivant arrive d'un bond. Glisser à la souris ou au doigt le
 * fait tourner davantage ; le survol suspend le défilement.
 *
 * La scène est chargée à part, côté navigateur seulement : la page s'affiche
 * sans attendre three.js.
 */
const Turntable3D = dynamic(() => import('./three/Turntable3D'), { ssr: false })

export type PlateauProduct = { name: string; image: string; height: number; href: string; price: string }

export function PlateauHero({ products }: { products: PlateauProduct[] }) {
  const control = useRef<TurntableControl>({ hold: false, spin: 0 })
  const drag = useRef<{ x: number; t: number } | null>(null)
  const [index, setIndex] = useState(0)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const sync = () => setLight(document.documentElement.dataset.version === 'plateau-clair')
    sync()
    window.addEventListener(VERSION_EVENT, sync)
    return () => window.removeEventListener(VERSION_EVENT, sync)
  }, [])

  const onIndex = useCallback((i: number) => setIndex(i), [])
  const items = useMemo(() => products.map(({ name, image, height }) => ({ name, image, height })), [products])
  const current = products[index]

  return (
    <section className="pl-hero relative overflow-hidden">
      <div aria-hidden="true" className="pl-hero-glow" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-2 lg:pb-20">
        <div>
          <p aria-hidden="true" className="pl-display text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[4.9rem]">
            Transformez vos espaces
          </p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-pl-ink/60">
            Bornes d&apos;arcade, fléchettes, baby-foot, billards et flippers. Personnalisés à votre image, livrés montés et
            installés partout en France.
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

        <div className="mx-auto w-full max-w-[640px]">
          {/* Nom du produit de face, au-dessus du plateau. */}
          <div className="relative z-10 -mb-[3%] flex justify-center">
            <Link
              href={current.href}
              className="group inline-flex items-baseline gap-2.5 text-[17px] font-semibold text-pl-ink"
              aria-live="polite"
            >
              <span key={current.name} className="pl-caption">
                {current.name}
              </span>
              <span className="text-[14px] font-normal text-pl-gold">{current.price}</span>
              <ArrowRight
                className="size-4 self-center text-pl-ink/40 transition group-hover:translate-x-0.5 group-hover:text-pl-ink"
                aria-hidden="true"
              />
            </Link>
          </div>
          {/* Plateau : on le fait tourner en le glissant, le survol suspend le défilement. */}
          <div
            className="pl-stage relative aspect-[4/3] w-full cursor-grab active:cursor-grabbing"
            role="img"
            aria-label={`Plateau tournant en 3D : ${products.map((p) => p.name).join(', ')}`}
            onPointerEnter={() => (control.current.hold = true)}
            onPointerLeave={() => {
              control.current.hold = false
              drag.current = null
            }}
            onPointerDown={(e) => {
              drag.current = { x: e.clientX, t: e.timeStamp }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              const d = drag.current
              if (!d) return
              const dt = Math.max(8, e.timeStamp - d.t)
              // Vitesse du geste convertie en élan du plateau (degrés par seconde).
              control.current.spin = Math.max(-900, Math.min(900, ((e.clientX - d.x) / dt) * 1000 * 0.45))
              drag.current = { x: e.clientX, t: e.timeStamp }
            }}
            onPointerUp={() => {
              drag.current = null
              if (window.matchMedia('(hover: none)').matches) control.current.hold = false
            }}
          >
            <div aria-hidden="true" className="pl-stage-light" />
            <Turntable3D items={items} light={light} control={control} onIndex={onIndex} />
          </div>

        </div>
      </div>
    </section>
  )
}
