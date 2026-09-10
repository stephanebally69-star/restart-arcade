import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@/components/Analytics'
import { ConsentBanner } from '@/components/ConsentBanner'
import { JsonLd } from '@/components/ui'
import { site } from '@/lib/site'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { fontVariables } from '@/lib/fonts'
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes } from '@/lib/themes'

/**
 * Applique le thème mémorisé avant le premier rendu, pour éviter un flash du
 * thème par défaut. Les valeurs viennent de nos données, jamais d'une saisie.
 */
const themeBootScript = `(function(){try{var q=new URLSearchParams(location.search).get('theme');var t=q||localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var m=${JSON.stringify(
  Object.fromEntries(themes.map((t) => [t.id, t.scheme])),
)};if(t&&m[t]){var d=document.documentElement;d.dataset.theme=t;d.dataset.scheme=m[t];if(q)localStorage.setItem(${JSON.stringify(THEME_STORAGE_KEY)},t);}}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RESTART — Bornes d'arcade, fléchettes et baby-foot personnalisés",
    template: '%s | RESTART',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: "RESTART — Bornes d'arcade, fléchettes et baby-foot personnalisés",
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  category: 'Loisirs et aménagement',
}

export const viewport = {
  themeColor: '#07061a',
  colorScheme: 'dark',
}

/**
 * Identité de l'organisation + établissement local.
 * Le NAP doit rester strictement aligné sur celui du footer et de la page contact :
 * une divergence entre schema et texte visible affaiblit le signal local.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      telephone: site.phoneE164,
      sameAs: [site.socials.facebook, site.socials.instagram, site.socials.linkedin],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#localbusiness`,
      name: site.name,
      parentOrganization: { '@id': `${site.url}/#organization` },
      url: site.url,
      telephone: site.phoneE164,
      email: site.email,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.address.lat,
        longitude: site.address.lng,
      },
      areaServed: site.areaServed.map((n) => ({ '@type': 'Place', name: n })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={fontVariables}
      data-theme={DEFAULT_THEME}
      data-scheme={themes.find((t) => t.id === DEFAULT_THEME)!.scheme}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <Analytics />
        <div className="surface-app flex min-h-screen flex-col">
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ConsentBanner />
        <ThemeSwitcher />
      </body>
    </html>
  )
}
