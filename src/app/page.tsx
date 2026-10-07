import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, MapPin } from 'lucide-react'
import { audiences } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { chapters, collection, room } from '@/data/panorama'
import { PanoramaHeader } from '@/components/panorama/PanoramaHeader'
import { PanoramaChapters } from '@/components/panorama/PanoramaChapters'
import { PanoramaHero } from '@/components/panorama/PanoramaHero'
import { Reveal } from '@/components/Reveal'
import { asset, site } from '@/lib/site'
import './panorama.css'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et fauteuils massants. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

/** Photos d'installations clients (public/img/realisations), recadrées sans les pastilles incrustées. */
const installs = [
  {
    image: asset('/img/panorama/reel-marseille.webp'),
    place: 'Marseille (13)',
    alt: "Partie de billard dans le salon d'un hôtel à Marseille",
  },
  {
    image: asset('/img/panorama/reel-castres.webp'),
    place: 'Castres (81)',
    alt: 'Partie de fléchettes électroniques sur une borne RESTART à Castres',
  },
  {
    image: asset('/img/panorama/reel-bourg.webp'),
    place: 'Bourg-lès-Valence (26)',
    alt: "Borne d'arcade personnalisée et baby-foot dans un barbier à Bourg-lès-Valence",
  },
  {
    image: asset('/img/panorama/reel-saint-cirgue.webp'),
    place: 'Saint-Cirgue (81)',
    alt: 'Prise en main du baby-foot avec une famille à Saint-Cirgue',
  },
]

const steps = [
  {
    title: 'On regarde votre espace',
    text: "Un échange de 20 minutes, sur place ou en visio, pour cadrer l'usage réel, la place et le budget. Gratuit et sans engagement.",
  },
  {
    title: 'On dessine votre équipement',
    text: 'Modèle, covering, couleurs, options : vous validez un visuel avant toute fabrication.',
  },
  {
    title: 'On livre et on installe',
    text: "Livraison montée, mise en service et prise en main sur place, partout en France, en deux à trois semaines.",
  },
  {
    title: 'On reste joignable',
    text: "Jusqu'à 3 ans de garantie et une ligne directe. En location, la maintenance est incluse.",
  },
]

/**
 * Accueil « Panorama », d'après roche-bobois.com : une pièce photographiée en
 * plein écran qui réunit tout ce que vend RESTART, puis la même pièce pensée
 * pour un bar, une entreprise et la maison, en trois sections où photo et
 * texte alternent de côté. Seul l'accueil change ; les autres pages restent
 * celles du site actuel.
 */
export default function Home() {
  const audienceItems = (['bar-commerce', 'entreprise', 'particulier'] as const).map((id) => {
    const a = audiences.find((x) => x.id === id)!
    return { href: audiencePath(id), label: a.label, detail: a.short }
  })

  return (
    <div className="pano-page">
      <PanoramaHeader
        audiences={audienceItems}
        collection={collection.map((c) => ({ href: c.href, label: c.name, detail: c.price }))}
      />

      <PanoramaHero room={room} chapters={chapters} products={collection} />

      <PanoramaChapters chapters={chapters} />

      {/* --- Les collections ------------------------------------------- */}
      <section className="pano-section">
        <div className="pano-head">
          <h2 className="pano-h2">Nos gammes de produits</h2>
          <Link href="/produits/" className="pano-link pano-link--dark">
            Tous les jeux
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="pano-collection">
          {collection.map((c, i) => (
            <li key={c.slug}>
              <Reveal delayMs={i * 80} className="h-full">
                <Link href={c.href} className="pano-product">
                  <span className="pano-product__shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="" loading="lazy" />
                  </span>
                  <span className="pano-product__name">{c.name}</span>
                  <span className="pano-product__meta">
                    {c.count > 0 ? `${c.count} modèle${c.count > 1 ? 's' : ''} · ` : ''}
                    {c.price}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Savoir-faire ---------------------------------------------- */}
      <section className="pano-split">
        <div className="pano-split__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/img/panorama/methode.webp')}
            alt="Billard installé par RESTART dans la salle d'un laser game à Tignieu-Jameyzieu"
            loading="lazy"
          />
        </div>
        <div className="pano-split__body">
          <p className="pano-kicker">Notre méthode</p>
          <h2 className="pano-h2 pano-split__title">De l&apos;idée à la première partie, en quatre étapes</h2>
          <ol className="pano-steps-list">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="pano-steps-list__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/qui-sommes-nous/" className="pano-link pano-link--dark">
            L&apos;atelier de Villette-d&apos;Anthon
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* --- Appel final ----------------------------------------------- */}
      <section className="pano-final">
        <div className="pano-final__body">
          <p className="pano-kicker pano-kicker--light">Devis gratuit sous 48 heures</p>
          <h2 className="pano-final__title">Un espace vide, une idée vague, un budget à cadrer ?</h2>
          <p className="pano-final__text">
            Décrivez-nous votre projet en deux minutes. Nous revenons vers vous sous 48 heures avec une
            proposition chiffrée.
          </p>
          <div className="pano-actions">
            <Link href="/contact/" className="pano-btn pano-btn--light">
              Décrire mon projet
            </Link>
            <a href={`tel:${site.phoneE164}`} className="pano-btn pano-btn--ghost">
              {site.phone}
            </a>
          </div>
        </div>
        <div className="pano-final__proof">
          <p className="pano-kicker pano-kicker--light">Déjà installés chez nos clients</p>
          <ul className="pano-final__grid">
            {installs.map((r) => (
              <li key={r.image}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} loading="lazy" />
                  <figcaption>
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {r.place}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <Link href="/realisations/" className="pano-link pano-link--light">
            Toutes nos réalisations
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
