import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, findPost, readingTime } from '@/data/blog'
import { blogImage } from '@/data/images'
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
      <Section className="pb-6 pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { href: '/blog/', label: 'Blog' },
            { href: `/blog/${post.slug}/`, label: post.title },
          ]}
        />
        <Eyebrow>{post.category}</Eyebrow>
        <h1 className="max-w-4xl font-serif text-4xl font-normal leading-[1.05] sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-sm text-ink-soft">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>{' '}
          · {readingTime(post.words)} min de lecture
        </p>
        <p className="mt-6 max-w-3xl text-lg text-ink-soft">{post.description}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blogImage(post.slug)}
          alt=""
          fetchPriority="high"
          className="mt-10 aspect-[2/1] w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-paper-md)]"
        />
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
                    className="mt-12 scroll-mt-24 font-serif text-2xl first:mt-0 sm:text-3xl"
                  >
                    {b.text}
                  </h2>
                )
              if (b.type === 'h3')
                return (
                  <h3 key={i} className="mt-8 font-serif text-xl">
                    {b.text}
                  </h3>
                )
              if (b.type === 'list')
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-ink-soft">
                        <span className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true">
                          ✦
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )
              return (
                <p key={i} className="mt-5 leading-relaxed text-ink-soft">
                  {b.text}
                </p>
              )
            })}

            <div className="mt-14 rounded-3xl bg-indigo-900 p-7 sm:p-9">
              <h2 className="font-serif text-2xl text-paper">
                Un projet d&apos;aménagement <em className="text-amber-400">en tête ?</em>
              </h2>
              <p className="mt-2 text-sm text-amber-50/70">
                Devis gratuit sous 48 heures, sans engagement, y compris si votre idée est encore
                floue.
              </p>
              <Link
                href="/contact/"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[10px] bg-amber-400 px-6 text-sm font-semibold text-indigo-900 transition hover:bg-amber-200"
              >
                Demander un devis
              </Link>
            </div>
          </article>

          {toc.length > 2 && (
            <aside className="order-first lg:order-last">
              <nav
                aria-label="Sommaire de l'article"
                className="rounded-2xl border border-border bg-paper p-5 lg:sticky lg:top-28"
              >
                <h2 className="eyebrow">
                  Sommaire
                </h2>
                <ol className="mt-4 space-y-2.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-sm text-ink-soft transition hover:text-indigo-900"
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

      <div className="bg-cream-2">
        <Section>
          <h2 className="font-serif text-3xl">
            À lire <em>ensuite</em>
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {suggestions.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blogImage(p.slug)}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/2] w-full border-b border-border object-cover"
                />
                <div className="p-5">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="mt-2 font-serif text-lg leading-snug">{p.title}</h3>
                </div>
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
