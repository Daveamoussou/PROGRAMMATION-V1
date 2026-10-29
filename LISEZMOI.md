# Atelier du Code (version mobile, sans ordinateur)

Fichiers (tous dans le même dossier, sans sous-dossier) :
index.html, sw.js, manifest.webmanifest, icon-192.png, icon-512.png

## Mettre en ligne depuis le téléphone
1. Sur github.com (navigateur du téléphone), ouvre ton dépôt, puis « Add file » > « Upload files ».
2. Envoie les 5 fichiers ci-dessus, puis « Commit changes ».
3. Sur Render, crée un « Static Site » relié à ce dépôt (Publish directory : `.`, pas de commande de build). Render publie l'adresse du site.

## Installer et utiliser hors connexion
1. Ouvre l'adresse du site avec internet. Laisse la page ouverte environ une minute : Python et SQL se téléchargent et s'enregistrent.
2. Chrome > menu ⋮ > « Installer l'application » (iPhone : Partager > « Sur l'écran d'accueil »).
3. Coupe internet et ouvre l'application : tout fonctionne.

## Navigation
« ← Accueil » et la touche Retour ramènent toujours à l'accueil. Un second Retour quitte l'application.

## Mise à jour
Après toute modification, change `VERSION` dans sw.js (atelier-v2, v3...).
