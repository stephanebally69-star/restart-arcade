'use client'

import Link from 'next/link'
import { formatPrice, type ListedModel } from '@/data/catalogue'
import { selectItem } from '@/lib/analytics'

export function ProductCard({ model, list }: { model: ListedModel; list: string }) {
  return (
    <article className="card group relative flex flex-col overflow-hidden">
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-surface-2 to-ink">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0 grid place-items-center font-display text-4xl font-bold text-line transition group-hover:text-fog"
          aria-hidden="true"
        >
          {model.sku}
        </div>
        {model.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-neon px-2.5 py-1 text-[11px] font-semibold text-white">
            {model.highlight}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wider text-fog">{model.universName}</p>
        <h3 className="mt-1 font-display text-lg font-bold">
          <Link
            href={`/produits/${model.universSlug}/${model.slug}/`}
            onClick={() =>
              selectItem(list, {
                item_id: model.sku,
                item_name: model.name,
                item_category: model.universSlug,
                price: model.price ?? undefined,
              })
            }
            className="after:absolute after:inset-0"
          >
            {model.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-fog">{model.headline}</p>
        <p className="mt-4 font-display text-xl font-bold text-cyan">
          {model.price != null ? formatPrice(model.price) : 'Sur devis'}
        </p>
      </div>
    </article>
  )
}
