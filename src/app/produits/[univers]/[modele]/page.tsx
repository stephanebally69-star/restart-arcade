import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allModels, audiences, findModel, findUnivers, formatPrice } from '@/data/catalogue'
import { AnswerBox, Breadcrumbs, Eyebrow, Faq, JsonLd, Section } from '@/components/ui'
import { ViewItem } from '@/components/ViewItem'
import { site } from '@/lib/site'

type Props = { params: Promise<{ univers: string; modele: string }> }

export function generateStaticParams() {
  return allModels.map((m) => ({ univers: m.universSlug, modele: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { univers, modele } = await params
  const m = findModel(univers, modele)
  if (!m) return {}
  const price = m.price != null ? formatPrice(m.price) : 'sur devis'
  const title = `${m.name} — ${m.headline}`
  const description = `${m.name} : ${m.headline.toLowerCase()}. ${m.specs.slice(0, 3).join(', ')}. ${price}, livré monté et installé partout en France.`
  return {
    title,
    description,
    alternates: { canonical: `/produits/${m.universSlug}/${m.slug}/` },
    openGraph: { title, description, type: 'website' },
  }
}

export default async function ModelePage({ params }: Props) {
  const { univers: universSlug, modele } = await params
  const m = findModel(universSlug, modele)
  const u = findUnivers(universSlug)
  if (!m || !u) notFound()

  const siblings = allModels.filter((x) => x.universSlug === universSlug && x.slug !== m.slug)

  return (
    <>
      <ViewItem
        item={{
          item_id: m.sku,
          item_name: m.name,
          item_category: m.universSlug,
          price: m.price ?? undefined,
          quantity: 1,
        }}
      />

      <Section className="pb-10">
        <Breadcrumbs
          items={[
            { href: '/produits/', label: 'Produits' },
            { href: `/produits/${u.slug}/`, label: u.name },
            { href: `/produits/${u.slug}/${m.slug}/`, label: m.name },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-card border border-line-soft bg-linear-to-br from-surface-2 to-ink">
            <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
            <div
              className="absolute inset-0 grid place-items-center px-6 text-center font-display text-5xl font-bold text-line"
              aria-hidden="true"
            >
              {m.sku}
            </div>
            {m.highlight && (
              <span className="absolute left-4 top-4 rounded-full bg-neon px-3 py-1 text-xs font-semibold text-white">
                {m.highlight}
              </span>
            )}
          </div>

          <div>
            <Eyebrow>{u.name}</Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl">{m.name}</h1>
            <p className="mt-4 text-lg text-fog">{m.headline}</p>

            <p className="mt-8 font-display text-4xl font-bold text-cyan">
              {m.price != null ? formatPrice(m.price) : 'Sur devis'}
            </p>
            {m.price != null && (
              <p className="mt-1.5 text-sm text-fog">
                TTC, livraison et installation comprises. Paiement en 2x, 3x ou 4x possible.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact/?produit=${encodeURIComponent(m.sku)}`}
                className="rounded-xl bg-neon px-6 py-3.5 text-center font-semibold text-white transition hover:bg-neon/90"
              >
                Commander ou demander un devis
              </Link>
              <a
                href={`tel:${site.phoneE164}`}
                className="rounded-xl border border-line px-6 py-3.5 text-center font-semibold transition hover:border-fog"
              >
                {site.phone}
              </a>
            </div>

            <h2 className="mt-12 font-display text-lg font-bold">Caractéristiques</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {m.specs.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm text-fog">
                  <span className="mt-0.5 shrink-0 text-cyan" aria-hidden="true">
                    ✦
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-fog">
              Pour qui&nbsp;:{' '}
              {m.audiences.map((a) => audiences.find((x) => x.id === a)!.label).join(' · ')}
            </p>
          </div>
        </div>
      </Section>

      <div className="border-y border-line-soft bg-surface">
        <Section>
          <div className="max-w-3xl">
            <AnswerBox>
              Le {m.name} de RESTART est proposé à{' '}
              {m.price != null ? formatPrice(m.price) : 'un tarif sur devis'}. {m.headline}.
              Caractéristiques principales : {m.specs.slice(0, 4).join(', ').toLowerCase()}. Livré
              monté et installé partout en France depuis Villette-d&apos;Anthon (Isère).
            </AnswerBox>
          </div>
          <div className="mt-14 max-w-3xl">
            <Faq items={u.faq} title="Questions fréquentes" />
          </div>
        </Section>
      </div>

      {siblings.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl">Les autres modèles {u.name.toLowerCase()}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((s) => (
              <Link
                key={s.sku}
                href={`/produits/${s.universSlug}/${s.slug}/`}
                className="card p-5"
              >
                <h3 className="font-display text-base font-bold">{s.name}</h3>
                <p className="mt-2 text-sm text-fog">{s.headline}</p>
                <p className="mt-4 font-display font-bold text-cyan">
                  {s.price != null ? formatPrice(s.price) : 'Sur devis'}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `${site.url}/produits/${m.universSlug}/${m.slug}/#product`,
          name: m.name,
          sku: m.sku,
          description: `${m.headline}. ${m.specs.join(', ')}.`,
          category: u.name,
          brand: { '@type': 'Brand', name: 'RESTART' },
          url: `${site.url}/produits/${m.universSlug}/${m.slug}/`,
          additionalProperty: m.specs.map((s) => ({
            '@type': 'PropertyValue',
            name: 'Caractéristique',
            value: s,
          })),
          ...(m.price != null && {
            offers: {
              '@type': 'Offer',
              price: m.price,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              url: `${site.url}/produits/${m.universSlug}/${m.slug}/`,
              seller: { '@id': `${site.url}/#organization` },
              areaServed: { '@type': 'Country', name: 'France' },
            },
          }),
        }}
      />
    </>
  )
}
