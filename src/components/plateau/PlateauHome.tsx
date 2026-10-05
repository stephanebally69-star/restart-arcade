import Link from 'next/link'
import { ArrowRight, BadgeCheck, Check, ChevronRight, Star } from 'lucide-react'
import { allModels, audiences, findUnivers, formatPrice, modelsFor, univers, type Audience } from '@/data/catalogue'
import { ambiance, productImage, universImage } from '@/data/images'
import { googleRating, reviews } from '@/data/reviews'
import { asset } from '@/lib/site'
import { PlateauHero, type PlateauProduct } from './PlateauHero'

const priceFrom = (slug: string) => {
  const p = findUnivers(slug)?.models.flatMap((m) => (m.price != null ? [m.price] : [])) ?? []
  return p.length ? `dès ${formatPrice(Math.min(...p))}` : 'sur devis'
}

const formulas: Record<Audience, string[]> = {
  entreprise: ['Achat ou location', 'Maintenance incluse en location', 'Usage libre, sans monnayeur', "Garantie jusqu'à 3 ans"],
  'bar-commerce': ['Location sans immobiliser de trésorerie', 'Monnayeur en option', 'Maintenance assurée', 'À vos couleurs'],
  particulier: ['Paiement en 2x, 3x ou 4x', 'Livré monté et installé', 'Prise en main sur place', "Garantie jusqu'à 3 ans"],
}

const audiencePhotos: Record<Audience, { src: string; alt: string }> = {
  entreprise: { src: ambiance.equipe, alt: "Collègues autour d'une borne d'arcade dans un espace de pause" },
  'bar-commerce': { src: asset('/img/realisations/r140.webp'), alt: "Deux clients jouent sur une borne d'arcade RESTART dans un pub lyonnais" },
  particulier: { src: ambiance.salleDePause, alt: 'Salle de jeux équipée d’un baby-foot, d’un billard et d’une borne' },
}

/** Photos détourées des produits (public/img/plateau/), pour le hero et le catalogue. */
const cutout = (slug: string) => asset(`/img/plateau/${slug}.webp`)
const OWN_CUTOUTS = ['flipper-numerique', 'cocon-de-repos', 'fauteuil-massant']

function SectionTitle({ title, text, center = true }: { title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <h2 className="pl-display text-[2.4rem] leading-[1.02] sm:text-[3.2rem]">{title}</h2>
      {text && <p className="mt-5 text-[16px] leading-relaxed text-pl-ink/55">{text}</p>}
    </div>
  )
}

export function PlateauHome({ faq }: { faq: { q: string; a: string }[] }) {
  const heroProducts: PlateauProduct[] = [
    { name: "Borne d'arcade", image: cutout('borne-arcade'), height: 66 },
    { name: 'Flipper numérique', image: cutout('flipper-numerique'), height: 68 },
    { name: 'Baby-foot', image: cutout('baby-foot'), height: 48 },
    { name: 'Fléchettes électroniques', image: cutout('flechettes'), height: 62 },
    { name: 'Billard', image: cutout('billard'), height: 38 },
  ]

  const sheets = audiences.map((a) => {
    const seen = new Set<string>()
    const picks = modelsFor(a.id)
      .filter((m) => m.price != null && !seen.has(m.universSlug) && seen.add(m.universSlug))
      .slice(0, 3)
      .map((m) => ({
        name: m.name,
        family: m.universName,
        price: formatPrice(m.price!),
        image: productImage(m.slug),
        href: `/produits/${m.universSlug}/${m.slug}/`,
      }))
    return {
      id: a.id,
      label: a.label,
      title: a.short,
      blurb: a.blurb,
      photo: audiencePhotos[a.id].src,
      photoAlt: audiencePhotos[a.id].alt,
      picks,
      points: formulas[a.id],
    }
  })

  const grid = univers.map((u) => ({
    href: `/produits/${u.slug}/`,
    image: OWN_CUTOUTS.includes(u.slug) ? cutout(u.slug) : universImage(u.slug),
    title: u.name,
    text: u.intro.split('. ')[0].replace(/\.$/, '') + '.',
    price: priceFrom(u.slug),
  }))

  return (
    <div className="pl-root bg-pl-bg text-pl-ink">
      <PlateauHero products={heroProducts} />

      {/* Chiffres : la bande « ils nous font confiance » de Resend. */}
      <section className="border-t border-pl-ink/[0.07]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <p className="text-center text-sm text-pl-ink/45">
            Entreprises, bars et particuliers nous confient leurs espaces.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-y-6 text-center sm:grid-cols-5">
            <li>
              <span className="pl-stat">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-4 fill-pl-gold text-pl-gold" aria-hidden="true" />
                  {googleRating.value}
                </span>
              </span>
              <span className="pl-stat-label">avis Google</span>
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

      {/* Zone claire : un dégradé depuis le noir, puis les cartes et le catalogue sur fond blanc. */}
      <div aria-hidden="true" className="pl-fade-in h-40 sm:h-56" />
      <div className="pl-light">
        {/* Une carte par situation : entreprise, bar et commerce, particulier. */}
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-4 sm:px-6 lg:pb-32">
          <SectionTitle
            title="Prêt à jouer dès la livraison"
            text="Dites-nous où vous voulez installer, on vous propose l'équipement qui marche dans votre contexte. Le jour J, il arrive monté, testé et branché."
          />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {sheets.map((sheet) => (
              <li key={sheet.id} className="pl-card flex flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sheet.photo} alt={sheet.photoAlt} loading="lazy" className="size-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                    {sheet.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{sheet.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-pl-ink/55">{sheet.blurb}</p>
                  <ul className="mt-5 divide-y divide-pl-ink/[0.07] border-y border-pl-ink/[0.07]" aria-label="Nos conseils">
                    {sheet.picks.map((pick) => (
                      <li key={pick.href}>
                        <Link href={pick.href} className="group flex items-center gap-3 py-2.5">
                          <span className="pl-thumb flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                            {pick.image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={pick.image} alt="" loading="lazy" className="size-full object-contain p-0.5" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold">{pick.name}</span>
                            <span className="block text-[12px] text-pl-ink/45">{pick.family}</span>
                          </span>
                          <span className="text-[13px] text-pl-gold">{pick.price}</span>
                          <ArrowRight className="size-3.5 text-pl-ink/30 transition group-hover:translate-x-0.5 group-hover:text-pl-ink" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-col gap-2 text-[13px] text-pl-ink/65">
                    {sheet.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-pl-gold" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="pl-btn-secondary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold">
              Décrire mon espace
            </Link>
            <Link href="/realisations/" className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-semibold text-pl-ink/70 transition hover:text-pl-ink">
              Voir des réalisations
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Catalogue : la grille « Reach humans, not spam folders » de Resend. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-6 lg:pb-32">
            <SectionTitle title="Tout ce qui fait jouer" text="Sept familles d'équipements, livrés montés et installés. Chaque univers a sa page : modèles, prix, avantages selon votre situation." />
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {grid.map(({ href, image, title, text, price }) => (
                <li key={title}>
                  <Link href={href} className="pl-card group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5">
                    <span className="pl-tile relative flex h-52 items-end justify-center overflow-hidden px-6 pt-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt="" loading="lazy" className="relative max-h-full w-auto max-w-full object-contain pb-4 drop-shadow-[0_18px_22px_var(--pl-shadow)] transition duration-500 group-hover:scale-105" />
                    </span>
                    <span className="flex flex-1 flex-col gap-1.5 p-5">
                      <span className="text-[15px] font-semibold">{title}</span>
                      <span className="text-[13px] leading-relaxed text-pl-ink/50">{text}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] text-pl-gold">
                        {price}
                        <ArrowRight className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact/" className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset('/img/realisations/r129.webp')}
                    alt="Espace de jeux complet installé par RESTART : billard, fléchettes et bornes d'arcade"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <span className="relative flex flex-col gap-1.5 p-5 text-white">
                    <span className="text-[15px] font-semibold">Projet sur mesure</span>
                    <span className="text-[13px] leading-relaxed text-white/70">Un espace entier à équiper ? On compose l&apos;ensemble avec vous.</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[13px] text-[#f6e3be]">
                      devis sous 48 h
                      <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

      </div>
      <div aria-hidden="true" className="pl-fade-out h-40 sm:h-56" />

      {/* Avis : le défilé « Beyond expectations » de Resend. */}
      <section>
        <div className="pb-24 pt-4 lg:pb-32">
          <SectionTitle title="Ils ont essayé, ils en parlent" text={`Note Google : ${googleRating.value} sur 5.`} />
          <div className="pl-marquee mt-14" aria-label="Avis clients">
            <ul className="pl-marquee-track">
              {[...reviews, ...reviews].map((r, i) => (
                <li key={`${r.author}-${i}`} aria-hidden={i >= reviews.length} className="pl-card w-[320px] shrink-0 rounded-2xl p-6 text-left">
                  <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-3.5 fill-pl-gold text-pl-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-pl-ink/75">« {r.text} »</p>
                  <p className="mt-5 text-[13px] font-semibold">{r.author}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Questions fréquentes et appel final, côte à côte. */}
      <section className="border-t border-pl-ink/[0.07]">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-32">
          <div>
            <SectionTitle center={false} title="Vos questions" />
            <div className="mt-10 divide-y divide-pl-ink/[0.08] border-y border-pl-ink/[0.08]">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium">
                    {f.q}
                    <ChevronRight className="size-4 shrink-0 text-pl-ink/40 transition group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 pr-8 text-[14px] leading-relaxed text-pl-ink/55">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="pl-card relative overflow-hidden rounded-3xl lg:sticky lg:top-28">
            <div aria-hidden="true" className="pl-final-glow" />
            <div className="relative flex flex-col items-start px-7 py-12 sm:px-10 sm:py-14">
              <BadgeCheck className="size-7 text-pl-ink/60" strokeWidth={1.5} aria-hidden="true" />
              <p className="pl-display mt-6 text-[2.4rem] leading-[1.02] sm:text-[3rem]">
                Le jeu, livré monté.
                <br />
                Partout en France.
              </p>
              <p className="mt-5 max-w-sm text-pl-ink/55">
                Décrivez votre projet en deux minutes : proposition chiffrée sous 48 heures.
              </p>
              <Link href="/contact/" className="pl-btn-primary mt-9 inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold">
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
