import localFont from 'next/font/local'
import {
  Audiowide,
  Bungee,
  Chakra_Petch,
  DM_Sans,
  Fredoka,
  IBM_Plex_Mono,
  Orbitron,
  Outfit,
  Press_Start_2P,
  Righteous,
  Silkscreen,
  Space_Grotesk,
  Space_Mono,
  VT323,
} from 'next/font/google'

/*
 * Polices des thèmes. Chacune expose une variable `--ff-*` utilisée par
 * src/app/themes.css. Le navigateur ne télécharge un fichier que si un
 * élément l'utilise réellement : seules les polices du thème actif sont
 * chargées. Seules celles du thème par défaut sont préchargées.
 */

const inter = localFont({
  src: '../fonts/inter-variable.woff2',
  variable: '--ff-inter',
  weight: '100 900',
  display: 'swap',
})
const fraunces = localFont({
  src: '../fonts/fraunces-variable.woff2',
  variable: '--ff-fraunces',
  weight: '100 900',
  display: 'swap',
  preload: false,
})
const space = Space_Grotesk({ subsets: ['latin'], variable: '--ff-space', display: 'swap' })

const orbitron = Orbitron({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-orbitron' })
const audiowide = Audiowide({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--ff-audiowide' })
const chakra = Chakra_Petch({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '500', '600', '700'], variable: '--ff-chakra' })
const press = Press_Start_2P({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--ff-press' })
const silkscreen = Silkscreen({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '700'], variable: '--ff-silkscreen' })
const spacemono = Space_Mono({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '700'], variable: '--ff-spacemono' })
const bungee = Bungee({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--ff-bungee' })
const dmsans = DM_Sans({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-dmsans' })
const righteous = Righteous({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--ff-righteous' })
const outfit = Outfit({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-outfit' })
const vt323 = VT323({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--ff-vt323' })
const plexmono = IBM_Plex_Mono({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '500', '600'], variable: '--ff-plexmono' })
const fredoka = Fredoka({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-fredoka' })

export const fontVariables = [
  inter,
  fraunces,
  space,
  orbitron,
  audiowide,
  chakra,
  press,
  silkscreen,
  spacemono,
  bungee,
  dmsans,
  righteous,
  outfit,
  vt323,
  plexmono,
  fredoka,
]
  .map((f) => f.variable)
  .join(' ')
