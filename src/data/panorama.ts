import { findUnivers, formatPrice, type Audience } from '@/data/catalogue'
import { audiencePage, audiencePath } from '@/data/audiencePages'
import { asset } from '@/lib/site'

/**
 * Accueil « Panorama » : une seule pièce où se trouve tout ce que vend RESTART,
 * puis la même idée déclinée pour chaque public au fil du défilement.
 * Les photos vivent dans public/img/panorama/ ; `ratio` est largeur / hauteur
 * de la photo, pour poser les points produits au bon endroit malgré le recadrage.
 */

export type Hotspot = {
  slug: string
  /** Position du produit dans la photo, en % de sa largeur et de sa hauteur. */
  x: number
  y: number
}

export type Scene = {
  id: string
  image: string
  alt: string
  ratio: number
  /** Point de la photo à garder dans le cadre quand l'écran la recadre (0 à 1). */
  focus: [number, number]
}

export const room: Scene & { hotspots: Hotspot[] } = {
  id: 'piece',
  image: asset('/img/panorama/piece.webp'),
  alt: "Grande pièce lumineuse aux baies vitrées ouvertes sur un lac et des montagnes, avec un billard, un baby-foot, une borne de fléchettes, un fauteuil massant et une borne d'arcade",
  ratio: 2048 / 1152,
  focus: [0.5, 0.5],
  hotspots: [
    { slug: 'flechettes', x: 14.8, y: 30 },
    { slug: 'baby-foot', x: 17, y: 60 },
    { slug: 'billard', x: 64, y: 44 },
    { slug: 'borne-arcade', x: 59.5, y: 26 },
    { slug: 'fauteuil-massant', x: 77.5, y: 40 },
  ],
}

export type Chapter = Scene & {
  audience: Audience
  label: string
  title: string
  text: string
  points: string[]
  href: string
}

const chapter = (
  audience: Audience,
  label: string,
  image: string,
  alt: string,
  ratio: number,
  focus: [number, number],
): Chapter => {
  const page = audiencePage(audience)
  return {
    id: audience,
    audience,
    label,
    image: asset(image),
    alt,
    ratio,
    focus,
    title: page.h1,
    text: page.intro.paragraphs[0],
    points: page.brief.slice(0, 3),
    href: audiencePath(audience),
  }
}

/** Ordre du défilement demandé : bar, entreprise, puis la maison. */
export const chapters: Chapter[] = [
  chapter(
    'bar-commerce',
    'Bar & commerce',
    '/img/panorama/bar.webp',
    "La même pièce devenue un bar au crépuscule : des clients jouent au baby-foot, au billard et aux fléchettes devant le comptoir et la vue sur le lac",
    1536 / 864,
    [0.45, 0.5],
  ),
  chapter(
    'entreprise',
    'Entreprise',
    '/img/panorama/entreprise.webp',
    "La même pièce devenue l'espace de pause d'une entreprise : des collègues jouent au baby-foot, discutent près du billard et se détendent dans le fauteuil massant",
    1536 / 864,
    [0.45, 0.5],
  ),
  chapter(
    'particulier',
    'Chez moi',
    '/img/panorama/maison.webp',
    "La même pièce devenue un salon familial : un père et son fils au baby-foot, un enfant à la borne d'arcade, une mère dans le fauteuil massant et un chien sur le tapis",
    1536 / 864,
    [0.45, 0.5],
  ),
]

/** Les cinq familles de la pièce, avec leur prix d'entrée tiré du catalogue. */
export const collection = ['billard', 'baby-foot', 'flechettes', 'fauteuil-massant', 'borne-arcade'].map((slug) => {
  const u = findUnivers(slug)!
  const prices = u.models.flatMap((m) => (m.price != null ? [m.price] : []))
  return {
    slug,
    name: u.name,
    href: `/produits/${slug}/`,
    price: prices.length ? `dès ${formatPrice(Math.min(...prices))}` : 'Sur devis',
    count: u.models.length,
  }
})
