import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { ConsentReset } from '@/components/ConsentReset'

export const metadata: Metadata = {
  title: 'Politique de cookies',
  description:
    'Quels cookies sont déposés sur restart-arcade.fr, à quoi ils servent, et comment modifier votre choix à tout moment.',
  alternates: { canonical: '/politique-de-cookies/' },
}

export default function Page() {
  return (
    <LegalPage title="Politique de cookies" href="/politique-de-cookies/" updated="8 septembre 2026">
      <p>
        Un cookie est un petit fichier déposé sur votre appareil lors de la visite d&apos;un site.
        Sur restart-arcade.fr, nous en utilisons le moins possible, et jamais à des fins
        publicitaires.
      </p>

      <h2>Votre choix</h2>
      <ConsentReset />

      <h2>Cookies strictement nécessaires</h2>
      <p>
        Nous stockons votre choix en matière de cookies dans le stockage local de votre navigateur,
        afin de ne pas vous reposer la question à chaque visite. Cette information ne quitte jamais
        votre appareil et ne permet pas de vous identifier. Elle ne nécessite pas de consentement.
      </p>

      <h2>Cookies de mesure d&apos;audience</h2>
      <p>
        Nous utilisons Google Analytics 4 pour savoir quelles pages sont consultées, d&apos;où
        viennent les visiteurs et quels contenus sont utiles. Ces cookies ne sont déposés
        qu&apos;après votre accord explicite : tant que vous n&apos;avez pas accepté, le mode
        consentement de Google est en <strong>denied</strong> et aucun identifiant n&apos;est écrit.
      </p>
      <ul>
        <li>
          <strong>_ga</strong> — distingue les visiteurs. Durée : 13 mois.
        </li>
        <li>
          <strong>_ga_*</strong> — maintient l&apos;état de la session. Durée : 13 mois.
        </li>
      </ul>

      <h2>Cookies publicitaires</h2>
      <p>
        Aucun. Les catégories publicitaires du mode consentement Google (<em>ad_storage</em>,{' '}
        <em>ad_user_data</em>, <em>ad_personalization</em>) restent refusées en permanence, même si
        vous acceptez la mesure d&apos;audience.
      </p>

      <h2>Refuser depuis votre navigateur</h2>
      <p>
        Vous pouvez également bloquer ou supprimer les cookies depuis les réglages de votre
        navigateur. Le site reste entièrement fonctionnel sans eux.
      </p>
    </LegalPage>
  )
}
