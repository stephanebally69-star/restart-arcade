'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, type LucideIcon } from 'lucide-react'
import { univers } from '@/data/catalogue'
import { logo } from '@/data/images'
import { site } from '@/lib/site'
import { contactClick } from '@/lib/analytics'

const legal = [
  { href: '/mentions-legales/', label: 'Mentions légales' },
  { href: '/cgv/', label: 'CGV' },
  { href: '/rgpd/', label: 'RGPD' },
  { href: '/politique-de-cookies/', label: 'Cookies' },
  { href: '/retractation/', label: 'Rétractation' },
]

const company = [
  { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
  { href: '/realisations/', label: 'Nos réalisations' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact & devis' },
]

const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Facebook', href: site.socials.facebook, icon: Facebook },
  { label: 'Instagram', href: site.socials.instagram, icon: Instagram },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: Linkedin },
]

const heading = 'ox-mono text-white/40'
const link = 'text-white/70 transition hover:text-accent'

/** Pied de page noir du gabarit Onde pixel : colonnes à filets, ligne d'instrument en bas. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.6fr_1.2fr_1fr_1.2fr] md:gap-12">
        <div className="space-y-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="RESTART" width={1350} height={498} className="h-10 w-auto" loading="lazy" />
          <p className="max-w-xs text-sm text-white/55">{site.tagline}</p>
          <ul className="flex items-center gap-2 pt-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer me"
                  target="_blank"
                  className="inline-flex size-10 items-center justify-center border border-white/10 text-white/70 transition hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="space-y-4 text-sm" aria-label="Produits">
          <p className={heading}>Produits</p>
          <ul className="space-y-2">
            {univers.map((u) => (
              <li key={u.slug}>
                <Link href={`/produits/${u.slug}/`} className={link}>
                  {u.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="space-y-4 text-sm" aria-label="L'entreprise">
          <p className={heading}>RESTART</p>
          <ul className="space-y-2">
            {company.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={link}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 text-sm">
          <p className={heading}>Nous joindre</p>
          {/* Bloc NAP : doit rester strictement identique au schema LocalBusiness. */}
          <address className="space-y-2 not-italic">
            <p>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <p>
              <a
                href={`tel:${site.phoneE164}`}
                onClick={() => contactClick('phone', 'footer')}
                className={link}
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                onClick={() => contactClick('email', 'footer')}
                className={link}
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={site.whatsapp}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => contactClick('whatsapp', 'footer')}
                className={link}
              >
                WhatsApp
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ox-mono mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-white/40 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            {site.address.lat.toFixed(4)}° N / {site.address.lng.toFixed(4)}° E
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} RESTART</p>
        </div>
      </div>
    </footer>
  )
}
