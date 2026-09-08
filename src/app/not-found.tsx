import Link from 'next/link'
import { univers } from '@/data/catalogue'
import { Section } from '@/components/ui'

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section className="py-24 text-center">
      <p className="font-display text-6xl font-bold text-neon">404</p>
      <h1 className="mt-6 font-display text-3xl">Cette page n&apos;existe pas (ou plus).</h1>
      <p className="mx-auto mt-4 max-w-lg text-fog">
        Le site a été refondu : certaines anciennes adresses ont disparu. Voici les raccourcis les
        plus utiles.
      </p>
      <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
        {univers.map((u) => (
          <Link
            key={u.slug}
            href={`/produits/${u.slug}/`}
            className="rounded-full border border-line px-4 py-2 text-sm text-fog transition hover:border-cyan hover:text-chalk"
          >
            {u.navLabel}
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-neon px-6 py-3.5 font-semibold text-white transition hover:bg-neon/90"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact/"
          className="rounded-xl border border-line px-6 py-3.5 font-semibold transition hover:border-fog"
        >
          Nous contacter
        </Link>
      </div>
    </Section>
  )
}
