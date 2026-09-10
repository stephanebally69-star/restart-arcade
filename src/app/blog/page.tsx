import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, readingTime } from '@/data/blog'
import { blogImage } from '@/data/images'
import { Breadcrumbs, Eyebrow, JsonLd, Section } from '@/components/ui'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog : aménagement, QVCT, bars et expérience client',
  description:
    "Nos articles sur l'aménagement d'espaces conviviaux : bien-être au travail, animation de bar et de restaurant, expérience client en hôtellerie et cohésion d'équipe.",
  alternates: { canonical: '/blog/' },
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPage() {
  const [lead, ...rest] = blogPosts

  return (
    <>
      <Section className="pb-12 pt-10 md:pt-14">
        <Breadcrumbs items={[{ href: '/blog/', label: 'Blog' }]} />
        <Eyebrow>Le blog</Eyebrow>
        <h1 className="max-w-3xl font-serif text-4xl font-normal leading-[1.03] sm:text-5xl md:text-6xl">
          Ce qu&apos;on apprend <em>en aménageant des espaces</em>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          {blogPosts.length} articles sur le bien-être au travail, l&apos;animation des bars et
          restaurants, et l&apos;expérience client dans les lieux qui reçoivent du public.
        </p>
      </Section>

      <section className="bg-cream-2">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Link
            href={`/blog/${lead.slug}/`}
            className="card group grid overflow-hidden lg:grid-cols-[1.2fr_1fr]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blogImage(lead.slug)}
              alt=""
              className="aspect-[3/2] size-full object-cover lg:aspect-auto"
            />
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="eyebrow">{lead.category}</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight">{lead.title}</h2>
              <p className="mt-3 text-ink-soft">{lead.description}</p>
              <p className="mt-6 text-sm text-muted-foreground">
                <time dateTime={lead.date}>{fmt(lead.date)}</time> · {readingTime(lead.words)} min de
                lecture
              </p>
              <span className="mt-4 font-semibold text-amber-700">Lire l&apos;article →</span>
            </div>
          </Link>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card flex flex-col overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blogImage(p.slug)}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/2] w-full border-b border-border object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="eyebrow">{p.category}</span>
                  <h2 className="mt-2 font-serif text-xl leading-snug">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{p.description}</p>
                  <p className="mt-5 text-xs text-muted-foreground">
                    <time dateTime={p.date}>{fmt(p.date)}</time> · {readingTime(p.words)} min
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${site.url}/blog/#blog`,
          name: 'Le blog RESTART',
          url: `${site.url}/blog/`,
          publisher: { '@id': `${site.url}/#organization` },
          blogPost: blogPosts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.date,
            url: `${site.url}/blog/${p.slug}/`,
          })),
        }}
      />
    </>
  )
}
