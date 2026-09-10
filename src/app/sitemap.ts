import type { MetadataRoute } from 'next'
import { allModels, univers } from '@/data/catalogue'
import { blogPosts } from '@/data/blog'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * Sitemap généré depuis les données du site : impossible d'oublier une page
 * ou d'y laisser une URL supprimée. Les pages légales et le panier n'y figurent
 * pas, c'était l'un des signaux contradictoires relevés sur l'ancien site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${site.url}${p}`
  const now = new Date()

  const statiques: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'monthly', priority: 1, lastModified: now },
    { url: url('/produits/'), changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: url('/contact/'), changeFrequency: 'yearly', priority: 0.9, lastModified: now },
    { url: url('/qui-sommes-nous/'), changeFrequency: 'yearly', priority: 0.6, lastModified: now },
    { url: url('/realisations/'), changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: url('/blog/'), changeFrequency: 'weekly', priority: 0.7, lastModified: now },
  ]

  const pagesUnivers: MetadataRoute.Sitemap = univers.map((u) => ({
    url: url(`/produits/${u.slug}/`),
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: now,
  }))

  const fiches: MetadataRoute.Sitemap = allModels.map((m) => ({
    url: url(`/produits/${m.universSlug}/${m.slug}/`),
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: now,
  }))

  const articles: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: url(`/blog/${p.slug}/`),
    changeFrequency: 'yearly',
    priority: 0.5,
    lastModified: new Date(p.date),
  }))

  return [...statiques, ...pagesUnivers, ...fiches, ...articles]
}
