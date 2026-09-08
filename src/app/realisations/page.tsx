import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, Eyebrow, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Nos réalisations : espaces de pause, bars et salons équipés',
  description:
    "Exemples d'aménagements RESTART en entreprise, en bar et chez des particuliers : bornes d'arcade personnalisées, baby-foot d'extérieur, espaces de pause et coins détente.",
  alternates: { canonical: '/realisations/' },
}

/**
 * Les visuels réels ne sont pas encore disponibles : les cartes présentent le
 * contexte et l'équipement installé, sans photo inventée. Elles se remplaceront
 * une par une dès que les photos de chantier seront fournies.
 */
const cases = [
  {
    context: 'Siège social, 120 collaborateurs',
    audience: 'Entreprise',
    city: 'Lyon (69)',
    setup: 'R-EVOLUTION personnalisée + BF-PREMIUM',
    outcome:
      "Un espace de pause au centre du plateau plutôt qu'en périphérie : le passage devant la borne fait partie du trajet vers la machine à café.",
  },
  {
    context: 'Bar de quartier, 60 couverts',
    audience: 'Bar & commerce',
    city: 'Villeurbanne (69)',
    setup: 'R-DART PRO avec monnayeur',
    outcome:
      'Une soirée fléchettes hebdomadaire qui remplit un créneau creux du mardi, sans budget animation.',
  },
  {
    context: 'Camping 3 étoiles, salle commune',
    audience: 'Hôtellerie',
    city: 'Isère (38)',
    setup: 'BF 4 SAISONS 6 joueurs + R-LEVEL',
    outcome:
      "Une réponse aux journées de pluie, quand la salle commune se remplit d'un coup et que rien n'occupe les adolescents.",
  },
  {
    context: 'Garage aménagé',
    audience: 'Particulier',
    city: 'Bourgoin-Jallieu (38)',
    setup: 'R-TWIN format cocktail',
    outcome:
      'Un format table qui laisse la place aux vélos, et sur lequel on joue assis à deux face à face.',
  },
  {
    context: 'Espace de coworking',
    audience: 'Entreprise',
    city: 'Grenoble (38)',
    setup: 'Cocon de repos + M-SERENITY',
    outcome:
      "Un coin récupération isolé du bruit, utilisé surtout entre 13 h et 14 h — le creux de l'après-déjeuner.",
  },
  {
    context: 'Club-house sportif',
    audience: 'Bar & commerce',
    city: 'Est lyonnais',
    setup: 'Billard avec monnayeur + BF 4 SAISONS',
    outcome:
      "La buvette d'après-match qui ne se vide plus dès le coup de sifflet final.",
  },
]

export default function RealisationsPage() {
  return (
    <>
      <Section className="pb-8">
        <Breadcrumbs items={[{ href: '/realisations/', label: 'Réalisations' }]} />
        <Eyebrow>Nos réalisations</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl sm:text-5xl">
          Des espaces qui existaient déjà, et qui servent enfin
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fog">
          Six exemples d&apos;installations, avec le contexte, l&apos;équipement retenu et ce que ça
          a changé sur place.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article key={c.context} className="card flex flex-col p-6">
              <span className="w-fit rounded-full bg-cyan-soft px-3 py-1 text-xs font-semibold text-cyan">
                {c.audience}
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{c.context}</h2>
              <p className="mt-1 text-sm text-fog">{c.city}</p>
              <p className="mt-4 text-sm font-medium text-chalk">{c.setup}</p>
              <p className="mt-3 flex-1 text-sm text-fog">{c.outcome}</p>
            </article>
          ))}
        </div>
      </Section>

      <div className="border-t border-line-soft bg-surface">
        <Section className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl">
            Votre espace ressemble à l&apos;un de ceux-là ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fog">
            Décrivez-le nous : nous vous dirons ce qui fonctionne dans ce contexte, et ce qui ne
            fonctionne pas.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-xl bg-neon px-6 py-3.5 font-semibold text-white transition hover:bg-neon/90"
          >
            Demander un audit gratuit
          </Link>
        </Section>
      </div>
    </>
  )
}
