# Audit SEO — 24 août 2026 (repris et actualisé)

Source : audit externe en lecture publique (crawl HTTP, sans Search Console ni outil de backlinks).
Artefact d'origine : https://claude.ai/code/artifact/06c1b376-d52a-4603-8fc2-148f95e71d45

**Score initial** : 4 critiques · 5 à corriger · 4 acquis · 2 zones aveugles.
Les mentions « ✔ recoupé 08/09 » signalent les points revérifiés lors de l'alimentation de ce repo.

## 01 — Technique & indexation

| Statut | Constat |
|---|---|
| ✅ Acquis | Sitemap sain à 98 % : 92 URLs, 90 en HTTP 200 avec canonical correct, pas de problème hreflang (site mono-langue). |
| ✅ Acquis | Redirections propres : HTTP→HTTPS (301) et www→non-www (301). Une seule version canonique servie. |
| ⚠️ À corriger | `/panier/` est en `noindex, follow` mais listée au sitemap ; `/commande/` redirige en 302 vers `/panier/` et y figure aussi. Signal contradictoire. → exclure les deux du sitemap Yoast. ✔ recoupé 08/09 |
| ⚠️ À corriger | Pages de démo publiques et indexables : `/sample-page/`, `/test/`, `/test-2/`. → supprimer, ou `noindex` + retrait du sitemap. ✔ recoupé 08/09 |
| 🔍 Zone aveugle | Pas d'accès Search Console : couverture d'index, Core Web Vitals, impressions/clics et actions manuelles invérifiables. PageSpeed public a renvoyé un 429 pendant l'audit. → obtenir un accès lecteur sur la propriété GSC. |

## 02 — Architecture & duplication *(le point le plus structurant)*

| Statut | Constat |
|---|---|
| 🔴 Critique | Titres et meta descriptions strictement identiques entre variantes d'audience. L'audit avait confirmé 2 paires (accueil, baby-foot) ; le recoupement du 08/09 en trouve **10 familles sur 11** — voir la matrice complète dans [architecture-site.md](architecture-site.md). Google ne peut pas arbitrer : il écarte une page ou dilue l'autorité. |
| 🔴 Critique | `/` n'est pas une vraie page d'accueil : H1 littéral « LANDING PAGE » (gabarit WordPress non renommé) suivi d'un second H1 qui est un lien vers `/accueil/`. Deux H1 sur la page la plus stratégique, qui ne sert que d'aiguillage. ✔ recoupé 08/09 |
| ⚠️ À corriger | Jusqu'à 3 URLs indexables pour un même produit, toutes au sitemap. → trancher famille par famille : contenus réellement distincts (titres/H1/meta uniques + maillage différencié) ou fusion avec 301. |

## 03 — On-page & fiches produit

| Statut | Constat |
|---|---|
| 🔴 Critique | Titres de fiches produit = référence SKU brute. Recoupement 08/09 : **4 fiches sur 15** encore concernées — `R-PRO`, `SK-PUB`, `SK-BUSINESS`, `SK-4 SAISONS` (`title` = `<SKU> - Restart`, meta vide). Les 11 autres ont depuis été rédigées correctement (modèle R-KIDS). **Le chantier est donc en grande partie fait.** |
| ✅ Acquis | Pages éditoriales bien balisées : home, `/nos-produits/`, blogs — titres et meta présents, longueur correcte, `alt` sur les images testées. |
| ⚠️ Nouveau (08/09) | ~10 pages sans aucun H1, et des H1 qui reprennent des libellés d'admin (« Blog – B&C », « Contact BC », « Accueil – Particulier »). |
| ⚠️ Nouveau (08/09) | Les 3 fiches `SK-*` n'affichent aucune caractéristique produit, seulement « Configuration costs: - ». |
| 🔍 Zone aveugle | Richesse du texte descriptif, avis clients et visuels produit non audités fiche par fiche. |

## 04 — Données structurées & SEO local

| Statut | Constat |
|---|---|
| ⚠️ À corriger | Schema.org minimal : un seul `Organization` (nom, URL, logo) avec `sameAs` vide. Aucun `Product`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`. → Yoast génère le `Product` schema automatiquement si bien connecté à WooCommerce : à vérifier en priorité, c'est potentiellement un simple réglage. |
| ⚠️ À corriger | Aucun signal local structuré. L'audit parlait d'un positionnement « Restart Arcade Lyon » ; le NAP réel relevé le 08/09 est **67 B rue des Aubépines, 38280 Villette-d'Anthon** (Isère, est lyonnais). → arbitrer la zone cible, créer/relier une fiche Google Business Profile, poser un `LocalBusiness` cohérent avec le NAP affiché. |
| ⚠️ Nouveau (08/09) | Incohérence NAP interne : la page Contact affiche `contact@restart-arcade.fr`, les mentions légales `contact@restart.fr`. Et les mentions légales ne donnent aucune information sur la société RESTART elle-même (raison sociale, SIRET, forme juridique) — seulement celles de l'agence Hop'Com. Problème de conformité autant que de SEO local. |

## 05 — Contenu & concurrence

| Statut | Constat |
|---|---|
| ✅ Acquis | 16 articles, répartis entre blog particulier (rétrogaming) et blog bars-commerces / pro (aménagement). Dernières publications début juillet 2026. |
| ❌ Infirmé (08/09) | L'audit lisait « 8 des 16 articles publiés le 3 juillet 2026 », donc une mise en ligne groupée. Les `article:published_time` réels s'étalent du 29/07/2025 au 03/07/2026, environ un article par mois : **le rythme est régulier**. Le vrai constat est ailleurs — plus rien depuis le 03/07/2026, et aucun article ne cible le particulier/rétrogaming malgré un blog dédié. Voir [blog.md](blog.md). |
| ℹ️ Contexte | Concurrents identifiés sur le créneau : retro-arcade.fr, byanim.fr, locarcade.fr, bornetobearcade.fr, rebornarcade.fr, borne-arcade-bartop.fr (location/vente de bornes, événementiel ou aménagement pro). Un comparatif backlinks/mots-clés (Ahrefs, Semrush) reste à faire. |

## Priorisation d'origine

**Cette semaine**
1. Dédupliquer titres/meta des paires accueil et baby-foot *(à élargir : 10 familles concernées)*
2. Corriger le H1 de la home (retirer « LANDING PAGE »)
3. Exclure `/panier/` et `/commande/` du sitemap (réglage Yoast)
4. Retirer ou noindexer `/sample-page/`, `/test/`, `/test-2/`

**Ce trimestre**
1. Réécrire titres + meta des fiches produit *(4 restantes : R-PRO, SK-PUB, SK-BUSINESS, SK-4 SAISONS)*
2. Vérifier/activer le `Product` schema WooCommerce dans Yoast
3. Trancher chaque famille dupliquée restante
4. Ajouter `LocalBusiness` schema + NAP cohérent
5. Obtenir un accès Search Console
