// Polices de la version Showroom, d'après poltronesofa.com : une linéale géométrique
// (Metropolis là-bas, Montserrat ici, sa plus proche cousine) et une écriture manuscrite
// pour les signatures des cartes « Pourquoi nous choisir ». Fichiers locaux (Fontsource,
// sous-ensemble latin, licence OFL) : le build ne dépend pas de Google Fonts.
import localFont from 'next/font/local'

const montserrat = localFont({
  src: '../fonts/montserrat-variable.woff2',
  variable: '--ff-showroom',
  display: 'swap',
  weight: '100 900',
})

const allura = localFont({
  src: '../fonts/allura-400.woff2',
  variable: '--ff-signature',
  display: 'swap',
  weight: '400',
  preload: false,
})

export const showroomFontVariables = `${montserrat.variable} ${allura.variable}`
