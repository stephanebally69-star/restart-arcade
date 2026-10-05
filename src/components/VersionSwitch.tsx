'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Clapperboard, Images } from 'lucide-react'
import { applyVersion, currentVersion, versions, type VersionId } from '@/lib/version'
import { track } from '@/lib/analytics'

const icons: Record<VersionId, typeof Images> = { studio: Images, cinema: Clapperboard }

/**
 * Bascule de version : un onglet sur le bord gauche, pendant de l'onglet
 * Thèmes. Un clic passe à l'autre version. Les versions ne diffèrent que par
 * le hero de l'accueil ; basculer depuis une autre page y ramène pour le montrer.
 */
export function VersionSwitch() {
  const [current, setCurrent] = useState<VersionId>('studio')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => setCurrent(currentVersion()), [])

  const active = versions.find((v) => v.id === current) ?? versions[0]
  const next = versions[(versions.indexOf(active) + 1) % versions.length]
  const Icon = icons[active.id]

  const toggle = () => {
    applyVersion(next.id)
    setCurrent(next.id)
    track('version_change', { version: next.id })
    if (pathname !== '/') router.push('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Version ${active.name} affichée. Passer à la version ${next.name}`}
      title={`Passer à la version ${next.name} : ${next.desc}`}
      className="fixed left-0 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-2 rounded-r-xl border border-l-0 border-border bg-card px-2 py-3 text-foreground shadow-[var(--shadow-paper-lg)] transition hover:pl-3"
    >
      <Icon className="size-5 text-accent" aria-hidden="true" />
      <span className="rotate-180 font-sans text-[11px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
        Version <span className="text-muted-foreground">{active.name}</span>
      </span>
    </button>
  )
}
