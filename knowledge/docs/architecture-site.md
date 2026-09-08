# Architecture du site

92 URLs au sitemap Yoast : 48 pages, 16 articles, 16 URLs produit (15 fiches + `/shop/`), 5 catégories produit, 2 catégories blog.
Liste brute : [`data/urls.txt`](../data/urls.txt). Texte extrait page par page : [`content/`](../content/).

## Arborescence par segment

```
/                                   → aiguillage (H1 « LANDING PAGE »)
├── /accueil/                       PRO — entreprises / QVCT
│   ├── /qui-sommes-nous/  /le-concept/  /nos-produits/  /nos-realisations/
│   ├── /borne-arcade/  /flechettes/  /baby-foot/  /billard/
│   │   /flipper-numerique/  /fauteuil-massant/  /cocon-de-repos/
│   ├── /blog-professionnel/
│   └── /contact/
├── /accueil-particulier/           B2C
│   ├── /qui-sommes-nous-particulier/  /je-cree-particulier/
│   │   /livraison-installation-particulier/
│   ├── /borne-darcade-particulier/  /flechettes-particulier/
│   │   /baby-foot-particulier/  /fauteuil-massant-particulier/
│   ├── /blog-particulier/
│   └── /contact-particulier/
├── /accueil-bars-commerces/        B2B CHR
│   ├── /qui-sommes-nous-bars-commerces/  /bars-commerces-notre-concept/
│   │   /nos-realisations-bars-commerces/
│   ├── /borne-arcade-bars-commerces/  /flechettes-bars-commerces/
│   │   /baby-foot-bars-commerces/  /billard-bars-commerces/
│   │   /flipper-numerique-bars-commerces/
│   ├── /blog-bars-commerces/
│   └── /contact-bc/
└── /shop/ → /produit/<slug>/ (15) + /categorie-produit/<cat>/ (5)
```

## Matrice de duplication (vérifiée le 8/09/2026)

Statut `title` + `meta description` par famille. ❌ = strictement identiques entre variantes.

| Famille | Générique / PRO | Particulier | Bars & commerces | Statut |
|---|---|---|---|---|
| Accueil | `/accueil/` (unique) | `/accueil-particulier/` | `/accueil-bars-commerces/` | ❌ particulier = bars-commerces |
| Borne arcade | `/borne-arcade/` | `/borne-darcade-particulier/` (unique) | `/borne-arcade-bars-commerces/` | ❌ pro = bars-commerces |
| Fléchettes | `/flechettes/` | `/flechettes-particulier/` (unique) | `/flechettes-bars-commerces/` | ❌ pro = bars-commerces |
| Baby-foot | `/baby-foot/` | `/baby-foot-particulier/` (unique) | `/baby-foot-bars-commerces/` | ❌ pro = bars-commerces |
| Billard | `/billard/` | — | `/billard-bars-commerces/` | ❌ identiques |
| Flipper numérique | `/flipper-numerique/` | — | `/flipper-numerique-bars-commerces/` | ❌ identiques |
| Fauteuil massant | `/fauteuil-massant/` | `/fauteuil-massant-particulier/` | — | ✅ distincts |
| Qui sommes-nous | `/qui-sommes-nous/` | `/qui-sommes-nous-particulier/` | `/qui-sommes-nous-bars-commerces/` | ❌ particulier = bars-commerces |
| Le concept | `/le-concept/` | — | `/bars-commerces-notre-concept/` | ❌ identiques |
| Nos réalisations | `/nos-realisations/` | — | `/nos-realisations-bars-commerces/` | ❌ identiques |
| Blog | `/blog-professionnel/` (unique) | `/blog-particulier/` | `/blog-bars-commerces/` | ❌ particulier = bars-commerces |

**11 familles concernées, 10 avec au moins une paire dupliquée mot pour mot** — soit nettement plus que les
2 paires que l'audit du 24/08 avait confirmées. C'est le problème structurant du site.

## Autres constats d'architecture

- **H1 manquant** sur 8 pages stratégiques : `/accueil/`, `/baby-foot/`, `/baby-foot-bars-commerces/`,
  `/flechettes/`, `/flechettes-bars-commerces/`, `/fauteuil-massant/`, `/nos-realisations/`,
  `/nos-realisations-bars-commerces/`, `/qui-sommes-nous/`, `/shop/`.
- **H1 = nom de gabarit interne** : « Accueil – Particulier », « Blog – B&C », « Contact BC », « Je crée – Particulier »,
  « Test »… Ce sont des libellés d'admin, pas des titres orientés utilisateur.
- **Doublons de pages légales** : `/mentions-legales/` + `/mentions-legales-2/`, `/rgpd/` + `/rgpd-2/`.
- **Pages de démo indexables** : `/sample-page/`, `/test/`, `/test-2/`.
- **Fiches produit sans title ni meta rédigés** : `R-PRO`, `SK-PUB`, `SK-BUSINESS`, `SK-4 SAISONS`
  (title = `<SKU> - Restart`, meta vide).
- **`/commande/`** renvoie une page vide (title absent), listée au sitemap.
