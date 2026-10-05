import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, BookOpen, Check, ChevronRight, MapPin, Phone, Power } from 'lucide-react'
import { readingTime, type BlogPost } from '@/data/blog'
import { site } from '@/lib/site'
import { Reveal } from '@/components/Reveal'
import { Breadcrumbs } from '@/components/ui'
import { WaveField } from '@/components/WaveField'

/*
 * Kit de mise en page « Onde pixel », d'après le Digital Wave Field Hero de
 * HorizonX : fond noir, grille de pixels vivante en tête de page, angles
 * droits, filets d'un pixel, libellés mono. Toutes les pages passent par ces
 * composants ; le thème actif fournit couleurs et polices.
 */

export const SECTION_HEADING =
  'max-w-3xl text-balance font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.02] tracking-[-0.045em]'

export const VISUAL_CARD_CLASS =
  'ox-glow relative isolate flex flex-col gap-3 overflow-hidden border border-border bg-card p-2 pb-5 [&>span:not([aria-hidden])]:px-2'

/** Halo flou, posé dans l'angle des cartes visuelles. */
export function Glow({ className = '-right-12 -top-14 size-40 bg-accent/10' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    />
  )
}

/** Case reprenant le symbole « marche » du logo RESTART. */
export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-accent text-primary-foreground ${className}`}
    >
      <Power className="size-[55%]" strokeWidth={2.5} />
    </span>
  )
}

/** Bouton principal : bloc cyan, flèche dans sa propre case. */
export function SheenButton({
  href,
  children,
  className = '',
  size = 'md',
}: {
  href: string
  children: ReactNode
  className?: string
  size?: 'md' | 'lg'
}) {
  return (
    <Link href={href} className={`ox-btn ${size === 'lg' ? 'ox-btn-lg' : ''} ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  )
}

/** Bouton secondaire : même gabarit, transparent sous un filet. */
export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const inner = (
    <>
      <span className="gap-2">{children}</span>
      <span aria-hidden="true">
        <ArrowUpRight className="size-4" />
      </span>
    </>
  )
  return href.startsWith('tel:') || href.startsWith('mailto:') ? (
    <a href={href} className="ox-btn ox-btn-ghost">
      {inner}
    </a>
  ) : (
    <Link href={href} className="ox-btn ox-btn-ghost">
      {inner}
    </Link>
  )
}

/** Cadre du grand média : filet fin, angles droits. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 overflow-hidden border border-border bg-card ${className}`}>
      {children}
    </div>
  )
}

/** Encadré de synthèse : surface quadrillée, liseré cyan, puces cochées. */
export function BriefCard({ label = 'En bref', children }: { label?: string; children: ReactNode }) {
  return (
    <aside
      aria-label={label}
      className="card-brand w-full px-6 py-7 text-sm leading-relaxed text-foreground sm:px-8 md:text-[15px]"
    >
      <p className="ox-mono mb-5 flex items-center gap-2 text-muted-foreground">
        <span className="ox-led" aria-hidden="true" />
        Synthèse
      </p>
      <div className="[&_a]:underline [&_a]:underline-offset-2">{children}</div>
    </aside>
  )
}

/** Puces cochées de l'encadré de synthèse. */
export function BriefPoints({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center border border-accent/50 text-accent md:mt-1">
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Carte « Conçu par » : l'atelier, l'adresse et une ligne directe. */
export function MakerCard() {
  return (
    <div className="ox-glow relative border border-border bg-card p-6">
      <p className="ox-mono text-muted-foreground">Conçu et installé par</p>
      <div className="mt-4 flex items-center gap-3">
        <BrandMark className="size-11" />
        <div>
          <p className="text-lg font-medium tracking-tight text-heading">RESTART</p>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
        <li className="flex items-start gap-2.5 text-ink-soft">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          Atelier à {site.address.city} ({site.address.postalCode}), livraison partout en France
        </li>
        <li>
          <a
            href={`tel:${site.phoneE164}`}
            className="flex items-center gap-2.5 font-medium text-foreground transition hover:text-accent"
          >
            <Phone className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            {site.phone}
          </a>
        </li>
      </ul>
    </div>
  )
}

/** Carte de repères chiffrés, présentée comme une fiche d'instrument. */
export function SpecsCard({
  title = 'Repères',
  rows,
}: {
  title?: string
  rows: { label: string; value: ReactNode }[]
}) {
  return (
    <div className="ox-glow relative border border-border bg-card p-6">
      <h2 className="ox-mono flex items-center justify-between text-muted-foreground">
        {title}
        <span className="ox-led" aria-hidden="true" />
      </h2>
      <dl className="mt-3 divide-y divide-border text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-6 py-2.5">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="text-right font-mono text-[13px] text-heading">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Trois engagements côte à côte, séparés par des filets. */
export function FeatureTrio({
  items,
}: {
  items: { icon: ReactNode; title: string; text: string }[]
}) {
  return (
    <ul className="grid border border-border bg-card sm:grid-cols-3">
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`p-6 ${i > 0 ? 'border-t border-border sm:border-l sm:border-t-0' : ''}`}
        >
          <span className="inline-flex size-10 items-center justify-center border border-border text-accent">
            {it.icon}
          </span>
          <p className="mt-4 text-sm font-medium text-heading">{it.title}</p>
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{it.text}</p>
        </li>
      ))}
    </ul>
  )
}

/** Bandeau sombre d'appel à l'action. */
export function DarkCta({
  title,
  text,
  href = '/contact/',
  label = 'Demander un devis',
}: {
  title: string
  text: string
  href?: string
  label?: string
}) {
  return (
    <div className="card-brand relative flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xl font-light tracking-tight text-heading">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
      <SheenButton href={href} className="shrink-0">
        {label}
      </SheenButton>
    </div>
  )
}

/**
 * Hero du gabarit : bandeau pleine largeur posé sur la grille de pixels
 * (fil d'Ariane, libellé mono, H1 léger, actions), puis le grand média et deux
 * colonnes : la synthèse à gauche, la carte de l'atelier (ou un contenu dédié)
 * à droite.
 */
export function PageHero({
  crumbs,
  title,
  visual,
  brief,
  briefLabel,
  primary = { href: '/contact/', label: 'Demander un devis' },
  secondary = { href: `tel:${site.phoneE164}`, label: 'Appeler' },
  aside,
}: {
  crumbs?: { href: string; label: string }[]
  title: ReactNode
  visual: ReactNode
  brief: ReactNode
  briefLabel?: string
  primary?: { href: string; label: string } | null
  secondary?: { href: string; label: string } | null
  aside?: ReactNode
}) {
  const eyebrow = crumbs && crumbs.length > 1 ? crumbs[crumbs.length - 2].label : briefLabel
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <WaveField cell={88} minCell={40} intensity={0.85} className="-z-20" />
        <div aria-hidden="true" className="ox-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-8 md:pb-14 md:pt-12">
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && (
            <p className="ox-mono ox-fade flex items-center gap-2 text-accent">
              <span className="ox-led" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.4rem,5.4vw,4.6rem)] font-light leading-[0.98] tracking-[-0.05em]">
            <span className="ox-line">
              <span>{title}</span>
            </span>
          </h1>
          <div
            className="ox-fade mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ '--d': '250ms' } as CSSProperties}
          >
            <span className="ox-mono inline-flex items-center gap-3 text-muted-foreground">
              <BrandMark className="size-6" />
              RESTART · {site.tagline}
            </span>
            {(primary || secondary) && (
              <div className="flex flex-wrap items-center gap-3">
                {secondary && (
                  <GhostButton href={secondary.href}>
                    {secondary.href.startsWith('tel:') && <Phone className="size-4" aria-hidden="true" />}
                    {secondary.label}
                  </GhostButton>
                )}
                {primary && <SheenButton href={primary.href}>{primary.label}</SheenButton>}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 sm:px-8 md:pb-10 md:pt-10">
        <div className="relative w-full min-w-0">{visual}</div>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <BriefCard label={briefLabel}>{brief}</BriefCard>
          <div className="flex flex-col gap-6">{aside ?? <MakerCard />}</div>
        </div>
      </section>
    </>
  )
}

/** Titre de section : numéro automatique, filet, titre léger et chapô à droite. */
export function SectionHeading({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-border pt-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
      <div>
        <p aria-hidden="true" className="ox-mono ox-index text-accent" />
        <h2 className={`mt-4 ${SECTION_HEADING}`}>{title}</h2>
      </div>
      {subtitle && (
        <p className="max-w-xl self-end text-pretty text-base text-muted-foreground md:pb-1.5 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

/** Section standard. `band` la pose sur un bandeau quadrillé pleine largeur. */
export function Block({
  children,
  className = '',
  id,
  band = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  band?: boolean
}) {
  const inner = (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-14 sm:px-8 md:py-20 ${className}`}
    >
      {children}
    </section>
  )
  return band ? (
    <div className="ox-grid-bg border-y border-border bg-[color:var(--t-bg-2)]">{inner}</div>
  ) : (
    inner
  )
}

/** Bandeau CTA pleine largeur. */
export function CtaBand({
  title = 'Livré monté, installé, prêt à jouer',
  subtitle = 'Devis gratuit sous 48 h. Achat ou location, partout en France.',
  primary = { href: '/contact/', label: 'Demander un devis' },
  secondary = { href: '/realisations/', label: 'Nos réalisations' },
}: {
  title?: string
  subtitle?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <div className="mx-auto my-6 w-full max-w-7xl px-4 sm:px-8">
      <section className="card-brand relative flex flex-col gap-6 px-7 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="ox-mono flex items-center gap-2 text-accent">
            <span className="ox-led" aria-hidden="true" />
            Prêt à jouer
          </p>
          <h2 className="mt-3 text-2xl font-light tracking-[-0.04em] md:text-[2.25rem]">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <GhostButton href={secondary.href}>{secondary.label}</GhostButton>
          <SheenButton href={primary.href}>{primary.label}</SheenButton>
        </div>
      </section>
    </div>
  )
}

export type RowItem = { href: string; title: string; summary?: string; image?: string }

/** Liste en lignes : survoler une ligne estompe les autres. */
export function RowList({ items }: { items: RowItem[] }) {
  return (
    <ul className="rows-dim mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.href} className="border-b border-border">
          <Link href={it.href} className="group flex items-center gap-4 py-4">
            <span className="ox-mono w-6 shrink-0 text-muted-foreground transition group-hover:text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            {it.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.image}
                alt=""
                loading="lazy"
                className="size-12 shrink-0 border border-border bg-white object-contain p-1 transition duration-500 group-hover:scale-105"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-base font-medium leading-snug tracking-tight text-heading">
                {it.title}
              </span>
              {it.summary && (
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {it.summary}
                </span>
              )}
            </span>
            <span className="inline-flex size-8 shrink-0 items-center justify-center border border-border transition group-hover:border-accent group-hover:bg-accent group-hover:text-primary-foreground">
              <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Liste d'articles « Pour aller plus loin ». */
export function ArticleRows({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="mt-10 border-t border-border">
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-border">
          <Link
            href={`/blog/${p.slug}/`}
            className="group flex items-center gap-4 py-5 transition hover:bg-muted/40 sm:px-2"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center border border-border text-muted-foreground transition group-hover:text-accent">
              <BookOpen className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 text-[17px] font-light leading-snug tracking-tight text-heading">
              {p.title}
            </span>
            <span className="ox-mono hidden shrink-0 text-muted-foreground sm:block">
              {readingTime(p.words)} min
            </span>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Cartes à icône (engagements sans visuel). */
export function PaperCard({
  icon,
  title,
  children,
  delayMs = 0,
  className = '',
}: {
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
  delayMs?: number
  className?: string
}) {
  return (
    <Reveal delayMs={delayMs} className={`card-paper flex cursor-default flex-col gap-3 p-6 ${className}`}>
      {icon && (
        <span className="inline-flex size-10 items-center justify-center border border-border">{icon}</span>
      )}
      <h3 className="mt-2 text-lg tracking-tight">{title}</h3>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  )
}
