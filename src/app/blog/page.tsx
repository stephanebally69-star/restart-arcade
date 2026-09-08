import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, readingTime } from '@/data/blog'
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
      <Section className="pb-8">
        <Breadcrumbs items={[{ href: '/blog/', label: 'Blog' }]} />
        <Eyebrow>Le blog</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl sm:text-5xl">
          Ce qu&apos;on apprend en aménageant des espaces
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fog">
          {blogPosts.length} articles sur le bien-être au travail, l&apos;animation des bars et
          restaurants, et l&apos;expérience client dans les lieux qui reçoivent du public.
        </p>
      </Section>

      <Section className="pt-0">
        <Link
          href={`/blog/${lead.slug}/`}
          className="card group grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]"
        >
          <div>
            <span className="rounded-full bg-neon-soft px-3 py-1 text-xs font-semibold text-neon">
              {lead.category}
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl">{lead.title}</h2>
            <p className="mt-3 text-fog">{lead.description}</p>
          </div>
          <div className="flex items-end text-sm text-fog">
            <p>
              <time dateTime={lead.date}>{fmt(lead.date)}</time> · {readingTime(lead.words)} min de
              lecture
              <span className="mt-2 block font-semibold text-cyan">Lire l&apos;article →</span>
            </p>
          </div>
        </Link>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card flex flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                {p.category}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-fog">{p.description}</p>
              <p className="mt-5 text-xs text-fog">
                <time dateTime={p.date}>{fmt(p.date)}</time> · {readingTime(p.words)} min
              </p>
            </Link>
          ))}
        </div>
      </Section>

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
