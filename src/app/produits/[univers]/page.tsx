import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allModels, audiences, findUnivers, univers } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { AnswerBox, Breadcrumbs, Eyebrow, Faq, FinalCta, JsonLd, Section } from '@/components/ui'
import { universGallery, universImage } from '@/data/images'
import { Reveal } from '@/components/Reveal'
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
      <Section className="pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { href: '/produits/', label: 'Produits' },
            { href: `/produits/${u.slug}/`, label: u.name },
          ]}
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>{u.navLabel}</Eyebrow>
            <h1 className="text-balance font-serif text-4xl font-normal leading-[1.03] tracking-[-0.025em] sm:text-5xl md:text-6xl">
              {u.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">{u.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="btn-primary">
                Demander un devis
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={`tel:${site.phoneE164}`} className="btn-secondary">
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(232,178,82,0.2),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(91,82,200,0.16),transparent_60%)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={universImage(u.slug)}
              alt={u.h1}
              fetchPriority="high"
              className="product-shot relative aspect-4/3 w-full rounded-3xl border border-border object-contain p-4 shadow-[var(--shadow-paper-lg)]"
            />
          </div>
        </div>
        <div className="mt-14 max-w-3xl">
          <AnswerBox>{u.answer}</AnswerBox>
        </div>
      </Section>

      {models.length > 0 ? (
        <section className="bg-cream-2">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Eyebrow>La gamme</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl">
              {models.length} modèle{models.length > 1 ? 's' : ''}{' '}
              <em>disponible{models.length > 1 ? 's' : ''}</em>
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <ProductCard key={m.sku} model={m} list={`univers_${u.slug}`} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        universGallery(u.slug).length > 1 && (
          <section className="bg-cream-2">
            <div className="mx-auto w-full max-w-6xl px-6 py-24">
              <Eyebrow>En images</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl">
                Configuré <em>sur mesure</em>
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">
                Dimensions, finitions, habillage : chaque projet est chiffré au cas par cas, devis
                sous 48 heures.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {universGallery(u.slug).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${u.name} RESTART — visuel ${i + 1}`}
                    loading="lazy"
                    className="product-shot aspect-4/3 w-full rounded-2xl border border-border object-contain p-3 shadow-[var(--shadow-paper-sm)]"
                  />
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* Les trois audiences cohabitent sur la même URL : c'est ce qui remplace
          les anciennes pages /xxx-particulier/ et /xxx-bars-commerces/. */}
      <section className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <Eyebrow>Selon votre situation</Eyebrow>
          <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
            Ce que {u.name.toLowerCase()} <em>change concrètement</em>
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delayMs={i * 80}>
                <div id={a.id} className="h-full rounded-3xl border border-border bg-paper p-7">
                  <p className="eyebrow">{a.short}</p>
                  <h3 className="mt-1.5 font-serif text-2xl">{a.label}</h3>
                  <ul className="mt-5 space-y-3">
                    {u.benefits[a.id].map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-4xl px-6 py-24">
          <Faq items={u.faq} title={`Questions fréquentes — ${u.name.toLowerCase()}`} />
        </div>
      </section>

      <section className="bg-cream-2">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Eyebrow>À voir aussi</Eyebrow>
          <div className="mt-2 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/produits/${o.slug}/`} className="card group flex items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={universImage(o.slug)}
                  alt=""
                  loading="lazy"
                  className="product-shot size-20 shrink-0 rounded-xl border border-border object-contain p-1"
                />
                <span>
                  <span className="block font-serif text-lg text-indigo-900">{o.name}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">
                    {o.intro.split('.')[0]}.
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Un projet "
        em={`${u.name.toLowerCase()} ?`}
        subtitle="Décrivez-nous votre espace : nous revenons vers vous sous 48 heures avec une proposition chiffrée, en achat comme en location."
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
