'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Clock, X } from 'lucide-react'

const KEY = 'restart-topbar-closed'

/** Bandeau noir au-dessus du header : l'engagement de délai, refermable pour la visite. */
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
    <div className="relative bg-[#111] px-10 py-2.5 text-center text-[13px] text-white/80">
      <p className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
        <Clock className="size-3.5 text-white/60" aria-hidden="true" />
        <span className="font-semibold text-white">Devis gratuit sous 48 heures</span>
        <span className="hidden sm:inline">Livré monté et installé partout en France</span>
        <Link href="/contact/" className="font-semibold text-white underline underline-offset-2">
          Décrire mon projet
        </Link>
      </p>
      <button
        type="button"
        onClick={close}
        aria-label="Fermer le bandeau"
        className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
