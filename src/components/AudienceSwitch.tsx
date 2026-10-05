'use client'

import { useState } from 'react'
import Link from 'next/link'
import { audiences, modelsFor, type Audience } from '@/data/catalogue'
import { ProductCard } from '@/components/ProductCard'
import { selectAudience } from '@/lib/analytics'

/**
 * Le sélecteur d'audience remplace les trois sites parallèles de l'ancienne version.
 * Le contenu se réorganise sur place, une seule URL, donc toute l'autorité SEO
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
        className="flex w-full flex-col border border-border sm:w-fit sm:flex-row"
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
            className={`border-border px-5 py-3.5 text-left text-sm font-medium transition [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0 ${
              active === a.id
                ? 'bg-accent text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-heading'
            }`}
          >
            {a.label}
            <span className="ml-2 hidden font-mono text-[11px] uppercase tracking-wider opacity-70 sm:inline">{a.short}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="mt-8"
      >
        <p key={active} className="ox-swap max-w-3xl text-lg text-ink-soft">{current.blurb}</p>

        <div key={`grid-${active}`} className="ox-swap mt-8 center-grid [--cols:4]">
          {models.map((m) => (
            <ProductCard key={m.sku} model={m} list={`home_${active}`} />
          ))}
        </div>

        <Link href="/produits/" className="ox-link mt-10">
          Voir tout le catalogue
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  )
}
