'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'

export type Category = { href: string; label: string; image: string; alt: string }

/**
 * Carrousel des gammes de poltronesofa.com : deux grandes photos par vue (une sur
 * mobile), légende en capitales sous chacune, flèches rondes blanches posées sur les
 * bords. Défilement natif avec accroche, les flèches avancent d'une carte.
 */
export function CategoryCarousel({ items }: { items: Category[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.clientWidth + gap), behavior: 'smooth' })
  }

  const arrow =
    'absolute top-[calc(50%-1.5rem)] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0 md:inline-flex'

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="sr-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 sm:px-8 md:gap-8 lg:px-[78px]"
        aria-label="Nos gammes"
      >
        {items.map((c) => (
          <li
            key={c.href + c.label}
            className="w-[86%] shrink-0 snap-start scroll-ml-4 sm:scroll-ml-8 md:w-[calc((100%-2rem)/2)] lg:scroll-ml-[78px]"
          >
            <Link
              href={c.href}
              onClick={() => ctaClick(c.label, 'accueil_gammes')}
              className="group block"
            >
              <span className="block aspect-[3/2] overflow-hidden bg-[#283444]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="block pt-3 text-center text-[15px] font-medium uppercase leading-[21px] text-[#283444] md:text-[16.8px]">
                {c.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={atStart}
        aria-label="Gammes précédentes"
        className={`${arrow} left-6 lg:left-[78px]`}
      >
        <ArrowLeft className="size-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={atEnd}
        aria-label="Gammes suivantes"
        className={`${arrow} right-6 lg:right-[78px]`}
      >
        <ArrowRight className="size-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  )
}
