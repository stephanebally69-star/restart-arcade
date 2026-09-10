'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Dices, Palette, RotateCcw, SlidersHorizontal, X } from 'lucide-react'
import { DEFAULT_THEME, THEME_STORAGE_KEY, fonts, themes, type ThemeMeta } from '@/lib/themes'
import {
  applyCustom,
  buildCustom,
  clearCustom,
  fromTheme,
  randomCustom,
  readCustom,
  type CustomTheme,
} from '@/lib/customTheme'
import { track } from '@/lib/analytics'

type Tab = 'themes' | 'custom'

function applyPreset(t: ThemeMeta) {
  clearCustom()
  const root = document.documentElement
  root.dataset.theme = t.id
  root.dataset.scheme = t.scheme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, t.id)
  } catch {
    // Stockage indisponible : le thème s'applique quand même pour la visite.
  }
}

const fontStack = (id: string) => fonts.find((f) => f.id === id)?.stack

/**
 * Sélecteur de thème flottant : un onglet sur le bord droit ouvre un panneau
 * avec 24 ambiances prêtes et un éditeur (couleurs, polices). Tout est
 * mémorisé dans le navigateur et réappliqué avant l'affichage.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('themes')
  const [current, setCurrent] = useState(DEFAULT_THEME)
  const [custom, setCustom] = useState<CustomTheme | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const activeTheme = themes.find((t) => t.id === current) ?? themes[0]

  useEffect(() => {
    setCurrent(document.documentElement.dataset.theme ?? DEFAULT_THEME)
    setCustom(readCustom()?.settings ?? null)
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

  const choosePreset = (t: ThemeMeta) => {
    applyPreset(t)
    setCurrent(t.id)
    setCustom(null)
    track('theme_change', { theme: t.id })
  }

  const updateCustom = (next: CustomTheme, event = 'theme_customize') => {
    setCustom(next)
    applyCustom(buildCustom(next))
    track(event, { theme: 'custom' })
  }

  const edit = <K extends keyof CustomTheme>(key: K, value: CustomTheme[K]) =>
    updateCustom({ ...(custom ?? fromTheme(activeTheme)), [key]: value })

  const draft = custom ?? fromTheme(activeTheme)
  const dotColor = custom ? custom.primary : activeTheme.primary

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
        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
          Thèmes
        </span>
        <span
          aria-hidden="true"
          className="size-3 rounded-full border border-white/40"
          style={{ background: dotColor }}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="theme-panel"
          role="dialog"
          aria-label="Choisir un thème"
          className="fixed right-14 top-1/2 z-[60] flex max-h-[88vh] w-[min(26rem,calc(100vw-4.5rem))] -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card font-sans text-foreground shadow-[var(--shadow-paper-lg)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="text-base font-semibold text-heading">Choisissez une ambiance</p>
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

          <div role="tablist" className="grid grid-cols-2 gap-1 border-b border-border p-2">
            {(
              [
                ['themes', 'Thèmes', Palette],
                ['custom', 'Personnaliser', SlidersHorizontal],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  tab === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto p-4">
            {tab === 'themes' ? (
              <ThemeGrid current={custom ? null : current} onChoose={choosePreset} />
            ) : (
              <CustomEditor
                draft={draft}
                isCustom={custom !== null}
                baseName={activeTheme.name}
                onEdit={edit}
                onRandom={() => updateCustom(randomCustom(), 'theme_random')}
                onReset={() => choosePreset(activeTheme)}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

function ThemeGrid({
  current,
  onChoose,
}: {
  current: string | null
  onChoose: (t: ThemeMeta) => void
}) {
  const groups: [string, ThemeMeta[]][] = [
    ['Sombres', themes.filter((t) => t.scheme === 'dark')],
    ['Clairs', themes.filter((t) => t.scheme === 'light')],
  ]
  return (
    <div className="space-y-5">
      {groups.map(([label, list]) => (
        <section key={label}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label} · {list.length}
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {list.map((t) => {
              const selected = t.id === current
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => onChoose(t)}
                    aria-pressed={selected}
                    className={`group block w-full overflow-hidden rounded-xl border-2 text-left transition ${
                      selected ? 'border-accent' : 'border-border hover:border-input'
                    }`}
                  >
                    <span className="relative flex h-16 items-center justify-center" style={{ background: t.bg }}>
                      <span
                        className="text-2xl leading-none transition group-hover:scale-110"
                        style={{ fontFamily: fontStack(t.head), color: t.primary }}
                      >
                        Aa
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 flex gap-1" aria-hidden="true">
                        {[t.primary, t.accent, t.price].map((c, i) => (
                          <span key={i} className="size-2.5 rounded-full ring-1 ring-black/25" style={{ background: c }} />
                        ))}
                      </span>
                      {selected && (
                        <span className="absolute left-1.5 top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-accent text-background">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    <span className="block px-2.5 py-2">
                      <span className="block text-sm font-semibold text-heading">{t.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">{t.desc}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

const COLOR_FIELDS: { key: 'bg' | 'primary' | 'accent' | 'price'; label: string; hint: string }[] = [
  { key: 'bg', label: 'Fond', hint: 'Clair ou sombre : le texte s’adapte' },
  { key: 'primary', label: 'Couleur principale', hint: 'Boutons et actions' },
  { key: 'accent', label: 'Accent', hint: 'Icônes, liens, italiques' },
  { key: 'price', label: 'Prix', hint: 'Montants affichés' },
]

function CustomEditor({
  draft,
  isCustom,
  baseName,
  onEdit,
  onRandom,
  onReset,
}: {
  draft: CustomTheme
  isCustom: boolean
  baseName: string
  onEdit: <K extends keyof CustomTheme>(key: K, value: CustomTheme[K]) => void
  onRandom: () => void
  onReset: () => void
}) {
  const select =
    'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent'
  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        {isCustom
          ? 'Thème personnalisé actif. Chaque changement s’applique immédiatement.'
          : `Vous partez du thème « ${baseName} ». Modifiez une couleur ou une police pour le personnaliser.`}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRandom}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
        >
          <Dices className="size-4" aria-hidden="true" />
          Surprends-moi
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={!isCustom}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Réinitialiser
        </button>
      </div>

      <fieldset>
        <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Couleurs
        </legend>
        <div className="space-y-2">
          {COLOR_FIELDS.map((f) => (
            <label
              key={f.key}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-2 transition hover:bg-muted"
            >
              <span className="relative size-9 shrink-0 overflow-hidden rounded-md ring-1 ring-black/20">
                <input
                  type="color"
                  value={draft[f.key]}
                  onChange={(e) => onEdit(f.key, e.target.value)}
                  className="absolute -inset-2 size-[calc(100%+1rem)] cursor-pointer border-0 p-0"
                  aria-label={f.label}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-heading">{f.label}</span>
                <span className="block text-[11px] text-muted-foreground">{f.hint}</span>
              </span>
              <code className="text-[11px] uppercase text-muted-foreground">{draft[f.key]}</code>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Polices
        </legend>
        {(
          [
            ['head', 'Titres'],
            ['body', 'Texte'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block">
            <span className="mb-1 block text-sm font-medium text-heading">{label}</span>
            <select value={draft[key]} onChange={(e) => onEdit(key, e.target.value)} className={select}>
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <span
              className="mt-1.5 block truncate rounded-md bg-muted px-3 py-2 text-lg text-heading"
              style={{ fontFamily: fontStack(draft[key]) }}
            >
              {key === 'head' ? 'Le jeu qui fait revenir' : 'Bornes, fléchettes et baby-foot'}
            </span>
          </label>
        ))}
      </fieldset>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border p-3">
        <span>
          <span className="block text-sm font-medium text-heading">Titres en couleur principale</span>
          <span className="block text-[11px] text-muted-foreground">Sinon, blanc ou noir selon le fond</span>
        </span>
        <input
          type="checkbox"
          checked={draft.headingIsPrimary}
          onChange={(e) => onEdit('headingIsPrimary', e.target.checked)}
          className="size-4 accent-[var(--primary)]"
        />
      </label>
    </div>
  )
}
