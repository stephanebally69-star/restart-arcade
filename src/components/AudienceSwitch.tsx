'use client'

import { useState } from 'react'
import Link from 'next/link'
import { audiences, modelsFor, type Audience } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { selectAudience } from '@/lib/analytics'

/**
 * Le sélecteur d'audience remplace les trois sites parallèles de l'ancienne version.
 * Le contenu se réorganise sur place — une seule URL, donc toute l'autorité SEO
 * reste concentrée, et le visiteur n'a jamais à choisir un « espace » avant d'avoir
 * vu le moindre produit.
 */
export function AudienceSwitch() {
  const [active, setActive] = useState<Audience>('entreprise')
  const current = audiences.find((a) => a.id === active)!
  const models = modelsFor(active).slice(0, 4)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choisir votre situation"
        className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-surface-2 p-1"
      >
        {audiences.map((a) => (
          <button
            key={a.id}
            role="tab"
            id={`tab-${a.id}`}
            aria-selected={active === a.id}
            aria-controls={`panel-${a.id}`}
            onClick={() => {
              setActive(a.id)
              selectAudience(a.id, 'home_switcher')
            }}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              active === a.id
                ? 'bg-neon text-white shadow-[0_0_20px_#ff2e8b40]'
                : 'text-fog hover:text-chalk'
            }`}
          >
            {a.label}
            <span className="ml-2 hidden text-xs opacity-70 sm:inline">{a.short}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="mt-8"
      >
        <p className="max-w-2xl text-lg text-fog">{current.blurb}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((m) => (
            <ProductCard key={m.sku} model={m} list={`home_${active}`} />
          ))}
        </div>

        <Link
          href="/produits/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition hover:gap-3"
        >
          Voir tout le catalogue
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
