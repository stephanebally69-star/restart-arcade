// Police de la version Showroom, d'après poltronesofa.com : une linéale géométrique
// (Metropolis là-bas, Montserrat ici, sa plus proche cousine). Fichier local (Fontsource,
// sous-ensemble latin, licence OFL) : le build ne dépend pas de Google Fonts.
import localFont from 'next/font/local'

const montserrat = localFont({
  src: '../fonts/montserrat-variable.woff2',
  variable: '--ff-showroom',
  display: 'swap',
  weight: '100 900',
})

export const showroomFontVariables = montserrat.variable
