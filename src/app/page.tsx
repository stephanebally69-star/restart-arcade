import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { allModels, formatPrice, univers } from '@/data/catalogue'
import { AudienceSwitch } from '@/components/AudienceSwitch'
import { Reveal } from '@/components/Reveal'
import { AnswerBox, Faq, FinalCta, Pill, SectionTitle } from '@/components/ui'
import { blogPosts } from '@/data/blog'
import { ambiance, blogImage, productImage, realisationPhotos, universImage } from '@/data/images'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés — vente et location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et flippers numériques. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

const stats = [
  { value: '12', unit: '', title: 'modèles au catalogue', text: 'Bornes, fléchettes, baby-foot et fauteuil massant au prix affiché.' },
  { value: '5 000', unit: '', title: 'jeux sur les bornes PRO', text: 'Des classiques des années 80 aux titres 32 bits, sans cartouche ni mise à jour.' },
  { value: '899', unit: '€', title: "prix d'entrée", text: 'La borne R-KIDS. Paiement en 2, 3 ou 4 fois possible.' },
  { value: '48', unit: 'h', title: 'pour recevoir un devis', text: 'Audit de votre espace et proposition chiffrée, gratuits et sans engagement.' },
]

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
    text: 'Choix du modèle, du covering, des couleurs et des options. Vous validez un visuel avant toute fabrication — rien ne part en production sans votre accord.',
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

const guarantees = [
  {
    title: 'Personnalisé à votre image',
    text: 'Covering PVC, couleur des boutons, T-Molding, logo : un visuel vous est soumis avant fabrication.',
  },
  {
    title: 'Livré monté, testé, installé',
    text: 'Nos équipements arrivent assemblés. Vous branchez, vous jouez.',
  },
  {
    title: 'Achat ou location',
    text: 'La location pro inclut livraison, installation et maintenance, sans immobiliser de trésorerie.',
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

const heroSide = ['bf-premium', 'r-dart-pro']
  .map((slug) => allModels.find((m) => m.slug === slug)!)
  .filter(Boolean)
const heroMain = allModels.find((m) => m.slug === 'r-pro')!

export default function Home() {
  const latest = blogPosts.slice(0, 3)
  const strip = realisationPhotos.slice(0, 14)

  return (
    <>
      {/* --- Hero ------------------------------------------------------- */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-14 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Pill>Vente et location — France entière</Pill>
          <h1 className="text-balance font-serif text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-indigo-900 sm:text-5xl md:text-6xl lg:text-[66px]">
            Le jeu qui fait <em>revenir les gens</em> dans vos espaces.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-[1.55] text-ink-soft md:text-xl">
            Bornes d&apos;arcade, fléchettes électroniques, baby-foot, billards et flippers
            numériques — personnalisés à votre image, livrés montés et installés par nos équipes.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact/" className="btn-primary">
              Demander un devis gratuit
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/produits/" className="btn-secondary">
              Découvrir le catalogue
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Devis sous 48 h · Livraison et installation incluses · Paiement en 2x, 3x ou 4x
          </p>
        </div>

        {/* Composition produit : visuel principal + deux cartes flottantes. */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(232,178,82,0.22),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(91,82,200,0.18),transparent_60%)]"
          />
          <Link
            href={`/produits/${heroMain.universSlug}/${heroMain.slug}/`}
            className="product-shot relative block overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-paper-lg)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImage(heroMain.slug)}
              alt={`Bornes d'arcade ${heroMain.name} personnalisées`}
              width={1400}
              height={1206}
              fetchPriority="high"
              className="aspect-[7/6] w-full object-contain p-4"
            />
            <span className="absolute bottom-4 left-4 rounded-full border border-border bg-paper/95 px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-[var(--shadow-paper-sm)] backdrop-blur">
              <span className="font-semibold text-indigo-900">{heroMain.name}</span> · 5 000 jeux ·{' '}
              {formatPrice(heroMain.price!)}
            </span>
          </Link>
          {heroSide.map((m, i) => (
            <Link
              key={m.slug}
              href={`/produits/${m.universSlug}/${m.slug}/`}
              className={`absolute hidden w-44 overflow-hidden rounded-2xl border border-border bg-paper shadow-[var(--shadow-paper-md)] transition hover:-translate-y-1 sm:block ${
                i === 0
                  ? 'animate-float-slow -left-10 top-10 xl:-left-16'
                  : 'animate-float-med -right-6 -bottom-8 xl:-right-10'
              }`}
            >
              <span className="product-shot block aspect-4/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productImage(m.slug)}
                  alt={m.name}
                  loading="lazy"
                  className="size-full object-contain p-2"
                />
              </span>
              <span className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
                <span className="text-xs font-semibold text-indigo-900">{m.name}</span>
                <span className="font-serif text-sm text-amber-700">
                  {m.price != null ? formatPrice(m.price) : 'Devis'}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- Bandeau de photos clients ---------------------------------- */}
      <section aria-label="Installations réalisées" className="overflow-hidden pb-16">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Déjà installé chez des entreprises, bars, campings et particuliers
        </p>
        <div className="flex w-max animate-marquee-x gap-4">
          {[...strip, ...strip].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="size-40 shrink-0 rounded-2xl border border-border object-cover shadow-[var(--shadow-paper-sm)] md:size-48"
            />
          ))}
        </div>
      </section>

      {/* --- Chiffres (bandeau indigo) ---------------------------------- */}
      <section className="relative overflow-hidden bg-indigo-900 text-amber-200">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(232,178,82,0.12), transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(91,82,200,0.20), transparent 55%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-amber-400">Pourquoi RESTART</span>
            <h2 className="mt-3.5 text-balance font-serif text-3xl font-normal leading-[1.05] text-paper md:text-4xl lg:text-5xl">
              Un espace de pause vide reste vide.{' '}
              <em className="text-amber-400">Avec un jeu, il se remplit tout seul.</em>
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base text-amber-50/70 md:text-lg">
              La partie dure cinq minutes, tout le monde sait jouer, et deux personnes qui ne se
              seraient pas parlé se retrouvent du même côté de la table.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.title} delayMs={i * 80}>
                <article className="h-full rounded-3xl border border-amber-400/15 bg-gradient-to-b from-amber-400/[0.04] to-amber-400/[0.01] p-7">
                  <div className="flex items-baseline gap-1 font-serif text-5xl font-normal leading-none tracking-[-0.03em] text-amber-400">
                    {s.value}
                    {s.unit && <span className="text-2xl text-amber-400/60">{s.unit}</span>}
                  </div>
                  <h3 className="mt-3.5 font-sans text-base font-semibold text-paper">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-amber-50/60">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sélecteur d'audience -------------------------------------- */}
      <section className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <SectionTitle
            eyebrow="Par où commencer"
            title="Dites-nous où vous voulez installer, "
            em="on vous montre ce qui marche."
          />
          <div className="mt-10">
            <AudienceSwitch />
          </div>
        </div>
      </section>

      {/* --- Univers ---------------------------------------------------- */}
      <section className="bg-cream-2">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Nos univers"
              title="Sept familles "
              em="d'équipements"
              subtitle="Du baby-foot d'extérieur au cocon de repos, tout est personnalisable et livré monté."
            />
            <Link href="/produits/" className="btn-secondary bg-paper">
              Tout le catalogue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {univers.map((u, i) => (
              <Reveal
                key={u.slug}
                delayMs={(i % 4) * 70}
                className={i === 0 ? 'sm:col-span-2' : ''}
              >
                <Link
                  href={`/produits/${u.slug}/`}
                  className="card group flex h-full flex-col overflow-hidden"
                >
                  <span
                    className={`product-shot block overflow-hidden border-b border-border ${
                      i === 0 ? 'aspect-[8/3]' : 'aspect-4/3'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={universImage(u.slug)}
                      alt={u.name}
                      loading="lazy"
                      className="size-full object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="flex items-end justify-between gap-3 p-5">
                    <span>
                      <span className="block font-serif text-xl text-indigo-900">{u.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {u.models.length > 0
                          ? `${u.models.length} modèle${u.models.length > 1 ? 's' : ''}`
                          : 'Sur devis'}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-amber-600 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Méthode ---------------------------------------------------- */}
      <section className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <SectionTitle
            eyebrow="Comment ça se passe"
            title="De l'idée à la première partie, "
            em="en quatre étapes."
            subtitle="Nous ne vendons pas un carton à monter. Nous regardons votre espace, nous dessinons l'équipement avec vous, et nous l'installons."
          />
          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delayMs={i * 80}>
                <article className="h-full rounded-3xl border border-border bg-paper p-7">
                  <div className="font-serif text-[54px] font-normal italic leading-none tracking-[-0.02em] text-amber-500">
                    {s.n}
                  </div>
                  <h3 className="mt-3.5 font-serif text-xl font-medium leading-tight tracking-[-0.015em] text-indigo-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  <div className="mt-3.5 font-mono text-[11px] tracking-wider text-muted-foreground">
                    {s.time}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Mise en situation ----------------------------------------- */}
      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ambiance.salleDePause}
                alt="Salle de pause équipée d'un baby-foot, d'un billard et d'une borne d'arcade"
                loading="lazy"
                className="aspect-[3/2] w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-paper-lg)]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ambiance.bar}
                alt="Borne d'arcade personnalisée aux couleurs d'un bar"
                loading="lazy"
                className="absolute -bottom-8 -right-4 hidden w-36 rotate-3 rounded-2xl border-4 border-paper object-cover shadow-[var(--shadow-paper-md)] sm:block"
              />
            </div>
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="Clé en main"
              title="Vous choisissez, "
              em="on s'occupe du reste."
              subtitle="Du premier échange à la première partie, un seul interlocuteur basé à Villette-d'Anthon, près de Lyon."
            />
            <ul className="mt-8 space-y-3.5">
              {guarantees.map((g) => (
                <li
                  key={g.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-border bg-cream-2 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-700"
                  >
                    <CheckCircle2 className="size-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-medium tracking-[-0.01em] text-indigo-900">
                      {g.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{g.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/realisations/" className="btn-secondary mt-8">
              Voir nos réalisations
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Derniers articles ------------------------------------------ */}
      <section className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Le blog" title="Nos derniers " em="articles" />
            <Link href="/blog/" className="btn-secondary bg-paper">
              Tous les articles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {latest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="card group flex flex-col overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blogImage(p.slug)}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/2] w-full border-b border-border object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="mt-2 font-serif text-xl leading-snug text-indigo-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-soft">{p.description}</p>
                  <time dateTime={p.date} className="mt-4 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Réponse directe + FAQ -------------------------------------- */}
      <section className="bg-paper">
        <div className="mx-auto w-full max-w-4xl px-6 py-24 md:py-28">
          <AnswerBox>
            RESTART est un spécialiste français de l&apos;aménagement d&apos;espaces de
            convivialité, basé à Villette-d&apos;Anthon (38280), près de Lyon. L&apos;entreprise vend
            et loue des bornes d&apos;arcade (899 € à 2 478 €), des fléchettes électroniques, des
            baby-foot (1 249 € à 2 199 €), des billards, des flippers numériques, des fauteuils
            massants et des cocons de repos, avec personnalisation, livraison et installation
            partout en France.
          </AnswerBox>
          <div className="mt-16">
            <Faq items={homeFaq} title="Vos questions, nos réponses" />
          </div>
        </div>
      </section>

      <FinalCta
        title="Un espace vide, une idée vague, "
        em="un budget à cadrer ?"
        subtitle="Décrivez-nous votre projet en deux minutes. Nous revenons vers vous sous 48 heures avec une proposition chiffrée."
      />
    </>
  )
}
