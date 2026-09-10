// Généré par scripts/gen_themes.py : ne pas éditer à la main.
// Chaque police expose une variable --ff-<id>. Le navigateur ne télécharge
// un fichier que si un élément l'utilise : seules les polices du thème actif
// sont chargées. Seules celles du thème par défaut sont préchargées.
import localFont from 'next/font/local'
import { Audiowide, Baloo_2, Bebas_Neue, Bungee, Chakra_Petch, DM_Sans, Exo_2, Fredoka, IBM_Plex_Mono, Kanit, Luckiest_Guy, Orbitron, Outfit, Pixelify_Sans, Press_Start_2P, Rajdhani, Righteous, Russo_One, Share_Tech_Mono, Silkscreen, Space_Grotesk, Space_Mono, VT323 } from 'next/font/google'

const f_inter = localFont({ src: '../fonts/inter-variable.woff2', variable: '--ff-inter', display: 'swap', weight: '100 900' })
const f_fraunces = localFont({ src: '../fonts/fraunces-variable.woff2', variable: '--ff-fraunces', display: 'swap', weight: '100 900', preload: false })
const f_space = Space_Grotesk({ subsets: ['latin'], variable: '--ff-space', display: 'swap' })
const f_outfit = Outfit({ subsets: ['latin'], variable: '--ff-outfit', display: 'swap', preload: false })
const f_dmsans = DM_Sans({ subsets: ['latin'], variable: '--ff-dmsans', display: 'swap', preload: false })
const f_exo2 = Exo_2({ subsets: ['latin'], variable: '--ff-exo2', display: 'swap', preload: false })
const f_kanit = Kanit({ subsets: ['latin'], variable: '--ff-kanit', display: 'swap', weight: ['400', '500', '600', '700'], preload: false })
const f_rajdhani = Rajdhani({ subsets: ['latin'], variable: '--ff-rajdhani', display: 'swap', weight: ['400', '500', '600', '700'], preload: false })
const f_baloo = Baloo_2({ subsets: ['latin'], variable: '--ff-baloo', display: 'swap', preload: false })
const f_fredoka = Fredoka({ subsets: ['latin'], variable: '--ff-fredoka', display: 'swap', preload: false })
const f_chakra = Chakra_Petch({ subsets: ['latin'], variable: '--ff-chakra', display: 'swap', weight: ['400', '500', '600', '700'], preload: false })
const f_orbitron = Orbitron({ subsets: ['latin'], variable: '--ff-orbitron', display: 'swap', preload: false })
const f_audiowide = Audiowide({ subsets: ['latin'], variable: '--ff-audiowide', display: 'swap', weight: '400', preload: false })
const f_russo = Russo_One({ subsets: ['latin'], variable: '--ff-russo', display: 'swap', weight: '400', preload: false })
const f_righteous = Righteous({ subsets: ['latin'], variable: '--ff-righteous', display: 'swap', weight: '400', preload: false })
const f_bungee = Bungee({ subsets: ['latin'], variable: '--ff-bungee', display: 'swap', weight: '400', preload: false })
const f_bebas = Bebas_Neue({ subsets: ['latin'], variable: '--ff-bebas', display: 'swap', weight: '400', preload: false })
const f_luckiest = Luckiest_Guy({ subsets: ['latin'], variable: '--ff-luckiest', display: 'swap', weight: '400', preload: false })
const f_press = Press_Start_2P({ subsets: ['latin'], variable: '--ff-press', display: 'swap', weight: '400', preload: false })
const f_pixelify = Pixelify_Sans({ subsets: ['latin'], variable: '--ff-pixelify', display: 'swap', preload: false })
const f_silkscreen = Silkscreen({ subsets: ['latin'], variable: '--ff-silkscreen', display: 'swap', weight: ['400', '700'], preload: false })
const f_vt323 = VT323({ subsets: ['latin'], variable: '--ff-vt323', display: 'swap', weight: '400', preload: false })
const f_spacemono = Space_Mono({ subsets: ['latin'], variable: '--ff-spacemono', display: 'swap', weight: ['400', '700'], preload: false })
const f_sharetech = Share_Tech_Mono({ subsets: ['latin'], variable: '--ff-sharetech', display: 'swap', weight: '400', preload: false })
const f_plexmono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--ff-plexmono', display: 'swap', weight: ['400', '500', '600'], preload: false })

export const fontVariables = [f_inter, f_fraunces, f_space, f_outfit, f_dmsans, f_exo2, f_kanit, f_rajdhani, f_baloo, f_fredoka, f_chakra, f_orbitron, f_audiowide, f_russo, f_righteous, f_bungee, f_bebas, f_luckiest, f_press, f_pixelify, f_silkscreen, f_vt323, f_spacemono, f_sharetech, f_plexmono].map((f) => f.variable).join(' ')
