'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { logo, universImage } from '@/data/images'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'

const nav = [
  { href: '/realisations/', label: 'Réalisations' },
  { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
]

/** Heure de l'atelier, affichée comme sur un instrument (« 16:32 LYON »). */
function useLyonTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

/**
 * Header du gabarit Onde pixel : barre fine pleine largeur, liens en capitales
 * mono, statut et heure de l'atelier à droite. Transparente sur la grille du
 * hero, elle se fige sur fond noir flouté dès qu'on fait défiler. Mega-menu
 * Produits avec le visuel de chaque univers, panneau mobile pleine largeur.
 */
export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const time = useLyonTime()

  // Fermer les menus à chaque navigation, sinon ils restent ouverts sur mobile.
  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!productsOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setProductsOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [productsOpen])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href)
  const linkClass = (href: string) =>
    `relative py-1 transition hover:text-heading ${
      isActive(href)
        ? 'text-heading after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-accent'
        : ''
    }`
  const solid = scrolled || open || productsOpen

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-500 ${
        solid ? 'border-border bg-background/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Aller au contenu
      </a>

      <div
        ref={rootRef}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 md:gap-8"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="RESTART, retour à l'accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="RESTART" width={1350} height={498} className="h-8 w-auto md:h-9" />
        </Link>

        <nav
          className="ox-mono hidden items-center gap-6 whitespace-nowrap text-[12px] text-foreground/70 lg:flex"
          aria-label="Navigation principale"
        >
          <div>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls={panelId}
              onClick={() => setProductsOpen((v) => !v)}
              className={`inline-flex cursor-pointer items-center gap-1 uppercase ${linkClass('/produits/')}`}
            >
              Produits
              <ChevronDown
                className={`size-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {productsOpen && (
              <div
                id={panelId}
                className="ox-swap fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 font-sans normal-case tracking-normal shadow-[var(--shadow-paper-lg)] backdrop-blur-xl"
              >
                <ul className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-8 py-6 xl:grid-cols-7">
                  {univers.map((u, i) => (
                    <li key={u.slug}>
                      <Link
                        href={`/produits/${u.slug}/`}
                        className="ox-glow group relative flex h-full flex-col overflow-hidden border border-border bg-card p-1.5 transition"
                      >
                        <span className="product-shot block aspect-[4/3] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={universImage(u.slug)}
                            alt=""
                            loading="lazy"
                            className="size-full object-contain p-2 transition duration-300 group-hover:scale-105"
                          />
                        </span>
                        <span className="flex flex-1 flex-col gap-1 px-2.5 py-2.5">
                          <span className="font-mono text-[10px] text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-medium text-heading">{u.navLabel}</span>
                          <span className="text-xs text-muted-foreground">
                            {u.models.length > 0
                              ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                              : 'Sur devis'}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-border px-8 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-heading">Pas sûr du modèle ? On vous conseille.</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Audit de votre espace et devis gratuits, réponse sous 48 heures.
                    </p>
                  </div>
                  <Link href="/produits/" className="ox-btn shrink-0">
                    <span>Tout le catalogue</span>
                    <span aria-hidden="true">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={linkClass(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-5">
          <span className="ox-mono hidden items-center gap-2 text-muted-foreground min-[1680px]:inline-flex">
            <span className="ox-led" aria-hidden="true" />
            Devis sous 48 h
          </span>
          {time && (
            <span className="ox-mono hidden tabular-nums text-muted-foreground xl:inline">
              {time} Lyon
            </span>
          )}
          <a
            href={`tel:${site.phoneE164}`}
            onClick={() => contactClick('phone', 'header')}
            className="ox-mono hidden h-10 items-center gap-2 text-foreground/80 transition hover:text-heading xl:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <Link
            href="/contact/"
            onClick={() => ctaClick('Demander un devis', 'header')}
            className="ox-btn hidden h-10 text-sm sm:inline-flex [&>span:last-child]:w-10"
          >
            <span>Devis gratuit</span>
            <span aria-hidden="true">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-10 items-center justify-center border border-border text-foreground transition hover:border-accent lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="ox-swap fixed inset-x-0 top-16 z-30 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col px-4 py-4 sm:px-8" aria-label="Navigation mobile">
            <button
              type="button"
              aria-expanded={mobileProductsOpen}
              onClick={() => setMobileProductsOpen((v) => !v)}
              className="flex items-center justify-between border-b border-border py-4 text-left text-xl font-light tracking-tight text-heading"
            >
              Produits
              <ChevronDown
                className={`size-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {mobileProductsOpen && (
              <ul className="grid grid-cols-2 gap-2 border-b border-border py-3">
                {univers.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/produits/${u.slug}/`}
                      className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground transition hover:text-heading"
                    >
                      <span className="product-shot inline-flex size-9 shrink-0 border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={universImage(u.slug)} alt="" className="size-full object-contain p-0.5" />
                      </span>
                      {u.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-border py-4 text-xl font-light tracking-tight text-heading"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={() => contactClick('phone', 'menu_mobile')}
                className="inline-flex items-center justify-center gap-2 border border-input px-4 py-3 text-sm font-medium text-heading"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Appeler
              </a>
              <Link
                href="/contact/"
                onClick={() => ctaClick('Demander un devis', 'menu_mobile')}
                className="inline-flex items-center justify-center bg-accent px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                Devis gratuit
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
