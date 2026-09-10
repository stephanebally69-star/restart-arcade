import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  Home,
  type LucideIcon,
  Phone,
  Store,
} from 'lucide-react'
import { allModels, audiences, findUnivers, formatPrice, univers, type Audience } from '@/data/catalogue'
import { blogPosts, readingTime } from '@/data/blog'
import { productImage, universGallery, universImage } from '@/data/images'
import { Reveal } from '@/components/Reveal'
import { UniversShowcase, type ShowcaseItem } from '@/components/UniversShowcase'
import { Breadcrumbs, Faq, JsonLd } from '@/components/ui'
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
 * Gabarit repris de la page « Réponses automatiques » de Ma Belle Note
 * (variante surface « app » du layout Solutions) : H1 pleine largeur, visuel
 * animé à gauche et encadré « En bref » indigo à droite, cartes paper qui
 * s'estompent au survol, bandeau CTA, liste des autres univers, articles,
 * carte CTA finale.
 */

const SECTION_HEADING =
  'mx-auto max-w-3xl text-balance text-center font-serif text-3xl font-medium tracking-tight md:text-4xl'

const VISUAL_CARD_CLASS =
  'relative isolate flex flex-col gap-3 overflow-hidden rounded-2xl border border-primary/16 bg-gradient-to-br from-primary/8 via-card to-card px-5 pb-6 pt-5 shadow-[var(--shadow-paper-md)]'

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
    <div className="surface-app">
      {/* --- Hero ------------------------------------------------------- */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-10 md:pb-10 md:pt-14">
        <Breadcrumbs
          items={[
            { href: '/produits/', label: 'Produits' },
            { href: `/produits/${u.slug}/`, label: u.name },
          ]}
        />

        <h1 className="mb-10 font-serif text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[clamp(2.25rem,4vw,3rem)]">
          {u.h1}
        </h1>

        <div className="grid items-start gap-10 lg:grid-cols-[65fr_35fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:order-2">
            <aside
              aria-label="En bref"
              className="card-brand w-full rounded-2xl px-6 py-6 text-sm leading-relaxed md:text-[15px]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-16 -z-10 size-40 rounded-full bg-accent/40 blur-3xl"
              />
              <ul className="flex flex-col gap-3">
                {briefPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 md:mt-1"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="mt-2 flex w-full flex-wrap items-center gap-3">
              <span className="relative inline-flex flex-1 overflow-hidden rounded-lg shadow-sm">
                <Link
                  href="/contact/"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  Demander un devis
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <span
                  aria-hidden="true"
                  className="cta-sheen pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
              </span>
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-card px-4 text-sm font-medium transition hover:bg-muted"
              >
                <Phone className="size-4" aria-hidden="true" />
                Appeler
              </a>
            </div>
          </div>

          <div className="relative lg:order-1">
            <UniversShowcase items={showcase} />
          </div>
        </div>
      </section>

      {/* --- La gamme (cartes visuelles) ------------------------------- */}
      <section id="gamme" className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 md:py-14">
        <h2 className={SECTION_HEADING}>
          {models.length
            ? `${models.length} modèle${models.length > 1 ? 's' : ''}, livré${models.length > 1 ? 's' : ''} monté${models.length > 1 ? 's' : ''} et installé${models.length > 1 ? 's' : ''}`
            : 'Configuré sur mesure, chiffré sous 48 heures'}
        </h2>
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.length
            ? models.map((m, index) => (
                <Reveal key={m.sku} delayMs={(index % 3) * 120} className="h-full">
                  <Link
                    href={`/produits/${u.slug}/${m.slug}/`}
                    className={`${VISUAL_CARD_CLASS} h-full transition duration-300 hover:-translate-y-0.5`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-14 -z-10 size-40 rounded-full bg-accent/16 blur-3xl"
                    />
                    <span className="mb-3 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productImage(m.slug)}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-2"
                      />
                    </span>
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-lg font-medium tracking-tight text-heading">
                        {m.name}
                      </span>
                      <span className="font-serif text-base text-amber-700">
                        {m.price != null ? formatPrice(m.price) : 'Sur devis'}
                      </span>
                    </span>
                    <span className="text-[13px] leading-snug text-foreground/65">{m.headline}</span>
                  </Link>
                </Reveal>
              ))
            : universGallery(u.slug).map((src, index) => (
                <Reveal key={src} delayMs={(index % 3) * 120} className={VISUAL_CARD_CLASS}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-14 -z-10 size-40 rounded-full bg-accent/16 blur-3xl"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${u.name} RESTART, visuel ${index + 1}`}
                    loading="lazy"
                    className="h-56 w-full rounded-xl bg-white object-contain p-2"
                  />
                </Reveal>
              ))}
        </div>
      </section>

      {/* --- Selon votre situation ------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <h2 className={SECTION_HEADING}>Ce que ça change, selon votre situation</h2>
        <div className="cards-dim mt-12 grid gap-5 lg:grid-cols-3">
          {audiences.map((a, index) => {
            const Icon = AUDIENCE_ICONS[a.id]
            return (
              <Reveal
                key={a.id}
                delayMs={index * 120}
                className="card-paper flex cursor-default flex-col gap-3 rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5"
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

      {/* --- Bandeau CTA ------------------------------------------------ */}
      <div className="mt-6 border-y border-border bg-primary/4">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
              Livré monté, installé, prêt à jouer
            </h2>
            <p className="mt-2 text-muted-foreground">
              Devis gratuit sous 48 h. Achat ou location, partout en France.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              Demander un devis
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/realisations/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-medium transition hover:bg-muted"
            >
              Nos réalisations
            </Link>
          </div>
        </section>
      </div>

      {/* --- FAQ -------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
        <Faq items={u.faq} title={`Questions fréquentes : ${u.name.toLowerCase()}`} />
      </section>

      {/* --- Autres univers --------------------------------------------- */}
      <div className="border-y border-border bg-primary/4">
        <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
          <h2 className={SECTION_HEADING}>Nos autres univers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-muted-foreground">
            Tous personnalisables, tous livrés montés, et combinables dans un même espace.
          </p>
          <ul className="rows-dim mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2">
            {related.map((o) => (
              <li key={o.slug} className="border-b border-border">
                <Link href={`/produits/${o.slug}/`} className="group flex items-center gap-4 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={universImage(o.slug)}
                    alt=""
                    loading="lazy"
                    className="size-11 shrink-0 rounded-lg border border-border bg-white object-contain p-0.5 transition duration-500 group-hover:scale-110"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-base font-medium leading-snug tracking-tight text-heading">
                      {o.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {o.models.length > 0
                        ? `${o.models.length} modèle${o.models.length > 1 ? 's' : ''} · ${o.intro.split('.')[0]}`
                        : `Sur devis · ${o.intro.split('.')[0]}`}
                    </span>
                  </span>
                  <ChevronRight
                    className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* --- Pour aller plus loin --------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-8 md:pb-20 md:pt-16">
        <h2 className={SECTION_HEADING}>Pour aller plus loin</h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-muted-foreground">
          Nos guides sur le sujet, à lire avant de vous lancer.
        </p>
        <ul className="mt-10 divide-y divide-border border-t border-border">
          {articles.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}/`}
                className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-4 transition hover:bg-muted"
              >
                <BookOpen className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                <span className="min-w-0 flex-1 font-medium leading-snug">{p.title}</span>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                  {readingTime(p.words)} min de lecture
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Carte CTA finale (variante « paper ») ---------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
        <div className="bg-gradient-paper-brand relative isolate overflow-hidden rounded-3xl border border-primary/16 px-6 py-14 text-center shadow-[var(--shadow-paper-sm)] sm:px-10 md:px-16 md:py-20">
          <h2 className="mx-auto max-w-3xl text-balance font-serif text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            Un projet {u.name.toLowerCase()} ? Parlons-en.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Décrivez votre espace : nous revenons vers vous sous 48 heures avec une proposition
            chiffrée, en achat comme en location.
          </p>
          <div className="mt-9 flex justify-center">
            <span className="relative inline-flex overflow-hidden rounded-lg shadow-[var(--shadow-paper-md)]">
              <Link
                href="/contact/"
                className="group relative inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-7 text-base font-medium text-primary-foreground transition hover:brightness-110"
              >
                Demander un devis gratuit
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <span
                aria-hidden="true"
                className="cta-sheen pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </span>
          </div>
        </div>
      </section>

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
    </div>
  )
}
