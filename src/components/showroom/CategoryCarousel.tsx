'use client'

import Link from 'next/link'
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ctaClick } from '@/lib/analytics'

/** Vitesse du défilement continu, en pixels par seconde. */
const SPEED = 38
/** Durée du glissement déclenché par une flèche, en millisecondes. */
const STEP_MS = 650
/** Reprise du défilement après un geste au doigt, en millisecondes. */
const TOUCH_RESUME_MS = 2500

export type Category = { href: string; label: string; image: string; alt: string }

type Motion = {
  x: number
  v: number
  set: number
  paused: boolean
  drag: { id: number; startX: number; x0: number; moved: boolean } | null
  tween: { from: number; to: number; t0: number } | null
  justDragged: boolean
}

/**
 * Carrousel des gammes de poltronesofa.com : deux grandes photos par vue (une sur
 * mobile), titre en capitales sous chacune, flèches rondes blanches sur les bords.
 * Le ruban défile lentement et sans fin (la liste est doublée et rebouclée) ; il
 * ralentit jusqu'à l'arrêt au survol ou au focus, se tire à la souris ou au doigt,
 * et les flèches le font glisser d'une carte. Immobile si les animations sont réduites.
 */
export function CategoryCarousel({ items }: { items: Category[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const motion = useRef<Motion>({ x: 0, v: 0, set: 0, paused: false, drag: null, tween: null, justDragged: false })
  const resumeTimer = useRef<number>(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const m = motion.current
    const cruise = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : SPEED

    // Largeur d'un jeu de cartes : du premier original au premier doublon.
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined
      const copy = el.children[items.length] as HTMLElement | undefined
      if (first && copy) m.set = copy.offsetLeft - first.offsetLeft
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(el)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    const wrap = () => {
      if (m.set <= 0) return
      const shift = m.x >= m.set ? -m.set : m.x < 0 ? m.set : 0
      if (!shift) return
      m.x += shift
      if (m.tween) {
        m.tween.from += shift
        m.tween.to += shift
      }
      if (m.drag) m.drag.x0 += shift
    }

    let last = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const target = visible && !document.hidden && !m.paused && !m.drag ? cruise : 0
      // Accélère et freine en douceur plutôt que de démarrer ou s'arrêter net.
      m.v += (target - m.v) * Math.min(1, dt * 3)
      if (m.tween) {
        const k = Math.min(1, (now - m.tween.t0) / STEP_MS)
        m.x = m.tween.from + (m.tween.to - m.tween.from) * (1 - Math.pow(1 - k, 3))
        if (k === 1) m.tween = null
      } else if (!m.drag) {
        m.x += m.v * dt
      }
      wrap()
      el.style.transform = `translate3d(${-m.x}px, 0, 0)`
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      io.disconnect()
      window.clearTimeout(resumeTimer.current)
    }
  }, [items.length])

  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    const card = el?.children[0] as HTMLElement | undefined
    if (!el || !card) return
    const m = motion.current
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const base = m.tween ? m.tween.to : m.x
    m.v = 0
    m.tween = { from: m.x, to: base + dir * (card.offsetWidth + gap), t0: performance.now() }
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (!e.isPrimary || e.button !== 0) return
    const m = motion.current
    m.tween = null
    m.drag = { id: e.pointerId, startX: e.clientX, x0: m.x, moved: false }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const m = motion.current
    if (!m.drag || m.drag.id !== e.pointerId) return
    const dx = e.clientX - m.drag.startX
    if (!m.drag.moved && Math.abs(dx) > 6) {
      m.drag.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (m.drag.moved) m.x = m.drag.x0 - dx
  }

  const endDrag = (e: ReactPointerEvent<HTMLUListElement>) => {
    const m = motion.current
    if (!m.drag || m.drag.id !== e.pointerId) return
    m.justDragged = m.drag.moved
    m.drag = null
    if (e.pointerType !== 'mouse') {
      m.paused = true
      window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => (motion.current.paused = false), TOUCH_RESUME_MS)
    }
  }

  const pause = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse') motion.current.paused = true
  }
  const resume = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse') motion.current.paused = false
  }

  const arrow =
    'absolute top-[calc(50%-2.5rem)] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition hover:scale-105 md:inline-flex'

  const cards = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={() => (motion.current.paused = true)}
      onBlur={() => (motion.current.paused = false)}
    >
      <ul
        ref={trackRef}
        className="sr-track flex cursor-grab touch-pan-y select-none gap-4 px-4 will-change-transform active:cursor-grabbing sm:px-8 md:gap-8 lg:px-[78px]"
        aria-label="Nos gammes"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Un glisser ne doit pas ouvrir la gamme sous le curseur.
          if (motion.current.justDragged) {
            e.preventDefault()
            e.stopPropagation()
            motion.current.justDragged = false
          }
        }}
      >
        {cards.map((c, i) => {
          const copy = i >= items.length
          return (
            <li
              key={`${c.href}-${i}`}
              aria-hidden={copy || undefined}
              className="w-[86%] shrink-0 md:w-[calc((100%-2rem)/2)]"
            >
              <Link
                href={c.href}
                tabIndex={copy ? -1 : undefined}
                draggable={false}
                onClick={() => ctaClick(c.label, 'accueil_gammes')}
                className="group block"
              >
                <span className="block aspect-[3/2] overflow-hidden bg-[#283444]/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={copy ? '' : c.alt}
                    loading="lazy"
                    draggable={false}
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block pt-5 text-center text-[19px] font-bold uppercase leading-tight tracking-[0.06em] text-[#283444] md:text-[24px]">
                  {c.label}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-3 block h-[3px] w-10 bg-[#c4262e] transition-all duration-300 group-hover:w-20"
                />
              </Link>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Gammes précédentes"
        className={`${arrow} left-6 lg:left-[78px]`}
      >
        <ArrowLeft className="size-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Gammes suivantes"
        className={`${arrow} right-6 lg:right-[78px]`}
      >
        <ArrowRight className="size-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  )
}
