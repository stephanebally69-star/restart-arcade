import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Briefcase, Check, Home, type LucideIcon, Store } from 'lucide-react'
import { allModels, audiences, findUnivers, formatPrice, univers, type Audience } from '@/data/catalogue'
import { blogPosts } from '@/data/blog'
import { productImage, universGallery, universImage } from '@/data/images'
import { Reveal } from '@/components/Reveal'
import { UniversShowcase, type ShowcaseItem } from '@/components/UniversShowcase'
import {
  ArticleRows,
  Block,
  BriefPoints,
  CtaBand,
  PageHero,
  RowList,
  SECTION_HEADING,
  SectionHeading,
} from '@/components/kit'
import { Faq, FinalCta, JsonLd } from '@/components/ui'
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

/*
 * Gabarit Studio : carte d'en-tête, vitrine des modèles, synthèse sur carte
 * sombre, cartes blanches qui s'estompent au survol, bandeau CTA, liste des
 * autres univers, articles, carte CTA finale.
 */

const VISUAL_CARD_CLASS =
  'ox-glow relative isolate flex flex-col gap-2 overflow-hidden border border-border bg-card p-2 pb-5'

const AUDIENCE_ICONS: Record<Audience, LucideIcon> = {
  entreprise: Briefcase,
  'bar-commerce': Store,
  particulier: Home,
}

/** Mots-clés qui rattachent un article de blog à un univers. */
const ARTICLE_KEYWORDS: Record<string, RegExp> = {
  'borne-arcade': /arcade/i,
  flechettes: /fl[ée]chette/i,
  'baby-foot': /baby-?foot/i,
  'fauteuil-massant': /massa|d[ée]tente|bien-[êe]tre/i,
  billard: /billard/i,
  'flipper-numerique': /flipper/i,
  'cocon-de-repos': /cocon|repos|sieste|r[ée]cup[ée]ration/i,
}

function articlesFor(slug: string) {
  const re = ARTICLE_KEYWORDS[slug]
  const text = (p: (typeof blogPosts)[number]) =>
    [p.title, p.description, ...p.blocks.map((b) => ('text' in b ? b.text : b.items.join(' ')))].join(
      ' ',
    )
  const matches = re ? blogPosts.filter((p) => re.test(text(p))) : []
  return (matches.length ? matches : blogPosts).slice(0, 4)
}

export default async function UniversPage({ params }: Props) {
  const { univers: slug } = await params
  const u = findUnivers(slug)
  if (!u) notFound()

  const models = allModels.filter((m) => m.universSlug === u.slug)
  const related = univers.filter((x) => x.slug !== u.slug)
  const articles = articlesFor(u.slug)

  // Puces courtes de l'encadré : gamme et prix, un avantage par cible, livraison.
  const priced = models.filter((m) => m.price != null).map((m) => m.price!)
  const briefPoints = [
    models.length === 0
      ? 'Sur devis, à l’achat comme en location'
      : priced.length > 1
        ? `${models.length} modèles, de ${formatPrice(Math.min(...priced))} à ${formatPrice(Math.max(...priced))}`
        : `${models.length} modèle à ${formatPrice(priced[0])}`,
    u.benefits.entreprise[0],
    u.benefits['bar-commerce'][0],
    'Livré monté et installé partout en France',
  ]

  const showcase: ShowcaseItem[] = models.length
    ? models.map((m) => ({
        image: productImage(m.slug)!,
        label: m.name,
        detail: m.price != null ? formatPrice(m.price) : 'Sur devis',
      }))
    : universGallery(u.slug).map((image, i) => ({ image, label: `${u.name} · visuel ${i + 1}` }))

  return (
    <>
      {/* --- Hero ------------------------------------------------------- */}
      <PageHero
        crumbs={[
          { href: '/produits/', label: 'Produits' },
          { href: `/produits/${u.slug}/`, label: u.name },
        ]}
        title={u.h1}
        visual={<UniversShowcase items={showcase} />}
        brief={<BriefPoints items={briefPoints} />}
      />

      {/* --- La gamme (cartes visuelles) ------------------------------- */}
      <section id="gamme" className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 md:py-14">
        <h2 className={SECTION_HEADING}>
          {models.length
            ? `${models.length} modèle${models.length > 1 ? 's' : ''}, livré${models.length > 1 ? 's' : ''} monté${models.length > 1 ? 's' : ''} et installé${models.length > 1 ? 's' : ''}`
            : 'Configuré sur mesure, chiffré sous 48 heures'}
        </h2>
        <div className="cards-dim mt-12 center-grid [--cols:3]">
          {models.length
            ? models.map((m, index) => (
                <Reveal key={m.sku} delayMs={(index % 3) * 120} className="h-full">
                  <Link
                    href={`/produits/${u.slug}/${m.slug}/`}
                    className={`${VISUAL_CARD_CLASS} h-full transition duration-300 hover:-translate-y-0.5`}
                  >
                    <span className="mb-2 flex h-48 items-center justify-center overflow-hidden rounded-[18px] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productImage(m.slug)}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-2"
                      />
                    </span>
                    <span className="flex items-baseline justify-between gap-3 px-3">
                      <span className="text-lg font-semibold tracking-tight text-heading">
                        {m.name}
                      </span>
                      <span className="text-base font-semibold text-[color:var(--t-price)]">
                        {m.price != null ? formatPrice(m.price) : 'Sur devis'}
                      </span>
                    </span>
                    <span className="px-3 text-[13px] leading-snug text-muted-foreground">{m.headline}</span>
                  </Link>
                </Reveal>
              ))
            : universGallery(u.slug).map((src, index) => (
                <Reveal key={src} delayMs={(index % 3) * 120} className={VISUAL_CARD_CLASS}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${u.name} RESTART, visuel ${index + 1}`}
                    loading="lazy"
                    className="h-56 w-full rounded-[18px] bg-white object-contain p-2"
                  />
                </Reveal>
              ))}
        </div>
      </section>

      {/* --- Selon votre situation ------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <h2 className={SECTION_HEADING}>Ce que ça change, selon votre situation</h2>
        <div className="cards-dim mt-12 center-grid [--cols:3]">
          {audiences.map((a, index) => {
            const Icon = AUDIENCE_ICONS[a.id]
            return (
              <Reveal
                key={a.id}
                delayMs={index * 120}
                className="card-paper flex cursor-default flex-col gap-3 rounded-[24px] p-6 transition duration-300 hover:-translate-y-0.5"
              >
                <div id={a.id} className="flex items-center gap-3">
                  <Icon className="size-6 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="font-serif text-lg font-medium tracking-tight">
                    {a.label}
                    <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                      {a.short}
                    </span>
                  </h3>
                </div>
                <ul className="space-y-2">
                  {u.benefits[a.id].map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                      <Check
                        className="mt-1 size-3.5 shrink-0 text-accent"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBand />

      {/* --- FAQ -------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
        <Faq items={u.faq} title={`Questions fréquentes : ${u.name.toLowerCase()}`} />
      </section>

      {/* --- Autres univers --------------------------------------------- */}
      <Block band>
        <SectionHeading
          title="Nos autres univers"
          subtitle="Tous personnalisables, tous livrés montés, et combinables dans un même espace."
        />
        <RowList
          items={related.map((o) => ({
            href: `/produits/${o.slug}/`,
            title: o.name,
            summary:
              o.models.length > 0
                ? `${o.models.length} modèle${o.models.length > 1 ? 's' : ''} · ${o.intro.split('.')[0]}`
                : `Sur devis · ${o.intro.split('.')[0]}`,
            image: universImage(o.slug),
          }))}
        />
      </Block>

      {/* --- Pour aller plus loin --------------------------------------- */}
      <Block>
        <SectionHeading
          title="Pour aller plus loin"
          subtitle="Nos guides sur le sujet, à lire avant de vous lancer."
        />
        <ArticleRows posts={articles} />
      </Block>

      <FinalCta
        title={`Un projet ${u.name.toLowerCase()} ? Parlons-en.`}
        subtitle="Décrivez votre espace : nous revenons vers vous sous 48 heures avec une proposition chiffrée, en achat comme en location."
      />

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
