# Restart Arcade — base de connaissances

Repo de travail sur **restart-arcade.fr** (RESTART — vente et location de bornes d'arcade, fléchettes,
baby-foot, billard, flipper numérique, fauteuil massant et cocon de repos).

Toutes les données proviennent d'une extraction publique du site le **8 septembre 2026**, complétée par
l'audit SEO externe du 24 août 2026.

## Contenu

| Chemin | Quoi |
|---|---|
| [docs/entreprise.md](docs/entreprise.md) | Identité, NAP, mentions légales, segments d'audience, modèle commercial, stack |
| [docs/catalogue.md](docs/catalogue.md) | Les 15 fiches produit avec prix et caractéristiques, + gammes vendues sur devis |
| [docs/architecture-site.md](docs/architecture-site.md) | Arborescence des 3 parcours, matrice de duplication, constats de structure |
| [docs/blog.md](docs/blog.md) | Inventaire éditorial et correction du constat « rythme » de l'audit |
| [docs/audit-seo-2026-08.md](docs/audit-seo-2026-08.md) | Audit SEO repris, recoupé et actualisé au 08/09 |
| [data/produits.json](data/produits.json) | Catalogue structuré (SKU, prix, catégorie, cible, specs) |
| [data/urls.txt](data/urls.txt) | Les 87 URLs uniques du sitemap |
| [content/pages/](content/pages/) | Texte extrait des 48 pages |
| [content/produits/](content/produits/) | Texte extrait des 16 URLs produit |
| [content/blog/](content/blog/) | Texte extrait des 16 articles |

## Ce qu'il faut retenir

- Le site déploie **trois parcours parallèles** (professionnels / particuliers / bars & commerces), ce qui a
  produit des familles de pages quasi-jumelles : **10 familles sur 11 ont au moins une paire de pages aux
  `title` et `meta description` strictement identiques**. C'est le chantier structurant.
- La racine `/` n'est qu'un aiguillage et porte encore un H1 « LANDING PAGE ».
- Côté fiches produit, le chantier signalé en août est **largement rattrapé** : 11 fiches sur 15 sont
  désormais correctement rédigées ; restent `R-PRO`, `SK-PUB`, `SK-BUSINESS`, `SK-4 SAISONS`.
- Aucun schema `Product` ni `LocalBusiness`, et un NAP incohérent entre la page Contact
  (`contact@restart-arcade.fr`, Villette-d'Anthon 38) et les mentions légales (`contact@restart.fr`,
  aucune donnée légale sur RESTART).
- Le blog tient un **rythme mensuel régulier** depuis juillet 2025 (l'audit se trompait sur ce point), mais
  rien n'est paru depuis le 3 juillet 2026, et **aucun article ne cible le particulier** malgré un blog dédié.
- **Prix** : de 899 € (R-KIDS) à 2 638,80 € (R-DART PRO). Paiement en 2x/3x/4x mis en avant.

## Rafraîchir les données

Les scripts d'extraction Perl utilisés sont conservés dans `.tmp/` (non versionné). Le principe :
`sitemap_index.xml` → sous-sitemaps → `curl` de chaque URL → extraction `title`/`meta`/`h1`/prix/specs.
