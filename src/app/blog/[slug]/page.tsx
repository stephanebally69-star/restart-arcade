import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, findPost, readingTime } from '@/data/blog'
import { Breadcrumbs, Eyebrow, JsonLd, Section } from '@/components/ui'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = findPost(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.description,
      publishedTime: p.date,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
  const fallback = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const suggestions = related.length ? related : fallback

  // Le sommaire est construit à partir des h2 réellement présents,
  // pas d'une liste maintenue à la main qui finirait par diverger.
  const toc = post.blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ text: b.text, id: slugify(b.text) }))

  return (
    <>
      <Section className="pb-6">
        <Breadcrumbs
          items={[
            { href: '/blog/', label: 'Blog' },
            { href: `/blog/${post.slug}/`, label: post.title },
          ]}
        />
        <Eyebrow>{post.category}</Eyebrow>
        <h1 className="max-w-4xl font-display text-4xl sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-sm text-fog">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>{' '}
          · {readingTime(post.words)} min de lecture
        </p>
        <p className="mt-6 max-w-3xl text-lg text-fog">{post.description}</p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
          <article className="max-w-3xl">
            {post.blocks.map((b, i) => {
              if (b.type === 'h2')
                return (
                  <h2
                    key={i}
                    id={slugify(b.text)}
                    className="mt-12 scroll-mt-24 font-display text-2xl first:mt-0 sm:text-3xl"
                  >
                    {b.text}
                  </h2>
                )
              if (b.type === 'h3')
                return (
                  <h3 key={i} className="mt-8 font-display text-xl">
                    {b.text}
                  </h3>
                )
              if (b.type === 'list')
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-fog">
                        <span className="mt-0.5 shrink-0 text-cyan" aria-hidden="true">
                          ✦
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )
              return (
                <p key={i} className="mt-5 leading-relaxed text-fog">
                  {b.text}
                </p>
              )
            })}

            <div className="mt-14 rounded-card border border-neon/25 bg-neon-soft p-6 sm:p-8">
              <h2 className="font-display text-xl">Un projet d&apos;aménagement en tête ?</h2>
              <p className="mt-2 text-sm text-fog">
                Devis gratuit sous 48 heures, sans engagement, y compris si votre idée est encore
                floue.
              </p>
              <Link
                href="/contact/"
                className="mt-5 inline-block rounded-xl bg-neon px-6 py-3 font-semibold text-white transition hover:bg-neon/90"
              >
                Demander un devis
              </Link>
            </div>
          </article>

          {toc.length > 2 && (
            <aside className="order-first lg:order-last">
              <nav
                aria-label="Sommaire de l'article"
                className="lg:sticky lg:top-24 rounded-card border border-line-soft p-5"
              >
                <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-chalk">
                  Sommaire
                </h2>
                <ol className="mt-4 space-y-2.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-sm text-fog transition hover:text-chalk"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </Section>

      <div className="border-t border-line-soft bg-surface">
        <Section>
          <h2 className="font-display text-2xl">À lire ensuite</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {suggestions.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  {p.category}
                </span>
                <h3 className="mt-2 font-display text-base font-bold">{p.title}</h3>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          wordCount: post.words,
          articleSection: post.category,
          inLanguage: 'fr-FR',
          url: `${site.url}/blog/${post.slug}/`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}/` },
          author: { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          isPartOf: { '@id': `${site.url}/blog/#blog` },
        }}
      />
    </>
  )
}

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}
