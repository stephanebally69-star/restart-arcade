/**
 * Versions du site consultables sur la même URL. La version change surtout le
 * hero de l'accueil ; le reste du site est commun. Le choix vit en
 * sessionStorage, comme le thème : une nouvelle visite repart sur la version par
 * défaut. `?version=cinema` dans l'URL force une version (lien de démo).
 */
export type VersionId = 'studio' | 'cinema'

export const versions: { id: VersionId; name: string; desc: string }[] = [
  { id: 'studio', name: 'Carrousel', desc: 'Carrousel photo, une gamme par slide' },
  { id: 'cinema', name: 'Cinéma', desc: 'Hero animé : fléchettes, baby-foot, flipper' },
]

export const DEFAULT_VERSION: VersionId = 'studio'
export const VERSION_STORAGE_KEY = 'restart-version'
export const VERSION_EVENT = 'restart:version'

export const isVersion = (value: unknown): value is VersionId =>
  versions.some((v) => v.id === value)

export function currentVersion(): VersionId {
  if (typeof document === 'undefined') return DEFAULT_VERSION
  const v = document.documentElement.dataset.version
  return isVersion(v) ? v : DEFAULT_VERSION
}

export function applyVersion(id: VersionId) {
  document.documentElement.dataset.version = id
  try {
    sessionStorage.setItem(VERSION_STORAGE_KEY, id)
  } catch {
    // Stockage indisponible : la version s'applique quand même à la page en cours.
  }
  window.dispatchEvent(new CustomEvent(VERSION_EVENT, { detail: id }))
}
