# Galerie Media Discord

Une galerie media legere au style Cyberpunk / Dark Neon, synchronisee automatiquement depuis un salon Discord prive via GitHub Actions et hebergee sur GitHub Pages.

🇬🇧 Version anglaise : [`README.md`](README.md)

📐 Architecture : [`ARCHITECTURE.md`](ARCHITECTURE.md)

🧾 Documentation professionnelle : [`README.pro.fr.md`](README.pro.fr.md)

![Node.js](https://img.shields.io/badge/Node.js-22%2B-3C873A?logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Automatis%C3%A9-2088FF?logo=github-actions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-121013?logo=github&logoColor=white)
![Style](https://img.shields.io/badge/Theme-Cyberpunk%20Dark%20Neon-ec4899)

## Points forts

- Synchronisation automatique des medias toutes les heures
- Déclenchement manuel possible depuis GitHub Actions
- Prise en charge des images et des vidéos
- Aucun serveur backend à maintenir (site statique)
- Front rapide et simple basé sur `donnees.json`
- Workflow robuste avec statistiques, notifications Discord et alertes en cas d’échec

## Stack technique

- **Frontend** : HTML, CSS, JavaScript natif
- **Script de synchro** : Node.js 18+ (`recupere_medias.js`)
- **Automatisation** : GitHub Actions
- **Scripts de notification** : `calcul_stats.js`, `envoi_webhook.js`, `notif_erreur_mp.js`
- **Hébergement** : GitHub Pages

## Demarrage rapide

1. Forker ou cloner le depot.
2. Creer un bot Discord et l'ajouter sur ton serveur.
3. Ajouter les secrets GitHub du dépôt :
   - `DISCORD_TOKEN`
   - `CHANNEL_ID`
   - `DISCORD_WEBHOOK_URL` (optionnel, pour les notifications Discord)
   - `DISCORD_USER_ID` (optionnel, pour les alertes privées en cas d’échec)
4. Activer GitHub Pages (`Settings` -> `Pages`, branche `main`, dossier `/`).
5. Lancer une fois le workflow manuellement depuis l'onglet Actions.

La galerie sera ensuite mise a jour automatiquement.

## Ou mettre `DISCORD_TOKEN` et `CHANNEL_ID` ?

Tu dois les ajouter dans les **Secrets GitHub Actions** de ton depot (et nulle part ailleurs).

### Etapes pas a pas

1. Ouvre ton depot sur GitHub.
2. Va dans `Settings`.
3. Clique `Secrets and variables` -> `Actions`.
4. Clique `New repository secret`.
5. Crée ces 4 secrets :
   - **Name**: `DISCORD_TOKEN`  
     **Secret**: le token de ton bot Discord
   - **Name**: `CHANNEL_ID`  
     **Secret**: l'identifiant du salon Discord
   - **Name**: `DISCORD_WEBHOOK_URL`  
     **Secret**: l'URL du webhook Discord pour les notifications (optionnel)
   - **Name**: `DISCORD_USER_ID`
     **Secret**: l'identifiant Discord de l'utilisateur qui recevra les alertes privées (optionnel)
6. Lance le workflow `Sync Discord Media` manuellement une première fois depuis l'onglet `Actions`.

### Important

- Ne mets jamais ces valeurs dans `recupere_medias.js`, `package.json`, `donnees.json` ou un commit Git.
- Le workflow les lit automatiquement via :
  - `${{ secrets.DISCORD_TOKEN }}`
  - `${{ secrets.CHANNEL_ID }}`
  - `${{ secrets.DISCORD_WEBHOOK_URL }}` (optionnel)
- En cas de fuite du token, regenere-le immediatement dans Discord Developer Portal.

## Apercu visuel

Ajoute une image ou un GIF dans :

```text
docs/preview.png
```

Puis insere dans le README :

```md
![Apercu Galerie](docs/preview.png)
```

## Fonctionnement

1. `.github/workflows/sync_discord.yml` se lance selon un planning et manuellement.
2. `recupere_medias.js` récupère les messages récents du salon Discord configuré.
3. Le script filtre les pièces jointes image/video et réécrit `donnees.json`.
4. `calcul_stats.js` compare l’ancien et le nouveau jeu de données pour calculer les ajouts, suppressions, rafraîchissements et le total.
5. `envoi_webhook.js` envoie une notification Discord sous forme d’embed avec le résumé de synchronisation.
6. Si le workflow échoue, `notif_erreur_mp.js` peut envoyer un message privé Discord à l’utilisateur configuré.
7. `script.js` charge ce JSON et crée dynamiquement les cartes média.

## Structure du projet

- `index.html` - structure de la page
- `script.js` - logique d'affichage et fallback media
- `css/style.css` - thème visuel Cyberpunk / Dark Neon
- `recupere_medias.js` - collecte des médias depuis Discord
- `calcul_stats.js` - compare les anciennes et nouvelles listes de médias
- `envoi_webhook.js` - envoie les notifications Discord via webhook
- `notif_erreur_mp.js` - envoie une alerte privée Discord en cas d’échec
- `donnees.json` - liste des URLs générées
- `.github/workflows/sync_discord.yml` - synchronisation automatique, notifications et commit auto

## Lancement local (optionnel)

Installer les dependances :

```bash
npm install
```

Lancer la synchronisation :

```bash
DISCORD_TOKEN=ton_token CHANNEL_ID=ton_channel_id npm run sync
```

Sous PowerShell :

```powershell
$env:DISCORD_TOKEN="ton_token"
$env:CHANNEL_ID="ton_channel_id"
$env:DISCORD_WEBHOOK_URL="ton_webhook"
npm run sync
```

## Permissions Discord minimales

Pour le salon cible :

- `View Channel`
- `Read Message History`

Pour l’alerte par message privé, le bot doit également pouvoir créer des conversations privées avec l’utilisateur cible.

## Securite

- Ne jamais exposer le token du bot dans le code
- Toujours utiliser les GitHub Secrets
- Limiter les permissions du bot au strict minimum
- Regenerer le token immediatement en cas de fuite

## Depannage

- **`donnees.json` est vide**
  - Verifier que le bot voit le salon
  - Verifier `CHANNEL_ID`
  - Lire les logs GitHub Actions

- **Erreur Discord 401/403**
  - Token invalide ou permissions manquantes
  - Regenerer le token et mettre a jour `DISCORD_TOKEN`

- **Medias indisponibles au bout d'un moment**
  - Certaines URLs Discord peuvent expirer
  - Relancer le workflow pour rafraichir les liens

## Idees d'evolution

- Mode lightbox plein ecran
- Filtres image/video
- Pagination ou infinite scroll
- Pipeline de miniatures pour performance
