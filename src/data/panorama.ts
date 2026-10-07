import { audiences, findUnivers, formatPrice, type Audience } from '@/data/catalogue'
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
  alt: "Grande pièce lumineuse aux baies vitrées ouvertes sur un lac et des montagnes, avec un billard, un baby-foot, une borne de fléchettes, un flipper, un fauteuil massant et une borne d'arcade",
  ratio: 1536 / 864,
  focus: [0.5, 0.5],
  hotspots: [
    { slug: 'flechettes', x: 14.8, y: 26.5 },
    { slug: 'baby-foot', x: 17, y: 64 },
    { slug: 'billard', x: 54.5, y: 46 },
    { slug: 'borne-arcade', x: 59.6, y: 26.5 },
    { slug: 'fauteuil-massant', x: 46.5, y: 33 },
    { slug: 'flipper-numerique', x: 84.5, y: 52 },
  ],
}

/** Ambiance de couleur d'un univers, tirée de sa photo (voir `.pano-ch[data-tone]`). */
export type Tone = 'nuit' | 'sauge' | 'sable'

export type Chapter = Scene & {
  audience: Audience
  label: string
  /** Pour qui, en deux ou trois mots (« Pour vos clients »). */
  short: string
  tone: Tone
  /** Ce que la photo montre de la pièce, en légende. */
  caption: string
  title: string
  text: string
  points: string[]
  href: string
}

type ChapterInput = Pick<Chapter, 'audience' | 'label' | 'tone' | 'caption' | 'alt' | 'focus'> & {
  image: string
}

const chapter = ({ image, ...c }: ChapterInput): Chapter => {
  const page = audiencePage(c.audience)
  return {
    ...c,
    id: c.audience,
    image: asset(image),
    ratio: 1536 / 864,
    short: audiences.find((a) => a.id === c.audience)!.short,
    title: page.h1,
    text: page.intro.paragraphs[0],
    points: page.brief.slice(0, 3),
    href: audiencePath(c.audience),
  }
}

/**
 * Ordre du défilement demandé : bar, entreprise, puis la maison. Les trois photos
 * sont la pièce du hero, au même cadrage, réaménagée pour chaque public.
 */
export const chapters: Chapter[] = [
  chapter({
    audience: 'bar-commerce',
    label: 'Bar & commerce',
    tone: 'nuit',
    caption: 'La pièce, version bar, à la tombée de la nuit',
    image: '/img/panorama/bar.webp',
    alt: 'La même pièce devenue un bar au crépuscule : des clients jouent au baby-foot, au billard et aux fléchettes devant le comptoir et la vue sur le lac',
    focus: [0.45, 0.5],
  }),
  chapter({
    audience: 'entreprise',
    label: 'Entreprise',
    tone: 'sauge',
    caption: "La pièce, version espace de pause d'entreprise",
    image: '/img/panorama/entreprise.webp',
    alt: "La même pièce devenue l'espace de pause d'une entreprise : des collègues jouent au baby-foot, discutent près du billard et se détendent dans le fauteuil massant",
    focus: [0.45, 0.5],
  }),
  chapter({
    audience: 'particulier',
    label: 'Chez moi',
    tone: 'sable',
    caption: 'La pièce, version salon de famille, un dimanche',
    image: '/img/panorama/maison.webp',
    alt: "La même pièce devenue un salon familial : un père et son fils au baby-foot, un enfant à la borne d'arcade, une mère dans le fauteuil massant et un chien sur le tapis",
    focus: [0.45, 0.5],
  }),
]

/** Les six familles de la pièce, avec leur prix d'entrée tiré du catalogue. */
export const collection = ['billard', 'baby-foot', 'flechettes', 'flipper-numerique', 'fauteuil-massant', 'borne-arcade'].map((slug) => {
  const u = findUnivers(slug)!
  const prices = u.models.flatMap((m) => (m.price != null ? [m.price] : []))
  return {
    slug,
    name: u.name,
    short: u.navLabel,
    /** Détourage du produit, pour la vignette de l'infobulle. */
    image: asset(`/img/plateau/${slug}.webp`),
    href: `/produits/${slug}/`,
    price: prices.length ? `dès ${formatPrice(Math.min(...prices))}` : 'Sur devis',
    count: u.models.length,
  }
})
