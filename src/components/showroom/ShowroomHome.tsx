import Link from 'next/link'
import { allModels, univers } from '@/data/catalogue'
import { ambiance } from '@/data/images'
import { asset } from '@/lib/site'
import { HeroFilm, type FilmShot } from './HeroFilm'
import { CategoryCarousel, type Category } from './CategoryCarousel'

/*
 * Accueil de la version Showroom. Reprend, section par section, la disposition de
 * poltronesofa.com/fr-FR (relevée le 7 octobre 2026) :
 *   1. film plein écran ;
 *   2. grand titre à gauche, paragraphe en capitales à droite ;
 *   3. carrousel des gammes, deux photos par vue, légendes en capitales ;
 *   4. « Plus de 300 magasins » : média à gauche, accroche et bouton marine à droite ;
 *   5. « Pourquoi nous choisir » : trois photos titrées, bouton « Plus d'infos ».
 * Le contenu vient du catalogue et des pages existantes : rien n'est inventé.
 */

const img = (p: string) => asset(`/img/${p}.webp`)

const shots: FilmShot[] = [
  { src: img('situations/bar'), alt: "Bar équipé d'un flipper, d'une cible de fléchettes, d'une borne d'arcade, d'un baby-foot et d'un billard" },
  { src: img('situations/entreprise'), alt: '' },
  { src: img('hero/borne-arcade'), alt: '' },
  { src: img('situations/maison'), alt: '' },
]

/** Légendes au pluriel, comme « Canapés relax », « Canapés d'angle ». */
const categories: Category[] = [
  { href: '/produits/borne-arcade/', label: "Bornes d'arcade", image: img('situations/borne-arcade'), alt: "Borne d'arcade dans un bar, des amis autour" },
  { href: '/produits/baby-foot/', label: 'Baby-foot', image: img('situations/baby-foot'), alt: 'Baby-foot en bois dans un salon' },
  { href: '/produits/flechettes/', label: 'Fléchettes électroniques', image: img('situations/flechettes'), alt: 'Partie de fléchettes électroniques dans un bar' },
  { href: '/produits/billard/', label: 'Billards', image: img('situations/billard'), alt: "Partie de billard entre collègues" },
  { href: '/produits/flipper-numerique/', label: 'Flippers numériques', image: img('situations/flipper-numerique'), alt: 'Flipper numérique dans un espace de pause' },
  { href: '/produits/fauteuil-massant/', label: 'Fauteuils massants', image: img('situations/fauteuil-massant'), alt: "Fauteuil massant dans l'espace détente d'un bureau" },
  { href: '/produits/cocon-de-repos/', label: 'Cocons de repos', image: img('situations/cocon-de-repos'), alt: 'Cocon de repos dans une salle de récupération' },
  { href: '/contact/', label: 'Projets sur mesure', image: img('situations/sur-mesure'), alt: 'Salle de jeux sur mesure : baby-foot, borne et fléchettes' },
]

/** Les trois cartes « Pourquoi nous choisir » : photo, puis titre et engagement dessous (textes de la méthode RESTART). */
const reasons = [
  {
    title: 'Conseil',
    text: "Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage, la place et le budget. Gratuit et sans engagement.",
    image: img('situations/entreprise'),
    alt: "Collègues autour d'un billard installé par RESTART",
  },
  {
    title: 'Personnalisation',
    text: 'Covering, couleur des boutons, logo : vous validez un visuel avant toute fabrication.',
    image: img('hero/baby-foot'),
    alt: 'Baby-foot en bois gravé au nom du client',
  },
  {
    title: 'Installation',
    text: "Livré monté, mis en service et pris en main sur place, partout en France. Ni carton à ouvrir ni notice à lire.",
    image: img('hero/flechettes'),
    alt: 'Borne de fléchettes électroniques installée chez un client',
  },
]

const btn =
  'inline-flex h-12 w-full items-center justify-center px-6 text-[12px] font-bold uppercase tracking-[0.02em] transition hover:brightness-125'

export function ShowroomHome() {
  return (
    <div className="sr-home bg-[#fffdfc] text-[#283444]">
      {/* 1. Film -------------------------------------------------------- */}
      <HeroFilm shots={shots} />

      {/* 2. Titre et engagement ---------------------------------------- */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-32">
        <h1 className="sr-display text-[44px] leading-[0.92] sm:text-[56px] lg:text-[65.6px]">
          Transformez vos espaces avec RESTART.
        </h1>
        <p className="max-w-[600px] text-[15px] font-medium uppercase leading-6 md:text-base">
          {univers.length} familles d&apos;équipements, {allModels.length} modèles au catalogue et jusqu&apos;à
          5&nbsp;000 jeux sur nos bornes pro. Un covering à vos couleurs, une livraison montée partout en France.
          Voilà ce que signifie pour nous <strong className="font-bold">créateur de bien-être en entreprise</strong>.
        </p>
      </section>

      {/* 3. Gammes ------------------------------------------------------ */}
      <section aria-label="Nos gammes" className="pb-12 md:pb-14">
        <CategoryCarousel items={categories} />
      </section>

      {/* 4. Atelier et showroom ---------------------------------------- */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-[56%_1fr] md:py-24 lg:gap-16 lg:pl-0 lg:pr-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ambiance.showroom}
          alt="Le showroom RESTART : borne d'arcade, cible de fléchettes, baby-foot, fauteuil massant et cocon de repos"
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
        <div className="max-w-[430px]">
          <p className="text-[26px] leading-[1.05] md:text-[32px]">
            <strong className="font-semibold">Un atelier et un showroom</strong> près de Lyon, une livraison
            partout en France.
          </p>
          <Link href="/contact/" className={`${btn} mt-12 bg-[#283444] text-white`}>
            Venir nous voir
          </Link>
        </div>
      </section>

      {/* 5. Pourquoi nous choisir --------------------------------------- */}
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 md:pb-24 lg:px-16">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="sr-display text-[36px] leading-none md:text-[48px]">Pourquoi nous choisir</h2>
          <p className="max-w-[560px] text-[14px] font-medium uppercase leading-6 md:text-[15px]">
            <strong className="font-bold">Conseil, personnalisation, installation.</strong> Les raisons de nous
            choisir sont nombreuses, mais une seule devrait suffire. Nous ne vendons pas{' '}
            <strong className="font-bold">un carton à monter</strong> : nous regardons votre espace, dessinons
            l&apos;équipement avec vous et <strong className="font-bold">l&apos;installons</strong>.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {reasons.map((r) => (
            <li key={r.title}>
              <Link href="/qui-sommes-nous/" className="group block">
                <span className="block aspect-[14/15] overflow-hidden bg-[#283444]/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.image}
                    alt={r.alt}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block pt-5 text-center text-[19px] font-bold uppercase leading-tight tracking-[0.06em] text-[#283444] md:text-[24px]">
                  {r.title}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-3 block h-[3px] w-10 bg-[#c4262e] transition-all duration-300 group-hover:w-20"
                />
                <span className="mx-auto mt-4 block max-w-[340px] text-center text-[15px] leading-relaxed text-[#283444]/80">
                  {r.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <Link href="/qui-sommes-nous/" className={`${btn} max-w-[435px] bg-[#283444] text-white`}>
            Plus d&apos;infos
          </Link>
        </div>
      </section>
    </div>
  )
}
