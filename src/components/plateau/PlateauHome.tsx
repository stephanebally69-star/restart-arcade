import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  Armchair,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleDot,
  Gamepad2,
  Goal,
  Joystick,
  Moon,
  Sparkles,
  Star,
  Target,
  Trophy,
} from 'lucide-react'
import { allModels, audiences, findUnivers, formatPrice, modelsFor, univers, type Audience } from '@/data/catalogue'
import { productImage } from '@/data/images'
import { googleRating, reviews } from '@/data/reviews'
import { PlateauHero, type PlateauProduct } from './PlateauHero'
import { ProjectTabs, type ProjectSheet } from './ProjectTabs'

const priceFrom = (slug: string) => {
  const p = findUnivers(slug)?.models.flatMap((m) => (m.price != null ? [m.price] : [])) ?? []
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'sur devis'
}

const formulas: Record<Audience, [string, string][]> = {
  entreprise: [
    ['formule', 'achat ou location'],
    ['location', 'livraison, installation et maintenance incluses'],
    ['usage', 'libre, sans monnayeur'],
  ],
  'bar-commerce': [
    ['formule', 'location, sans immobiliser de trésorerie'],
    ['monnayeur', 'en option, pour un revenu direct'],
    ['maintenance', 'assurée pendant toute la location'],
  ],
  particulier: [
    ['formule', 'achat'],
    ['paiement', 'en 2x, 3x ou 4x'],
    ['prise en main', 'sur place, le jour de la livraison'],
  ],
}

const icons: Record<string, LucideIcon> = {
  'borne-arcade': Gamepad2,
  flechettes: Target,
  'baby-foot': Goal,
  billard: CircleDot,
  'flipper-numerique': Joystick,
  'fauteuil-massant': Armchair,
  'cocon-de-repos': Moon,
}

function SectionTitle({ title, text, center = true }: { title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <h2 className="pl-display text-[2.4rem] leading-[1.02] sm:text-[3.2rem]">{title}</h2>
      {text && <p className="mt-5 text-[16px] leading-relaxed text-white/55">{text}</p>}
    </div>
  )
}

export function PlateauHome({ faq }: { faq: { q: string; a: string }[] }) {
  const heroProducts: PlateauProduct[] = [
    { name: 'Baby-foot', detail: `4 modèles, ${priceFrom('baby-foot')}`, href: '/produits/baby-foot/' },
    { name: 'Flipper numérique', detail: '500 tables, sur devis', href: '/produits/flipper-numerique/' },
    { name: 'Fléchettes électroniques', detail: `30 modes de jeu, ${priceFrom('flechettes')}`, href: '/produits/flechettes/' },
    { name: "Borne d'arcade", detail: `5 000 jeux, ${priceFrom('borne-arcade')}`, href: '/produits/borne-arcade/' },
    { name: 'Billard', detail: 'achat ou location, sur devis', href: '/produits/billard/' },
  ]

  const sheets: ProjectSheet[] = audiences.map((a) => {
    const picks = modelsFor(a.id)
      .filter((m) => m.price != null)
      .slice(0, 3)
      .map((m) => `${m.name} (${formatPrice(m.price!)})`)
      .join(', ')
    return {
      id: a.id,
      label: a.label,
      file: `projet-${a.id}.restart`,
      lines: [
        ['pour', a.short.toLowerCase()],
        ['modèles', picks],
        ...formulas[a.id],
        ['personnalisation', 'covering, couleurs, logo'],
        ['livraison', 'monté, testé et installé'],
        ['délai', '2 à 3 semaines'],
        ['garantie', "jusqu'à 3 ans"],
      ],
    }
  })

  const grid = [
    ...univers.map((u) => ({
      href: `/produits/${u.slug}/`,
      icon: icons[u.slug] ?? Sparkles,
      title: u.name,
      text: u.intro.split('. ')[0].replace(/\.$/, '') + '.',
      price: priceFrom(u.slug),
    })),
    {
      href: '/contact/',
      icon: Trophy,
      title: 'Basket arcade',
      text: "Le panier de salle d'arcade, habillé à vos couleurs.",
      price: 'sur demande',
    },
    {
      href: '/contact/',
      icon: Sparkles,
      title: 'Projet sur mesure',
      text: "Un espace entier à équiper ? On compose l'ensemble avec vous.",
      price: 'devis sous 48 h',
    },
  ]

  const featured = reviews.find((r) => r.featured)!
  const others = reviews.filter((r) => !r.featured)
  const steps = [
    { tag: 'Devis', status: 'Envoyé', when: 'J+2', text: 'Proposition chiffrée après un échange de 20 minutes' },
    { tag: 'Visuel', status: 'Validé', when: 'J+5', text: 'Covering, couleurs et logo validés par vous' },
    { tag: 'Atelier', status: 'En cours', when: 'J+6', text: 'Fabrication et tests en Isère' },
    { tag: 'Livraison', status: 'Planifiée', when: 'J+18', text: 'Livré monté, installé, prise en main sur place' },
    { tag: 'Suivi', status: 'Actif', when: '3 ans', text: 'Garantie et ligne directe après la vente' },
  ]

  return (
    <div className="pl-root bg-black text-white">
      <PlateauHero products={heroProducts} />

      {/* Chiffres : la bande « ils nous font confiance » de Resend. */}
      <section className="border-y border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <p className="text-center text-sm text-white/45">
            Entreprises, bars et particuliers nous confient leurs espaces.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-y-6 text-center sm:grid-cols-5">
            <li>
              <span className="pl-stat">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-4 fill-[#f6e3be] text-[#f6e3be]" aria-hidden="true" />
                  {googleRating.value}
                </span>
              </span>
              <span className="pl-stat-label">{googleRating.count} avis Google</span>
            </li>
            <li>
              <span className="pl-stat">{allModels.length}</span>
              <span className="pl-stat-label">modèles au catalogue</span>
            </li>
            <li>
              <span className="pl-stat">5 000</span>
              <span className="pl-stat-label">jeux sur les bornes PRO</span>
            </li>
            <li>
              <span className="pl-stat">48 h</span>
              <span className="pl-stat-label">pour recevoir un devis</span>
            </li>
            <li className="col-span-2 sm:col-span-1">
              <span className="pl-stat">3 ans</span>
              <span className="pl-stat-label">de garantie, au plus</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Fiche projet : le « Integrate this afternoon » de Resend. */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <div>
          <SectionTitle
            center={false}
            title="Prêt à jouer dès la livraison"
            text="Dites-nous où vous voulez installer, on vous propose l'équipement qui marche dans votre contexte. Le jour J, il arrive monté, testé et branché."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className="pl-btn-secondary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold">
              Décrire mon espace
            </Link>
            <Link href="/realisations/" className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-semibold text-white/70 transition hover:text-white">
              Voir des réalisations
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ProjectTabs sheets={sheets} />
      </section>

      {/* Clé en main : le « First-class developer experience » de Resend. */}
      <section className="pl-section-glow">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
          <SectionTitle
            title="Clé en main, du premier appel à la maintenance"
            text="Nous ne vendons pas un carton à monter. Nous regardons votre espace, dessinons l'équipement avec vous, l'installons, et restons joignables ensuite."
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <article className="pl-card flex flex-col overflow-hidden rounded-2xl">
              <div className="relative flex h-72 items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(circle_at_50%_30%,rgba(246,227,190,0.12),transparent_60%)]">
                <div className="pl-mock w-[78%] max-w-sm rounded-xl p-3">
                  <div className="flex items-center justify-between px-1 pb-2 text-[11px] text-white/45">
                    <span className="font-[family-name:var(--ff-plexmono)]">visuel-r-pro-v2.png</span>
                    <span className="rounded-full bg-[#f6e3be]/15 px-2 py-0.5 text-[#f6e3be]">À valider</span>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={productImage('r-pro')} alt="Bornes R-PRO personnalisées avec un covering sur mesure" loading="lazy" className="h-40 w-full object-contain" />
                  </div>
                  <div className="mt-3 flex gap-2" aria-hidden="true">
                    <span className="flex-1 rounded-lg bg-white py-1.5 text-center text-[12px] font-semibold text-black">Valider</span>
                    <span className="flex-1 rounded-lg border border-white/15 py-1.5 text-center text-[12px] text-white/70">Modifier</span>
                  </div>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-lg font-semibold">Un visuel avant toute fabrication</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">
                  Covering, couleurs, logo : vous validez une image de votre équipement. Rien ne part en
                  production sans votre accord.
                </p>
                <Link href="/contact/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white">
                  En savoir plus <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="pl-card flex flex-col overflow-hidden rounded-2xl">
              <div className="relative h-72 overflow-hidden border-b border-white/[0.07]">
                <ul className="pl-fade-y flex flex-col gap-2 p-6" aria-label="Exemple de déroulé d'un projet">
                  {steps.map((s) => (
                    <li key={s.tag} className="pl-mock flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px]">
                      <span className="size-2 shrink-0 rounded-full bg-[#7ee2a8] shadow-[0_0_10px_#7ee2a8]" aria-hidden="true" />
                      <span className="w-20 shrink-0 font-semibold">{s.tag}</span>
                      <span className="min-w-0 flex-1 truncate text-white/50">{s.text}</span>
                      <span className="shrink-0 font-[family-name:var(--ff-plexmono)] text-[11px] text-white/35">{s.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7">
                <h3 className="text-lg font-semibold">Un suivi de bout en bout</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">
                  Devis sous 48 heures, livraison en 2 à 3 semaines pour un modèle standard, garantie
                  jusqu&apos;à 3 ans. En location, la maintenance est comprise.
                </p>
                <Link href="/qui-sommes-nous/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white">
                  Qui sommes-nous <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Personnalisation : l'éditeur de Resend. */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
        <SectionTitle
          title="Personnalisé à votre image"
          text="Covering PVC, couleur des boutons, T-Molding et logo sur les bornes R-TWIN, R-EVOLUTION, R-PRO et la R-DART PRO. Les baby-foot existent en 6 à 8 couleurs."
        />
        <div className="pl-panel mt-14 overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <span className="ml-3 text-[13px] text-white/55">Borne R-PRO · votre covering</span>
            <span className="ml-auto rounded-lg border border-white/10 px-2.5 py-1 text-[12px] text-white/60" aria-hidden="true">
              Aperçu
            </span>
          </div>
          <div className="grid md:grid-cols-[1fr_260px]">
            <div className="flex items-center justify-center bg-white p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImage('r-pro')} alt="Trois bornes R-PRO habillées d'un covering personnalisé" loading="lazy" className="max-h-[380px] w-full object-contain" />
            </div>
            <dl className="flex flex-col gap-6 border-t border-white/[0.07] p-6 text-[13px] md:border-l md:border-t-0">
              <div>
                <dt className="text-white/45">Covering</dt>
                <dd className="mt-2 rounded-lg border border-white/10 px-3 py-2 text-white/80">Visuel sur mesure, PVC</dd>
              </div>
              <div>
                <dt className="text-white/45">Boutons</dt>
                <dd className="mt-2 flex gap-2" aria-label="Couleurs de boutons au choix">
                  {['#f4f4f4', '#e5484d', '#3e63dd', '#f5d90a', '#30a46c', '#8e4ec6'].map((c) => (
                    <span key={c} className="size-6 rounded-full border border-white/20" style={{ background: c }} />
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">T-Molding</dt>
                <dd className="mt-2 flex gap-2" aria-label="Couleurs de T-Molding au choix">
                  {['#111111', '#c9ccd1', '#e5484d', '#3e63dd', '#f5a524'].map((c) => (
                    <span key={c} className="h-6 w-3 rounded-sm border border-white/20" style={{ background: c }} />
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Logo</dt>
                <dd className="mt-2 rounded-lg border border-dashed border-white/15 px-3 py-2 text-white/60">votre-logo.svg</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Catalogue : la grille « Reach humans, not spam folders » de Resend. */}
      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
          <SectionTitle title="Tout ce qui fait jouer" text="Sept familles d'équipements, livrés montés et installés. Chaque univers a sa page : modèles, prix, avantages selon votre situation." />
          <ul className="pl-grid mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
            {grid.map(({ href, icon: Icon, title, text, price }) => (
              <li key={title}>
                <Link href={href} className="group flex h-full flex-col gap-3 p-7 transition hover:bg-white/[0.025] sm:p-8">
                  <Icon className="size-5 text-white/70" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="text-[15px] font-semibold">{title}</h3>
                  <p className="text-[14px] leading-relaxed text-white/50">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] text-[#f6e3be]">
                    {price}
                    <ArrowRight className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avis : la citation et le défilé « Beyond expectations » de Resend. */}
      <section className="pl-section-glow border-t border-white/[0.07]">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 lg:py-32">
          <figure>
            <blockquote className="pl-display text-[1.8rem] leading-[1.2] sm:text-[2.4rem]">
              « {featured.text} »
            </blockquote>
            <figcaption className="mt-8 text-sm text-white/55">
              <span className="font-semibold text-white">{featured.author}</span> · avis Google
            </figcaption>
          </figure>
        </div>
        <div className="pb-24">
          <SectionTitle title="Ils ont essayé, ils en parlent" text={`Note de ${googleRating.value} sur ${googleRating.count} avis Google.`} />
          <div className="pl-marquee mt-14" aria-label="Avis clients">
            <ul className="pl-marquee-track">
              {[...others, ...others].map((r, i) => (
                <li key={`${r.author}-${i}`} aria-hidden={i >= others.length} className="pl-card w-[320px] shrink-0 rounded-2xl p-6 text-left">
                  <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-3.5 fill-[#f6e3be] text-[#f6e3be]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/75">« {r.text} »</p>
                  <p className="mt-5 text-[13px] font-semibold">{r.author}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Questions fréquentes. */}
      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
          <SectionTitle title="Vos questions" />
          <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium">
                  {f.q}
                  <ChevronRight className="size-4 shrink-0 text-white/40 transition group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-3 pr-8 text-[14px] leading-relaxed text-white/55">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Appel final : « Email reimagined. Available today. » */}
      <section className="relative overflow-hidden border-t border-white/[0.07]">
        <div aria-hidden="true" className="pl-final-glow" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center sm:px-6 lg:py-36">
          <BadgeCheck className="size-7 text-white/60" strokeWidth={1.5} aria-hidden="true" />
          <p className="pl-display mt-6 text-[2.6rem] leading-[1.02] sm:text-[3.8rem]">
            Le jeu, livré monté.
            <br />
            Partout en France.
          </p>
          <p className="mt-5 max-w-md text-white/55">
            Décrivez votre projet en deux minutes : proposition chiffrée sous 48 heures.
          </p>
          <Link href="/contact/" className="pl-btn-primary mt-9 inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold">
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </div>
  )
}
