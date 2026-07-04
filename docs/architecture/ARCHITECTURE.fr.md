# 🏗️ Architecture

Ce projet est une galerie de médias légère qui synchronise automatiquement les médias d’un salon Discord privé et les publie sous forme de site statique sur GitHub Pages.

## 1. 🌐 Vue d’ensemble

L’architecture est organisée autour de trois couches principales :

- Frontend : fichiers HTML/CSS/JavaScript statiques servis par GitHub Pages
- Couche de synchronisation : un script Node.js qui interroge Discord et reconstruit le fichier de données
- Couche d’automatisation : des workflows GitHub Actions qui exécutent la synchronisation selon un planning ou manuellement

## 2. 🧩 Composants principaux

### Frontend

Fichiers :
- [index.html](index.html) : page principale de la galerie
- [script.js](script.js) : charge le JSON généré, affiche les cartes média et gère l’affichage en modale
- [css/style.css](css/style.css) : style visuel de l’interface cyberpunk / dark neon
- [dashboard.html](dashboard.html) : tableau de bord optionnel pour suivre la visibilité des workflows

### Script de synchronisation

Fichier :
- [recupere_medias.js](recupere_medias.js) : se connecte à Discord, récupère les messages récents, extrait les pièces jointes média et écrit [donnees.json](donnees.json)

### Automatisation

Fichier :
- [.github/workflows/sync_discord.yml](.github/workflows/sync_discord.yml) : exécute la synchronisation toutes les heures, peut être déclenché manuellement et publie les données mises à jour

### Données

Fichier :
- [donnees.json](donnees.json) : tableau JSON généré contenant les URLs des médias exposées au frontend

## 3. 🔄 Déroulement d’exécution

1. GitHub Actions démarre via un déclenchement planifié ou manuel.
2. Le workflow injecte les secrets Discord depuis GitHub Secrets.
3. Le script Node.js appelle l’API Discord et lit les messages récents du salon configuré.
4. Les pièces jointes média sont extraites et normalisées.
5. Le script réécrit [donnees.json](donnees.json).
6. Le site statique lit ce fichier JSON et affiche des cartes pour les images et les vidéos.
7. Des notifications optionnelles peuvent être envoyées vers Discord via un webhook.

## 4. 📦 Modèle de données

Le fichier JSON généré est volontairement simple :

```json
[
  "https://cdn.discordapp.com/attachments/....jpg",
  "https://cdn.discordapp.com/attachments/....mp4"
]
```

Chaque chaîne représente une URL de média à afficher par le frontend.

## 5. 🔐 Modèle de sécurité

- Le token du bot Discord n’est jamais committed dans le dépôt.
- Les secrets sont stockés dans GitHub Secrets.
- Le workflow utilise uniquement les permissions Discord strictement nécessaires.
- Le site reste entièrement statique, ce qui réduit la complexité de déploiement et d’hébergement.

## 6. 🚀 Modèle de déploiement

- GitHub Pages sert le frontend statique.
- GitHub Actions gère la synchronisation et la mise à jour des données.
- Aucun serveur backend n’est requis.

## 7. 🌳 Arborescence du projet

```text
Discord_Github_Action/
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       └── sync_discord.yml
│
├── css/
│   └── style.css
│
├── docs/
│   ├── architecture/
│   │   ├── ARCHITECTURE.fr.md
│   │   └── ARCHITECTURE.md
│   │
│   └── readme/
│       ├── README.pro.fr.md
│       └── README.pro.md
│   
├── dashboard.html
├── donnees.json
├── index.html
├── LICENSE
├── package.json
├── README.fr.md
├── README.md
├── recupere_medias.js
├── script.js
└── SECURITY.md
```

## 8. 📝 Notes

Ce projet privilégie la simplicité et le faible coût de maintenance. Il est particulièrement adapté à une galerie qui se met à jour automatiquement sans base de données ni service backend.
