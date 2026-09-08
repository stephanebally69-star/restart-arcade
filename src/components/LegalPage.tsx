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
    <Section>
      <Breadcrumbs items={[{ href, label: title }]} />
      <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-fog">Dernière mise à jour : {updated}</p>
      <div className="legal mt-10 max-w-3xl space-y-5 text-fog [&_a]:text-cyan [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-chalk [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-chalk">
        {children}
      </div>
    </Section>
  )
}
