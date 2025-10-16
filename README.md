# CV en ligne - Mohamed BARBYCH

## A propos du projet

Ce CV en ligne a ete developpe dans le cadre du TP HTML/CSS/JavaScript de l'UE Developpement Clients Web a l'Universite de Bretagne Occidentale.

## Structure HTML

### Structure de base
- CV structure en HTML5
- Organisation en sections :
  - Header avec informations personnelles et photo
  - Presentation
  - Experiences professionnelles
  - Competences
  - Formation
  - Langues
  - Centres d'interet
  - Footer avec liens sociaux

### Elements semantiques
- Balises HTML5 semantiques (header, main, section, article)
- Structure hierarchique avec titres (h1, h2, etc.)
- Utilisation de listes (ul, dl) pour organiser l'information

## Style CSS

### Mise en forme
- Fichier resume.css avec couleurs principales et variables CSS
- Conteneur principal avec largeur maximale et centrage
- Design avec ombres et bordures arrondies

### Typographie
- Police Adobe Edge Fonts pour le titre principal
- Font Awesome pour les icones
- Hierarchie visuelle avec differentes tailles de texte

### Layout
- Photo de profil stylisee
- Sections bien espacees
- Liste de competences en grille
- Footer avec liens sociaux

## Design Responsive

### Media Queries
- Fichier responsive.css
- Breakpoints :
  - 740px : Tablettes et ecrans moyens
  - 570px : Petites tablettes
  - 480px : Mobile

### Adaptations mobiles
- Colonne unique sur mobile
- Redimensionnement de la photo
- Centrage des titres
- Adaptation des marges

## Micro-donnees Schema.org

- Integration des micro-donnees schema.org/Person
- Balisage semantique des informations
- Amelioration du referencement

## JavaScript

### Apparition des descriptions detaillees
- Boutons +/- pour afficher/masquer les descriptions
- Une seule description visible a la fois
- Animation progressive avec setInterval

### Tooltips
- Tooltips au survol des competences
- Suivi du curseur de la souris
- Affichage dynamique avec setTimeout

### Auto-evaluation
- Systeme d'etoiles pour evaluer les competences (1 a 5)
- Graphique en histogramme avec Canvas
- Visualisation interactive des niveaux

## Tags Git

Le projet utilise des tags pour marquer les etapes :
- Structure : Structure HTML de base
- CSS : Ajout des styles
- responsive : Design responsive
- microdata : Integration des micro-donnees
- description : Descriptions detaillees et tooltips
- autoevaluation : Systeme d'etoiles et histogramme

## Technologies

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Schema.org

## Structure du Projet

```
BARBYCH-Mohamed-CV/
├── css/
│   ├── resume.css
│   ├── responsive.css
│   ├── details.css
│   └── skills.css
├── js/
│   └── details.js
├── index.html
└── README.md
```

## Installation

```bash
git clone https://gitlab-depinfo-2025.univ-brest.fr/dosi/dcw/barbych-mohamed.git
cd barbych-mohamed
```

Ouvrir index.html dans un navigateur.
