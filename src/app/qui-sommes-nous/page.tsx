import type { Metadata } from 'next'
import { AnswerBox, Breadcrumbs, Eyebrow, Faq, FinalCta, Section, Stat } from '@/components/ui'
import { ambiance } from '@/data/images'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: "Qui sommes-nous : l'aménagement d'espaces conviviaux depuis l'Isère",
  description:
    "RESTART conçoit, personnalise et installe des équipements de jeu et de détente pour les entreprises, les bars et les particuliers. Atelier à Villette-d'Anthon (38280), près de Lyon.",
  alternates: { canonical: '/qui-sommes-nous/' },
}

const values = [
  {
    title: 'On regarde avant de vendre',
    text: "Un équipement mal placé ne sert à personne. Nous commençons toujours par l'espace, les flux de passage et l'usage réel — pas par le catalogue.",
  },
  {
    title: 'Personnalisé veut dire personnalisé',
    text: "Covering, couleurs de boutons, T-Molding, logo : vous validez un visuel avant que quoi que ce soit ne parte en fabrication. Aucune surprise à la livraison.",
  },
  {
    title: 'Livré monté, point',
    text: "Nos équipements arrivent assemblés et testés. Vous n'ouvrez pas de carton, vous ne lisez pas de notice : vous jouez.",
  },
  {
    title: 'Joignables après la vente',
    text: 'Garantie de 2 à 3 ans selon les modèles, et une ligne directe. En location, la maintenance est comprise, y compris le retapissage des billards.',
  },
]

const faq = [
  {
    q: 'Où se trouve RESTART ?',
    a: `L'atelier RESTART est situé ${site.address.street}, ${site.address.postalCode} ${site.address.city}, dans l'est lyonnais (Isère). Les visites sont possibles sur rendez-vous pour essayer les équipements avant de choisir.`,
  },
  {
    q: 'RESTART fabrique-t-il ses équipements ?',
    a: "Nous assemblons, personnalisons et testons les équipements dans notre atelier avant livraison. La personnalisation (covering PVC, couleurs, logo) est réalisée à la commande, sur la base d'un visuel que vous validez.",
  },
  {
    q: 'Travaillez-vous avec les particuliers comme avec les entreprises ?',
    a: "Oui. Les particuliers achètent surtout des bornes d'arcade et des baby-foot, les entreprises et les bars combinent plus souvent plusieurs équipements et privilégient la location. Le catalogue et l'accompagnement sont les mêmes.",
  },
]

export default function QuiSommesNousPage() {
  return (
    <>
      <Section className="pt-10 md:pt-14">
        <Breadcrumbs items={[{ href: '/qui-sommes-nous/', label: 'Qui sommes-nous' }]} />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Qui sommes-nous</Eyebrow>
            <h1 className="text-balance font-serif text-4xl font-normal leading-[1.03] tracking-[-0.025em] sm:text-5xl md:text-6xl">
              On ne vend pas des machines. <em>On crée des endroits où les gens se croisent.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              RESTART conçoit, personnalise et installe des équipements de jeu et de détente pour
              les entreprises, les bars, les commerces et les particuliers. Depuis notre atelier de
              l&apos;est lyonnais, partout en France.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ambiance.showroom}
            alt="Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos"
            fetchPriority="high"
            className="aspect-[3/2] w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-paper-lg)]"
          />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-8 rounded-3xl border border-border bg-paper p-8 sm:grid-cols-4">
          <Stat value="7" label="familles d'équipements" />
          <Stat value="12" label="modèles au catalogue" />
          <Stat value="3 ans" label="de garantie maximum" />
          <Stat value="48 h" label="pour un devis" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Notre conviction</Eyebrow>
            <h2 className="font-serif text-3xl">
              Un espace de pause vide reste vide. Un espace avec un jeu se remplit tout seul.
            </h2>
          </div>
          <div className="space-y-5 text-ink-soft">
            <p>
              Les entreprises ont multiplié les chartes de qualité de vie au travail, les bars ont
              multiplié les écrans. Dans les deux cas, le problème est le même : rien ne donne
              vraiment aux gens une raison de rester ensemble au même endroit, quelques minutes,
              sans que ce soit une réunion ou une commande.
            </p>
            <p>
              Un baby-foot, une borne d&apos;arcade ou une cible de fléchettes résout ça sans mode
              d&apos;emploi. La partie dure cinq minutes, tout le monde sait jouer, et deux personnes
              qui ne se seraient pas parlé se retrouvent du même côté de la table.
            </p>
            <p>
              C&apos;est pour ça que nous commençons chaque projet par l&apos;espace et par les gens
              qui vont l&apos;occuper, avant de parler modèle et budget.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card p-6">
              <h3 className="font-serif text-lg">{v.title}</h3>
              <p className="mt-2.5 text-sm text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-paper">
        <Section>
          <div className="max-w-3xl">
            <AnswerBox>
              RESTART est une entreprise française spécialisée dans l&apos;aménagement
              d&apos;espaces de convivialité, basée {site.address.street},{' '}
              {site.address.postalCode} {site.address.city}, dans l&apos;est lyonnais. Elle vend et
              loue des bornes d&apos;arcade, fléchettes électroniques, baby-foot, billards, flippers
              numériques, fauteuils massants et cocons de repos, personnalisés à l&apos;image du
              client, livrés montés et installés partout en France.
            </AnswerBox>
          </div>
          <div className="mt-14 max-w-3xl">
            <Faq items={faq} />
          </div>
        </Section>
      </div>

      <FinalCta
        title="Venez essayer "
        em="avant de choisir."
        subtitle="L'atelier est ouvert sur rendez-vous. C'est souvent la visite qui tranche entre deux modèles."
        primary={{ href: '/contact/', label: 'Prendre rendez-vous' }}
      />
    </>
  )
}
