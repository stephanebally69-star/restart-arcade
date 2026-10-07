import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { audiences } from '@/data/catalogue'
import { audiencePath } from '@/data/audiencePages'
import { ambiance, universImage } from '@/data/images'
import { chapters, collection, room } from '@/data/panorama'
import { PanoramaHeader } from '@/components/panorama/PanoramaHeader'
import { PanoramaStage } from '@/components/panorama/PanoramaStage'
import { Reveal } from '@/components/Reveal'
import { site } from '@/lib/site'
import './panorama.css'

export const metadata: Metadata = {
  title: "Bornes d'arcade, fléchettes et baby-foot personnalisés, en vente et en location",
  description:
    "RESTART équipe entreprises, bars et particuliers en bornes d'arcade, fléchettes électroniques, baby-foot, billards et fauteuils massants. Personnalisation à votre image, livraison et installation partout en France.",
  alternates: { canonical: '/' },
}

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
 * pour un bar, une entreprise et la maison, au fil du défilement. Seul
 * l'accueil change ; les autres pages restent celles du site actuel.
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

      <PanoramaStage room={room} chapters={chapters} products={collection} />

      {/* --- Les collections ------------------------------------------- */}
      <section className="pano-section">
        <div className="pano-head">
          <p className="pano-kicker">Les collections</p>
          <h2 className="pano-h2">Tout ce qui se trouve dans la pièce</h2>
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
                    <img src={universImage(c.slug)} alt="" loading="lazy" />
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
            src={ambiance.salleDePause}
            alt="Espace de pause équipé d'un baby-foot, d'un billard et d'une borne d'arcade"
            loading="lazy"
          />
        </div>
        <div className="pano-split__body">
          <p className="pano-kicker">Notre méthode</p>
          <h2 className="pano-h2">De l&apos;idée à la première partie, en quatre étapes</h2>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt="" loading="lazy" className="pano-final__bg" />
        <div className="pano-final__body">
          <p className="pano-kicker pano-kicker--light">Devis gratuit sous 48 heures</p>
          <h2 className="pano-final__title">Un espace vide, une idée vague, un budget à cadrer ?</h2>
          <p className="pano-final__text">
            Décrivez-nous votre projet en deux minutes. Nous revenons vers vous sous 48 heures avec une
            proposition chiffrée.
          </p>
          <div className="pano-actions pano-actions--center">
            <Link href="/contact/" className="pano-btn pano-btn--light">
              Décrire mon projet
            </Link>
            <a href={`tel:${site.phoneE164}`} className="pano-btn pano-btn--ghost">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
