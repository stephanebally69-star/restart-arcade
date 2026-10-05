'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Layers, X } from 'lucide-react'
import { CURRENT_VERSION, versions } from '@/lib/versions'

/**
 * Onglet fixe à gauche (le choix du thème est à droite) : bascule vers la même
 * page sur une autre version de la refonte.
 */
export function VersionSwitcher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const current = versions.find((v) => v.id === CURRENT_VERSION)!

  return (
    <div ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="version-panel"
        aria-label={open ? 'Fermer le choix de version' : 'Changer de version du site'}
        className="fixed bottom-20 left-0 z-[60] flex flex-col items-center gap-2 border border-l-0 border-border bg-card px-1.5 py-2.5 text-foreground transition hover:pl-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-2 sm:py-3"
      >
        <Layers className="size-5 text-accent" aria-hidden="true" />
        <span className="hidden font-mono text-[11px] font-medium uppercase tracking-wider [writing-mode:vertical-rl] sm:inline">
          Version
        </span>
        <span className="font-mono text-[11px] font-medium text-accent">{current.label}</span>
      </button>

      {open && (
        <div
          id="version-panel"
          role="dialog"
          aria-label="Choisir une version du site"
          className="fixed bottom-20 left-12 z-[60] w-[min(22rem,calc(100vw-4rem))] border sm:bottom-auto sm:left-14 sm:top-1/2 sm:-translate-y-1/2 border-border bg-card text-foreground shadow-[var(--shadow-paper-lg)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Versions de la refonte
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="inline-flex size-7 items-center justify-center text-muted-foreground transition hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <ul>
            {versions.map((v) => {
              const active = v.id === CURRENT_VERSION
              return (
                <li key={v.id} className="border-b border-border last:border-b-0">
                  <a
                    href={active ? undefined : `${v.url}${pathname}`}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-center gap-4 px-5 py-4 transition ${
                      active ? 'bg-muted' : 'hover:bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-flex size-9 shrink-0 items-center justify-center border font-mono text-xs ${
                        active ? 'border-accent text-accent' : 'border-border text-muted-foreground'
                      }`}
                    >
                      {v.label}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-heading">{v.name}</span>
                      <span className="block text-xs text-muted-foreground">{v.desc}</span>
                    </span>
                    {active ? (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Ici
                      </span>
                    ) : (
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground transition group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
