// Généré par gen_themes.py — ne pas éditer à la main.
// Les valeurs de couleur et de police vivent dans src/app/themes.css.

export type ThemeMeta = {
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  font: string
  headFont: string
  swatches: string[]
}

export const DEFAULT_THEME = 'borne'
export const THEME_STORAGE_KEY = 'restart-theme'

export const themes: ThemeMeta[] = [
  {
    "id": "borne",
    "name": "Borne",
    "desc": "Nuit bleutée, magenta et cyan",
    "scheme": "dark",
    "font": "Space Grotesk",
    "headFont": "var(--ff-space), ui-sans-serif, system-ui, sans-serif",
    "swatches": [
      "#0b0d17",
      "#ff2e93",
      "#22e3ff",
      "#ffd23f"
    ]
  },
  {
    "id": "synthwave",
    "name": "Synthwave",
    "desc": "Coucher de soleil rétro 80s",
    "scheme": "dark",
    "font": "Orbitron",
    "headFont": "var(--ff-orbitron), ui-sans-serif, sans-serif",
    "swatches": [
      "#1a0b2e",
      "#ff3cac",
      "#2de2e6",
      "#f9c80e"
    ]
  },
  {
    "id": "tron",
    "name": "Grille",
    "desc": "Lignes lumineuses façon Tron",
    "scheme": "dark",
    "font": "Audiowide",
    "headFont": "var(--ff-audiowide), ui-sans-serif, sans-serif",
    "swatches": [
      "#03060d",
      "#00e5ff",
      "#ff9f1c",
      "#ffd166"
    ]
  },
  {
    "id": "pixel",
    "name": "Pixel",
    "desc": "Salle de jeux 8 bits",
    "scheme": "dark",
    "font": "Press Start 2P",
    "headFont": "var(--ff-press), ui-monospace, monospace",
    "swatches": [
      "#1b1b2f",
      "#ff5f5f",
      "#7cffcb",
      "#ffe066"
    ]
  },
  {
    "id": "gameboy",
    "name": "Game Boy",
    "desc": "Écran vert LCD, 4 teintes",
    "scheme": "light",
    "font": "Silkscreen",
    "headFont": "var(--ff-silkscreen), ui-monospace, monospace",
    "swatches": [
      "#c4cfa1",
      "#306230",
      "#4d7c0f",
      "#0f380f"
    ]
  },
  {
    "id": "pacman",
    "name": "Pac-Man",
    "desc": "Labyrinthe bleu et pac-gommes",
    "scheme": "dark",
    "font": "Bungee",
    "headFont": "var(--ff-bungee), ui-sans-serif, sans-serif",
    "swatches": [
      "#000000",
      "#ffe600",
      "#ff5ec4",
      "#ffb847"
    ]
  },
  {
    "id": "bowling",
    "name": "Bowling 70s",
    "desc": "Crème, orange et turquoise",
    "scheme": "light",
    "font": "Righteous",
    "headFont": "var(--ff-righteous), ui-sans-serif, sans-serif",
    "swatches": [
      "#fff4e0",
      "#e4572e",
      "#12908d",
      "#c1121f"
    ]
  },
  {
    "id": "clair",
    "name": "Arcade clair",
    "desc": "Blanc net, magenta et bleu",
    "scheme": "light",
    "font": "Outfit",
    "headFont": "var(--ff-outfit), ui-sans-serif, system-ui, sans-serif",
    "swatches": [
      "#f7f8fc",
      "#ff2e93",
      "#0088c2",
      "#e85d04"
    ]
  },
  {
    "id": "papier",
    "name": "Papier",
    "desc": "Crème & indigo, façon Ma Belle Note",
    "scheme": "light",
    "font": "Fraunces",
    "headFont": "var(--ff-fraunces), Georgia, serif",
    "swatches": [
      "#faf6ee",
      "#1e1b4b",
      "#b0791f",
      "#9a6b1c"
    ]
  },
  {
    "id": "crt",
    "name": "Écran ambre",
    "desc": "Moniteur cathodique monochrome",
    "scheme": "dark",
    "font": "VT323",
    "headFont": "var(--ff-vt323), ui-monospace, monospace",
    "swatches": [
      "#0d0802",
      "#ffb000",
      "#ff7a1a",
      "#ffd27a"
    ]
  },
  {
    "id": "bubblegum",
    "name": "Bubblegum",
    "desc": "Rose bonbon et violet",
    "scheme": "light",
    "font": "Fredoka",
    "headFont": "var(--ff-fredoka), ui-rounded, ui-sans-serif, sans-serif",
    "swatches": [
      "#fff0f7",
      "#7b2cff",
      "#e0197d",
      "#c2006a"
    ]
  },
  {
    "id": "cyberpunk",
    "name": "Cyberpunk",
    "desc": "Jaune néon, rouge et cyan",
    "scheme": "dark",
    "font": "Chakra Petch",
    "headFont": "var(--ff-chakra), ui-sans-serif, sans-serif",
    "swatches": [
      "#0e0e10",
      "#fcee0a",
      "#00f0ff",
      "#ff335f"
    ]
  }
]
