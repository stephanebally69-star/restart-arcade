import Link from 'next/link'
import type { ReactNode } from 'react'
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
    <section className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
      {children}
    </p>
  )
}

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <>
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-fog">
          <li>
            <Link href="/" className="transition hover:text-chalk">
              Accueil
            </Link>
          </li>
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? (
                <span className="text-chalk">{it.label}</span>
              ) : (
                <Link href={it.href} className="transition hover:text-chalk">
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
 * Bloc FAQ. Rend le HTML visible *et* le schema FAQPage à partir de la même
 * source : impossible d'avoir un balisage qui ment sur le contenu affiché.
 */
export function Faq({ items, title = 'Questions fréquentes' }: { items: { q: string; a: string }[]; title?: string }) {
  if (!items.length) return null
  return (
    <>
      <div>
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-8 divide-y divide-line-soft border-y border-line-soft">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold">
                {f.q}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-cyan transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fog">{f.a}</p>
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
    <div className="rounded-card border border-cyan/25 bg-cyan-soft p-5 sm:p-6">
      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
        En bref
      </p>
      <p className="text-sm leading-relaxed text-chalk sm:text-base">{children}</p>
    </div>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-chalk sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-fog">{label}</p>
    </div>
  )
}
