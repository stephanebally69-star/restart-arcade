'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatPrice, type ListedModel } from '@/data/catalogue'
import { productImage } from '@/data/images'
import { selectItem } from '@/lib/analytics'

export function ProductCard({ model, list }: { model: ListedModel; list: string }) {
  const image = productImage(model.slug)

  return (
    <article className="card group relative flex flex-col overflow-hidden">
      <div className="product-shot relative aspect-4/3 overflow-hidden border-b border-border">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${model.name} — ${model.universName}`}
            loading="lazy"
            className="size-full object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center font-serif text-4xl text-indigo-900/20">
            {model.sku}
          </div>
        )}
        {model.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-indigo-900 px-2.5 py-1 text-[11px] font-semibold text-amber-200">
            {model.highlight}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{model.universName}</p>
        <h3 className="mt-1.5 font-serif text-xl font-medium tracking-[-0.015em] text-indigo-900">
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
        <p className="mt-1.5 flex-1 text-sm text-ink-soft">{model.headline}</p>
        <div className="mt-5 flex items-center justify-between">
          <p className="font-serif text-2xl text-indigo-900">
            {model.price != null ? formatPrice(model.price) : 'Sur devis'}
          </p>
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-indigo-900 transition group-hover:border-indigo-900 group-hover:bg-indigo-900 group-hover:text-amber-200"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
