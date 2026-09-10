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
        className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full border border-border bg-paper p-1 shadow-[var(--shadow-paper-sm)]"
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
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
              active === a.id
                ? 'bg-indigo-900 text-amber-200 shadow-[0_6px_14px_-4px_rgba(30,27,75,0.4)]'
                : 'text-muted-foreground hover:text-foreground'
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
        <p className="mx-auto text-center text-lg text-ink-soft lg:whitespace-nowrap">{current.blurb}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((m) => (
            <ProductCard key={m.sku} model={m} list={`home_${active}`} />
          ))}
        </div>

        <Link
          href="/produits/"
          className="btn-secondary mx-auto mt-10 flex w-fit bg-paper"
        >
          Voir tout le catalogue
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
