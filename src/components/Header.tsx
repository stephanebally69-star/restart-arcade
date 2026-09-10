'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
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

/**
 * Header « pilule » flottant, repris du layout Ma Belle Note : barre arrondie
 * translucide détachée du bord, mega-menu Produits pleine largeur avec le
 * visuel de chaque univers, panneau mobile en carte flottante.
 */
export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  // Fermer les menus à chaque navigation, sinon ils restent ouverts sur mobile.
  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

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
    `transition hover:text-foreground ${isActive(href) ? 'text-foreground' : ''}`

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-amber-200"
      >
        Aller au contenu
      </a>

      <div
        ref={rootRef}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 rounded-full border border-border/60 bg-background/90 pl-4 pr-2 shadow-[0_10px_30px_-14px_rgba(30,27,75,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 md:gap-8 md:pl-6 md:pr-3"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="RESTART — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="RESTART" width={1350} height={498} className="h-8 w-auto md:h-10" />
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex"
          aria-label="Navigation principale"
        >
          <div>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls={panelId}
              onClick={() => setProductsOpen((v) => !v)}
              className={`inline-flex cursor-pointer items-center gap-1 ${linkClass('/produits/')}`}
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
                className="fixed left-1/2 top-[4.75rem] z-40 w-[calc(100vw-1.5rem)] max-w-7xl -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-background shadow-[0_20px_60px_-20px_rgba(30,27,75,0.25)] sm:top-[5rem] sm:w-[calc(100vw-3rem)]"
              >
                <ul className="grid grid-cols-4 gap-3 p-5 xl:grid-cols-7">
                  {univers.map((u) => (
                    <li key={u.slug}>
                      <Link
                        href={`/produits/${u.slug}/`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-paper transition hover:border-indigo-900/25 hover:shadow-[var(--shadow-paper-md)]"
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
                        <span className="flex flex-1 flex-col gap-0.5 px-3 py-2.5">
                          <span className="text-sm font-medium text-foreground">{u.navLabel}</span>
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
                <div className="flex items-center justify-between gap-6 border-t border-border bg-cream-2/60 px-6 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      Pas sûr du modèle ? On vous conseille.
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Audit de votre espace et devis gratuits, réponse sous 48 heures.
                    </p>
                  </div>
                  <Link
                    href="/produits/"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-700 transition hover:gap-1.5"
                  >
                    Tout le catalogue
                    <ArrowRight className="size-3.5" aria-hidden="true" />
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

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <a
            href={`tel:${site.phoneE164}`}
            onClick={() => contactClick('phone', 'header')}
            className="hidden h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground transition hover:text-foreground xl:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <Link
            href="/contact/"
            onClick={() => ctaClick('Demander un devis', 'header')}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_14px_-4px_rgba(30,27,75,0.4)] transition hover:-translate-y-px hover:bg-indigo-800 sm:inline-flex"
          >
            Devis gratuit
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-cream-2 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="fixed left-3 right-3 top-[5.25rem] z-30 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-background/95 shadow-[0_20px_60px_-20px_rgba(30,27,75,0.25)] backdrop-blur sm:left-6 sm:right-6 sm:top-[6rem] lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-6 py-4 text-base" aria-label="Navigation mobile">
            <button
              type="button"
              aria-expanded={mobileProductsOpen}
              onClick={() => setMobileProductsOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-2 py-3 text-left text-foreground transition hover:bg-cream-2"
            >
              Produits
              <ChevronDown
                className={`size-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {mobileProductsOpen && (
              <ul className="mb-1 grid grid-cols-2 gap-2 border-l border-border pl-3">
                {univers.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/produits/${u.slug}/`}
                      className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition hover:bg-cream-2 hover:text-foreground"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={universImage(u.slug)}
                        alt=""
                        className="product-shot size-9 shrink-0 rounded-md border border-border object-contain p-0.5"
                      />
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
                className="rounded-md px-2 py-3 text-foreground transition hover:bg-cream-2"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={() => contactClick('phone', 'menu_mobile')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-input px-4 py-2.5 text-sm font-semibold text-ink"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Appeler
              </a>
              <Link
                href="/contact/"
                onClick={() => ctaClick('Demander un devis', 'menu_mobile')}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
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
