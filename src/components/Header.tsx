'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { univers } from '@/data/catalogue'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'

const nav = [
  { href: '/produits/', label: 'Produits' },
  { href: '/realisations/', label: 'Réalisations' },
  { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
  { href: '/blog/', label: 'Blog' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  // Fermer le menu à chaque navigation, sinon il reste ouvert sur mobile.
  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-ink/85 backdrop-blur-md">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          aria-label="RESTART — accueil"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-neon text-sm text-white shadow-[0_0_18px_#ff2e8b66]">
            R
          </span>
          RESTART
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/produits/"
              aria-expanded={productsOpen}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                isActive('/produits/') ? 'text-chalk' : 'text-fog hover:text-chalk'
              }`}
            >
              Produits
            </Link>
            {productsOpen && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <ul className="rounded-xl border border-line bg-surface-2 p-2 shadow-2xl">
                  {univers.map((u) => (
                    <li key={u.slug}>
                      <Link
                        href={`/produits/${u.slug}/`}
                        className="block rounded-lg px-3 py-2 text-sm text-fog transition hover:bg-surface hover:text-chalk"
                      >
                        {u.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {nav.slice(1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                isActive(n.href) ? 'text-chalk' : 'text-fog hover:text-chalk'
              }`}
            >
              {n.label}
            </Link>
          ))}

          <a
            href={`tel:${site.phoneE164}`}
            onClick={() => contactClick('phone', 'header')}
            className="ml-2 rounded-lg px-3 py-2 text-sm text-fog transition hover:text-chalk"
          >
            {site.phone}
          </a>
          <Link
            href="/contact/"
            onClick={() => ctaClick('Demander un devis', 'header')}
            className="rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_#ff2e8b40] transition hover:bg-neon/90"
          >
            Devis gratuit
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="ml-auto rounded-lg border border-line p-2 lg:hidden"
        >
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="currentColor">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" fill="none" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" fill="none" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-line-soft bg-ink lg:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6" aria-label="Navigation mobile">
            <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wider text-fog">
              Nos produits
            </p>
            <ul className="grid grid-cols-2 gap-1 pb-4">
              {univers.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/produits/${u.slug}/`}
                    className="block rounded-lg px-3 py-2 text-sm text-fog transition hover:bg-surface-2 hover:text-chalk"
                  >
                    {u.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1 border-t border-line-soft pt-4">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block rounded-lg px-3 py-2 text-sm text-fog transition hover:bg-surface-2 hover:text-chalk"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={() => contactClick('phone', 'menu_mobile')}
                className="flex-1 rounded-lg border border-line px-4 py-3 text-center text-sm font-medium"
              >
                Appeler
              </a>
              <Link
                href="/contact/"
                onClick={() => ctaClick('Demander un devis', 'menu_mobile')}
                className="flex-1 rounded-lg bg-neon px-4 py-3 text-center text-sm font-semibold text-white"
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
