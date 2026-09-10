'use client'

import Link from 'next/link'
import { formatPrice, type ListedModel } from '@/data/catalogue'
import { productImage } from '@/data/images'
import { selectItem } from '@/lib/analytics'

/** Carte visuelle du gabarit Solutions : halo doré, visuel sur fond blanc, titre + prix. */
export function ProductCard({ model, list }: { model: ListedModel; list: string }) {
  const image = productImage(model.slug)

  return (
    <article className="group relative isolate flex flex-col gap-3 overflow-hidden rounded-2xl border border-primary/16 bg-gradient-to-br from-primary/8 via-card to-card px-5 pb-6 pt-5 shadow-[var(--shadow-paper-md)] transition duration-300 hover:-translate-y-0.5">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-14 -z-10 size-40 rounded-full bg-accent/16 blur-3xl"
      />
      <div className="relative mb-2 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-white">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${model.name} — ${model.universName}`}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="font-serif text-3xl text-heading/20">{model.sku}</span>
        )}
        {model.highlight && (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {model.highlight}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg font-medium tracking-tight text-heading">
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
        <p className="shrink-0 font-serif text-base text-amber-700">
          {model.price != null ? formatPrice(model.price) : 'Sur devis'}
        </p>
      </div>
      <p className="text-[13px] leading-snug text-foreground/65">{model.headline}</p>
    </article>
  )
}
