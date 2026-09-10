import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { site } from '@/lib/site'

/** Injecte un bloc JSON-LD. Le contenu vient toujours de nos données, jamais d'une saisie. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function Section({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-6 py-20 md:py-24 ${className}`} {...rest}>
      {children}
    </section>
  )
}

/** Petit libellé mono ambre au-dessus des titres de section. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow mb-3.5 ${className}`}>{children}</span>
}

/** Pastille arrondie avec point ambre, utilisée en tête de hero. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-ink-soft">
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(214,155,54,0.18)]"
      />
      {children}
    </span>
  )
}

/** Titre de section éditorial : serif fin, partie en italique ambre. */
export function SectionTitle({
  eyebrow,
  title,
  em,
  after,
  subtitle,
  center = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  em?: string
  after?: ReactNode
  subtitle?: ReactNode
  center?: boolean
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={`text-balance font-serif font-normal leading-[1.05] tracking-[-0.02em] text-indigo-900 ${
          Tag === 'h1' ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl md:text-4xl lg:text-5xl'
        }`}
      >
        {title}
        {em && <em>{em}</em>}
        {after}
      </Tag>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-pretty text-base text-ink-soft md:text-lg">{subtitle}</p>
      )}
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <>
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          {items.map((it, i) => (
            <li key={it.href} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
              {i === items.length - 1 ? (
                <span className="truncate text-accent">{it.label}</span>
              ) : (
                <Link href={it.href} className="hover:text-foreground">
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [{ href: '/', label: 'Accueil' }, ...items].map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.label,
            item: `${site.url}${it.href}`,
          })),
        }}
      />
    </>
  )
}

/**
 * Bloc FAQ en accordéon. Rend le HTML visible *et* le schema FAQPage à partir de
 * la même source : impossible d'avoir un balisage qui ment sur le contenu affiché.
 */
export function Faq({
  items,
  title = 'Questions fréquentes',
}: {
  items: { q: string; a: string }[]
  title?: string
}) {
  if (!items.length) return null
  return (
    <>
      <div>
        <h2 className="mx-auto max-w-3xl text-balance text-center font-serif text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          {items.map((f, i) => (
            <details
              key={f.q}
              className={`group px-4 py-5 sm:px-6 ${i < items.length - 1 ? 'border-b border-border' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left font-medium text-foreground">
                <span className="text-base">{f.q}</span>
                <ChevronRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  )
}

/**
 * Encadré de réponse directe, placé haut dans la page.
 * Sert autant au lecteur pressé qu'aux moteurs génératifs, qui citent
 * volontiers un paragraphe autoportant contenant des chiffres vérifiables.
 */
export function AnswerBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-amber-500/25 bg-amber-50/70 p-5 sm:p-6">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-700"
      >
        <Sparkles className="size-4" strokeWidth={2} />
      </span>
      <div>
        <p className="eyebrow mb-1.5 text-amber-700">En bref</p>
        <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{children}</p>
      </div>
    </div>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl font-normal tracking-[-0.03em] text-indigo-900 sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

/** Carte CTA finale, variante « paper » du gabarit Solutions. */
export function FinalCta({
  title,
  em,
  subtitle,
  primary = { href: '/contact/', label: 'Demander un devis gratuit' },
}: {
  title: string
  em?: string
  subtitle: string
  primary?: { href: string; label: string }
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 md:pb-24">
      <div className="bg-gradient-paper-brand relative isolate overflow-hidden rounded-3xl border border-primary/16 px-6 py-14 text-center shadow-[var(--shadow-paper-sm)] sm:px-10 md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl text-balance font-serif text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
          {title}
          {em}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="relative inline-flex overflow-hidden rounded-lg shadow-[var(--shadow-paper-md)]">
            <Link
              href={primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-7 text-base font-medium text-primary-foreground transition hover:brightness-110"
            >
              {primary.label}
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
          <a
            href={`tel:${site.phoneE164}`}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-6 text-base font-medium transition hover:bg-muted"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
