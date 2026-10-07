'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { logo } from '@/data/images'
import { site } from '@/lib/site'
import { contactClick } from '@/lib/analytics'

/** Navigation centrale en capitales : trois gammes phares et le catalogue, comme Canapés / Fauteuils. */
const nav = [
  { href: '/produits/borne-arcade/', label: "Bornes d'arcade" },
  { href: '/produits/baby-foot/', label: 'Baby-foot' },
  { href: '/produits/flechettes/', label: 'Fléchettes' },
  { href: '/produits/', label: 'Tous les jeux' },
]

/** Liens utilitaires à droite, à la place de « Nos Magasins · Mon Compte · Pays ». */
const utility = [
  { href: '/realisations/', label: 'Réalisations' },
  { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
  { href: '/contact/', label: 'Contact' },
]

/**
 * En-tête de la version Showroom, d'après poltronesofa.com : logo à gauche, gammes en
 * capitales au centre, petits liens utilitaires à droite, sur fond crème. Il reste
 * collé en haut de page ; un filet apparaît dès qu'on fait défiler.
 */
export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const isActive = (href: string) => (href === '/produits/' ? pathname === href : pathname.startsWith(href))

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#fffdfc] transition-shadow ${scrolled || open ? 'shadow-[0_1px_0_rgba(40,52,68,0.12)]' : ''}`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#283444] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Aller au contenu
      </a>

      <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-4 sm:px-8 md:h-[88px] lg:grid-cols-[1fr_auto_1fr] lg:px-16">
        <Link href="/" className="flex items-center justify-self-start" aria-label="RESTART, retour à l'accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="RESTART" width={1350} height={498} className="h-9 w-auto md:h-11" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`text-[15px] uppercase leading-6 text-[#283444] transition hover:opacity-100 xl:text-base ${isActive(n.href) ? 'opacity-100' : 'opacity-80'}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <ul className="hidden items-center gap-3 lg:flex">
            {utility.map((u) => (
              <li key={u.href}>
                <Link href={u.href} className="text-[12px] font-medium text-[#283444] hover:underline">
                  {u.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${site.phoneE164}`}
            onClick={() => contactClick('phone', 'header')}
            aria-label={`Appeler RESTART au ${site.phone}`}
            className="inline-flex size-9 items-center justify-center text-[#283444] transition hover:opacity-70"
          >
            <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-9 items-center justify-center text-[#283444] lg:hidden"
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-[#fffdfc] px-6 pb-10 pt-4 md:top-[88px] lg:hidden"
        >
          <nav aria-label="Navigation mobile">
            <p className="pb-2 pt-4 text-[12px] font-bold uppercase tracking-wider text-[#283444]/60">Produits</p>
            <ul className="border-t border-[#283444]/10">
              {univers.map((u) => (
                <li key={u.slug} className="border-b border-[#283444]/10">
                  <Link
                    href={`/produits/${u.slug}/`}
                    className="block py-3.5 text-[15px] uppercase text-[#283444]"
                  >
                    {u.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              {utility.map((u) => (
                <li key={u.href}>
                  <Link href={u.href} className="text-sm font-medium text-[#283444]">
                    {u.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact/"
              className="mt-8 flex h-12 items-center justify-center bg-[#c4262e] text-[12px] font-bold uppercase tracking-wide text-white"
            >
              Demander un devis gratuit
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
