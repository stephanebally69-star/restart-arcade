// Généré par scripts/gen_themes.py : ne pas éditer à la main.
// Les valeurs de chaque thème vivent dans src/app/themes.css.

export type ThemeMeta = {
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  head: string
  body: string
  bg: string
  primary: string
  accent: string
  price: string
  headingIsPrimary: boolean
}

export type FontMeta = { id: string; label: string; stack: string; adjust: string; tracking: string }

export const DEFAULT_THEME = 'papier'
export const THEME_STORAGE_KEY = 'restart-theme'
export const CUSTOM_STORAGE_KEY = 'restart-theme-custom'

export const themes: ThemeMeta[] = [
  {
    "id": "borne",
    "name": "Borne",
    "desc": "Nuit bleutée, magenta et cyan",
    "scheme": "dark",
    "head": "space",
    "body": "inter",
    "bg": "#0b0d17",
    "primary": "#ff2e93",
    "accent": "#22e3ff",
    "price": "#ffd23f",
    "headingIsPrimary": false
  },
  {
    "id": "synthwave",
    "name": "Synthwave",
    "desc": "Coucher de soleil rétro 80s",
    "scheme": "dark",
    "head": "orbitron",
    "body": "inter",
    "bg": "#1a0b2e",
    "primary": "#ff3cac",
    "accent": "#2de2e6",
    "price": "#f9c80e",
    "headingIsPrimary": false
  },
  {
    "id": "outrun",
    "name": "Outrun",
    "desc": "Route au néon, orange et turquoise",
    "scheme": "dark",
    "head": "russo",
    "body": "exo2",
    "bg": "#0d0221",
    "primary": "#ff6c11",
    "accent": "#2de2e6",
    "price": "#ff3864",
    "headingIsPrimary": false
  },
  {
    "id": "tron",
    "name": "Grille",
    "desc": "Lignes lumineuses façon Tron",
    "scheme": "dark",
    "head": "audiowide",
    "body": "chakra",
    "bg": "#03060d",
    "primary": "#00e5ff",
    "accent": "#ff9f1c",
    "price": "#ffd166",
    "headingIsPrimary": false
  },
  {
    "id": "invaders",
    "name": "Invaders",
    "desc": "Vert phosphore et magenta",
    "scheme": "dark",
    "head": "pixelify",
    "body": "sharetech",
    "bg": "#050a05",
    "primary": "#39ff14",
    "accent": "#ff2bd6",
    "price": "#ffe600",
    "headingIsPrimary": true
  },
  {
    "id": "pixel",
    "name": "Pixel",
    "desc": "Salle de jeux 8 bits",
    "scheme": "dark",
    "head": "press",
    "body": "inter",
    "bg": "#1b1b2f",
    "primary": "#ff5f5f",
    "accent": "#7cffcb",
    "price": "#ffe066",
    "headingIsPrimary": false
  },
  {
    "id": "tetris",
    "name": "Tetris",
    "desc": "Blocs colorés sur puits sombre",
    "scheme": "dark",
    "head": "kanit",
    "body": "kanit",
    "bg": "#101828",
    "primary": "#a000f0",
    "accent": "#00f0f0",
    "price": "#f0f000",
    "headingIsPrimary": false
  },
  {
    "id": "pacman",
    "name": "Pac-Man",
    "desc": "Labyrinthe bleu et pac-gommes",
    "scheme": "dark",
    "head": "bungee",
    "body": "dmsans",
    "bg": "#000000",
    "primary": "#ffe600",
    "accent": "#ff5ec4",
    "price": "#ffb847",
    "headingIsPrimary": true
  },
  {
    "id": "combat",
    "name": "Combat",
    "desc": "Rouge vif et or, façon jeu de baston",
    "scheme": "dark",
    "head": "bebas",
    "body": "rajdhani",
    "bg": "#140606",
    "primary": "#e10600",
    "accent": "#ffb800",
    "price": "#ffd84d",
    "headingIsPrimary": false
  },
  {
    "id": "console",
    "name": "Console bleue",
    "desc": "Bleu profond 16 bits et jaune",
    "scheme": "dark",
    "head": "exo2",
    "body": "exo2",
    "bg": "#07142e",
    "primary": "#1f6fff",
    "accent": "#ffd200",
    "price": "#ffd200",
    "headingIsPrimary": false
  },
  {
    "id": "tapisvert",
    "name": "Tapis vert",
    "desc": "Feutre de billard et laiton",
    "scheme": "dark",
    "head": "fraunces",
    "body": "inter",
    "bg": "#0b2e1f",
    "primary": "#f2c14e",
    "accent": "#ff8a7a",
    "price": "#f2c14e",
    "headingIsPrimary": false
  },
  {
    "id": "lave",
    "name": "Lave",
    "desc": "Orange incandescent sur fond volcanique",
    "scheme": "dark",
    "head": "kanit",
    "body": "kanit",
    "bg": "#140800",
    "primary": "#ff4d00",
    "accent": "#ffc300",
    "price": "#ffc300",
    "headingIsPrimary": false
  },
  {
    "id": "crt",
    "name": "Écran ambre",
    "desc": "Moniteur cathodique monochrome",
    "scheme": "dark",
    "head": "vt323",
    "body": "plexmono",
    "bg": "#0d0802",
    "primary": "#ffb000",
    "accent": "#ff7a1a",
    "price": "#ffd27a",
    "headingIsPrimary": true
  },
  {
    "id": "cyberpunk",
    "name": "Cyberpunk",
    "desc": "Jaune néon, rouge et cyan",
    "scheme": "dark",
    "head": "chakra",
    "body": "chakra",
    "bg": "#0e0e10",
    "primary": "#fcee0a",
    "accent": "#00f0ff",
    "price": "#ff335f",
    "headingIsPrimary": true
  },
  {
    "id": "mono",
    "name": "Monochrome",
    "desc": "Noir et blanc, sobre et graphique",
    "scheme": "dark",
    "head": "bebas",
    "body": "inter",
    "bg": "#0a0a0a",
    "primary": "#ffffff",
    "accent": "#bdbdbd",
    "price": "#ffffff",
    "headingIsPrimary": true
  },
  {
    "id": "gameboy",
    "name": "Game Boy",
    "desc": "Écran vert LCD, 4 teintes",
    "scheme": "light",
    "head": "silkscreen",
    "body": "spacemono",
    "bg": "#c4cfa1",
    "primary": "#306230",
    "accent": "#4d7c0f",
    "price": "#0f380f",
    "headingIsPrimary": false
  },
  {
    "id": "plateforme",
    "name": "Plateforme",
    "desc": "Ciel bleu, rouge plombier et vert tuyau",
    "scheme": "light",
    "head": "luckiest",
    "body": "dmsans",
    "bg": "#cfe8ff",
    "primary": "#e52521",
    "accent": "#1d8a2c",
    "price": "#b35c00",
    "headingIsPrimary": false
  },
  {
    "id": "bowling",
    "name": "Bowling 70s",
    "desc": "Crème, orange et turquoise",
    "scheme": "light",
    "head": "righteous",
    "body": "dmsans",
    "bg": "#fff4e0",
    "primary": "#e4572e",
    "accent": "#12908d",
    "price": "#c1121f",
    "headingIsPrimary": false
  },
  {
    "id": "pastel",
    "name": "Pastel 90s",
    "desc": "Crème, rose, bleu et violet",
    "scheme": "light",
    "head": "baloo",
    "body": "baloo",
    "bg": "#fdf6e3",
    "primary": "#ff6f91",
    "accent": "#5b6fd6",
    "price": "#845ec2",
    "headingIsPrimary": false
  },
  {
    "id": "clair",
    "name": "Arcade clair",
    "desc": "Blanc net, magenta et bleu",
    "scheme": "light",
    "head": "outfit",
    "body": "outfit",
    "bg": "#f7f8fc",
    "primary": "#ff2e93",
    "accent": "#0088c2",
    "price": "#e85d04",
    "headingIsPrimary": false
  },
  {
    "id": "glace",
    "name": "Glace",
    "desc": "Blanc givré, bleu vif et corail",
    "scheme": "light",
    "head": "rajdhani",
    "body": "inter",
    "bg": "#eef7ff",
    "primary": "#0077ff",
    "accent": "#00a39a",
    "price": "#e8472a",
    "headingIsPrimary": false
  },
  {
    "id": "menthe",
    "name": "Menthe",
    "desc": "Vert frais, framboise et bleu",
    "scheme": "light",
    "head": "baloo",
    "body": "dmsans",
    "bg": "#eafff5",
    "primary": "#00a36c",
    "accent": "#e0386e",
    "price": "#0068a8",
    "headingIsPrimary": false
  },
  {
    "id": "bubblegum",
    "name": "Bubblegum",
    "desc": "Rose bonbon et violet",
    "scheme": "light",
    "head": "fredoka",
    "body": "dmsans",
    "bg": "#fff0f7",
    "primary": "#7b2cff",
    "accent": "#e0197d",
    "price": "#c2006a",
    "headingIsPrimary": false
  },
  {
    "id": "papier",
    "name": "Papier",
    "desc": "Crème & indigo, façon Ma Belle Note",
    "scheme": "light",
    "head": "fraunces",
    "body": "inter",
    "bg": "#faf6ee",
    "primary": "#1e1b4b",
    "accent": "#b0791f",
    "price": "#9a6b1c",
    "headingIsPrimary": true
  }
]

export const fonts: FontMeta[] = [
  {
    "id": "inter",
    "label": "Inter",
    "stack": "var(--ff-inter), ui-sans-serif, system-ui, sans-serif",
    "adjust": "none",
    "tracking": "-0.02em"
  },
  {
    "id": "fraunces",
    "label": "Fraunces",
    "stack": "var(--ff-fraunces), Georgia, serif",
    "adjust": "none",
    "tracking": "-0.02em"
  },
  {
    "id": "space",
    "label": "Space Grotesk",
    "stack": "var(--ff-space), ui-sans-serif, system-ui, sans-serif",
    "adjust": "none",
    "tracking": "-0.02em"
  },
  {
    "id": "outfit",
    "label": "Outfit",
    "stack": "var(--ff-outfit), ui-sans-serif, system-ui, sans-serif",
    "adjust": "none",
    "tracking": "-0.02em"
  },
  {
    "id": "dmsans",
    "label": "DM Sans",
    "stack": "var(--ff-dmsans), ui-sans-serif, system-ui, sans-serif",
    "adjust": "none",
    "tracking": "-0.02em"
  },
  {
    "id": "exo2",
    "label": "Exo 2",
    "stack": "var(--ff-exo2), ui-sans-serif, system-ui, sans-serif",
    "adjust": "none",
    "tracking": "-0.01em"
  },
  {
    "id": "kanit",
    "label": "Kanit",
    "stack": "var(--ff-kanit), ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "-0.01em"
  },
  {
    "id": "rajdhani",
    "label": "Rajdhani",
    "stack": "var(--ff-rajdhani), ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "baloo",
    "label": "Baloo 2",
    "stack": "var(--ff-baloo), ui-rounded, ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "-0.01em"
  },
  {
    "id": "fredoka",
    "label": "Fredoka",
    "stack": "var(--ff-fredoka), ui-rounded, ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "chakra",
    "label": "Chakra Petch",
    "stack": "var(--ff-chakra), ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "orbitron",
    "label": "Orbitron",
    "stack": "var(--ff-orbitron), ui-sans-serif, sans-serif",
    "adjust": "0.5",
    "tracking": "0"
  },
  {
    "id": "audiowide",
    "label": "Audiowide",
    "stack": "var(--ff-audiowide), ui-sans-serif, sans-serif",
    "adjust": "0.5",
    "tracking": "0"
  },
  {
    "id": "russo",
    "label": "Russo One",
    "stack": "var(--ff-russo), ui-sans-serif, sans-serif",
    "adjust": "0.5",
    "tracking": "0"
  },
  {
    "id": "righteous",
    "label": "Righteous",
    "stack": "var(--ff-righteous), ui-sans-serif, sans-serif",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "bungee",
    "label": "Bungee",
    "stack": "var(--ff-bungee), ui-sans-serif, sans-serif",
    "adjust": "0.52",
    "tracking": "0"
  },
  {
    "id": "bebas",
    "label": "Bebas Neue",
    "stack": "var(--ff-bebas), Impact, ui-sans-serif, sans-serif",
    "adjust": "0.62",
    "tracking": "0.02em"
  },
  {
    "id": "luckiest",
    "label": "Luckiest Guy",
    "stack": "var(--ff-luckiest), ui-rounded, sans-serif",
    "adjust": "0.5",
    "tracking": "0.01em"
  },
  {
    "id": "press",
    "label": "Press Start 2P",
    "stack": "var(--ff-press), ui-monospace, monospace",
    "adjust": "0.34",
    "tracking": "0"
  },
  {
    "id": "pixelify",
    "label": "Pixelify Sans",
    "stack": "var(--ff-pixelify), ui-monospace, monospace",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "silkscreen",
    "label": "Silkscreen",
    "stack": "var(--ff-silkscreen), ui-monospace, monospace",
    "adjust": "0.46",
    "tracking": "0"
  },
  {
    "id": "vt323",
    "label": "VT323",
    "stack": "var(--ff-vt323), ui-monospace, monospace",
    "adjust": "0.62",
    "tracking": "0"
  },
  {
    "id": "spacemono",
    "label": "Space Mono",
    "stack": "var(--ff-spacemono), ui-monospace, monospace",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "sharetech",
    "label": "Share Tech Mono",
    "stack": "var(--ff-sharetech), ui-monospace, monospace",
    "adjust": "none",
    "tracking": "0"
  },
  {
    "id": "plexmono",
    "label": "IBM Plex Mono",
    "stack": "var(--ff-plexmono), ui-monospace, monospace",
    "adjust": "none",
    "tracking": "0"
  }
]
