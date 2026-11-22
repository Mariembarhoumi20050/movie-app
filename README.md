# 🎬 Movie App

Application Angular de gestion de films utilisant l'API TMDB.

## Fonctionnalités

- 🎥 Liste des films en cours de diffusion (API TMDB)
- 🔍 Recherche de films par titre
- 📋 Détail d'un film (affiche, synopsis, notes, langue, date)
- ❤️ Wishlist (ajout/suppression, persistance localStorage)

## Stack technique

- Angular 19 (standalone components, signals)
- FontAwesome (icônes)
- API TMDB (The Movie Database)

## Installation

```bash
npm install
ng serve
```

L'application sera disponible sur `http://localhost:4200`

## Build pour GitHub Pages

```bash
ng build --configuration production --base-href /NOM-DU-REPO/
```

Puis copier le contenu de `dist/movie-app/browser/` dans la branche `gh-pages`.

## Variables d'environnement

La clé API TMDB est dans `src/environments/environment.ts`.
