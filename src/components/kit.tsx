import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, ChevronRight, Lock, Phone } from 'lucide-react'
import { readingTime, type BlogPost } from '@/data/blog'
import { site } from '@/lib/site'
import { Reveal } from '@/components/Reveal'
import { Breadcrumbs } from '@/components/ui'

/*
 * Kit de mise en page repris du gabarit Solutions de Ma Belle Note
 * (page « Réponses automatiques », surface « app ») et appliqué à tout le site.
 */

export const SECTION_HEADING =
  'mx-auto max-w-3xl text-balance text-center font-serif text-3xl font-medium tracking-tight md:text-4xl'

export const VISUAL_CARD_CLASS =
  'relative isolate flex flex-col gap-3 overflow-hidden rounded-2xl border border-primary/16 bg-gradient-to-br from-primary/8 via-card to-card px-5 pb-6 pt-5 shadow-[var(--shadow-paper-md)]'

/** Halo doré flou, posé dans l'angle des cartes visuelles. */
export function Glow({ className = '-right-12 -top-14 size-40 bg-accent/16' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    />
  )
}

/** Bouton principal avec reflet animé (CtaSheen). */
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
    <span className={`relative inline-flex overflow-hidden rounded-lg shadow-sm ${className}`}>
      <Link
        href={href}
        className={`group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary font-medium text-primary-foreground transition hover:brightness-110 ${
          size === 'lg' ? 'h-12 px-7 text-base' : 'h-11 px-5 text-sm'
        }`}
      >
        {children}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
      <span
        aria-hidden="true"
        className="cta-sheen pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </span>
  )
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-card px-5 text-sm font-medium transition hover:bg-muted'
  return href.startsWith('tel:') || href.startsWith('mailto:') ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/** Cadre navigateur (BrowserFrame) autour d'un contenu. */
export function Frame({
  url,
  children,
  className = '',
}: {
  url: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-paper-md)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#b3261e]/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-[#2f7d4f]/70" />
        </span>
        <span className="flex min-w-0 flex-1 justify-center">
          <span className="flex min-w-0 items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{url}</span>
          </span>
        </span>
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 bg-background">{children}</div>
    </div>
  )
}

/** Encadré « En bref » indigo (card-brand). */
export function BriefCard({ label = 'En bref', children }: { label?: string; children: ReactNode }) {
  return (
    <aside
      aria-label={label}
      className="card-brand w-full rounded-2xl px-6 py-6 text-sm leading-relaxed md:text-[15px]"
    >
      <Glow className="-right-10 -top-16 size-40 bg-accent/40" />
      <span className="mb-3 inline-flex items-center rounded-md bg-white/12 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
        {label}
      </span>
      <div className="[&_a]:underline [&_a]:underline-offset-2">{children}</div>
    </aside>
  )
}

/**
 * Hero du gabarit : fil d'Ariane, H1 pleine largeur, puis grille 65/35 avec le
 * visuel à gauche et l'encadré « En bref » + CTA à droite.
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
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-10 md:pb-10 md:pt-14">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <h1 className="mb-10 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[clamp(2.25rem,4vw,3rem)]">
        {title}
      </h1>
      <div className="grid items-start gap-10 lg:grid-cols-[65fr_35fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:order-2">
          <BriefCard label={briefLabel}>{brief}</BriefCard>
          {(primary || secondary) && (
            <div className="mt-2 flex w-full flex-wrap items-center gap-3">
              {primary && (
                <SheenButton href={primary.href} className="flex-1">
                  {primary.label}
                </SheenButton>
              )}
              {secondary && (
                <GhostButton href={secondary.href}>
                  {secondary.href.startsWith('tel:') && (
                    <Phone className="size-4" aria-hidden="true" />
                  )}
                  {secondary.label}
                </GhostButton>
              )}
            </div>
          )}
          {aside}
        </div>
        <div className="relative w-full min-w-0 lg:order-1">{visual}</div>
      </div>
    </section>
  )
}

export function SectionHeading({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <>
      <h2 className={SECTION_HEADING}>{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-muted-foreground">
          {subtitle}
        </p>
      )}
    </>
  )
}

/** Section standard du gabarit (padding réduit de la surface « app »). */
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
      className={`mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-10 md:py-14 ${className}`}
    >
      {children}
    </section>
  )
  return band ? <div className="border-y border-border bg-primary/4">{inner}</div> : inner
}

/** Bandeau CTA horizontal sur fond teinté. */
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
    <div className="my-6 border-y border-border bg-primary/4">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div>
          <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <SheenButton href={primary.href}>{primary.label}</SheenButton>
          <GhostButton href={secondary.href}>{secondary.label}</GhostButton>
        </div>
      </section>
    </div>
  )
}

export type RowItem = { href: string; title: string; summary?: string; image?: string }

/** Liste en lignes (« Nos autres solutions ») : survoler une ligne estompe les autres. */
export function RowList({ items }: { items: RowItem[] }) {
  return (
    <ul className="rows-dim mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.href} className="border-b border-border">
          <Link href={it.href} className="group flex items-center gap-4 py-4">
            {it.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.image}
                alt=""
                loading="lazy"
                className="size-11 shrink-0 rounded-lg border border-border bg-white object-contain p-0.5 transition duration-500 group-hover:scale-110"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-base font-medium leading-snug tracking-tight text-indigo-900">
                {it.title}
              </span>
              {it.summary && (
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {it.summary}
                </span>
              )}
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Liste d'articles « Pour aller plus loin ». */
export function ArticleRows({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="mt-10 divide-y divide-border border-t border-border">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/blog/${p.slug}/`}
            className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-4 transition hover:bg-muted"
          >
            <BookOpen className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            <span className="min-w-0 flex-1 font-medium leading-snug">{p.title}</span>
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
              {readingTime(p.words)} min de lecture
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Cartes paper à icône (value props sans visuel). */
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
    <Reveal
      delayMs={delayMs}
      className={`card-paper flex cursor-default flex-col gap-3 rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-serif text-lg font-medium tracking-tight">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-foreground/70">{children}</div>
    </Reveal>
  )
}
