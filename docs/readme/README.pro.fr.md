# 📘 Documentation professionnelle

## 🌐 Vue d’ensemble du projet

Ce dépôt met en place une galerie de médias légère qui synchronise automatiquement les contenus d’un salon Discord privé et les publie sous forme de site statique via GitHub Pages.

La solution a été conçue pour être simple, peu coûteuse à maintenir et entièrement automatisée.

## ✨ Fonctionnalités principales

- Synchronisation automatique depuis Discord toutes les heures
- Exécution manuelle via GitHub Actions
- Prise en charge des images et des vidéos
- Hébergement statique avec GitHub Pages
- Aucun backend ni base de données requis
- Modèle de données simple basé sur JSON

## 🏗️ Résumé de l’architecture

Le système est composé de trois couches :

1. Couche frontend
   - Fichiers HTML, CSS et JavaScript
   - Affichage de la galerie à partir d’un fichier JSON généré

2. Couche de synchronisation
   - Script Node.js interrogeant l’API Discord
   - Extraction des pièces jointes et mise à jour du fichier de données

3. Couche d’automatisation
   - Workflow GitHub Actions déclenché selon un planning ou manuellement
   - Stockage sécurisé des secrets et mise à jour du contenu publié

## 📁 Structure du dépôt

- [index.html](index.html) — structure de la page de galerie
- [script.js](script.js) — logique d’affichage et interaction avec la modale
- [css/style.css](css/style.css) — style visuel
- [recupere_medias.js](recupere_medias.js) — script de synchronisation Discord
- [donnees.json](donnees.json) — liste générée des médias
- [.github/workflows/sync_discord.yml](.github/workflows/sync_discord.yml) — workflow d’automatisation
- [dashboard.html](dashboard.html) — tableau de bord optionnel de suivi

## ✅ Prérequis

- Node.js 18 ou supérieur
- Un token de bot Discord
- L’identifiant d’un salon Discord
- Un dépôt GitHub avec GitHub Pages activé

## 🚀 Getting Started

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/votre-depot.git
cd votre-depot
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l’accès Discord

Crée un bot Discord et donne-lui accès au salon cible avec les permissions minimales suivantes :

- Voir le salon
- Voir l’historique des messages

### 4. Ajouter les secrets GitHub

Dans les paramètres du dépôt GitHub, ajoutez :

- DISCORD_TOKEN
- CHANNEL_ID
- DISCORD_WEBHOOK_URL (optionnel)

### 5. Lancer le workflow

Ouvre l’onglet Actions et exécute une première fois le workflow manuellement. Ensuite, la galerie se mettra à jour automatiquement selon la planification définie.

## Instructions de configuration

1. Clone ou fork le dépôt.
2. Crée un bot Discord et ajoute-le au serveur cible.
3. Ajoute les secrets suivants dans GitHub :
   - DISCORD_TOKEN
   - CHANNEL_ID
   - DISCORD_WEBHOOK_URL
4. Active GitHub Pages pour le dépôt.
5. Lance une fois le workflow manuellement pour initialiser la galerie.

## 🔐 Recommandations de sécurité

- Conserve le token Discord uniquement dans les secrets GitHub
- Évite de coder des identifiants directement dans les fichiers sources
- Limite les permissions du bot au strict minimum
- Rota immédiatement le token s’il est exposé

## 🛠️ Maintenance

Le workflow se relance automatiquement selon un planning et peut être déclenché manuellement à tout moment. Le contenu de la galerie est mis à jour sans avoir besoin de backend.

## 💡 Étapes suivantes recommandées

- Ajouter un mode lightbox pour la prévisualisation
- Implémenter des filtres par type ou par date
- Améliorer l’accessibilité et le rendu visuel
- Ajouter des miniatures ou un système de cache pour les performances
