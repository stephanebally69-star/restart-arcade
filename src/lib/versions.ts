/**
 * Les versions de la refonte, chacune publiée sur son propre dépôt GitHub Pages.
 * Le sélecteur de version renvoie vers la même page sur la version choisie.
 */
export type SiteVersion = { id: string; label: string; name: string; desc: string; url: string }

export const versions: SiteVersion[] = [
  {
    id: 'v1',
    label: 'V1',
    name: 'Papier',
    desc: 'Crème et indigo, gabarit éditorial',
    url: 'https://stephanebally69-star.github.io/restart-arcade',
  },
  {
    id: 'v2',
    label: 'V2',
    name: 'Studio doré',
    desc: "Cartes blanches, scène à l'heure dorée",
    url: 'https://stephanebally69-star.github.io/restart-arcade-heure-doree',
  },
  {
    id: 'v3',
    label: 'V3',
    name: 'Onde pixel',
    desc: 'Grille de pixels vivante, noir et cyan',
    url: 'https://stephanebally69-star.github.io/restart-arcade-onde-pixel',
  },
]

/** Version servie par ce build. */
export const CURRENT_VERSION = 'v3'
