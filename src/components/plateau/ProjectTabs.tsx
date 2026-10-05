'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export type ProjectPick = { name: string; family: string; price: string; image?: string; href: string }

export type ProjectSheet = {
  id: string
  label: string
  title: string
  blurb: string
  photo: string
  photoAlt: string
  picks: ProjectPick[]
  points: string[]
}

/**
 * Conseil par situation (entreprise, bar, particulier) : une photo
 * d'ambiance, trois modèles de familles différentes avec leur prix, et la
 * formule en clair. Les modèles et les prix viennent du catalogue.
 */
export function ProjectTabs({ sheets }: { sheets: ProjectSheet[] }) {
  const [active, setActive] = useState(sheets[0]?.id)
  const base = useId()
  const sheet = sheets.find((s) => s.id === active) ?? sheets[0]

  return (
    <div className="pl-panel overflow-hidden rounded-2xl">
      <div role="tablist" aria-label="Votre situation" className="flex gap-1 border-b border-white/[0.08] p-2">
        {sheets.map((s) => (
          <button
            key={s.id}
            id={`${base}-${s.id}`}
            type="button"
            role="tab"
            aria-selected={s.id === sheet.id}
            aria-controls={`${base}-panel`}
            onClick={() => setActive(s.id)}
            className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium transition ${
              s.id === sheet.id ? 'bg-white/[0.09] text-white' : 'text-white/45 hover:text-white/80'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${sheet.id}`}>
        <div className="relative h-44 overflow-hidden sm:h-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={sheet.photo} src={sheet.photo} alt={sheet.photoAlt} className="pl-caption size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[15px] font-semibold text-white">{sheet.title}</p>
            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-white/65">{sheet.blurb}</p>
          </div>
        </div>

        <div className="px-5 pb-2 pt-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/35">Nos conseils</p>
          <ul className="mt-2 divide-y divide-white/[0.06]">
            {sheet.picks.map((p) => (
              <li key={p.name}>
                <Link href={p.href} className="group flex items-center gap-4 py-3">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" loading="lazy" className="size-full object-contain p-1" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-white">{p.name}</span>
                    <span className="block text-[12.5px] text-white/45">{p.family}</span>
                  </span>
                  <span className="shrink-0 text-[13px] text-[#f6e3be]">{p.price}</span>
                  <ArrowRight className="size-3.5 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-2 px-5 pb-5 pt-2">
          {sheet.points.map((p) => (
            <li key={p} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12.5px] text-white/70">
              <Check className="size-3 text-[#7ee2a8]" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-3.5">
          <span className="text-[13px] text-white/45">Devis gratuit et sans engagement, sous 48 heures</span>
          <Link href="/contact/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white transition hover:text-white/75">
            Demander un devis
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
