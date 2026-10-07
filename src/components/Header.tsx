'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, Phone, Power, X } from 'lucide-react'
import { audiences, findUnivers, formatPrice } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'

const audienceItems = (['bar-commerce', 'entreprise', 'particulier'] as const).map((id) => {
  const a = audiences.find((x) => x.id === id)!
  return { href: audiencePath(id), label: a.label, detail: a.short }
})

const collection = ['billard', 'baby-foot', 'flechettes', 'fauteuil-massant', 'borne-arcade'].map((slug) => {
  const u = findUnivers(slug)!
  const prices = u.models.flatMap((m) => (m.price != null ? [m.price] : []))
  return {
    href: `/produits/${slug}/`,
    label: u.name,
    detail: prices.length ? `dès ${formatPrice(Math.min(...prices))}` : 'Sur devis',
  }
})

/**
 * En-tête repris de la version Panorama : menu et publics à gauche, logo de la version
 * Halo au centre, réalisations, téléphone et devis à droite. Sur l'accueil il reste
 * transparent tant que le film occupe l'écran, puis passe sur fond crème ; ailleurs il
 * est d'emblée sur fond crème. « Menu » ouvre un panneau plein écran.
 */
export function Header() {
  const pathname = usePathname()
  // Sur l'accueil, transparent dès le premier rendu : le film est sous l'en-tête.
  const [solid, setSolid] = useState(pathname !== '/')
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => {
      const film = document.getElementById('showroom-film')
      setSolid(!film || film.getBoundingClientRect().bottom <= 88)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="sr-header" data-solid={solid || undefined}>
        <a href="#contenu" className="sr-skip">
          Aller au contenu
        </a>
        <div className="sr-header__left">
          <button
            type="button"
            className="sr-header__menu"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="sr-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            <span>Menu</span>
          </button>
          <nav className="sr-header__nav" aria-label="Pour qui">
            {audienceItems.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Marque de la version Halo : pastille « marche » et nom en toutes lettres. */}
        <Link href="/" className="sr-logo" aria-label="RESTART, retour à l'accueil">
          <span className="sr-logo__pill" aria-hidden="true">
            <Power strokeWidth={2.5} />
          </span>
          RESTART
        </Link>

        <div className="sr-header__right">
          <Link href="/realisations/" className="sr-header__util">
            Réalisations
          </Link>
          <a
            href={`tel:${site.phoneE164}`}
            className="sr-header__util sr-header__phone"
            aria-label={`Appeler le ${site.phone}`}
            onClick={() => contactClick('phone', 'header')}
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
            <span>{site.phone}</span>
          </a>
          <Link href="/contact/" className="sr-header__cta" onClick={() => ctaClick('Devis gratuit', 'header')}>
            Devis gratuit
          </Link>
        </div>
      </header>

      <div
        id="sr-menu"
        className="sr-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open || undefined}
        inert={!open}
      >
        <div className="sr-menu__bar">
          <button ref={closeRef} type="button" className="sr-header__menu" onClick={() => setOpen(false)}>
            <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            <span>Fermer</span>
          </button>
        </div>
        <div className="sr-menu__grid" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          <div>
            <p className="sr-menu__title">Les collections</p>
            <ul className="sr-menu__big">
              {collection.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>
                    {c.label}
                    <small>{c.detail}</small>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/produits/">Tous les jeux</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="sr-menu__title">Pour qui</p>
            <ul className="sr-menu__big">
              {audienceItems.map((a) => (
                <li key={a.href}>
                  <Link href={a.href}>
                    {a.label}
                    <small>{a.detail}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="sr-menu__title">RESTART</p>
            <ul className="sr-menu__small">
              <li>
                <Link href="/realisations/">Réalisations</Link>
              </li>
              <li>
                <Link href="/qui-sommes-nous/">Qui sommes-nous</Link>
              </li>
              <li>
                <Link href="/blog/">Blog</Link>
              </li>
              <li>
                <Link href="/contact/">Contact et devis</Link>
              </li>
            </ul>
            <p className="sr-menu__contact">
              <a href={`tel:${site.phoneE164}`} onClick={() => contactClick('phone', 'menu')}>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} onClick={() => contactClick('email', 'menu')}>
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
