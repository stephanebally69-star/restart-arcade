import type { Metadata } from 'next'
import Link from 'next/link'
import { allModels, univers } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { AnswerBox, Breadcrumbs, Eyebrow, JsonLd, Section } from '@/components/ui'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catalogue : bornes d’arcade, fléchettes, baby-foot, billards et flippers',
  description:
    "Tout le catalogue RESTART : 12 modèles de 899 € à 2 638,80 €, plus les billards, flippers numériques et cocons de repos sur devis. Personnalisation, livraison et installation incluses.",
  alternates: { canonical: '/produits/' },
}

export default function ProduitsPage() {
  return (
    <>
      <Section className="pb-8">
        <Breadcrumbs items={[{ href: '/produits/', label: 'Produits' }]} />
        <Eyebrow>Le catalogue</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl sm:text-5xl">
          Tout ce qu&apos;on peut installer chez vous
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fog">
          Douze modèles en vente directe, et quatre familles disponibles sur devis en achat ou en
          location. Tous personnalisables, tous livrés montés.
        </p>
        <div className="mt-8 max-w-3xl">
          <AnswerBox>
            Le catalogue RESTART compte 12 modèles au prix affiché : 5 bornes d&apos;arcade (899 € à
            2 478 €), 2 cibles de fléchettes électroniques (1 790 € et 2 638,80 €), 4 baby-foot
            (1 249 € à 2 199 €) et 1 fauteuil massant (1 558,80 €). Les billards, flippers numériques
            et cocons de repos sont proposés sur devis, à l&apos;achat comme en location.
          </AnswerBox>
        </div>
      </Section>

      <Section className="pt-4">
        <h2 className="font-display text-2xl">Par univers</h2>
        <div className="mt-6 flex flex-wrap gap-2">
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
      </Section>

      {univers
        .filter((u) => u.models.length > 0)
        .map((u) => (
          <Section key={u.slug} className="pt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-2xl sm:text-3xl">{u.name}</h2>
              <Link
                href={`/produits/${u.slug}/`}
                className="text-sm font-semibold text-cyan hover:underline"
              >
                Tout savoir sur {u.navLabel.toLowerCase()} →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {allModels
                .filter((m) => m.universSlug === u.slug)
                .map((m) => (
                  <ProductCard key={m.sku} model={m} list={`catalogue_${u.slug}`} />
                ))}
            </div>
          </Section>
        ))}

      <div className="border-t border-line-soft bg-surface">
        <Section>
          <h2 className="font-display text-2xl sm:text-3xl">Disponibles sur devis</h2>
          <p className="mt-3 max-w-2xl text-fog">
            Ces équipements sont configurés au cas par cas — dimensions de la pièce, monnayeur,
            habillage. Le devis est établi sous 48 heures.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {univers
              .filter((u) => u.quoteOnly)
              .map((u) => (
                <Link key={u.slug} href={`/produits/${u.slug}/`} className="card p-6">
                  <h3 className="font-display text-lg font-bold">{u.name}</h3>
                  <p className="mt-2 text-sm text-fog">{u.intro}</p>
                  <p className="mt-5 text-sm font-semibold text-cyan">Demander un devis →</p>
                </Link>
              ))}
          </div>
        </Section>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Catalogue RESTART',
          numberOfItems: allModels.length,
          itemListElement: allModels.map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.url}/produits/${m.universSlug}/${m.slug}/`,
            name: m.name,
          })),
        }}
      />
    </>
  )
}
