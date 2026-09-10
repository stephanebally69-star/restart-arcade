import { CUSTOM_STORAGE_KEY, fonts, type ThemeMeta } from '@/lib/themes'

/** Réglages d'un thème personnalisé : 4 couleurs, 2 polices, 1 option. */
export type CustomTheme = {
  bg: string
  primary: string
  accent: string
  price: string
  head: string
  body: string
  headingIsPrimary: boolean
}

/** Ce qui est mémorisé : les variables calculées, appliquées telles quelles au chargement. */
export type StoredCustom = { settings: CustomTheme; scheme: 'light' | 'dark'; vars: Record<string, string> }

type RGB = [number, number, number]

const toRgb = (hex: string): RGB => {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const toHex = ([r, g, b]: RGB) =>
  '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')

/** Mélange a vers b de t (0 → a, 1 → b). */
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [toRgb(a), toRgb(b)]
  return toHex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as RGB)
}
const rgba = (hex: string, alpha: number) => `rgba(${toRgb(hex).join(',')},${alpha})`

/** Luminance relative WCAG. */
const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const fontById = (id: string) => fonts.find((f) => f.id === id) ?? fonts[0]

/** Dérive toutes les primitives --t-* à partir des réglages. */
export function buildCustom(c: CustomTheme): StoredCustom {
  const dark = luminance(c.bg) < 0.35
  const head = fontById(c.head)
  const body = fontById(c.body)

  const vars: Record<string, string> = {
    '--t-bg': c.bg,
    '--t-bg-2': dark ? mix(c.bg, '#ffffff', 0.03) : mix(c.bg, '#000000', 0.03),
    '--t-surface': dark ? mix(c.bg, '#ffffff', 0.06) : mix(c.bg, '#ffffff', 0.7),
    '--t-surface-2': dark ? mix(c.bg, '#ffffff', 0.11) : mix(c.bg, '#000000', 0.05),
    '--t-text': dark ? '#eceefa' : '#16172a',
    '--t-text-soft': dark ? '#c6c9dc' : '#3b3d55',
    '--t-text-muted': dark ? '#9095b0' : '#6a6d85',
    '--t-heading': c.headingIsPrimary ? c.primary : dark ? '#ffffff' : '#0e0f1f',
    '--t-primary': c.primary,
    '--t-primary-fg': luminance(c.primary) > 0.45 ? '#0b0b12' : '#ffffff',
    '--t-accent': c.accent,
    '--t-price': c.price,
    '--t-brand-from': mix(c.primary, '#000000', 0.3),
    '--t-brand-to': mix(c.accent, '#000000', 0.55),
    '--t-footer': mix(c.bg, '#000000', dark ? 0.45 : 0.88),
    '--t-border': dark ? 'rgba(255,255,255,0.09)' : 'rgba(10,10,30,0.1)',
    '--t-input': dark ? 'rgba(255,255,255,0.18)' : 'rgba(10,10,30,0.2)',
    '--t-page-bg': `radial-gradient(1100px 520px at 50% -8%, ${rgba(c.primary, dark ? 0.18 : 0.12)}, transparent 65%), radial-gradient(900px 500px at 100% 100%, ${rgba(c.accent, dark ? 0.09 : 0.1)}, transparent 60%)`,
    '--t-page-bg-size': 'auto',
    '--t-font-head': head.stack,
    '--t-font-body': body.stack,
    '--t-head-adjust': head.adjust,
    '--t-head-tracking': head.tracking,
    '--t-em-glow': dark ? `0 0 18px ${rgba(c.accent, 0.45)}` : 'none',
  }
  return { settings: c, scheme: dark ? 'dark' : 'light', vars }
}

export function fromTheme(t: ThemeMeta): CustomTheme {
  return {
    bg: t.bg,
    primary: t.primary,
    accent: t.accent,
    price: t.price,
    head: t.head,
    body: t.body,
    headingIsPrimary: t.headingIsPrimary,
  }
}

/** Ambiance aléatoire : teintes contrastées, fond sombre ou clair. */
export function randomCustom(): CustomTheme {
  const hsl = (h: number, s: number, l: number) => {
    const a = (s * Math.min(l, 1 - l)) / 1
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    }
    return toHex([f(0) * 255, f(8) * 255, f(4) * 255])
  }
  const h = Math.random() * 360
  const dark = Math.random() < 0.7
  const readable = fonts.filter((f) => !['press', 'vt323', 'silkscreen', 'bebas'].includes(f.id))
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
  return {
    bg: dark ? hsl(h, 0.45, 0.07) : hsl(h, 0.6, 0.96),
    primary: hsl((h + 150 + Math.random() * 60) % 360, 0.95, dark ? 0.58 : 0.5),
    accent: hsl((h + 240 + Math.random() * 60) % 360, 0.9, dark ? 0.6 : 0.4),
    price: hsl((h + 60) % 360, 0.95, dark ? 0.62 : 0.42),
    head: pick(fonts).id,
    body: pick(readable).id,
    headingIsPrimary: Math.random() < 0.25,
  }
}

const VAR_NAMES = Object.keys(buildCustom(fromTheme({
  id: '', name: '', desc: '', scheme: 'dark', head: 'inter', body: 'inter',
  bg: '#000000', primary: '#ffffff', accent: '#ffffff', price: '#ffffff', headingIsPrimary: false,
})).vars)

export function applyCustom(stored: StoredCustom) {
  const root = document.documentElement
  for (const [k, v] of Object.entries(stored.vars)) root.style.setProperty(k, v)
  root.dataset.scheme = stored.scheme
  root.dataset.custom = 'true'
  try {
    sessionStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(stored))
  } catch {}
}

export function clearCustom() {
  const root = document.documentElement
  for (const k of VAR_NAMES) root.style.removeProperty(k)
  delete root.dataset.custom
  try {
    sessionStorage.removeItem(CUSTOM_STORAGE_KEY)
  } catch {}
}

export function readCustom(): StoredCustom | null {
  try {
    const raw = sessionStorage.getItem(CUSTOM_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredCustom) : null
  } catch {
    return null
  }
}
