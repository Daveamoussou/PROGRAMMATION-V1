# Atelier du Code — mise en route

Application de cours de programmation (Python, HTML, CSS, JavaScript, SQL, MCD) qui fonctionne **hors connexion**.

## Contenu du dossier
- `index.html` : toute l'application (cours, exercices, bac à sable, progression)
- `sw.js` : service worker (met tout en cache pour le hors connexion)
- `manifest.webmanifest` + `icons/` : permet d'installer l'application sur téléphone ou ordinateur
- `telecharger-moteurs.js` : télécharge Python, le moteur SQL et les polices (une seule fois)

## 1. Télécharger les moteurs (une fois, avec internet)
Dans le dossier, lance : `node telecharger-moteurs.js`
Cela remplit `vendor/` (Python, SQL) et `fonts/`. Sans cette étape, HTML, CSS, JavaScript et MCD fonctionnent, mais pas Python ni SQL hors connexion.

## 2. Tester en local
`python3 -m http.server 8000` puis ouvre http://localhost:8000
(le hors connexion exige localhost ou HTTPS : ouvrir le fichier par double-clic ne l'active pas)

## 3. Mettre en ligne (Render)
Crée un « Static Site » sur Render, pointe-le vers ce dossier (publish directory : `.`), sans commande de build.
Pense à lancer l'étape 1 avant de pousser les fichiers sur GitHub : `vendor/` et `fonts/` doivent être inclus.

## 4. Installer
Ouvre le site une première fois avec internet, attends quelques secondes (mise en cache), puis :
- Android / Chrome : menu ⋮ puis « Installer l'application »
- iPhone / Safari : Partager puis « Sur l'écran d'accueil »
- Ordinateur : icône d'installation dans la barre d'adresse

Ensuite coupe internet : tout fonctionne.

## Navigation
Le bouton « ← Accueil » et la touche Retour de l'appareil ramènent toujours à l'accueil. Un second Retour quitte l'application.

## Mise à jour
Après toute modification, change `VERSION` dans `sw.js` (ex. `atelier-v2`) pour que les appareils rechargent le cache.

## Ajouter une leçon
Dans `index.html`, copie un bloc `add('python', 'Niveau', 'Titre', cours, exemple, exercice)` et adapte-le.
