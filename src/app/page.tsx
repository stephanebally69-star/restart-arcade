import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, BadgeCheck, Gamepad2, Paintbrush, Timer, Truck, Wallet } from 'lucide-react'
import { allModels, formatPrice, univers } from '@/data/catalogue'
import { AudienceSwitch } from '@/components/AudienceSwitch'
import { PixelHero, type HeroUnivers } from '@/components/PixelHero'
import { Reveal } from '@/components/Reveal'
import {
  ArticleRows,
  Block,
  BriefCard,
  BriefPoints,
  CtaBand,
  DarkCta,
  FeatureTrio,
  MakerCard,
  PaperCard,
  RowList,
  SectionHeading,
  SpecsCard,
} from '@/components/kit'
import { Faq, FinalCta } from '@/components/ui'
import { blogPosts } from '@/data/blog'
import { ambiance, universImage } from '@/data/images'

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
  const prices = allModels.flatMap((m) => (m.price != null ? [m.price] : []))
  const heroItems: HeroUnivers[] = univers.map((u) => {
    const unitPrices = u.models.flatMap((m) => (m.price != null ? [m.price] : []))
    const first = u.intro.split('. ')[0].replace(/\.$/, '')
    return {
      slug: u.slug,
      name: u.navLabel,
      count: u.models.length > 0 ? String(u.models.length).padStart(2, '0') : 'Sur mesure',
      from: unitPrices.length ? `Dès ${formatPrice(Math.min(...unitPrices))}` : 'Sur devis',
      line: first.length > 120 ? `${first.slice(0, 117).trimEnd()}…` : `${first}.`,
      image: universImage(u.slug),
    }
  })
  const ticker = univers.map((u) => u.navLabel)

  return (
    <>
      <PixelHero items={heroItems} />

      {/* --- Bandeau défilant ------------------------------------------- */}
      <div className="overflow-hidden border-b border-border py-6" aria-hidden="true">
        <div className="animate-marquee-x flex w-max">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center">
              {ticker.map((t, i) => (
                <li
                  key={t}
                  className={`flex items-center gap-10 pr-10 text-[clamp(1.75rem,4vw,3.25rem)] font-light tracking-[-0.04em] ${
                    i % 2 ? 'text-transparent [-webkit-text-stroke:1px_var(--t-text-muted)]' : 'text-heading'
                  }`}
                >
                  {t}
                  <span className="inline-block size-3 bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-14 sm:px-8 md:pt-20">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <FeatureTrio
              items={[
                {
                  icon: <Truck className="size-4" aria-hidden="true" />,
                  title: 'Livré monté',
                  text: 'Assemblé, testé et installé chez vous',
                },
                {
                  icon: <Paintbrush className="size-4" aria-hidden="true" />,
                  title: 'À votre image',
                  text: 'Covering, couleurs, logo',
                },
                {
                  icon: <BadgeCheck className="size-4" aria-hidden="true" />,
                  title: "Jusqu'à 3 ans de garantie",
                  text: 'Et une ligne directe après la vente',
                },
              ]}
            />
            <BriefCard>
              <BriefPoints
                items={[
                  "Bornes d'arcade, fléchettes, baby-foot, billards et flippers, en vente ou en location",
                  'Personnalisés à votre image : covering, couleurs, logo',
                  'Livrés montés et installés partout en France',
                  'De 899 € à 2 638,80 €, devis gratuit sous 48 heures',
                ]}
              />
            </BriefCard>
          </div>
          <div className="flex flex-col gap-6">
            <MakerCard />
            <SpecsCard
              rows={[
                { label: 'Modèles au catalogue', value: allModels.length },
                { label: 'Jeux sur les bornes PRO', value: "Jusqu'à 5 000" },
                {
                  label: 'Prix',
                  value: `${formatPrice(Math.min(...prices))} à ${formatPrice(Math.max(...prices))}`,
                },
                { label: 'Devis', value: 'Sous 48 heures' },
                { label: 'Paiement', value: 'En 2x, 3x ou 4x' },
                { label: 'Livraison', value: 'Toute la France' },
              ]}
            />
          </div>
        </div>
        <div className="mt-6">
          <DarkCta
            title="Pas encore décidé ?"
            text="Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage, la place et le budget."
            label="Parler de mon projet"
          />
        </div>
      </section>

      {/* --- Ce que RESTART fait pour vous ----------------------------- */}
      <Block>
        <SectionHeading title="Ce que RESTART fait à votre place" />
        <div className="cards-dim mt-12 center-grid [--cols:3]">
          {valueProps.map(({ icon: Icon, title, text }, i) => (
            <PaperCard
              key={title}
              delayMs={(i % 3) * 120}
              icon={<Icon className="size-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />}
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
        <div className="cards-dim mt-12 center-grid [--cols:4]">
          {univers.map((u, i) => (
            <Reveal key={u.slug} delayMs={(i % 4) * 100} className="h-full">
              <Link
                href={`/produits/${u.slug}/`}
                className="ox-glow group relative flex h-full flex-col overflow-hidden border border-border bg-card p-2 transition duration-300"
              >
                <span className="flex h-44 items-center justify-center overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={universImage(u.slug)}
                    alt={u.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex items-center justify-between gap-3 px-2 pb-2 pt-3">
                  <span>
                    <span className="block font-mono text-[10px] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block text-base tracking-tight text-heading">
                      {u.name}
                    </span>
                    <span className="text-[13px] text-muted-foreground">
                      {u.models.length > 0
                        ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                        : 'Sur devis'}
                    </span>
                  </span>
                  <span className="inline-flex size-8 shrink-0 items-center justify-center border border-border transition group-hover:border-accent group-hover:bg-accent group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
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
        <ol className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, index) => (
            <li
              key={s.n}
              className="ox-glow relative flex flex-col gap-4 border-b border-r border-border p-6 md:p-7"
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center bg-accent font-mono text-sm text-primary-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="ox-mono text-muted-foreground">{s.time}</span>
              </span>
              <h3 className="mt-6 text-xl tracking-tight">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
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
            className="aspect-[3/2] w-full border border-border object-cover"
          />
          <div>
            <p aria-hidden="true" className="ox-mono ox-index text-accent" />
            <h2 className="mt-4 text-balance text-[clamp(1.9rem,3.4vw,2.9rem)] font-light leading-[1.04] tracking-[-0.045em]">
              Un espace de pause vide reste vide. Avec un jeu, il se remplit tout seul.
            </h2>
            <p className="mt-4 text-muted-foreground">
              La partie dure cinq minutes, tout le monde sait jouer, et deux personnes qui ne se
              seraient pas parlé se retrouvent du même côté de la table.
            </p>
            <Link href="/realisations/" className="ox-btn mt-8">
              <span>Voir nos réalisations</span>
              <span aria-hidden="true">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </Block>

      {/* --- FAQ -------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 md:py-20">
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
