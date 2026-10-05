import type { Metadata } from 'next'
import { modelsFor, univers } from '@/data/catalogue'
import { universImage } from '@/data/images'
import type { AudiencePage } from '@/data/audiencePages'
import { ProductCard } from '@/components/ProductCard'
import { Block, BriefPoints, CtaBand, PageHero, PaperCard, RowList, SectionHeading } from '@/components/kit'
import { Faq, FinalCta } from '@/components/ui'

export const audienceMetadata = (page: AudiencePage): Metadata => ({
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `/${page.slug}/` },
  openGraph: { title: page.metaTitle, description: page.metaDescription, type: 'website', images: [page.photo] },
})

/**
 * Page d'un public (entreprises, bars et commerces, particuliers) : photo en
 * situation, usages, modèles conseillés, chaque famille vue pour ce public,
 * FAQ et devis. Mêmes briques que les pages univers, pour suivre le thème.
 */
export function AudiencePageView({ page }: { page: AudiencePage }) {
  const models = modelsFor(page.id)

  return (
    <>
      <PageHero
        crumbs={[{ href: `/${page.slug}/`, label: page.crumb }]}
        title={page.h1}
        visual={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.photo}
            alt={page.photoAlt}
            className="aspect-[16/9] w-full rounded-[28px] border border-border object-cover shadow-[var(--shadow-paper-md)]"
          />
        }
        brief={<BriefPoints items={page.brief} />}
      />

      <Block>
        <SectionHeading title={page.intro.title} />
        <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-4 text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          {page.intro.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="cards-dim mt-12 center-grid [--cols:4]">
          {page.uses.map((u, i) => (
            <PaperCard key={u.title} title={u.title} delayMs={(i % 4) * 100}>
              {u.text}
            </PaperCard>
          ))}
        </div>
      </Block>

      <Block>
        <SectionHeading
          title="Notre sélection pour vous"
          subtitle={`${models.length} modèles au prix affiché, livrés montés et installés partout en France.`}
        />
        <div className="mt-12 center-grid [--cols:3]">
          {models.map((m) => (
            <ProductCard key={m.sku} model={m} list={`audience_${page.id}`} />
          ))}
        </div>
      </Block>

      <CtaBand />

      <Block band>
        <SectionHeading
          title="Chaque famille, pensée pour vous"
          subtitle="Ce que chaque équipement apporte dans votre contexte. Chaque univers a sa page : modèles, prix et FAQ."
        />
        <RowList
          items={univers.map((u) => ({
            href: `/produits/${u.slug}/`,
            title: u.name,
            summary: u.benefits[page.id][0],
            image: universImage(u.slug),
          }))}
        />
      </Block>

      <section className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14">
        <Faq items={page.faq} title="Vos questions" />
      </section>

      <FinalCta title={page.cta.title} subtitle={page.cta.subtitle} />
    </>
  )
}
