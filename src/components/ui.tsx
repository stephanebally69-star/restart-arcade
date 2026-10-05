import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react'
import { site } from '@/lib/site'
import { WaveField } from '@/components/WaveField'

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
        className={`text-balance font-serif font-normal leading-[1.05] tracking-[-0.02em] text-heading ${
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
      <nav aria-label="Fil d'Ariane" className="mb-8">
        <ol className="ox-mono flex flex-wrap items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          {items.map((it, i) => (
            <li key={it.href} className="flex min-w-0 items-center gap-1.5">
              <span aria-hidden="true" className="text-foreground/25">/</span>
              {i === items.length - 1 ? (
                <span className="truncate text-foreground">{it.label}</span>
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
        <div className="border-t border-border pt-6">
          <p aria-hidden="true" className="ox-mono ox-index text-accent" />
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.02] tracking-[-0.045em]">
            {title}
          </h2>
        </div>
        <div className="mt-10 border-t border-border">
          {items.map((f, i) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-start gap-5 py-5 text-left text-heading transition hover:text-accent">
                <span className="ox-mono mt-1 w-6 shrink-0 text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[17px] font-light tracking-tight">{f.q}</span>
                <span className="inline-flex size-7 shrink-0 items-center justify-center border border-border transition group-open:border-accent group-open:bg-accent group-open:text-primary-foreground">
                  <Plus
                    className="size-3.5 transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <p className="max-w-3xl pb-6 pl-11 pr-12 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
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
    <div className="flex gap-4 rounded-[24px] border border-border bg-card p-5 shadow-[var(--shadow-paper-sm)] sm:p-6">
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
      <p className="font-serif text-3xl font-normal tracking-[-0.03em] text-heading sm:text-4xl">
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
    <section className="relative isolate mt-10 overflow-hidden border-t border-border">
      <WaveField cell={96} minCell={44} intensity={0.9} className="-z-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_50%,color-mix(in_srgb,var(--t-bg)_78%,transparent)_0%,transparent_100%)]"
      />
      <div className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-8 md:py-28">
        <p className="ox-mono inline-flex items-center gap-2 text-accent">
          <span className="ox-led" aria-hidden="true" />
          Insert coin · Devis gratuit
        </p>
        <h2 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.25rem)] font-light leading-[1] tracking-[-0.05em]">
          {title}
          {em}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="ox-btn ox-btn-lg">
            <span>{primary.label}</span>
            <span aria-hidden="true">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <a href={`tel:${site.phoneE164}`} className="ox-btn ox-btn-lg ox-btn-ghost">
            <span>{site.phone}</span>
            <span aria-hidden="true">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
