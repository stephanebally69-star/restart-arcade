import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Politique de confidentialité (RGPD)',
  description:
    'Quelles données RESTART collecte, pourquoi, combien de temps elles sont conservées et comment exercer vos droits.',
  alternates: { canonical: '/rgpd/' },
}

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" href="/rgpd/" updated="8 septembre 2026">
      <p>
        Cette page explique quelles données personnelles nous collectons via restart-arcade.fr, ce
        que nous en faisons, et comment vous gardez la main dessus.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        RESTART, {site.address.street}, {site.address.postalCode} {site.address.city}. Contact :{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Données collectées et finalités</h2>
      <ul>
        <li>
          <strong>Formulaire de devis</strong> : nom, e-mail, téléphone, entreprise, ville, produit
          souhaité et description du projet. Finalité : répondre à votre demande et établir un devis.
          Base légale : mesures précontractuelles prises à votre demande.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong> : pages consultées, source de visite, type
          d&apos;appareil, interactions avec le catalogue et le formulaire. Finalité : comprendre
          quelles pages sont utiles et améliorer le site. Base légale : votre consentement, recueilli
          via le bandeau cookies.
        </li>
      </ul>
      <p>
        Aucune donnée n&apos;est collectée à des fins publicitaires. Nous ne pratiquons ni la
        revente, ni la location de fichiers.
      </p>

      <h2>3. Durée de conservation</h2>
      <ul>
        <li>Demandes de devis : 3 ans à compter du dernier contact.</li>
        <li>Données de mesure d&apos;audience : 14 mois maximum.</li>
        <li>Documents comptables liés à une commande : 10 ans (obligation légale).</li>
      </ul>

      <h2>4. Destinataires</h2>
      <p>
        Vos données sont traitées par l&apos;équipe RESTART. Les données de mesure d&apos;audience
        sont traitées par Google Ireland Limited dans le cadre de Google Analytics 4, uniquement si
        vous y avez consenti.
      </p>

      <h2>5. Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
        limitation, d&apos;opposition et de portabilité. Pour les exercer, écrivez à{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également introduire une
        réclamation auprès de la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).
      </p>

      <h2>6. Retirer votre consentement</h2>
      <p>
        Le consentement à la mesure d&apos;audience se retire à tout moment depuis la{' '}
        <a href="/politique-de-cookies/">page cookies</a>, sans conséquence sur l&apos;usage du site.
      </p>
    </LegalPage>
  )
}
