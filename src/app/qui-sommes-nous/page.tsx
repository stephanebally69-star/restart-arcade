import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Faq, FinalCta } from '@/components/ui'
import { Block, CtaBand, Frame, PageHero, PaperCard, SectionHeading } from '@/components/kit'
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
      <PageHero
        crumbs={[{ href: '/qui-sommes-nous/', label: 'Qui sommes-nous' }]}
        title="On ne vend pas des machines. On crée des endroits où les gens se croisent."
        visual={
          <Frame url="restart-arcade.fr/showroom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ambiance.showroom}
              alt="Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos"
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </Frame>
        }
        brief={
          <p>
            RESTART est une entreprise française spécialisée dans l&apos;aménagement
            d&apos;espaces de convivialité, basée {site.address.street}, {site.address.postalCode}{' '}
            {site.address.city}, dans l&apos;est lyonnais. Elle vend et loue des équipements de jeu
            et de détente personnalisés, livrés montés et installés partout en France.
          </p>
        }
        primary={{ href: '/contact/', label: 'Prendre rendez-vous' }}
      />

      <Block>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            ['7', "familles d'équipements"],
            ['12', 'modèles au catalogue'],
            ['3 ans', 'de garantie maximum'],
            ['48 h', 'pour un devis'],
          ].map(([v, l]) => (
            <div key={l} className="card-paper rounded-2xl p-6">
              <p className="font-serif text-4xl font-medium tracking-tight text-heading">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <div className="grid items-start gap-10 lg:grid-cols-[35fr_65fr] lg:gap-16">
          <h2 className="text-balance font-serif text-3xl font-medium tracking-tight md:text-4xl">
            Un espace de pause vide reste vide. Un espace avec un jeu se remplit tout seul.
          </h2>
          <div className="space-y-5 text-foreground/75">
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
      </Block>

      <Block>
        <SectionHeading title="Notre façon de travailler" />
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <PaperCard
              key={v.title}
              delayMs={(i % 2) * 120}
              icon={<Check className="size-5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />}
              title={v.title}
            >
              {v.text}
            </PaperCard>
          ))}
        </div>
      </Block>

      <CtaBand
        title="Venez essayer avant de choisir"
        subtitle="L'atelier est ouvert sur rendez-vous. C'est souvent la visite qui tranche entre deux modèles."
        primary={{ href: '/contact/', label: 'Prendre rendez-vous' }}
      />

      <section className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14">
        <Faq items={faq} />
      </section>

      <FinalCta
        title="Un projet d'aménagement ? Parlons-en."
        subtitle="Décrivez-nous votre espace : nous revenons vers vous sous 48 heures avec une proposition chiffrée."
      />
    </>
  )
}
