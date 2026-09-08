import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site restart-arcade.fr : éditeur, directeur de publication, hébergeur et propriété intellectuelle.',
  alternates: { canonical: '/mentions-legales/' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <LegalPage title="Mentions légales" href="/mentions-legales/" updated="8 septembre 2026">
      <p>
        Le site RESTART est accessible à l&apos;adresse <strong>restart-arcade.fr</strong>{' '}
        (ci-après « le Site »). L&apos;accès et l&apos;utilisation du Site sont soumis aux présentes
        mentions légales ainsi qu&apos;aux lois et règlements applicables.
      </p>

      <h2>1. Éditeur du site</h2>
      <div className="rounded-card border border-amber/40 bg-amber/5 p-5 text-sm">
        <p className="text-chalk">
          <strong>À compléter avant mise en ligne.</strong> Les informations légales relatives à la
          société RESTART (raison sociale exacte, forme juridique, capital social, numéro SIREN/SIRET,
          RCS, numéro de TVA intracommunautaire, adresse du siège) doivent figurer ici. L&apos;article
          6-III de la LCEN les rend obligatoires pour un site marchand, et leur absence sur la version
          actuelle du site constitue un manquement.
        </p>
      </div>
      <ul>
        <li>Raison sociale : RESTART — <em>forme juridique à compléter</em></li>
        <li>Siège social : {site.address.street}, {site.address.postalCode} {site.address.city}</li>
        <li>SIREN / SIRET : <em>à compléter</em></li>
        <li>RCS : <em>à compléter</em></li>
        <li>TVA intracommunautaire : <em>à compléter</em></li>
        <li>
          Téléphone : <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
        </li>
        <li>
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Mme Felix, en qualité de représentante légale, joignable à l&apos;adresse{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>3. Hébergeur</h2>
      <p>
        Le site est hébergé par <strong>GitHub, Inc.</strong>, 88 Colin P. Kelly Jr. Street, San
        Francisco, CA 94107, États-Unis, via le service GitHub Pages.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du Site (textes, visuels, logos, dénominations de modèles,
        structure) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou
        représentation, totale ou partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations présentées sur le Site, notamment les caractéristiques techniques et les
        prix, sont fournies à titre indicatif et peuvent évoluer. Seul le devis signé fait foi quant
        aux caractéristiques, au prix et aux délais de la prestation.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans notre{' '}
        <a href="/rgpd/">politique de confidentialité</a>, et l&apos;usage des traceurs dans notre{' '}
        <a href="/politique-de-cookies/">politique de cookies</a>.
      </p>
    </LegalPage>
  )
}
