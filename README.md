# CV en ligne - Projet HTML5/CSS3

Ce projet est un CV en ligne responsive utilisant les technologies web modernes. Il a été développé dans le cadre du TP HTML - UE Développement Clients Web.

## 1. Structure HTML

### 1.1 Structure de base
- Création d'un CV structuré en HTML5
- Organisation en sections distinctes :
  - Header : informations personnelles et photo
  - Présentation
  - Expériences professionnelles
  - Compétences
  - Formation
  - Langues
  - Centres d'intérêt
  - Footer avec liens sociaux

### 1.2 Éléments sémantiques
- Utilisation des balises HTML5 sémantiques (`header`, `main`, `section`, `article`)
- Structure hiérarchique claire avec des titres (`h1`, `h2`, etc.)
- Utilisation appropriée des listes (`ul`, `dl`) pour organiser l'information

## 2. Style CSS

### 2.1 Mise en forme de base
- Création du fichier `resume.css`
- Définition des couleurs principales et variables CSS
- Style du conteneur principal avec largeur maximale et centrage
- Design moderne avec ombres et bordures arrondies

### 2.2 Typographie
- Intégration de la police Adobe Edge Fonts pour le titre principal
- Utilisation de Font Awesome pour les icônes
- Hiérarchie visuelle claire avec différentes tailles de texte

### 2.3 Layout et composants
- Photo de profil avec style distinctif
- Sections bien espacées et visuellement séparées
- Liste de compétences en grille
- Footer avec liens sociaux stylisés

## 3. Mise en ligne

### 3.1 GitHub Pages
- Déploiement automatique via GitHub Actions
- Configuration du workflow dans `.github/workflows/deploy.yml`
- Site accessible à l'adresse : https://mohamedbarbych.github.io/MonCV/

### 3.2 Déploiement automatique
- Configuration des permissions GitHub
- Déploiement automatique à chaque push sur la branche main
- Utilisation des tags pour marquer les versions importantes

## 4. Design Responsive

### 4.1 Media Queries
- Création du fichier `responsive.css`
- Trois breakpoints principaux :
  - 740px : Tablettes et écrans moyens
  - 570px : Petites tablettes
  - 480px : Mobile

### 4.2 Adaptations mobiles
- Passage à une colonne unique sur mobile
- Redimensionnement de la photo de profil
- Centrage des titres
- Adaptation des marges et espacements

## 5. Micro-données

### 5.1 Schema.org
- Intégration des micro-données schema.org/Person
- Balisage sémantique des informations personnelles
- Structure des données pour :
  - Informations personnelles
  - Formation
  - Expérience professionnelle
  - Compétences

### 5.2 SEO
- Amélioration du référencement avec les micro-données
- Données structurées pour une meilleure visibilité dans les moteurs de recherche

## Tags Git

Le projet utilise des tags pour marquer les étapes importantes :
- `Structure` : Structure HTML de base
- `CSS` : Ajout des styles
- `responsive` : Implémentation du design responsive
- `microdata` : Intégration des micro-données

## Technologies utilisées

- HTML5
- CSS3
- Font Awesome
- Adobe Edge Fonts
- GitHub Pages
- Schema.org

## Installation et développement

1. Cloner le repository :
```bash
git clone https://github.com/MohamedBarbych/MonCV.git
```

2. Ouvrir le fichier `index.html` dans un navigateur

3. Pour développer :
   - Modifier `index.html` pour la structure
   - Modifier `css/resume.css` pour les styles
   - Modifier `css/responsive.css` pour le responsive design
