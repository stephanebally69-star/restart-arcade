import type { Metadata } from 'next'
import Link from 'next/link'
import { allModels, univers } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { ArrowRight } from 'lucide-react'
import { AnswerBox, Breadcrumbs, Eyebrow, FinalCta, JsonLd, Section, SectionTitle } from '@/components/ui'
import { universImage } from '@/data/images'
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
      <Section className="pb-12 pt-10 md:pt-14">
        <Breadcrumbs items={[{ href: '/produits/', label: 'Produits' }]} />
        <SectionTitle
          as="h1"
          eyebrow="Le catalogue"
          title="Tout ce qu'on peut "
          em="installer chez vous"
          subtitle="Douze modèles en vente directe, et trois familles disponibles sur devis en achat ou en location. Tous personnalisables, tous livrés montés."
        />
        <div className="mt-8 max-w-3xl">
          <AnswerBox>
            Le catalogue RESTART compte 12 modèles au prix affiché : 5 bornes d&apos;arcade (899 € à
            2 478 €), 2 cibles de fléchettes électroniques (1 790 € et 2 638,80 €), 4 baby-foot
            (1 249 € à 2 199 €) et 1 fauteuil massant (1 558,80 €). Les billards, flippers numériques
            et cocons de repos sont proposés sur devis, à l&apos;achat comme en location.
          </AnswerBox>
        </div>
        <nav aria-label="Univers" className="mt-10 flex flex-wrap gap-2">
          {univers.map((u) => (
            <Link
              key={u.slug}
              href={u.models.length > 0 ? `#${u.slug}` : `/produits/${u.slug}/`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-paper py-1 pl-1 pr-4 text-sm text-ink-soft shadow-[var(--shadow-paper-sm)] transition hover:border-indigo-900/30 hover:text-indigo-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={universImage(u.slug)} alt="" className="product-shot size-8 rounded-full border border-border object-contain" />
              {u.navLabel}
            </Link>
          ))}
        </nav>
      </Section>

      {univers
        .filter((u) => u.models.length > 0)
        .map((u, i) => (
          <section key={u.slug} id={u.slug} className={`scroll-mt-28 ${i % 2 === 0 ? 'bg-cream-2' : 'bg-cream'}`}>
            <div className="mx-auto w-full max-w-6xl px-6 py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>{u.models.length} modèle{u.models.length > 1 ? 's' : ''}</Eyebrow>
                  <h2 className="font-serif text-3xl md:text-4xl">{u.name}</h2>
                </div>
                <Link href={`/produits/${u.slug}/`} className="btn-secondary bg-paper">
                  Tout savoir sur {u.navLabel.toLowerCase()}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {allModels
                  .filter((m) => m.universSlug === u.slug)
                  .map((m) => (
                    <ProductCard key={m.sku} model={m} list={`catalogue_${u.slug}`} />
                  ))}
              </div>
            </div>
          </section>
        ))}

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <SectionTitle
            eyebrow="Configurés au cas par cas"
            title="Disponibles "
            em="sur devis"
            subtitle="Dimensions de la pièce, monnayeur, habillage : ces équipements sont chiffrés sur mesure. Le devis est établi sous 48 heures."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {univers
              .filter((u) => u.quoteOnly)
              .map((u) => (
                <Link key={u.slug} href={`/produits/${u.slug}/`} className="card group flex flex-col overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={universImage(u.slug)}
                    alt={u.name}
                    loading="lazy"
                    className="product-shot aspect-4/3 w-full border-b border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl text-indigo-900">{u.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">{u.intro}</p>
                    <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition group-hover:gap-1.5">
                      Demander un devis <ArrowRight className="size-3.5" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Vous hésitez entre "
        em="deux modèles ?"
        subtitle="Dites-nous où vous voulez installer : nous vous dirons ce qui fonctionne dans ce contexte, et ce qui ne fonctionne pas."
      />

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
