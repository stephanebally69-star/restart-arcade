import Link from 'next/link'
import type { Metadata } from 'next'
import { BadgeCheck, Gamepad2, Paintbrush, Timer, Truck, Wallet } from 'lucide-react'
import { allModels, formatPrice, univers } from '@/data/catalogue'
import { AudienceSwitch } from '@/components/AudienceSwitch'
import { Reveal } from '@/components/Reveal'
import { UniversShowcase } from '@/components/UniversShowcase'
import {
  ArticleRows,
  Block,
  CtaBand,
  Glow,
  PageHero,
  PaperCard,
  RowList,
  SectionHeading,
  VISUAL_CARD_CLASS,
  BriefPoints,
} from '@/components/kit'
import { Faq, FinalCta } from '@/components/ui'
import { blogPosts } from '@/data/blog'
import { ambiance, productImage, universImage } from '@/data/images'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

const steps = [
  {
    n: 'i.',
    title: 'On regarde votre espace',
    text: "Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage réel, les contraintes de place et le budget. C'est gratuit et sans engagement.",
    time: '20 MIN · GRATUIT',
  },
  {
    n: 'ii.',
    title: 'On dessine votre équipement',
    text: 'Choix du modèle, du covering, des couleurs et des options. Vous validez un visuel avant toute fabrication : rien ne part en production sans votre accord.',
    time: 'VISUEL À VALIDER',
  },
  {
    n: 'iii.',
    title: 'On livre et on installe',
    text: "Livraison montée, mise en service et prise en main sur place. Vous n'avez ni carton à ouvrir ni notice à lire.",
    time: '2 À 3 SEMAINES',
  },
  {
    n: 'iv.',
    title: 'On reste joignable',
    text: 'Garantie 2 à 3 ans selon les modèles, et une ligne directe en cas de question. En formule location, la maintenance est incluse.',
    time: "JUSQU'À 3 ANS DE GARANTIE",
  },
]

const homeFaq = [
  {
    q: 'RESTART vend ou loue ses équipements ?',
    a: "Les deux. La vente concerne surtout les particuliers et les entreprises qui préfèrent investir. La location, réservée aux professionnels, inclut la livraison, l'installation et la maintenance, sans immobiliser de trésorerie. C'est la formule la plus fréquente en bar et en commerce.",
  },
  {
    q: 'Où RESTART livre-t-il ?',
    a: "Partout en France métropolitaine. Notre atelier est situé à Villette-d'Anthon (38280), dans l'est lyonnais, ce qui nous permet d'intervenir rapidement sur Lyon, Villeurbanne, Bourgoin-Jallieu, Grenoble et Saint-Étienne.",
  },
  {
    q: 'Peut-on personnaliser un équipement à ses couleurs ou à son logo ?',
    a: 'Oui. Le covering PVC, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO. Les baby-foot sont disponibles en 6 à 8 couleurs. Un visuel vous est soumis pour validation avant fabrication.',
  },
  {
    q: "Quel est le délai entre la commande et l'installation ?",
    a: 'Le devis est établi sous 48 heures. Pour un modèle standard, comptez ensuite deux à trois semaines. Pour un équipement entièrement personnalisé, le délai dépend de la validation du visuel et de la fabrication du covering.',
  },
  {
    q: 'Le paiement en plusieurs fois est-il possible ?',
    a: 'Oui, le paiement en 2, 3 ou 4 fois est disponible sur les achats en ligne. Pour les professionnels, la facturation et la location suivent les conditions précisées au devis.',
  },
]


const valueProps = [
  {
    icon: Gamepad2,
    title: '12 modèles, 5 000 jeux',
    text: "Bornes, fléchettes, baby-foot et fauteuil massant au prix affiché. Jusqu'à 5 000 jeux sur les bornes PRO, sans cartouche ni mise à jour.",
  },
  {
    icon: Paintbrush,
    title: 'Personnalisé à votre image',
    text: 'Covering PVC, couleur des boutons, T-Molding, logo : un visuel vous est soumis avant toute fabrication.',
  },
  {
    icon: Truck,
    title: 'Livré monté, installé',
    text: 'Nos équipements arrivent assemblés et testés, partout en France. Vous branchez, vous jouez.',
  },
  {
    icon: Wallet,
    title: 'Achat ou location',
    text: 'Dès 899 €, paiement en 2x, 3x ou 4x. La location pro inclut livraison, installation et maintenance.',
  },
  {
    icon: Timer,
    title: 'Devis sous 48 heures',
    text: 'Audit de votre espace et proposition chiffrée, gratuits et sans engagement.',
  },
  {
    icon: BadgeCheck,
    title: "Jusqu'à 3 ans de garantie",
    text: 'Une ligne directe après la vente. En location, la maintenance est comprise.',
  },
]

export default function Home() {
  const showcase = allModels.map((m) => ({
    image: productImage(m.slug)!,
    label: m.name,
    detail: m.price != null ? formatPrice(m.price) : 'Sur devis',
  }))

  return (
    <>
      <PageHero
        title="Le jeu qui fait revenir les gens dans vos espaces."
        visual={<UniversShowcase items={showcase} />}
        brief={
          <BriefPoints
            items={[
              "Bornes d'arcade, fléchettes, baby-foot, billards et flippers, en vente ou en location",
              'Personnalisés à votre image : covering, couleurs, logo',
              'Livrés montés et installés partout en France',
              'De 899 € à 2 638,80 €, devis gratuit sous 48 heures',
            ]}
          />
        }
        primary={{ href: '/contact/', label: 'Demander un devis gratuit' }}
        secondary={{ href: '/produits/', label: 'Le catalogue' }}
      />

      {/* --- Ce que RESTART fait pour vous ----------------------------- */}
      <Block>
        <SectionHeading title="Ce que RESTART fait à votre place" />
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, text }, i) => (
            <PaperCard
              key={title}
              delayMs={(i % 3) * 120}
              icon={
                <Icon className="size-6 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
              }
              title={title}
            >
              {text}
            </PaperCard>
          ))}
        </div>
      </Block>

      {/* --- Sélecteur d'audience -------------------------------------- */}
      <Block>
        <SectionHeading
          title="Dites-nous où vous voulez installer"
          subtitle="On vous montre les modèles qui marchent dans votre contexte."
        />
        <div className="mt-10">
          <AudienceSwitch />
        </div>
      </Block>

      <CtaBand />

      {/* --- Univers (cartes visuelles) -------------------------------- */}
      <Block>
        <SectionHeading
          title="Sept familles d'équipements"
          subtitle="Du baby-foot d'extérieur au cocon de repos, tout est personnalisable et livré monté."
        />
        <div className="cards-dim mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {univers.map((u, i) => (
            <Reveal key={u.slug} delayMs={(i % 4) * 100} className="h-full">
              <Link
                href={`/produits/${u.slug}/`}
                className={`${VISUAL_CARD_CLASS} h-full transition duration-300 hover:-translate-y-0.5`}
              >
                <Glow />
                <span className="mb-2 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={universImage(u.slug)}
                    alt={u.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-2"
                  />
                </span>
                <span className="font-serif text-lg font-medium tracking-tight text-heading">
                  {u.name}
                </span>
                <span className="text-[13px] leading-snug text-foreground/65">
                  {u.models.length > 0
                    ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                    : 'Sur devis'}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* --- Méthode ---------------------------------------------------- */}
      <Block>
        <SectionHeading
          title="De l'idée à la première partie, en quatre étapes"
          subtitle="Nous ne vendons pas un carton à monter : nous regardons votre espace, dessinons l'équipement avec vous et l'installons."
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, index) => (
            <li key={s.n} className="card relative flex flex-col gap-3 p-6">
              <span className="font-serif text-5xl font-medium leading-none text-accent/60">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-lg font-medium tracking-tight">{s.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{s.text}</p>
              <p className="mt-auto text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.time}
              </p>
            </li>
          ))}
        </ol>
      </Block>

      {/* --- Mise en situation ----------------------------------------- */}
      <Block>
        <div className="grid items-center gap-10 lg:grid-cols-[65fr_35fr] lg:gap-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ambiance.salleDePause}
            alt="Salle de pause équipée d'un baby-foot, d'un billard et d'une borne d'arcade"
            loading="lazy"
            className="aspect-[3/2] w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-paper-md)]"
          />
          <div>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Un espace de pause vide reste vide. Avec un jeu, il se remplit tout seul.
            </h2>
            <p className="mt-4 text-muted-foreground">
              La partie dure cinq minutes, tout le monde sait jouer, et deux personnes qui ne se
              seraient pas parlé se retrouvent du même côté de la table.
            </p>
            <Link
              href="/realisations/"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-medium transition hover:bg-muted"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </Block>

      {/* --- FAQ -------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14">
        <Faq items={homeFaq} title="Vos questions, nos réponses" />
      </section>

      {/* --- Catalogue en lignes --------------------------------------- */}
      <Block band>
        <SectionHeading
          title="Tout le catalogue"
          subtitle="Chaque univers a sa page : modèles, prix, avantages selon votre situation et FAQ."
        />
        <RowList
          items={univers.map((u) => ({
            href: `/produits/${u.slug}/`,
            title: u.name,
            summary: `${
              u.models.length > 0
                ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                : 'Sur devis'
            } · ${u.intro.split('.')[0]}`,
            image: universImage(u.slug),
          }))}
        />
      </Block>

      {/* --- Articles --------------------------------------------------- */}
      <Block>
        <SectionHeading
          title="Pour aller plus loin"
          subtitle="Nos guides sur l'aménagement d'espaces conviviaux."
        />
        <ArticleRows posts={blogPosts.slice(0, 4)} />
      </Block>

      <FinalCta
        title="Un espace vide, une idée vague, un budget à cadrer ?"
        subtitle="Décrivez-nous votre projet en deux minutes. Nous revenons vers vous sous 48 heures avec une proposition chiffrée."
      />
    </>
  )
}
