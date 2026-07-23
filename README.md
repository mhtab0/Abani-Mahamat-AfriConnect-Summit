# AfriConnect Summit 2026

Site vitrine d'une conférence tech panafricaine fictive, réalisé dans le cadre de l'examen de Technologie Web (HTML5 · CSS3 · JavaScript Vanilla · Git & GitHub).

## Auteur

**Mahamat-Abani** — L1 RT

## Description du projet

AfriConnect Summit est un événement annuel fictif réunissant développeurs, entrepreneurs et investisseurs du continent africain. Le site présente l'événement à travers 4 pages : accueil, programme, intervenants et inscription/contact, dans un style moderne, responsive et animé, avec prise en charge du mode sombre.

**Direction visuelle** : identité "horizon atlantique" inspirée de Dakar au coucher du soleil — palette orange (sunset) / teal (ocean) sur fond papier chaud (mode clair) ou encre indigo (mode sombre).

## Technologies utilisées

- **HTML5** — structure sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`), accessibilité (`alt`, `aria-label`, `aria-expanded`, `aria-selected`)
- **CSS3** — variables CSS (custom properties), Flexbox, CSS Grid, animations, transitions, responsive design (media queries 375px / 768px / 1200px)
- **JavaScript Vanilla** — aucun framework ni librairie externe (hors Bootstrap Icons pour les icônes)
- **Google Fonts** — Bricolage Grotesque (titres) + Inter (corps de texte)
- **Git & GitHub** — versioning et déploiement via GitHub Pages

## Fonctionnalités JavaScript implémentées

1. **Dark Mode / Light Mode** — toggle dans la navbar, thème sauvegardé dans `localStorage`, persistant entre les pages et les rechargements
2. **Navbar dynamique** — changement de fond et d'ombre après 80px de défilement, menu hamburger fonctionnel sur mobile
3. **Animations au scroll** — apparition progressive des sections via `IntersectionObserver`
4. **Compte à rebours en temps réel** — jours/heures/minutes/secondes jusqu'à la date de la conférence
5. **Compteurs animés** — incrémentation des chiffres clés au scroll
6. **Onglets du programme** — affichage/masquage du planning des 3 jours sans rechargement
7. **Filtrage dynamique des intervenants** — par thématique, sans rechargement
8. **Validation de formulaire** — contrôle complet à la soumission avec retour visuel par champ (bordure rouge/verte + message d'erreur), regex pour l'email et le téléphone
9. **Bouton retour en haut** — apparition après 300px de défilement, remontée en douceur
10. **Année dynamique** — injectée dans le footer via `new Date().getFullYear()`

## Structure du projet

```
NOM-Prenom-AfriConnectSummit/
├── index.html
├── programme.html
├── intervenants.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── README.md
```

## Lien GitHub Pages

https://mhtab0.github.io/Abani-Mahamat-AfriConnect-Summit/

## Ressources consultées

- [MDN Web Docs](https://developer.mozilla.org/fr/) — référence HTML/CSS/JS
- [CSS-Tricks](https://css-tricks.com/) — Flexbox & Grid
- [Google Fonts](https://fonts.google.com/) — typographies Bricolage Grotesque & Inter
- [Bootstrap Icons](https://icons.getbootstrap.com/) — icônes
- [Unsplash](https://unsplash.com/) / [Pexels](https://www.pexels.com/fr-fr/) — images libres de droits
- [Coolors](https://coolors.co/) — palette de couleurs
- [W3C Validator](https://validator.w3.org/) — validation HTML