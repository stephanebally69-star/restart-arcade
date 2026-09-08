import Link from 'next/link'
import type { Metadata } from 'next'
import { univers } from '@/data/catalogue'
import { AudienceSwitch } from '@/components/AudienceSwitch'
import { AnswerBox, Eyebrow, Faq, Section, Stat } from '@/components/ui'
import { blogPosts } from '@/data/blog'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés — vente et location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

const steps = [
  {
    n: '01',
    title: 'On regarde votre espace',
    text: "Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage réel, les contraintes de place et le budget. C'est gratuit et sans engagement.",
  },
  {
    n: '02',
    title: 'On dessine votre équipement',
    text: 'Choix du modèle, du covering, des couleurs et des options. Vous validez un visuel avant toute fabrication — rien ne part en production sans votre accord.',
  },
  {
    n: '03',
    title: 'On livre et on installe',
    text: "Livraison montée, mise en service et prise en main sur place. Vous n'avez ni carton à ouvrir ni notice à lire.",
  },
  {
    n: '04',
    title: 'On reste joignable',
    text: 'Garantie 2 à 3 ans selon les modèles, et une ligne directe en cas de question. En formule location, la maintenance est incluse.',
  },
]

const homeFaq = [
  {
    q: 'RESTART vend ou loue ses équipements ?',
    a: "Les deux. La vente concerne surtout les particuliers et les entreprises qui préfèrent investir. La location, réservée aux professionnels, inclut la livraison, l'installation et la maintenance, sans immobiliser de trésorerie — c'est la formule la plus fréquente en bar et en commerce.",
  },
  {
    q: 'Où RESTART livre-t-il ?',
    a: "Partout en France métropolitaine. Notre atelier est situé à Villette-d'Anthon (38280), dans l'est lyonnais, ce qui nous permet d'intervenir rapidement sur Lyon, Villeurbanne, Bourgoin-Jallieu, Grenoble et Saint-Étienne.",
  },
  {
    q: 'Peut-on personnaliser un équipement à ses couleurs ou à son logo ?',
    a: "Oui. Le covering PVC, la couleur des boutons et le T-Molding sont personnalisables sur les bornes R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO. Les baby-foot sont disponibles en 6 à 8 couleurs. Un visuel vous est soumis pour validation avant fabrication.",
  },
  {
    q: 'Quel est le délai entre la commande et l\'installation ?',
    a: "Le devis est établi sous 48 heures. Pour un modèle standard, comptez ensuite deux à trois semaines. Pour un équipement entièrement personnalisé, le délai dépend de la validation du visuel et de la fabrication du covering.",
  },
  {
    q: 'Le paiement en plusieurs fois est-il possible ?',
    a: 'Oui, le paiement en 2, 3 ou 4 fois est disponible sur les achats en ligne. Pour les professionnels, la facturation et la location suivent les conditions précisées au devis.',
  },
]

export default function Home() {
  const latest = blogPosts.slice(0, 3)

  return (
    <>
      {/* --- Hero ------------------------------------------------------- */}
      <div className="relative overflow-hidden border-b border-line-soft">
        <div className="absolute inset-0 glow-neon" aria-hidden="true" />
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <Section className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Vente et location — France entière</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl">
              Le jeu qui fait{' '}
              <span className="bg-linear-to-r from-neon to-amber bg-clip-text text-transparent">
                revenir les gens
              </span>{' '}
              dans vos espaces.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-fog sm:text-xl">
              Bornes d&apos;arcade, fléchettes électroniques, baby-foot, billards et flippers
              numériques — personnalisés à votre image, livrés montés et installés par nos équipes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="rounded-xl bg-neon px-6 py-3.5 text-center font-semibold text-white shadow-[0_0_28px_#ff2e8b4d] transition hover:bg-neon/90"
              >
                Demander un devis gratuit
              </Link>
              <Link
                href="/produits/"
                className="rounded-xl border border-line px-6 py-3.5 text-center font-semibold text-chalk transition hover:border-fog"
              >
                Découvrir le catalogue
              </Link>
            </div>

            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <dt className="sr-only">Modèles au catalogue</dt>
                <dd>
                  <Stat value="12" label="modèles au catalogue" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">Jeux embarqués</dt>
                <dd>
                  <Stat value="5 000" label="jeux sur les bornes PRO" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">Prix d'entrée</dt>
                <dd>
                  <Stat value="899 €" label="à partir de" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">Délai de devis</dt>
                <dd>
                  <Stat value="48 h" label="pour recevoir un devis" />
                </dd>
              </div>
            </dl>
          </div>
        </Section>
      </div>

      {/* --- Sélecteur d'audience -------------------------------------- */}
      <Section>
        <Eyebrow>Par où commencer</Eyebrow>
        <h2 className="max-w-2xl font-display text-3xl sm:text-4xl">
          Dites-nous où vous voulez installer, on vous montre ce qui marche.
        </h2>
        <div className="mt-10">
          <AudienceSwitch />
        </div>
      </Section>

      {/* --- Univers ---------------------------------------------------- */}
      <div className="border-y border-line-soft bg-surface">
        <Section>
          <Eyebrow>Nos univers</Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl sm:text-4xl">Sept familles d&apos;équipements</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {univers.map((u) => (
              <Link
                key={u.slug}
                href={`/produits/${u.slug}/`}
                className="card group flex flex-col justify-between p-5"
              >
                <div>
                  <h3 className="font-display text-lg font-bold">{u.name}</h3>
                  <p className="mt-2 text-sm text-fog">{u.intro.split('.')[0]}.</p>
                </div>
                <p className="mt-6 text-sm font-semibold text-cyan">
                  {u.models.length > 0
                    ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                    : 'Sur devis'}
                  <span className="ml-1 inline-block transition group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* --- Méthode ---------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Comment ça se passe</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl">
              De l&apos;idée à la première partie, en quatre étapes.
            </h2>
            <p className="mt-5 text-fog">
              Nous ne vendons pas un carton à monter. Nous regardons votre espace, nous dessinons
              l&apos;équipement avec vous, et nous l&apos;installons.
            </p>
            <Link
              href="/contact/"
              className="mt-7 inline-block rounded-xl bg-neon px-6 py-3.5 font-semibold text-white transition hover:bg-neon/90"
            >
              Lancer mon projet
            </Link>
          </div>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="font-display text-sm font-bold text-neon" aria-hidden="true">
                  {s.n}
                </span>
                <div className="border-l border-line-soft pl-5">
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-fog">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* --- Réponse directe + FAQ -------------------------------------- */}
      <div className="border-t border-line-soft bg-surface">
        <Section>
          <div className="max-w-3xl">
            <AnswerBox>
              RESTART est un spécialiste français de l&apos;aménagement d&apos;espaces de
              convivialité, basé à Villette-d&apos;Anthon (38280), près de Lyon. L&apos;entreprise
              vend et loue des bornes d&apos;arcade (899 € à 2 478 €), des fléchettes électroniques,
              des baby-foot (1 249 € à 2 199 €), des billards, des flippers numériques, des fauteuils
              massants et des cocons de repos, avec personnalisation, livraison et installation
              partout en France.
            </AnswerBox>
          </div>
          <div className="mt-14 max-w-3xl">
            <Faq items={homeFaq} />
          </div>
        </Section>
      </div>

      {/* --- Derniers articles ------------------------------------------ */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Le blog</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl">Nos derniers articles</h2>
          </div>
          <Link href="/blog/" className="text-sm font-semibold text-cyan hover:underline">
            Tous les articles →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card flex flex-col p-5">
              <time dateTime={p.date} className="text-xs text-fog">
                {new Date(p.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-fog">{p.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* --- CTA final --------------------------------------------------- */}
      <div className="relative overflow-hidden border-t border-line-soft">
        <div className="absolute inset-0 glow-cyan" aria-hidden="true" />
        <Section className="relative text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl sm:text-4xl">
            Un espace vide, une idée vague, un budget à cadrer ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fog">
            Décrivez-nous votre projet en deux minutes. Nous revenons vers vous sous 48 heures avec
            une proposition chiffrée.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="rounded-xl bg-neon px-6 py-3.5 font-semibold text-white transition hover:bg-neon/90"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="rounded-xl border border-line px-6 py-3.5 font-semibold text-chalk transition hover:border-fog"
            >
              Appeler le {site.phone}
            </a>
          </div>
        </Section>
      </div>
    </>
  )
}
