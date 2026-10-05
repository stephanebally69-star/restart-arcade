'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export type ProjectSheet = {
  id: string
  label: string
  file: string
  lines: [string, string][]
}

/**
 * Fiche projet façon éditeur de code : un onglet par situation (entreprise,
 * bar, particulier), des lignes numérotées clé / valeur tirées du catalogue.
 */
export function ProjectTabs({ sheets }: { sheets: ProjectSheet[] }) {
  const [active, setActive] = useState(sheets[0]?.id)
  const base = useId()
  const sheet = sheets.find((s) => s.id === active) ?? sheets[0]

  return (
    <div className="pl-panel overflow-hidden rounded-2xl">
      <div role="tablist" aria-label="Votre situation" className="flex gap-1 overflow-x-auto border-b border-white/[0.08] px-3 pt-3">
        {sheets.map((s) => (
          <button
            key={s.id}
            id={`${base}-${s.id}`}
            type="button"
            role="tab"
            aria-selected={s.id === sheet.id}
            aria-controls={`${base}-panel`}
            onClick={() => setActive(s.id)}
            className={`whitespace-nowrap rounded-t-lg border-b-2 px-3.5 pb-2.5 pt-1.5 text-[13px] font-medium transition ${
              s.id === sheet.id ? 'border-white text-white' : 'border-transparent text-white/45 hover:text-white/80'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${sheet.id}`}>
        <p className="border-b border-white/[0.06] px-5 py-2 font-[family-name:var(--ff-plexmono)] text-[12px] text-white/35">
          {sheet.file}
        </p>
        <ol className="overflow-x-auto px-2 py-4 font-[family-name:var(--ff-plexmono)] text-[13px] leading-7 sm:text-[13.5px]">
          {sheet.lines.map(([key, value], i) => (
            <li key={key} className="flex gap-4 px-3">
              <span className="w-5 shrink-0 select-none text-right text-white/20">{i + 1}</span>
              <span className="whitespace-nowrap">
                <span className="text-[#9ecbff]">{key}</span>
                <span className="text-white/35">: </span>
                <span className="text-[#f6e3be]">{value}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-3.5">
          <span className="text-[13px] text-white/45">Devis gratuit et sans engagement, sous 48 heures</span>
          <Link href="/contact/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white transition hover:text-white/75">
            Demander ce devis
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
