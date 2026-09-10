import type { Metadata } from 'next'
import { FinalCta } from '@/components/ui'
import { Block, CtaBand, PageHero, PaperCard, SectionHeading, BriefPoints } from '@/components/kit'
import { UniversShowcase } from '@/components/UniversShowcase'
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
      "Un coin récupération isolé du bruit, utilisé surtout entre 13 h et 14 h, le creux de l'après-déjeuner.",
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
      <PageHero
        crumbs={[{ href: '/realisations/', label: 'Réalisations' }]}
        title="Des espaces qui existaient déjà, et qui servent enfin"
        visual={
          <UniversShowcase
            fit="cover"
            items={realisationPhotos.slice(0, 10).map((image, i) => ({
              image,
              label: `Installation client ${i + 1}`,
            }))}
          />
        }
        brief={
          <BriefPoints
            items={[
              `${realisationPhotos.length} installations photographiées sur place ou au showroom`,
              'Entreprises, bars, campings, gîtes et particuliers',
              "Bornes d'arcade personnalisées, baby-foot d'extérieur, fléchettes et billards",
              'Audit de votre espace gratuit et sans engagement',
            ]}
          />
        }
        primary={{ href: '/contact/', label: 'Demander un audit gratuit' }}
      />

      <Block>
        <SectionHeading
          title="En images"
          subtitle={`${realisationPhotos.length} installations, du bureau au club-house.`}
        />
        <ul className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4">
          {realisationPhotos.map((src, i) => (
            <li key={src} className="break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Installation RESTART chez un client, photo ${i + 1}`}
                loading="lazy"
                className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-paper-sm)] transition hover:shadow-[var(--shadow-paper-md)]"
              />
            </li>
          ))}
        </ul>
      </Block>

      <CtaBand />

      <Block>
        <SectionHeading
          title="Six contextes, six réponses différentes"
          subtitle="Le contexte, l'équipement retenu et ce que ça a changé sur place."
        />
        <div className="cards-dim mt-12 center-grid [--cols:3]">
          {cases.map((c, i) => (
            <PaperCard
              key={c.context}
              delayMs={(i % 3) * 120}
              icon={
                <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {c.audience}
                </span>
              }
              title={c.context}
            >
              <p className="text-xs text-muted-foreground">{c.city}</p>
              <p className="mt-3 font-medium text-heading">{c.setup}</p>
              <p className="mt-2">{c.outcome}</p>
            </PaperCard>
          ))}
        </div>
      </Block>

      <FinalCta
        title="Votre espace ressemble à l'un de ceux-là ?"
        subtitle="Décrivez-le nous : nous vous dirons ce qui fonctionne dans ce contexte, et ce qui ne fonctionne pas."
        primary={{ href: '/contact/', label: 'Demander un audit gratuit' }}
      />
    </>
  )
}
