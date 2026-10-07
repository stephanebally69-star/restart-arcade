/**
 * Les propositions de refonte, toutes publiées sur le site GitHub Pages du dépôt
 * restart-arcade. Cette branche ne sert que la version Showroom : l'onglet « Version »
 * renvoie vers les autres, chacune à son adresse.
 */
const ROOT = 'https://stephanebally69-star.github.io/restart-arcade'

export type SiteVersion = { id: string; name: string; desc: string; url: string }

export const versions: SiteVersion[] = [
  {
    id: 'showroom',
    name: 'Showroom',
    desc: "Mise en page d'après poltronesofa.com : marine, crème et rouge",
    url: `${ROOT}/showroom/`,
  },
  {
    id: 'plateau',
    name: 'Plateau',
    desc: 'Mise en page sombre, produits en photo sur le plateau',
    url: `${ROOT}/?version=plateau`,
  },
  {
    id: 'studio',
    name: 'Carrousel',
    desc: 'Carrousel photo, une gamme par slide',
    url: `${ROOT}/?version=studio`,
  },
  {
    id: 'papier',
    name: 'Papier',
    desc: 'Crème et indigo, gabarit éditorial',
    url: `${ROOT}/papier/`,
  },
  {
    id: 'onde-pixel',
    name: 'Onde pixel',
    desc: 'Grille de pixels vivante, noir et cyan',
    url: `${ROOT}/onde-pixel/`,
  },
]

/** Version servie par ce build. */
export const CURRENT_VERSION = 'showroom'
