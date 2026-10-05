'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Power, type LucideIcon } from 'lucide-react'
import { univers } from '@/data/catalogue'
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

const heading = 'text-xs font-medium uppercase tracking-[0.12em] text-white/45'
const link = 'text-white/75 transition hover:text-white'

/** Pied de page sombre du gabarit Studio, posé en grande carte arrondie. */
export function Footer() {
  return (
    <footer className="px-3 pb-3 pt-10 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-night text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1.6fr_1.2fr_1fr_1.2fr] md:gap-12">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-white">
            <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#111]">
              <Power className="size-4.5" strokeWidth={2.5} />
            </span>
            RESTART
          </p>
          <p className="max-w-xs text-sm text-white/55">{site.tagline}</p>
          <ul className="flex items-center gap-2 pt-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer me"
                  target="_blank"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/75 transition hover:border-white/40 hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="space-y-3 text-sm" aria-label="Produits">
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

        <nav className="space-y-3 text-sm" aria-label="L'entreprise">
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

        <div className="space-y-3 text-sm">
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

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/45">
        <p>© {new Date().getFullYear()} RESTART. Tous droits réservés.</p>
        <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-white/45 transition hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </footer>
  )
}
