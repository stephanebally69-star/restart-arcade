# RESTART — refonte du site

Refonte de [restart-arcade.fr](https://restart-arcade.fr) : design, expérience utilisateur, SEO/GEO
et mesure d'audience. Site statique Next.js 15, déployé sur GitHub Pages.

**URL de test** : voir l'onglet *Actions → Deploy* ou *Settings → Pages* du repo.

## Version Showroom (cette branche)

Proposition publiée sous `/showroom/` du site Pages. L'accueil reprend la disposition et l'esprit
de [poltronesofa.com/fr-FR](https://www.poltronesofa.com/fr-FR), section par section, avec le
contenu réel de RESTART :

| poltronesofa.com | Showroom |
|---|---|
| Bandeau marine des promotions | Retiré à la demande du client |
| Logo, gammes en capitales au centre, liens utilitaires à droite | En-tête de la version Panorama : « Menu » et publics à gauche, logo de la version Halo au centre, réalisations, téléphone et devis à droite ; transparent sur le film, menu plein écran |
| Film plein écran | Photos en situation en fondu enchaîné, lent travelling avant (`HeroFilm`) |
| « Entrez dans un monde de confort. » + paragraphe en capitales | « Transformez vos espaces avec RESTART. » + chiffres du catalogue, signature « créateur de bien-être en entreprise » |
| Carrousel des gammes, deux photos par vue | Huit gammes, flèches rondes blanches, légendes en capitales (`CategoryCarousel`) |
| Bandeau marine : vidéo à bouton lecture rouge, bouton rouge | Le bouton lecture lance le défilé des photos ; « Dès 899 €, en achat ou en location » (`PlayPanel`) |
| « Plus de 300 magasins » | « Un atelier et un showroom près de Lyon, une livraison partout en France » |
| « Pourquoi nous choisir » : trois artisans signés « Maestro … » | Conseil, Personnalisation, Installation, signatures manuscrites (Allura) |
| Pied de page en dégradé marine, quatre colonnes centrées | Idem, avec NAP et mentions de MG2T |

Palette marine `#283444`, crème `#fffdfc`, rouge `#c4262e` ; Montserrat à la place de Metropolis (fichiers locaux dans `src/fonts/`).
Elle s'applique à tout le site de la branche (`html[data-site='showroom']` dans `globals.css`).
Pas de sélecteur de thème ni de versions internes ici : l'onglet « Version » renvoie vers les
autres propositions (`src/lib/versions.ts`). La pop-in d'inscription à la newsletter de
poltronesofa.com n'est pas reprise.

## Ce que la refonte change

### Architecture — la duplication disparaît

L'ancien site déployait **trois parcours parallèles** (professionnels, particuliers, bars &
commerces) avec une page par produit et par audience. Résultat mesuré au crawl du 8 septembre 2026 :
**10 familles de pages sur 11 avaient au moins une paire de pages aux `title` et `meta description`
strictement identiques**. Google ne pouvait pas arbitrer, et l'autorité se diluait entre deux ou
trois URLs concurrentes.

Ici, **une seule URL par produit**. Les trois audiences cohabitent dans la page, via un sélecteur en
accueil et une section « Selon votre situation » sur chaque page univers. Le discours segmenté est
conservé ; la concurrence entre URLs, non.

| Avant | Après |
|---|---|
| `/baby-foot/`, `/baby-foot-particulier/`, `/baby-foot-bars-commerces/` | `/produits/baby-foot/` |
| `/accueil/`, `/accueil-particulier/`, `/accueil-bars-commerces/` | `/` |
| `/blog-professionnel/`, `/blog-particulier/`, `/blog-bars-commerces/` | `/blog/` |

Le plan de redirections 301 complet est dans [`docs/redirections.md`](docs/redirections.md).

### SEO

- `title` et `meta description` uniques sur chacune des 47 pages, générés depuis les données.
- Un seul `<h1>` par page, décrivant le contenu réel (l'ancienne home portait un `<h1>` « LANDING PAGE »).
- **Schema.org complet** : `Organization`, `LocalBusiness` (NAP, géolocalisation, zone desservie),
  `WebSite`, `Product` avec `Offer` sur chaque fiche, `BreadcrumbList`, `FAQPage`, `BlogPosting`,
  `CollectionPage`, `ItemList`. L'ancien site n'avait qu'un `Organization` au `sameAs` vide.
- Sitemap et `robots.txt` générés depuis les données — ni page de test, ni panier, ni URL morte.
- Fil d'Ariane sur toutes les pages profondes, maillage interne entre univers, modèles et articles.

### GEO — être cité par les moteurs de réponse

- Un encadré **« En bref »** en haut de chaque page importante : un paragraphe autoportant avec des
  chiffres vérifiables, qui est le format que ChatGPT, Perplexity et les AI Overviews citent.
- Des **FAQ balisées `FAQPage`** répondant à de vraies questions (« Combien coûte une borne
  d'arcade ? », « Quel baby-foot choisir pour l'extérieur ? »), avec des réponses chiffrées.
- Un [`/llms.txt`](src/app/llms.txt/route.ts) généré depuis le catalogue : identité, zone
  desservie, prix de chaque modèle, faits saillants. Comme il partage sa source avec les pages,
  les prix qu'un moteur y lit ne peuvent pas diverger de ceux affichés.

### Tracking

Plan de taggage GA4 complet avec Consent Mode v2 : voir
[`docs/plan-de-taggage.md`](docs/plan-de-taggage.md). Aucun cookie n'est déposé avant acceptation.

### Design et UX

- Thème sombre, accents néon (magenta/cyan) réservés aux CTA et aux états actifs.
- Navigation à un seul niveau de choix : plus d'« espace » à sélectionner avant de voir un produit.
- Prix affichés dès la carte produit, spécifications complètes sur chaque fiche.
- Formulaire de devis pré-rempli depuis la fiche produit consultée (`?produit=SKU`).
- Accessibilité : lien d'évitement, navigation au clavier, `aria-*` sur les onglets et le menu,
  contrastes conformes, `prefers-reduced-motion` respecté.

## Versions du site

L'onglet « Version », sur le bord gauche, propose quatre versions de l'accueil. Le choix dure le
temps de la visite ; `?version=cinema`, `?version=plateau` ou `?version=plateau-clair` dans l'URL
ouvre directement une version.

- **Carrousel** : carrousel photo, une gamme par slide.
- **Cinéma** : film du lancer de fléchette figé, puis baby-foot et flipper.
- **Plateau** : mise en page sombre inspirée de resend.com, qui s'applique à tout le site ; le hero
  enchaîne en fondu les photos détourées des produits (`public/img/plateau/`, tirées du catalogue
  et de restart-arcade.fr), une carte par situation, catalogue en images (`src/components/plateau/`).
- **Plateau clair** : la même page en thème clair. Les composants Plateau n'emploient que les
  couleurs `pl-ink`, `pl-bg` et `pl-gold`, redéfinies par version dans `src/app/globals.css`.

Le film de la version Cinéma (`public/video/`) est rendu avec le studio Remotion de l'agence
(`mbn-ads-agency/studio`, modèle `BulletTime`) à partir des réglages de `video/` :

```bash
cd ../mbn-ads-agency/studio
node render.mjs <jobs.json>   # jobs : composition BulletTime, props video/hero-cinema*.props.json, "gl": "angle"
```

Les repères de temps du film (gel de la fléchette, scènes) sont repris dans
`src/components/CinemaHero.tsx` et `src/app/page.tsx` : à mettre à jour si le film change.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # export statique dans out/
```

Variables d'environnement (toutes optionnelles en local) :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Sous-chemin de déploiement (`/restart-arcade` sur GitHub Pages) |
| `NEXT_PUBLIC_SITE_URL` | URL absolue, utilisée pour les canonical et le JSON-LD |
| `NEXT_PUBLIC_GA4_ID` | Identifiant GA4 `G-XXXXXXXXXX`. Absent = aucun script de mesure |

## Structure

```
src/
├── app/                    # Routes (App Router, export statique)
│   ├── produits/[univers]/[modele]/
│   ├── blog/[slug]/
│   ├── llms.txt/           # Résumé factuel pour les moteurs génératifs
│   ├── sitemap.ts robots.ts
│   └── …                   # contact, qui-sommes-nous, réalisations, pages légales
├── components/             # Header, Footer, formulaire, cartes, primitives UI
├── data/
│   ├── catalogue.ts        # Source unique : univers, modèles, prix, specs, FAQ
│   ├── blog.json           # 12 articles extraits de l'ancien site
│   └── blog.ts             # Titres réécrits et catégorisation
└── lib/
    ├── site.ts             # NAP, réseaux, identifiants
    └── analytics.ts        # Helpers dataLayer GA4
```

`src/data/catalogue.ts` est la **source unique** : les pages, le sitemap, le JSON-LD, le `llms.txt`
et les options du formulaire en sont tous dérivés. Changer un prix à un seul endroit le met à jour
partout, y compris dans le balisage structuré.

## Points à trancher avant mise en production

1. **Mentions légales** — l'ancien site ne publiait que les informations de l'agence éditrice.
   La refonte affiche celles de l'exploitant (MG2T SAS, 941 508 442 RCS Vienne), reprises des CGV
   du 1er août 2026 et centralisées dans `site.company` ([`src/lib/site.ts`](src/lib/site.ts)).
2. **CGV à faire valider** par un conseil juridique avant publication.
3. **Incohérence de contact** — la page Contact de l'ancien site affiche `contact@restart-arcade.fr`,
   les mentions légales `contact@restart.fr`. La refonte retient la première ; à confirmer.
4. **Envoi du formulaire** — le site étant statique, l'envoi passe pour l'instant par un `mailto:`
   pré-rempli. Le branchement d'un service (Formspree, Resend, API interne) tient en une fonction :
   `submit()` dans [`src/components/ContactForm.tsx`](src/components/ContactForm.tsx).
5. **Photos** — aucune photo produit ni de réalisation n'était récupérable proprement. Les visuels
   sont des placeholders typographiques ; les pages réalisations décrivent des contextes sans image
   inventée.
6. **Modèles SK-PUB, SK-BUSINESS, SK-4 SAISONS** — écartés du catalogue : leurs fiches d'origine
   n'avaient ni caractéristiques, ni description, ni meta. À réintégrer si toujours commercialisés.

## Origine des données

Contenus, prix et caractéristiques extraits de restart-arcade.fr le 8 septembre 2026. L'analyse
complète de l'ancien site est conservée dans [`knowledge/`](knowledge/).
