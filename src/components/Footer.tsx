'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, type LucideIcon } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { site } from '@/lib/site'
import { contactClick } from '@/lib/analytics'

type FooterLink = { href: string; label: string }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'RESTART',
    links: [
      { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
      { href: '/realisations/', label: 'Nos réalisations' },
      { href: '/blog/', label: 'Blog' },
      { href: '/contact/', label: 'Contact' },
    ],
  },
  {
    title: 'Produits',
    links: univers.map((u) => ({ href: `/produits/${u.slug}/`, label: u.navLabel })),
  },
  {
    title: 'Documentation légale',
    links: [
      { href: '/politique-de-cookies/', label: 'Politique de cookies' },
      { href: '/rgpd/', label: 'Politique de confidentialité' },
      { href: '/mentions-legales/', label: 'Mentions légales' },
      { href: '/cgv/', label: 'CGV' },
      { href: '/retractation/', label: 'Rétractation' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/contact/', label: 'Devis gratuit sous 48 h' },
      { href: '/entreprises/', label: 'Entreprises' },
      { href: '/bars-commerces/', label: 'Bars et commerces' },
      { href: '/particuliers/', label: 'Particuliers' },
    ],
  },
]

const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Facebook', href: site.socials.facebook, icon: Facebook },
  { label: 'Instagram', href: site.socials.instagram, icon: Instagram },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: Linkedin },
]

/**
 * Pied de page de la version Showroom, d'après poltronesofa.com : dégradé marine,
 * quatre colonnes centrées, pastilles blanches des réseaux, mentions de la société.
 */
export function Footer() {
  const c = site.company
  return (
    <footer className="bg-[linear-gradient(180deg,#0f1b23_0%,#283444_100%)] px-4 pb-10 pt-16 text-center text-white sm:px-8 md:pt-20">
      <div className="mx-auto grid max-w-[920px] grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-lg font-semibold leading-snug md:text-xl">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-medium text-white/80 transition hover:text-white md:text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <ul className="mt-14 flex items-center justify-center gap-4">
        {socials.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              rel="noopener noreferrer me"
              target="_blank"
              className="inline-flex size-[30px] items-center justify-center rounded-full bg-white text-[#0f1b23] transition hover:opacity-80"
            >
              <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      {/* Bloc NAP : doit rester strictement identique au schema LocalBusiness. */}
      <address className="mx-auto mt-12 max-w-3xl text-[12px] font-medium not-italic leading-[18px] text-white/55">
        {site.name}, {site.address.street}, {site.address.postalCode} {site.address.city} ·{' '}
        <a href={`tel:${site.phoneE164}`} onClick={() => contactClick('phone', 'footer')} className="hover:text-white">
          {site.phone}
        </a>{' '}
        ·{' '}
        <a href={`mailto:${site.email}`} onClick={() => contactClick('email', 'footer')} className="hover:text-white">
          {site.email}
        </a>
        <br />
        Exploité par {c.name}, {c.form} au capital de {c.capital}, {c.rcs}, TVA {c.vat}. Copyright ©{' '}
        {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </address>
    </footer>
  )
}
