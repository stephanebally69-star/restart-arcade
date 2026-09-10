import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente RESTART : commande, prix, paiement, livraison et installation, garanties, réserve de propriété et litiges.',
  alternates: { canonical: '/cgv/' },
}

export default function Page() {
  return (
    <LegalPage title="Conditions générales de vente" href="/cgv/" updated="8 septembre 2026">
      <div className="rounded-card border border-amber/40 bg-amber/5 p-5 text-sm">
        <p className="text-chalk">
          <strong>À faire valider juridiquement avant mise en ligne.</strong> Ce document reprend la
          structure attendue et les éléments factuels connus (prix, garanties, délais). Il doit être
          revu par un conseil, complété des informations légales de la société et daté avant
          publication.
        </p>
      </div>

      <h2>1. Objet et champ d&apos;application</h2>
      <p>
        Les présentes conditions régissent les ventes d&apos;équipements de jeu et de détente
        conclues par RESTART, ainsi que les prestations de livraison, d&apos;installation et de mise
        en service associées. Elles s&apos;appliquent à toute commande, qu&apos;elle soit passée en
        ligne, par devis signé ou par bon de commande.
      </p>

      <h2>2. Commande</h2>
      <p>
        La commande est ferme à réception du devis signé ou de la validation du paiement en ligne.
        Pour les équipements personnalisés, la fabrication ne démarre qu&apos;après votre validation
        écrite du visuel de personnalisation. Cette validation vaut acceptation du rendu.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix affichés sur le Site sont exprimés en euros toutes taxes comprises, livraison et
        installation en France métropolitaine incluses, sauf mention contraire au devis. Les options
        (monnayeur, personnalisation, stickers) font l&apos;objet d&apos;un chiffrage distinct.
        RESTART se réserve le droit de modifier ses prix à tout moment ; le prix applicable est celui
        en vigueur au jour de la commande.
      </p>

      <h2>4. Paiement</h2>
      <p>
        Le paiement s&apos;effectue par carte bancaire ou par virement. Le paiement en 2, 3 ou 4 fois
        est proposé sur les achats en ligne, selon les conditions du prestataire de paiement. Pour
        les professionnels, les modalités et échéances figurent au devis.
      </p>

      <h2>5. Livraison et installation</h2>
      <p>
        Les équipements sont livrés assemblés et testés, puis mis en service sur place. Les délais
        indiqués sont donnés à titre indicatif et courent à compter de la validation de la commande :
        et, pour un équipement personnalisé, de la validation du visuel. Un retard de livraison ne
        peut donner lieu ni à annulation ni à indemnité, sauf faute caractérisée de RESTART.
      </p>
      <p>
        Il vous appartient de vérifier l&apos;accessibilité du lieu d&apos;installation (largeur de
        passage, étage, ascenseur) avant la livraison, et de signaler toute contrainte au moment du
        devis.
      </p>

      <h2>6. Réserve de propriété</h2>
      <p>
        Les biens livrés restent la propriété de RESTART jusqu&apos;au paiement intégral du prix. Les
        risques sont transférés à la livraison.
      </p>

      <h2>7. Garanties</h2>
      <p>
        Les équipements bénéficient d&apos;une garantie commerciale de 2 à 3 ans selon les modèles,
        précisée sur chaque fiche produit. Cette garantie s&apos;ajoute aux garanties légales de
        conformité (articles L.217-3 et suivants du Code de la consommation) et des vices cachés
        (articles 1641 et suivants du Code civil), dont bénéficient de plein droit les consommateurs.
      </p>
      <p>
        Sont exclus de la garantie : l&apos;usure normale, les dommages résultant d&apos;un usage non
        conforme, d&apos;un défaut d&apos;entretien, d&apos;une modification de l&apos;équipement, ou
        de l&apos;exposition d&apos;un modèle « intérieur » aux intempéries.
      </p>

      <h2>8. Droit de rétractation</h2>
      <p>
        Les modalités sont détaillées sur la page <a href="/retractation/">Rétractation</a>.
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans notre{' '}
        <a href="/rgpd/">politique de confidentialité</a>.
      </p>

      <h2>10. Litiges</h2>
      <p>
        Les présentes conditions sont soumises au droit français. En cas de litige, une solution
        amiable sera recherchée en priorité en écrivant à{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Le consommateur peut recourir gratuitement
        à un médiateur de la consommation. À défaut d&apos;accord, les tribunaux français sont
        compétents.
      </p>
    </LegalPage>
  )
}
