# RESTART — fiche entreprise

> Source : restart-arcade.fr (extraction du 8 septembre 2026)

## Identité

- **Marque commerciale** : RESTART (souvent « Restart Arcade », d'après le nom de domaine)
- **Baseline** : *Créateur de bien-être en entreprise*
- **Site** : https://restart-arcade.fr
- **Activité** : vente et location d'équipements de jeu et de détente (bornes d'arcade, fléchettes électroniques, baby-foot, billard, flipper numérique, fauteuil massant, cocon de repos), avec personnalisation, livraison et installation clé en main.

## Contact (NAP)

- **Adresse** : 67 B rue des Aubépines, 38280 Villette-d'Anthon, France *(Isère, périphérie est de Lyon)*
- **Téléphone** : 06 67 44 36 02 (également joignable via WhatsApp)
- **E-mail** : contact@restart-arcade.fr
- **Réseaux** : Facebook, LinkedIn, Instagram, WhatsApp

⚠️ **Écart à noter** : l'audit SEO décrit un positionnement « Restart Arcade Lyon », mais le NAP réel est à
Villette-d'Anthon (38). Il faut trancher la zone locale à cibler avant de poser un schema `LocalBusiness`
et une fiche Google Business Profile — voir [audit-seo-2026-08.md](audit-seo-2026-08.md).

## Mentions légales

- **Directrice de publication** : Mme FELIX — contact@restart.fr *(⚠️ domaine différent de contact@restart-arcade.fr affiché sur la page Contact — incohérence à corriger)*
- **Éditeur / agence web** : Hop'Com, 11 rue Brison, 42300 Roanne — RCS Roanne 842 066 239 00043 — 06 21 13 53 45 — anthony.hopcom@gmail.com
- **Hébergeur** : OVH, 2 rue Kellermann, 59100 Roubaix
- ❗ **Aucune information légale sur la société RESTART elle-même** (raison sociale, SIRET, forme juridique, TVA)
  n'apparaît dans les mentions légales : seules celles de l'agence éditrice y figurent. Non conforme LCEN
  pour un site marchand.

## Trois segments d'audience

Le site est organisé en trois parcours parallèles, avec chacun sa home, ses pages produit, son blog et son contact :

| Segment | Home | Blog | Contact |
|---|---|---|---|
| Professionnels / entreprises (QVCT) | `/accueil/` | `/blog-professionnel/` | `/contact/` |
| Particuliers | `/accueil-particulier/` | `/blog-particulier/` | `/contact-particulier/` |
| Bars & commerces | `/accueil-bars-commerces/` | `/blog-bars-commerces/` | `/contact-bc/` |

La racine `/` ne sert que d'aiguillage entre ces trois parcours (et porte un H1 « LANDING PAGE » resté en place).

## Modèle commercial

- **Vente en ligne** : WooCommerce, 15 fiches produit, paiement en 2x/3x/4x mis en avant par un bandeau.
- **Location** : proposée sur les pages billard et l'offre B2B (« location ou achat »).
- **Devis / audit gratuit** : formulaire de contact positionné comme entrée principale côté B2B.
- **Personnalisation** : covering PVC, couleurs, logo client — argument différenciant récurrent.
- **Livraison / installation** : page dédiée `/livraison-installation-particulier/`, livraison France entière annoncée.

## Stack technique

WordPress + WooCommerce + Elementor (+ ElementsKit) + Yoast SEO, hébergé chez OVH.
