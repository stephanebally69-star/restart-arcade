'use client'

import Link from 'next/link'
import { formatPrice, type ListedModel } from '@/data/catalogue'
import { productImage } from '@/data/images'
import { selectItem } from '@/lib/analytics'

/** Carte visuelle du gabarit Solutions : halo doré, visuel sur fond blanc, titre + prix. */
export function ProductCard({ model, list }: { model: ListedModel; list: string }) {
  const image = productImage(model.slug)

  return (
    <article className="group relative isolate flex flex-col gap-2 overflow-hidden rounded-[24px] border border-border bg-card p-2 pb-5 shadow-[var(--shadow-paper-sm)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-paper-md)]">
      <div className="relative mb-2 flex h-48 items-center justify-center overflow-hidden rounded-[18px] bg-white">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${model.name}, ${model.universName}`}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="font-serif text-3xl text-heading/20">{model.sku}</span>
        )}
        {model.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {model.highlight}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-3">
        <h3 className="text-lg font-semibold tracking-tight text-heading">
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
        <p className="shrink-0 text-base font-semibold text-[color:var(--t-price)]">
          {model.price != null ? formatPrice(model.price) : 'Sur devis'}
        </p>
      </div>
      <p className="px-3 text-[13px] leading-snug text-muted-foreground">{model.headline}</p>
    </article>
  )
}
