/**
 * Avis Google affichés sur l'ancien restart-arcade.fr (widget « Ils ont essayé
 * et adoré », note 5,0 sur 25 avis), relevés le 8 septembre 2026 : voir
 * knowledge/content/pages/accueil.md. Citations reprises mot pour mot ; un
 * passage coupé est signalé par « […] ». Nom de famille réduit à l'initiale.
 */
export const googleRating = { value: '5,0', count: 25 }

export type Review = { author: string; text: string; featured?: boolean }

export const reviews: Review[] = [
  {
    author: 'Société Hector Le Bigourdan',
    text: "La mise en place de notre jeu d'arcade et de notre baby-foot s'est déroulée parfaitement. […] Nos clients sont ravis et ces équipements apportent une vraie valeur ajoutée à notre établissement.",
    featured: true,
  },
  {
    author: 'Eric B.',
    text: "J'ai acheté une borne d'arcade chez RESTART fin 2025 et j'en suis entièrement satisfait. La qualité est au rendez-vous, et le suivi après-vente est tout aussi remarquable.",
  },
  {
    author: 'Johann M.',
    text: "Borne entièrement personnalisable et excellent suivi ! L'équipe fait preuve d'un grand professionnalisme.",
  },
  {
    author: 'Thomas B.',
    text: 'Mon délai était très court et Restart a parfaitement répondu à mes attentes ; réactivité, efficacité et professionnalisme !',
  },
  {
    author: 'Anne D.',
    text: "J'ai préféré acheter plutôt que de louer la borne pour ma boutique à Porto-Vecchio. Ils me l'ont personnalisée avec mon logo.",
  },
  {
    author: 'Adrien A.',
    text: "Le matériel est de qualité, l'installation impeccable et l'expérience a largement dépassé nos attentes.",
  },
  {
    author: 'Aloïs D.',
    text: "Une borne d'arcade ou un jeu de fléchettes peut vraiment changer l'ambiance collective !",
  },
  {
    author: 'Fabrice C.',
    text: "Satisfait de l'entreprise Restart et très content de la borne d'arcade conforme à mes attentes et facile d'utilisation.",
  },
]
