'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Palette, X } from 'lucide-react'
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes, type ThemeMeta } from '@/lib/themes'
import { track } from '@/lib/analytics'

function applyTheme(t: ThemeMeta) {
  const root = document.documentElement
  root.dataset.theme = t.id
  root.dataset.scheme = t.scheme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, t.id)
  } catch {
    // Stockage indisponible (navigation privée stricte) : le thème s'applique quand même.
  }
}

/**
 * Sélecteur de thème flottant : un onglet sur le bord droit de l'écran ouvre
 * un panneau de vignettes. Chaque thème change les couleurs, le fond de page
 * et les polices du site ; le choix est mémorisé dans le navigateur.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(DEFAULT_THEME)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setCurrent(document.documentElement.dataset.theme ?? DEFAULT_THEME)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const choose = (t: ThemeMeta) => {
    applyTheme(t)
    setCurrent(t.id)
    track('theme_change', { theme: t.id })
  }

  const active = themes.find((t) => t.id === current) ?? themes[0]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="theme-panel"
        aria-label={open ? 'Fermer le choix du thème' : 'Changer le thème du site'}
        className="fixed right-0 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl border border-r-0 border-border bg-card px-2 py-3 text-foreground shadow-[var(--shadow-paper-lg)] transition hover:pr-3"
      >
        <Palette className="size-5 text-accent" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
          Thèmes
        </span>
        <span
          aria-hidden="true"
          className="size-3 rounded-full border border-white/40"
          style={{ background: active.swatches[1] }}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="theme-panel"
          role="dialog"
          aria-label="Choisir un thème"
          className="fixed right-14 top-1/2 z-[60] flex max-h-[85vh] w-[min(24rem,calc(100vw-4.5rem))] -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[var(--shadow-paper-lg)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="font-serif text-lg font-medium text-heading">Choisissez une ambiance</p>
              <p className="text-xs text-muted-foreground">
                Couleurs, fond et polices changent tout le site.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border transition hover:bg-muted"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <ul className="grid grid-cols-2 gap-3 overflow-y-auto p-4">
            {themes.map((t) => {
              const selected = t.id === current
              const [bg, primary, accent, price] = t.swatches
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t)}
                    aria-pressed={selected}
                    className={`group block w-full overflow-hidden rounded-xl border-2 text-left transition ${
                      selected ? 'border-accent' : 'border-border hover:border-input'
                    }`}
                  >
                    <span
                      className="relative flex h-20 items-center justify-center"
                      style={{ background: bg }}
                    >
                      <span
                        className="text-3xl leading-none transition group-hover:scale-110"
                        style={{ fontFamily: t.headFont, color: primary, fontSizeAdjust: 'none' }}
                      >
                        Aa
                      </span>
                      <span className="absolute bottom-2 right-2 flex gap-1" aria-hidden="true">
                        {[primary, accent, price].map((c, i) => (
                          <span
                            key={i}
                            className="size-2.5 rounded-full ring-1 ring-black/20"
                            style={{ background: c }}
                          />
                        ))}
                      </span>
                      {selected && (
                        <span className="absolute left-2 top-2 inline-flex size-5 items-center justify-center rounded-full bg-accent text-background">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    <span className="block px-3 py-2">
                      <span className="block text-sm font-semibold text-heading">{t.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {t.font} · {t.desc}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
