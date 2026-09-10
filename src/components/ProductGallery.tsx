'use client'

import { useState } from 'react'

/** Visuel principal + vignettes. Les visuels d'origine sont sur fond blanc. */
export function ProductGallery({
  images,
  alt,
  badge,
  bare = false,
}: {
  images: string[]
  alt: string
  badge?: string
  /** Sans bordure ni ombre, pour être posé dans un cadre (Frame). */
  bare?: boolean
}) {
  const [active, setActive] = useState(0)

  if (images.length === 0) return null

  return (
    <div>
      <div
        className={`product-shot relative overflow-hidden ${
          bare ? '' : 'rounded-3xl border border-border shadow-[var(--shadow-paper-md)]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          fetchPriority="high"
          className={`w-full object-contain p-6 ${bare ? 'aspect-[16/11]' : 'aspect-square'}`}
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul
          className={`grid grid-cols-5 gap-2.5 sm:grid-cols-7 ${bare ? 'border-t border-border bg-muted/60 p-3' : 'mt-3'}`}
          aria-label="Autres visuels"
        >
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir le visuel ${i + 1}`}
                aria-current={i === active}
                className={`product-shot block w-full overflow-hidden rounded-xl border-2 transition ${
                  i === active
                    ? 'border-primary'
                    : 'border-border opacity-75 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="aspect-square w-full object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
