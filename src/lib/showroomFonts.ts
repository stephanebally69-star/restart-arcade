// Polices de la version Showroom, d'après poltronesofa.com : une linéale géométrique
// (Metropolis là-bas, Montserrat ici, sa plus proche cousine sur Google Fonts) et une
// écriture manuscrite pour les signatures des cartes « Pourquoi nous choisir ».
import { Allura, Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--ff-showroom',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const allura = Allura({
  subsets: ['latin'],
  variable: '--ff-signature',
  display: 'swap',
  weight: '400',
  preload: false,
})

export const showroomFontVariables = `${montserrat.variable} ${allura.variable}`
