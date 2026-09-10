import type { ReactNode } from 'react'
import { Breadcrumbs, Section } from '@/components/ui'

/** Gabarit commun aux pages légales : même largeur de lecture, même hiérarchie. */
export function LegalPage({
  title,
  href,
  updated,
  children,
}: {
  title: string
  href: string
  updated: string
  children: ReactNode
}) {
  return (
    <Section className="pt-10 md:pt-14">
      <Breadcrumbs items={[{ href, label: title }]} />
      <h1 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-soft">Dernière mise à jour : {updated}</p>
      <div className="legal mt-10 max-w-3xl space-y-5 text-ink-soft [&_a]:text-amber-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-indigo-900 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-indigo-900">
        {children}
      </div>
    </Section>
  )
}
