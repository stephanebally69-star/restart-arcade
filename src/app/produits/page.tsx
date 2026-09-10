import type { Metadata } from 'next'
import Link from 'next/link'
import { allModels, univers } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { Reveal } from '@/components/Reveal'
import { UniversShowcase } from '@/components/UniversShowcase'
import {
  Block,
  CtaBand,
  Glow,
  PageHero,
  RowList,
  SectionHeading,
  VISUAL_CARD_CLASS,
} from '@/components/kit'
import { FinalCta, JsonLd } from '@/components/ui'
import { universImage } from '@/data/images'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catalogue : bornes d’arcade, fléchettes, baby-foot, billards et flippers',
  description:
    "Tout le catalogue RESTART : 12 modèles de 899 € à 2 638,80 €, plus les billards, flippers numériques et cocons de repos sur devis. Personnalisation, livraison et installation incluses.",
  alternates: { canonical: '/produits/' },
}

export default function ProduitsPage() {
  const showcase = univers.map((u) => ({
    image: universImage(u.slug)!,
    label: u.name,
    detail: u.models.length > 0 ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}` : 'Sur devis',
  }))

  return (
    <>
      <PageHero
        crumbs={[{ href: '/produits/', label: 'Produits' }]}
        title="Tout ce qu'on peut installer chez vous"
        visual={<UniversShowcase items={showcase} />}
        brief={
          <p>
            Le catalogue RESTART compte 12 modèles au prix affiché : 5 bornes d&apos;arcade (899 € à
            2 478 €), 2 cibles de fléchettes électroniques (1 790 € et 2 638,80 €), 4 baby-foot
            (1 249 € à 2 199 €) et 1 fauteuil massant (1 558,80 €). Billards, flippers numériques et
            cocons de repos sont proposés sur devis, à l&apos;achat comme en location.
          </p>
        }
      />

      {univers
        .filter((u) => u.models.length > 0)
        .map((u) => (
          <Block key={u.slug} id={u.slug}>
            <SectionHeading
              title={u.name}
              subtitle={
                <>
                  {u.intro.split('.')[0]}.{' '}
                  <Link href={`/produits/${u.slug}/`} className="text-accent hover:underline">
                    Tout savoir sur {u.navLabel.toLowerCase()} →
                  </Link>
                </>
              }
            />
            <div className="cards-dim mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {allModels
                .filter((m) => m.universSlug === u.slug)
                .map((m) => (
                  <ProductCard key={m.sku} model={m} list={`catalogue_${u.slug}`} />
                ))}
            </div>
          </Block>
        ))}

      <CtaBand />

      <Block>
        <SectionHeading
          title="Disponibles sur devis"
          subtitle="Dimensions de la pièce, monnayeur, habillage : ces équipements sont chiffrés sur mesure, devis sous 48 heures."
        />
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-3">
          {univers
            .filter((u) => u.quoteOnly)
            .map((u, i) => (
              <Reveal key={u.slug} delayMs={i * 120} className="h-full">
                <Link
                  href={`/produits/${u.slug}/`}
                  className={`${VISUAL_CARD_CLASS} h-full transition duration-300 hover:-translate-y-0.5`}
                >
                  <Glow />
                  <span className="mb-2 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={universImage(u.slug)}
                      alt={u.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="font-serif text-lg font-medium tracking-tight text-heading">
                    {u.name}
                  </span>
                  <span className="text-[13px] leading-snug text-foreground/65">{u.intro}</span>
                </Link>
              </Reveal>
            ))}
        </div>
      </Block>

      <Block band>
        <SectionHeading title="Parcourir par univers" />
        <RowList
          items={univers.map((u) => ({
            href: `/produits/${u.slug}/`,
            title: u.name,
            summary: u.intro.split('.')[0],
            image: universImage(u.slug),
          }))}
        />
      </Block>

      <FinalCta
        title="Vous hésitez entre deux modèles ?"
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
