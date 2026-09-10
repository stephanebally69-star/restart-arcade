'use client'

import { useState } from 'react'

/** Visuel principal + vignettes. Les visuels d'origine sont sur fond blanc. */
export function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[]
  alt: string
  badge?: string
}) {
  const [active, setActive] = useState(0)

  if (images.length === 0) return null

  return (
    <div>
      <div className="product-shot relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-paper-md)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          fetchPriority="high"
          className="aspect-square w-full object-contain p-6"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-indigo-900 px-3 py-1 text-xs font-semibold text-amber-200">
            {badge}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2.5" aria-label="Autres visuels">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir le visuel ${i + 1}`}
                aria-current={i === active}
                className={`product-shot block w-full overflow-hidden rounded-xl border-2 transition ${
                  i === active
                    ? 'border-indigo-900'
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
