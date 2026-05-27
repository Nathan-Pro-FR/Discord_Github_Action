# Galerie Media Discord

Une galerie media legere au style Cyberpunk / Dark Neon, synchronisee automatiquement depuis un salon Discord prive via GitHub Actions et hebergee sur GitHub Pages.

🇬🇧 Version anglaise : [`README.md`](README.md)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-3C873A?logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Automatis%C3%A9-2088FF?logo=github-actions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-121013?logo=github&logoColor=white)
![Style](https://img.shields.io/badge/Theme-Cyberpunk%20Dark%20Neon-ec4899)

## Points forts

- Synchronisation automatique des medias toutes les heures
- Declenchement manuel possible depuis GitHub Actions
- Prise en charge des images et des videos
- Aucun serveur backend a maintenir (site statique)
- Front rapide et simple base sur `donnees.json`

## Stack technique

- **Frontend** : HTML, CSS, JavaScript natif
- **Script de synchro** : Node.js 18+ (`recupere_medias.js`)
- **Automatisation** : GitHub Actions
- **Hebergement** : GitHub Pages

## Demarrage rapide

1. Forker ou cloner le depot.
2. Creer un bot Discord et l'ajouter sur ton serveur.
3. Ajouter les secrets GitHub du depot :
   - `DISCORD_TOKEN`
   - `CHANNEL_ID`
4. Activer GitHub Pages (`Settings` -> `Pages`, branche `main`, dossier `/`).
5. Lancer une fois le workflow manuellement depuis l'onglet Actions.

La galerie sera ensuite mise a jour automatiquement.

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

1. `.github/workflows/sync_discord.yml` se lance (cron + manuel).
2. `recupere_medias.js` recupere les 50 derniers messages du salon.
3. Le script filtre les pieces jointes image/video et reecrit `donnees.json`.
4. `script.js` charge ce JSON et cree dynamiquement les cartes media.

## Structure du projet

- `index.html` - structure de la page
- `script.js` - logique d'affichage et fallback media
- `css/style.css` - theme visuel Cyberpunk / Dark Neon
- `recupere_medias.js` - collecte des medias depuis Discord
- `donnees.json` - liste des URLs generees
- `.github/workflows/sync_discord.yml` - synchro auto + commit auto

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
npm run sync
```

## Permissions Discord minimales

Pour le salon cible :

- `View Channel`
- `Read Message History`

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
