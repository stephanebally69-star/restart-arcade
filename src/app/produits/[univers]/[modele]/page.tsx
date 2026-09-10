import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allModels, audiences, findModel, findUnivers, formatPrice } from '@/data/catalogue'
import { Check } from 'lucide-react'
import { Faq, FinalCta, JsonLd } from '@/components/ui'
import { Block, CtaBand, Frame, PageHero, RowList, SectionHeading, BriefPoints } from '@/components/kit'
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
  const title = `${m.name} : ${m.headline}`
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

      <PageHero
        crumbs={[
          { href: '/produits/', label: 'Produits' },
          { href: `/produits/${u.slug}/`, label: u.name },
          { href: `/produits/${u.slug}/${m.slug}/`, label: m.name },
        ]}
        title={
          <>
            {m.name}
            <span className="mt-2 block text-xl font-normal text-muted-foreground sm:text-2xl">
              {m.headline}
            </span>
          </>
        }
        visual={
          <Frame>
            <ProductGallery
              images={productImages(m.slug)}
              alt={`${m.name}, ${u.name} RESTART`}
              badge={m.highlight}
              bare
            />
          </Frame>
        }
        briefLabel={m.price != null ? 'Prix TTC' : 'Sur devis'}
        brief={
          <>
            <p className="font-serif text-4xl text-white">
              {m.price != null ? formatPrice(m.price) : 'Sur devis'}
            </p>
            <p className="mt-1 text-xs text-amber-200/80">
              Livraison et installation comprises · paiement en 2x, 3x ou 4x
            </p>
            <div className="mt-5">
              <BriefPoints
                items={[
                  ...m.specs.slice(0, 3),
                  'Livré monté et installé partout en France',
                ]}
              />
            </div>
          </>
        }
        primary={{
          href: `/contact/?produit=${encodeURIComponent(m.sku)}`,
          label: 'Demander un devis',
        }}
        aside={
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Pour qui :</span>
            {m.audiences.map((a) => (
              <span
                key={a}
                className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium"
              >
                {audiences.find((x) => x.id === a)!.label}
              </span>
            ))}
          </div>
        }
      />

      <Block>
        <SectionHeading title="Caractéristiques" />
        <ul className="cards-dim mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {m.specs.map((s) => (
            <li key={s} className="card-paper flex items-center gap-3 rounded-2xl px-5 py-4 text-sm">
              <Check className="size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </Block>

      <CtaBand
        title="Envie de l'essayer avant de choisir ?"
        subtitle="L'atelier de Villette-d'Anthon est ouvert sur rendez-vous."
        primary={{ href: `/contact/?produit=${encodeURIComponent(m.sku)}`, label: 'Demander un devis' }}
        secondary={{ href: `/produits/${u.slug}/`, label: `Tous les modèles` }}
      />

      <section className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14">
        <Faq items={u.faq} title="Questions fréquentes" />
      </section>

      {siblings.length > 0 && (
        <Block band>
          <SectionHeading
            title={`Les autres modèles ${u.name.toLowerCase()}`}
            subtitle="Même univers, d'autres formats et d'autres budgets."
          />
          <RowList
            items={siblings.map((s) => ({
              href: `/produits/${s.universSlug}/${s.slug}/`,
              title: `${s.name} · ${s.price != null ? formatPrice(s.price) : 'Sur devis'}`,
              summary: s.headline,
              image: productImage(s.slug),
            }))}
          />
        </Block>
      )}

      <FinalCta
        title={`Le ${m.name} vous tente ? Parlons-en.`}
        subtitle="Nous revenons vers vous sous 48 heures avec une proposition chiffrée, options et personnalisation comprises."
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
