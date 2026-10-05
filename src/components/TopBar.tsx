'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const KEY = 'restart-topbar-closed'

/** Bandeau mono au-dessus du header : l'engagement de délai, refermable pour la visite. */
export function TopBar() {
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    try {
      setClosed(sessionStorage.getItem(KEY) === '1')
    } catch {
      // Stockage indisponible : le bandeau reste affiché.
    }
  }, [])

  if (closed) return null

  const close = () => {
    setClosed(true)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      // Sans stockage, le bandeau reviendra à la prochaine page : sans gravité.
    }
  }

  return (
    <div className="relative border-b border-border bg-black px-10 py-2 text-center text-foreground/70">
      <p className="ox-mono inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="ox-led" aria-hidden="true" />
        <span className="text-heading">Devis gratuit sous 48 heures</span>
        <span className="hidden text-foreground/30 sm:inline" aria-hidden="true">
          /
        </span>
        <span className="hidden sm:inline">Livré monté et installé partout en France</span>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-1 text-accent transition hover:text-heading"
        >
          Décrire mon projet
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      </p>
      <button
        type="button"
        onClick={close}
        aria-label="Fermer le bandeau"
        className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center text-foreground/50 transition hover:text-heading"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
