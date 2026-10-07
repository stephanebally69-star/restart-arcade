'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, Phone, Power, X } from 'lucide-react'
import { site } from '@/lib/site'
import { contactClick, ctaClick } from '@/lib/analytics'

type Item = { href: string; label: string; detail?: string }

/**
 * En-tête de l'accueil Panorama, d'après roche-bobois.com : menu à gauche, logo
 * au centre, devis à droite. Transparent tant que la scène photo occupe l'écran,
 * il passe sur fond clair dès qu'on la quitte. Le menu ouvre un panneau plein écran.
 */
export function PanoramaHeader({ audiences, collection }: { audiences: Item[]; collection: Item[] }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const stage = document.getElementById('panorama')
      setSolid(!stage || stage.getBoundingClientRect().bottom <= 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

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
      <header className="pano-header" data-solid={solid || undefined}>
        <a href="#contenu" className="pano-skip">
          Aller au contenu
        </a>
        <div className="pano-header__left">
          <button
            type="button"
            className="pano-header__menu"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="pano-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            <span>Menu</span>
          </button>
          <nav className="pano-header__nav" aria-label="Univers">
            {audiences.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Marque de la version Halo : pastille « marche » et nom en toutes lettres. */}
        <Link href="/" className="pano-logo" aria-label="RESTART, retour à l'accueil">
          <span className="pano-logo__pill" aria-hidden="true">
            <Power strokeWidth={2.5} />
          </span>
          RESTART
        </Link>

        <div className="pano-header__right">
          <Link href="/realisations/" className="pano-header__util">
            Réalisations
          </Link>
          <a
            href={`tel:${site.phoneE164}`}
            className="pano-header__util pano-header__phone"
            aria-label={`Appeler le ${site.phone}`}
            onClick={() => contactClick('phone', 'panorama_header')}
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
            <span>{site.phone}</span>
          </a>
          <Link
            href="/contact/"
            className="pano-header__cta"
            onClick={() => ctaClick('Devis gratuit', 'panorama_header')}
          >
            Devis gratuit
          </Link>
        </div>
      </header>

      <div
        id="pano-menu"
        className="pano-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open || undefined}
        inert={!open}
      >
        <div className="pano-menu__bar">
          <button ref={closeRef} type="button" className="pano-header__menu" onClick={() => setOpen(false)}>
            <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            <span>Fermer</span>
          </button>
        </div>
        <div className="pano-menu__grid" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          <div>
            <p className="pano-menu__title">Les collections</p>
            <ul className="pano-menu__big">
              {collection.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>
                    {c.label}
                    {c.detail && <small>{c.detail}</small>}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/produits/">Tous les jeux</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="pano-menu__title">Pour qui</p>
            <ul className="pano-menu__big">
              {audiences.map((a) => (
                <li key={a.href}>
                  <Link href={a.href}>
                    {a.label}
                    {a.detail && <small>{a.detail}</small>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="pano-menu__title">RESTART</p>
            <ul className="pano-menu__small">
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
            <p className="pano-menu__contact">
              <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
