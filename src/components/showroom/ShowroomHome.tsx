import Link from 'next/link'
import { allModels, formatPrice, univers } from '@/data/catalogue'
import { ambiance } from '@/data/images'
import { asset } from '@/lib/site'
import { HeroFilm, type FilmShot } from './HeroFilm'
import { CategoryCarousel, type Category } from './CategoryCarousel'
import { PlayPanel } from './PlayPanel'

/*
 * Accueil de la version Showroom. Reprend, section par section, la disposition de
 * poltronesofa.com/fr-FR (relevée le 7 octobre 2026) :
 *   1. film plein écran ;
 *   2. grand titre à gauche, paragraphe en capitales à droite ;
 *   3. carrousel des gammes, deux photos par vue, légendes en capitales ;
 *   4. bandeau marine : média à bouton lecture rouge, accroche en capitales, bouton rouge ;
 *   5. « Plus de 300 magasins » : média à gauche, accroche et bouton marine à droite ;
 *   6. « Pourquoi nous choisir » : trois photos signées, bouton « Plus d'infos ».
 * Le contenu vient du catalogue et des pages existantes : rien n'est inventé.
 */

const img = (p: string) => asset(`/img/${p}.webp`)

const shots: FilmShot[] = [
  { src: ambiance.salleDePause, alt: "Salle de pause équipée d'un baby-foot, d'un billard, d'une borne d'arcade et d'un fauteuil massant" },
  { src: img('situations/entreprise'), alt: '' },
  { src: img('situations/bar'), alt: '' },
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

const reel = ['hero/flechettes', 'hero/billard', 'hero/cocon-de-repos', 'hero/fauteuil-massant', 'situations/sur-mesure'].map(img)

/** Les trois cartes « Pourquoi nous choisir » ; la signature manuscrite remplace « Maestro Bruno ». */
const reasons = [
  { title: 'Conseil', signature: 'Audit gratuit', image: img('situations/entreprise'), alt: "Collègues autour d'un billard installé par RESTART" },
  { title: 'Personnalisation', signature: 'À vos couleurs', image: img('hero/baby-foot'), alt: 'Baby-foot en bois gravé au nom du client' },
  { title: 'Installation', signature: 'Livré monté', image: ambiance.bureau, alt: "Billard installé dans la salle de pause d'un bureau" },
]

const btn =
  'inline-flex h-12 w-full items-center justify-center px-6 text-[12px] font-bold uppercase tracking-[0.02em] transition hover:brightness-125'

export function ShowroomHome() {
  const priced = allModels.flatMap((m) => (m.price != null ? [m.price] : []))
  const minPrice = formatPrice(Math.min(...priced))

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

      {/* 4. Bandeau marine --------------------------------------------- */}
      <section className="grid bg-[#283444] text-[#fffdfc] md:grid-cols-[56%_44%]">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[540px]">
          <PlayPanel photos={reel} label="Nos équipements en situation" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="max-w-[430px]">
            <p className="text-[26px] uppercase leading-[1.05] md:text-[32px]">
              Les jeux qui <strong className="font-bold">rassemblent</strong> vos{' '}
              <strong className="font-bold">équipes</strong> et vos clients.
            </p>
            <p className="mt-8 text-[26px] uppercase leading-[1.05] md:text-[32px]">
              Dès <strong className="font-bold">{minPrice}</strong>, en achat ou en{' '}
              <strong className="font-bold">location</strong>.
            </p>
            <Link href="/contact/" className={`${btn} mt-12 bg-[#c4262e] text-white`}>
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Atelier et showroom ---------------------------------------- */}
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

      {/* 6. Pourquoi nous choisir --------------------------------------- */}
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
              <Link href="/qui-sommes-nous/" className="group relative block aspect-[14/15] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.alt}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,24,30,0.45)_0%,rgba(20,24,30,0.15)_45%,rgba(20,24,30,0.55)_100%)]"
                />
                <span className="absolute inset-x-0 top-[28%] text-center text-[30px] text-white md:text-[34px]">
                  {r.title}
                </span>
                <span className="sr-signature absolute inset-x-0 bottom-5 text-center text-[28px] text-white">
                  {r.signature}
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
