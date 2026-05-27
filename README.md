# Discord Media Gallery

A lightweight Cyberpunk / Dark Neon media gallery powered by Discord + GitHub Actions + GitHub Pages.

🇫🇷 French version: [`README.fr.md`](README.fr.md)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-3C873A?logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Automated-2088FF?logo=github-actions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-121013?logo=github&logoColor=white)
![Style](https://img.shields.io/badge/Theme-Cyberpunk%20Dark%20Neon-ec4899)

## Highlights

- Auto-sync from a private Discord channel every hour
- Manual sync via `workflow_dispatch`
- Supports images and videos
- Zero backend hosting cost (static site on GitHub Pages)
- Fast frontend rendering from a simple `donnees.json`

## Tech Stack

- **Frontend**: HTML, CSS (Cyberpunk theme), Vanilla JS
- **Sync Script**: Node.js 18+ (`recupere_medias.js`)
- **Automation**: GitHub Actions
- **Hosting**: GitHub Pages

## Quick Start

1. Fork or clone this repository.
2. Create a Discord bot and invite it to your server.
3. Add repository secrets:
   - `DISCORD_TOKEN`
   - `CHANNEL_ID`
4. Enable GitHub Pages (`Settings` -> `Pages`, branch: `main`, folder: `/`).
5. Run the workflow manually once from the Actions tab.

Your gallery is now live and will refresh automatically.

## Where to put `DISCORD_TOKEN` and `CHANNEL_ID`?

You must add them in your repository **GitHub Actions Secrets** (and nowhere else).

### Step-by-step

1. Open your repository on GitHub.
2. Go to `Settings`.
3. Click `Secrets and variables` -> `Actions`.
4. Click `New repository secret`.
5. Create these 2 secrets:
   - **Name**: `DISCORD_TOKEN`  
     **Secret**: your Discord bot token
   - **Name**: `CHANNEL_ID`  
     **Secret**: your Discord channel ID
6. Run the `Sync Discord Media` workflow manually once from the `Actions` tab.

### Important

- Never put these values in `recupere_medias.js`, `package.json`, `donnees.json`, or any Git commit.
- The workflow reads them automatically via:
  - `${{ secrets.DISCORD_TOKEN }}`
  - `${{ secrets.CHANNEL_ID }}`
- If the token is leaked, rotate it immediately from Discord Developer Portal.

## Preview

Add your screenshot or GIF here:

```text
docs/preview.png
```

Then use:

```md
![Gallery Preview](docs/preview.png)
```

## How It Works

1. `.github/workflows/sync_discord.yml` triggers on schedule and manual dispatch.
2. `recupere_medias.js` fetches the last 50 Discord messages from your channel.
3. It extracts only media attachments (image/video), then rewrites `donnees.json`.
4. The frontend loads `donnees.json` and creates media cards dynamically.

## Project Structure

- `index.html` - semantic page layout and gallery container
- `script.js` - loads media list, renders `<img>` / `<video>`, handles fallback
- `css/style.css` - Dark Neon visual identity and responsive grid
- `recupere_medias.js` - Discord API collector and JSON generator
- `donnees.json` - generated media URL list
- `.github/workflows/sync_discord.yml` - scheduled sync + auto-commit
- `README.fr.md` - complete French documentation

## Local Run (Optional)

Install dependencies:

```bash
npm install
```

Run sync script:

```bash
DISCORD_TOKEN=your_token CHANNEL_ID=your_channel_id npm run sync
```

PowerShell:

```powershell
$env:DISCORD_TOKEN="your_token"
$env:CHANNEL_ID="your_channel_id"
npm run sync
```

## Required Discord Permissions

Grant your bot the minimum required permissions on the target channel:

- `View Channel`
- `Read Message History`

## Security Notes

- Never commit your Discord token
- Use GitHub Secrets only
- Keep bot permissions minimal
- Rotate token immediately if exposed

## Troubleshooting

- **`donnees.json` stays empty**
  - Check bot access to the channel
  - Check `CHANNEL_ID`
  - Inspect GitHub Actions logs

- **Discord API 401/403**
  - Invalid token or missing permissions
  - Regenerate token and update `DISCORD_TOKEN`

- **Broken/expired media links**
  - Some Discord CDN links can expire
  - Re-run workflow to refresh dataset

## Roadmap Ideas

- Lightbox mode
- Filtering by media type
- Infinite scroll / pagination
- Thumbnail optimization pipeline
