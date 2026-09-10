import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Droit de rétractation',
  description:
    'Délai de 14 jours, exceptions pour les produits personnalisés, modalités de retour et de remboursement, et formulaire type de rétractation.',
  alternates: { canonical: '/retractation/' },
}

export default function Page() {
  return (
    <LegalPage title="Droit de rétractation" href="/retractation/" updated="8 septembre 2026">
      <h2>Délai</h2>
      <p>
        Si vous êtes un consommateur et que vous avez commandé à distance, vous disposez de{' '}
        <strong>14 jours</strong> à compter de la réception de votre équipement pour exercer votre
        droit de rétractation, sans avoir à motiver votre décision ni à supporter de pénalité.
      </p>

      <h2>Exception importante : les produits personnalisés</h2>
      <div className="rounded-card border border-amber/40 bg-amber/5 p-5 text-sm">
        <p className="text-chalk">
          Conformément à l&apos;article L.221-28 3° du Code de la consommation, le droit de
          rétractation <strong>ne s&apos;applique pas</strong> aux biens confectionnés selon vos
          spécifications ou nettement personnalisés. Une borne dont le covering, les couleurs de
          boutons ou le logo ont été réalisés à votre demande entre dans ce cas. Vous en êtes informé
          au devis, avant validation du visuel.
        </p>
      </div>

      <h2>Comment exercer votre droit</h2>
      <p>
        Notifiez-nous votre décision par une déclaration dénuée d&apos;ambiguïté, par e-mail à{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> ou par courrier à RESTART,{' '}
        {site.address.street}, {site.address.postalCode} {site.address.city}. Vous pouvez utiliser le
        formulaire type ci-dessous, sans obligation.
      </p>

      <h2>Retour du produit</h2>
      <p>
        Le produit doit être renvoyé au plus tard 14 jours après la notification, dans son état
        d&apos;origine et complet. Compte tenu du poids et du volume des équipements (de 50 à 107 kg),
        le retour est organisé avec nous : contactez-nous avant tout envoi. Les frais de retour
        restent à votre charge, sauf accord contraire.
      </p>

      <h2>Remboursement</h2>
      <p>
        Vous êtes remboursé de la totalité des sommes versées, frais de livraison standard compris,
        au plus tard 14 jours après récupération du bien ou preuve de son expédition. Le
        remboursement est effectué par le même moyen de paiement que celui utilisé pour la commande.
      </p>

      <h2>Formulaire type de rétractation</h2>
      <blockquote className="rounded-card border border-line bg-surface-2 p-5 text-sm">
        <p>À l&apos;attention de RESTART, {site.address.street}, {site.address.postalCode} {site.address.city}, {site.email}</p>
        <p className="mt-3">
          Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien
          ci-dessous :
        </p>
        <p className="mt-3">
          Commandé le … / reçu le …
          <br />
          Référence du produit : …
          <br />
          Nom du consommateur : …
          <br />
          Adresse du consommateur : …
          <br />
          Date : …
          <br />
          Signature (uniquement en cas de notification papier) : …
        </p>
      </blockquote>
    </LegalPage>
  )
}
