import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allModels, audiences, findUnivers, univers } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { AnswerBox, Breadcrumbs, Eyebrow, Faq, JsonLd, Section } from '@/components/ui'
import { site } from '@/lib/site'

type Props = { params: Promise<{ univers: string }> }

export function generateStaticParams() {
  return univers.map((u) => ({ univers: u.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers: slug } = await params
  const u = findUnivers(slug)
  if (!u) return {}
  return {
    title: u.metaTitle,
    description: u.metaDescription,
    alternates: { canonical: `/produits/${u.slug}/` },
    openGraph: { title: u.metaTitle, description: u.metaDescription, type: 'website' },
  }
}

export default async function UniversPage({ params }: Props) {
  const { univers: slug } = await params
  const u = findUnivers(slug)
  if (!u) notFound()

  const models = allModels.filter((m) => m.universSlug === u.slug)
  const others = univers.filter((x) => x.slug !== u.slug).slice(0, 3)

  return (
    <>
      <div className="relative overflow-hidden border-b border-line-soft">
        <div className="absolute inset-0 glow-neon" aria-hidden="true" />
        <Section className="relative pb-10">
          <Breadcrumbs
            items={[
              { href: '/produits/', label: 'Produits' },
              { href: `/produits/${u.slug}/`, label: u.name },
            ]}
          />
          <Eyebrow>{u.navLabel}</Eyebrow>
          <h1 className="max-w-3xl font-display text-4xl sm:text-5xl">{u.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-fog">{u.intro}</p>
          <div className="mt-8 max-w-3xl">
            <AnswerBox>{u.answer}</AnswerBox>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="rounded-xl bg-neon px-6 py-3.5 text-center font-semibold text-white transition hover:bg-neon/90"
            >
              Demander un devis
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="rounded-xl border border-line px-6 py-3.5 text-center font-semibold transition hover:border-fog"
            >
              {site.phone}
            </a>
          </div>
        </Section>
      </div>

      {models.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl sm:text-3xl">
            {models.length} modèle{models.length > 1 ? 's' : ''} disponible
            {models.length > 1 ? 's' : ''}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <ProductCard key={m.sku} model={m} list={`univers_${u.slug}`} />
            ))}
          </div>
        </Section>
      )}

      {/* Les trois audiences cohabitent sur la même URL : c'est ce qui remplace
          les anciennes pages /xxx-particulier/ et /xxx-bars-commerces/. */}
      <div className="border-y border-line-soft bg-surface">
        <Section>
          <Eyebrow>Selon votre situation</Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl">
            Ce que {u.name.toLowerCase()} change concrètement
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.id} id={a.id} className="card p-6">
                <h3 className="font-display text-lg font-bold">{a.label}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-cyan">{a.short}</p>
                <ul className="mt-5 space-y-3">
                  {u.benefits[a.id].map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-fog">
                      <span className="mt-0.5 shrink-0 text-cyan" aria-hidden="true">
                        ✦
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="max-w-3xl">
          <Faq items={u.faq} title={`Questions fréquentes — ${u.name.toLowerCase()}`} />
        </div>
      </Section>

      <div className="border-t border-line-soft bg-surface">
        <Section>
          <h2 className="font-display text-2xl">À voir aussi</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/produits/${o.slug}/`} className="card p-5">
                <h3 className="font-display text-base font-bold">{o.name}</h3>
                <p className="mt-2 text-sm text-fog">{o.intro.split('.')[0]}.</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: u.h1,
          description: u.metaDescription,
          url: `${site.url}/produits/${u.slug}/`,
          about: { '@type': 'Thing', name: u.name },
          isPartOf: { '@id': `${site.url}/#website` },
        }}
      />
    </>
  )
}
