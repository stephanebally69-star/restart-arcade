'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'

/**
 * Rythme du plateau, repris du modèle Turntable du studio de l'agence : chaque
 * produit reste SLOT secondes, s'efface en EXIT secondes en descendant dans le
 * plateau, et le suivant en remonte en ENTER secondes. Le plateau tourne en
 * continu et accélère pendant chaque changement.
 */
const SLOT = 4
const EXIT = 0.55
const ENTER = 0.75
const LEAD = 2
const BASE_SPEED = 36 // degrés par seconde
const BOOST = 72 // degrés ajoutés pendant un changement

const easeOut = (x: number) => 1 - (1 - x) ** 3
const easeIn = (x: number) => x ** 3

/** `height` : hauteur du produit en % de la scène, pour que chacun ait une taille juste. */
export type PlateauProduct = { name: string; image: string; height: number }

export function PlateauHero({ products }: { products: PlateauProduct[] }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const paused = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !products.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let last = performance.now()
    let t = LEAD
    let angle = 0
    let shown = 0
    const total = SLOT * products.length

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      // Version masquée (display: none) ou survol : rien à calculer.
      if (paused.current || !stage.offsetParent) return
      t += dt

      const tau = t % total
      const index = Math.floor(tau / SLOT)
      const local = tau - index * SLOT
      const reveal =
        local < ENTER ? easeOut(local / ENTER) : local > SLOT - EXIT ? 1 - easeIn((local - (SLOT - EXIT)) / EXIT) : 1
      const cutting = local < ENTER || local > SLOT - EXIT

      // Le plateau accélère en cloche pendant le changement de produit.
      let speed = BASE_SPEED
      if (cutting) {
        const p = local > SLOT - EXIT ? (local - (SLOT - EXIT)) / (EXIT + ENTER) : (EXIT + local) / (EXIT + ENTER)
        speed += (BOOST / (EXIT + ENTER)) * (Math.PI / 2) * Math.sin(Math.PI * p)
      }
      angle = (angle + speed * dt) % 360

      if (index !== shown) {
        itemRefs.current.forEach((el, i) => el?.classList.toggle('is-on', i === index))
        shown = index
      }
      const ring = cutting ? Math.sin(reveal * Math.PI) * 0.9 + 0.1 : 0
      stage.style.setProperty('--pl-angle', `${angle.toFixed(2)}deg`)
      stage.style.setProperty('--pl-sway', `${(Math.sin((angle * Math.PI) / 180) * 6).toFixed(2)}deg`)
      stage.style.setProperty('--pl-ring', ring.toFixed(3))
      stage.style.setProperty('--pl-reveal', reveal.toFixed(4))
      stage.style.setProperty('--pl-scan', cutting && reveal > 0.02 && reveal < 0.98 ? '1' : '0')
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [products.length])

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

        {/* Plateau tournant : les photos détourées montent du plateau puis y redescendent. */}
        <div
          ref={stageRef}
          className="pl-turntable relative mx-auto aspect-square w-full max-w-[560px]"
          role="img"
          aria-label={`Produits RESTART : ${products.map((p) => p.name).join(', ')}`}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div aria-hidden="true" className="pl-tt-light" />
          <div aria-hidden="true" className="pl-tt-platform">
            <div className="pl-tt-side" />
            <div className="pl-tt-disc">
              <div className="pl-tt-spin" />
            </div>
          </div>
          {products.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              aria-hidden="true"
              className={`pl-tt-item ${i === 0 ? 'is-on' : ''}`}
              style={{ height: `${p.height}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="pl-tt-photo" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading="lazy" decoding="async" className="pl-tt-reflect" />
              <span className="pl-tt-scan" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
