# Plan de taggage GA4

Tous les évènements passent par `window.dataLayer`, poussés depuis
[`src/lib/analytics.ts`](../src/lib/analytics.ts). Le tag GA4 démarre en **Consent Mode v2** avec
`analytics_storage: denied` : aucun cookie n'est écrit avant acceptation du bandeau.

## Évènements

| Évènement | Déclencheur | Paramètres |
|---|---|---|
| `page_view` | Chargement initial + chaque navigation client | `page_path` |
| `select_audience` | Clic sur un onglet du sélecteur d'audience (home) | `audience`, `link_location` |
| `view_item_list` | Affichage d'une liste de produits | `item_list_name`, `ecommerce.items[]` |
| `select_item` | Clic sur une carte produit | `item_list_name`, `ecommerce.items[]` |
| `view_item` | Affichage d'une fiche produit | `ecommerce.currency`, `ecommerce.value`, `ecommerce.items[]` |
| `cta_click` | Clic sur un CTA principal (header, menu mobile) | `cta_label`, `link_location` |
| `contact_click` | Clic sur téléphone, e-mail ou WhatsApp | `contact_method`, `link_location` |
| `form_start` | Première saisie dans le formulaire de devis | `form_name` |
| `generate_lead` | Envoi du formulaire de devis | `form_name`, `audience`, `product_interest`, `has_phone`, `currency` |
| `consent_update` | Choix ou modification du consentement cookies | `consent_state` |

## Paramètres personnalisés à déclarer dans GA4

Sans déclaration, ces paramètres ne remontent pas dans les rapports.
**Admin → Définitions personnalisées → Créer une dimension personnalisée**, portée « Événement » :

| Nom à afficher | Paramètre | Pourquoi |
|---|---|---|
| Audience | `audience` | Segmenter entreprise / bar / particulier — impossible autrement depuis la fusion des parcours |
| Emplacement du lien | `link_location` | Savoir quel CTA convertit (header, hero, fin de page) |
| Produit d'intérêt | `product_interest` | Relier une demande de devis à un modèle précis |
| Méthode de contact | `contact_method` | Comparer téléphone, e-mail et WhatsApp |
| Libellé du CTA | `cta_label` | Comparer les formulations |
| État du consentement | `consent_state` | Estimer le taux d'acceptation, et donc le biais de mesure |

## Conversions à marquer comme évènements clés

**Admin → Événements → marquer comme événement clé** :

1. `generate_lead` — la conversion principale
2. `contact_click` — un appel direct vaut un formulaire envoyé
3. `view_item` (optionnel) — utile comme micro-conversion en début de collecte

## Entonnoir à surveiller

```
page_view → select_audience → view_item_list → select_item → view_item → form_start → generate_lead
```

L'écart le plus instructif est **`form_start` → `generate_lead`** : il isole les abandons dus au
formulaire lui-même, indépendamment du trafic.

## Mise en service

1. Créer la propriété GA4 (ou réutiliser l'existante) et récupérer l'identifiant `G-XXXXXXXXXX`.
2. Dans le repo GitHub : **Settings → Secrets and variables → Actions → Variables → New variable**,
   nom `GA4_ID`, valeur `G-XXXXXXXXXX`.
3. Relancer le workflow de déploiement.

Sans cette variable, le composant `Analytics` ne rend aucun script : le site fonctionne
normalement, simplement sans mesure. C'est volontaire — cela évite d'expédier un tag vide
ou de polluer une propriété de production depuis un environnement de test.

## Vérifier que ça marche

- **GA4 → Temps réel** : ouvrir le site, accepter les cookies, vérifier l'apparition de `page_view`.
- **Console du navigateur** : `window.dataLayer` doit contenir les évènements poussés.
- **Extension Chrome « Google Tag Assistant »** : contrôle le statut du Consent Mode.
- Avant acceptation, l'onglet Application → Cookies ne doit contenir **aucun** cookie `_ga`.
