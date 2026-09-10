import type { Metadata } from 'next'
import { Breadcrumbs, FinalCta, Section, SectionTitle } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { realisationPhotos } from '@/data/images'

export const metadata: Metadata = {
  title: 'Nos réalisations : espaces de pause, bars et salons équipés',
  description:
    "Exemples d'aménagements RESTART en entreprise, en bar et chez des particuliers : bornes d'arcade personnalisées, baby-foot d'extérieur, espaces de pause et coins détente.",
  alternates: { canonical: '/realisations/' },
}

/**
 * Cas types : contexte et équipement installé. Les photos de la galerie
 * sont celles publiées sur restart-arcade.fr ; elles ne sont volontairement
 * pas rattachées aux cas, faute de correspondance confirmée.
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
      <Section className="pb-12 pt-10 md:pt-14">
        <Breadcrumbs items={[{ href: '/realisations/', label: 'Réalisations' }]} />
        <SectionTitle
          as="h1"
          eyebrow="Nos réalisations"
          title="Des espaces qui existaient déjà, "
          em="et qui servent enfin"
          subtitle="Des installations en entreprise, en bar, en camping et chez des particuliers — photographiées sur place ou dans notre showroom avant livraison."
        />
      </Section>

      <section className="bg-cream-2">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <ul className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4">
            {realisationPhotos.map((src, i) => (
              <li key={src} className="break-inside-avoid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Installation RESTART chez un client — photo ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-paper-sm)] transition hover:shadow-[var(--shadow-paper-md)]"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <SectionTitle
            eyebrow="Cas types"
            title="Six contextes, "
            em="six réponses différentes"
            subtitle="Le contexte, l'équipement retenu et ce que ça a changé sur place."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <Reveal key={c.context} delayMs={(i % 3) * 80}>
                <article className="flex h-full flex-col rounded-3xl border border-border bg-paper p-7">
                  <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {c.audience}
                  </span>
                  <h2 className="mt-4 font-serif text-xl">{c.context}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{c.city}</p>
                  <p className="mt-4 text-sm font-semibold text-indigo-900">{c.setup}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.outcome}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Votre espace ressemble "
        em="à l'un de ceux-là ?"
        subtitle="Décrivez-le nous : nous vous dirons ce qui fonctionne dans ce contexte, et ce qui ne fonctionne pas."
        primary={{ href: '/contact/', label: 'Demander un audit gratuit' }}
      />
    </>
  )
}
