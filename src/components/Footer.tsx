'use client'

import Link from 'next/link'
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

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid size-8 place-items-center rounded-lg bg-neon text-sm text-white">
                R
              </span>
              RESTART
            </div>
            <p className="mt-3 text-sm text-fog">{site.tagline}</p>
            <div className="mt-4 flex gap-3">
              {(
                [
                  ['Facebook', site.socials.facebook],
                  ['Instagram', site.socials.instagram],
                  ['LinkedIn', site.socials.linkedin],
                ] as const
              ).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  rel="noopener noreferrer me"
                  target="_blank"
                  className="text-sm text-fog transition hover:text-chalk"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Produits">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-chalk">
              Produits
            </h2>
            <ul className="mt-4 space-y-2">
              {univers.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/produits/${u.slug}/`}
                    className="text-sm text-fog transition hover:text-chalk"
                  >
                    {u.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="L'entreprise">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-chalk">
              RESTART
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/qui-sommes-nous/" className="text-sm text-fog transition hover:text-chalk">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link href="/realisations/" className="text-sm text-fog transition hover:text-chalk">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-sm text-fog transition hover:text-chalk">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-sm text-fog transition hover:text-chalk">
                  Contact &amp; devis
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-chalk">
              Nous joindre
            </h2>
            {/* Bloc NAP : doit rester strictement identique au schema LocalBusiness. */}
            <address className="mt-4 space-y-2 text-sm not-italic text-fog">
              <p>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>
              <p>
                <a
                  href={`tel:${site.phoneE164}`}
                  onClick={() => contactClick('phone', 'footer')}
                  className="transition hover:text-chalk"
                >
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => contactClick('email', 'footer')}
                  className="transition hover:text-chalk"
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
                  className="transition hover:text-chalk"
                >
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fog">
            © {new Date().getFullYear()} RESTART. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-fog transition hover:text-chalk">
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
