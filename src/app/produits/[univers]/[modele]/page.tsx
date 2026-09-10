import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allModels, audiences, findModel, findUnivers, formatPrice } from '@/data/catalogue'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { AnswerBox, Breadcrumbs, Eyebrow, Faq, FinalCta, JsonLd, Section } from '@/components/ui'
import { ProductGallery } from '@/components/ProductGallery'
import { productImage, productImages } from '@/data/images'
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

      <Section className="pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { href: '/produits/', label: 'Produits' },
            { href: `/produits/${u.slug}/`, label: u.name },
            { href: `/produits/${u.slug}/${m.slug}/`, label: m.name },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ProductGallery
            images={productImages(m.slug)}
            alt={`${m.name} — ${u.name} RESTART`}
            badge={m.highlight}
          />

          <div>
            <Eyebrow>{u.name}</Eyebrow>
            <h1 className="font-serif text-5xl font-normal leading-[1.02] tracking-[-0.025em] sm:text-6xl">
              {m.name}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">{m.headline}</p>

            <div className="mt-8 rounded-2xl border border-border bg-paper p-6">
              <p className="font-serif text-4xl text-indigo-900">
                {m.price != null ? formatPrice(m.price) : 'Sur devis'}
              </p>
              {m.price != null && (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  TTC, livraison et installation comprises. Paiement en 2x, 3x ou 4x possible.
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/contact/?produit=${encodeURIComponent(m.sku)}`}
                  className="btn-primary"
                >
                  Commander ou demander un devis
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a href={`tel:${site.phoneE164}`} className="btn-secondary">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </div>

            <h2 className="mt-10 font-serif text-2xl">Caractéristiques</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {m.specs.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Pour qui :</span>
              {m.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-cream-2 px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {audiences.find((x) => x.id === a)!.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-4xl px-6 py-24 md:py-28">
          <AnswerBox>
            Le {m.name} de RESTART est proposé à{' '}
            {m.price != null ? formatPrice(m.price) : 'un tarif sur devis'}. {m.headline}.
            Caractéristiques principales : {m.specs.slice(0, 4).join(', ').toLowerCase()}. Livré
            monté et installé partout en France depuis Villette-d&apos;Anthon (Isère).
          </AnswerBox>
          <div className="mt-16">
            <Faq items={u.faq} title="Questions fréquentes" />
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bg-cream-2">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Eyebrow>Même univers</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl">
              Les autres modèles <em>{u.name.toLowerCase()}</em>
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((s) => (
                <Link
                  key={s.sku}
                  href={`/produits/${s.universSlug}/${s.slug}/`}
                  className="card group flex flex-col overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImage(s.slug)}
                    alt={s.name}
                    loading="lazy"
                    className="product-shot aspect-4/3 w-full border-b border-border object-contain p-3"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg text-indigo-900">{s.name}</h3>
                    <p className="mt-1.5 flex-1 text-sm text-ink-soft">{s.headline}</p>
                    <p className="mt-4 font-serif text-xl text-indigo-900">
                      {s.price != null ? formatPrice(s.price) : 'Sur devis'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title="Envie de le voir "
        em="en vrai ?"
        subtitle="L'atelier de Villette-d'Anthon est ouvert sur rendez-vous : c'est souvent l'essai qui tranche entre deux modèles."
        primary={{ href: `/contact/?produit=${encodeURIComponent(m.sku)}`, label: 'Demander un devis' }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `${site.url}/produits/${m.universSlug}/${m.slug}/#product`,
          name: m.name,
          sku: m.sku,
          image: productImages(m.slug).map((src) => `${site.url}${src}`),
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
