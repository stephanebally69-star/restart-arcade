import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Les crawlers des moteurs génératifs (GPTBot, ClaudeBot, PerplexityBot…)
        // sont autorisés explicitement : c'est la condition pour être cité en réponse.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
