# Plan de redirections 301 — ancien site vers refonte

La refonte fusionne les trois parcours parallèles (`/accueil/`, `/accueil-particulier/`,
`/accueil-bars-commerces/`) en une seule arborescence. Chaque ancienne URL doit donc être
redirigée en **301** vers son équivalent, sans quoi l'autorité accumulée est perdue et les
visiteurs venant de Google tombent sur des 404.

> ⚠️ GitHub Pages ne gère pas les redirections serveur. Ce tableau est destiné à la mise en
> production sur l'hébergement définitif (règles Apache/Nginx, plugin Redirection sous WordPress,
> ou `next.config` si le site est servi par un runtime Next.js).

## Pages d'accueil et institutionnelles

| Ancienne URL | Nouvelle URL |
|---|---|
| `/accueil/` | `/` |
| `/accueil-particulier/` | `/` |
| `/accueil-bars-commerces/` | `/` |
| `/qui-sommes-nous/` | `/qui-sommes-nous/` |
| `/qui-sommes-nous-particulier/` | `/qui-sommes-nous/` |
| `/qui-sommes-nous-bars-commerces/` | `/qui-sommes-nous/` |
| `/le-concept/` | `/qui-sommes-nous/` |
| `/bars-commerces-notre-concept/` | `/qui-sommes-nous/` |
| `/nos-realisations/` | `/realisations/` |
| `/nos-realisations-bars-commerces/` | `/realisations/` |
| `/nos-produits/` | `/produits/` |
| `/shop/` | `/produits/` |
| `/je-cree-particulier/` | `/contact/` |
| `/livraison-installation-particulier/` | `/contact/` |

## Univers produits

Les trois variantes par audience convergent vers une page unique, dont les sections
`#entreprise`, `#bar-commerce` et `#particulier` reprennent le discours segmenté.

| Ancienne URL | Nouvelle URL |
|---|---|
| `/borne-arcade/` | `/produits/borne-arcade/` |
| `/borne-darcade-particulier/` | `/produits/borne-arcade/#particulier` |
| `/borne-arcade-bars-commerces/` | `/produits/borne-arcade/#bar-commerce` |
| `/flechettes/` | `/produits/flechettes/` |
| `/flechettes-particulier/` | `/produits/flechettes/#particulier` |
| `/flechettes-bars-commerces/` | `/produits/flechettes/#bar-commerce` |
| `/baby-foot/` | `/produits/baby-foot/` |
| `/baby-foot-particulier/` | `/produits/baby-foot/#particulier` |
| `/baby-foot-bars-commerces/` | `/produits/baby-foot/#bar-commerce` |
| `/billard/` | `/produits/billard/` |
| `/billard-bars-commerces/` | `/produits/billard/#bar-commerce` |
| `/flipper-numerique/` | `/produits/flipper-numerique/` |
| `/flipper-numerique-bars-commerces/` | `/produits/flipper-numerique/#bar-commerce` |
| `/fauteuil-massant/` | `/produits/fauteuil-massant/` |
| `/fauteuil-massant-particulier/` | `/produits/fauteuil-massant/#particulier` |
| `/cocon-de-repos/` | `/produits/cocon-de-repos/` |

## Fiches produit

| Ancienne URL | Nouvelle URL |
|---|---|
| `/produit/r-kids/` | `/produits/borne-arcade/r-kids/` |
| `/produit/r-level/` | `/produits/borne-arcade/r-level/` |
| `/produit/rborne-arcade-cocktail-twin/` | `/produits/borne-arcade/r-twin/` |
| `/produit/r-evolution/` | `/produits/borne-arcade/r-evolution/` |
| `/produit/r-pro/` | `/produits/borne-arcade/r-pro/` |
| `/produit/sk-pub/` | `/produits/borne-arcade/` |
| `/produit/sk-business/` | `/produits/borne-arcade/` |
| `/produit/sk-4-saisons/` | `/produits/borne-arcade/` |
| `/produit/r-dart/` | `/produits/flechettes/r-dart/` |
| `/produit/r-dart-pro/` | `/produits/flechettes/r-dart-pro/` |
| `/produit/bf-start/` | `/produits/baby-foot/bf-start/` |
| `/produit/bf-premium/` | `/produits/baby-foot/bf-premium/` |
| `/produit/bf-4-saisons/` | `/produits/baby-foot/bf-4-saisons/` |
| `/produit/bf-4-saisons-6-joueurs/` | `/produits/baby-foot/bf-4-saisons-6-joueurs/` |
| `/produit/m-serenity/` | `/produits/fauteuil-massant/m-serenity/` |
| `/categorie-produit/borne-darcade/` | `/produits/borne-arcade/` |
| `/categorie-produit/flechettes/` | `/produits/flechettes/` |
| `/categorie-produit/baby-foot/` | `/produits/baby-foot/` |
| `/categorie-produit/billard/` | `/produits/billard/` |
| `/categorie-produit/fauteuil-massant/` | `/produits/fauteuil-massant/` |

**Les trois références `SK-*` redirigent vers la page univers**, faute de fiche exploitable :
elles n'avaient ni caractéristiques, ni description, ni meta sur l'ancien site. Si ces modèles
sont toujours commercialisés, il faut créer les fiches et rebrancher les redirections dessus.

## Blog

| Ancienne URL | Nouvelle URL |
|---|---|
| `/blog-professionnel/` | `/blog/` |
| `/blog-particulier/` | `/blog/` |
| `/blog-bars-commerces/` | `/blog/` |
| `/<slug-article>/` | `/blog/<slug-article>/` |

Les 12 articles conservent leur slug. Quatre pages écartées de la refonte (contenu quasi vide)
redirigent vers une page utile :

| Ancienne URL | Nouvelle URL |
|---|---|
| `/presentation-produits/` | `/produits/` |
| `/presentation-borne-arcade/` | `/produits/borne-arcade/` |
| `/presentation-flechette/` | `/produits/flechettes/` |
| `/notices-des-produits-restart/` | `/contact/` |

## Contact et pages légales

| Ancienne URL | Nouvelle URL |
|---|---|
| `/contact/` | `/contact/` |
| `/contact-particulier/` | `/contact/` |
| `/contact-bc/` | `/contact/` |
| `/mentions-legales/`, `/mentions-legales-2/` | `/mentions-legales/` |
| `/rgpd/`, `/rgpd-2/` | `/rgpd/` |
| `/politique-de-cookies-ue/` | `/politique-de-cookies/` |
| `/cgv/` | `/cgv/` |
| `/retractation/` | `/retractation/` |

## À supprimer sans redirection (410 ou 404)

Ces URLs n'ont aucun équivalent et ne doivent pas être maintenues :
`/sample-page/`, `/test/`, `/test-2/`, `/panier/`, `/commande/`.
