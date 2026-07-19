# 🏗️ Architecture

This project is a lightweight media gallery that synchronizes media from a private Discord channel and publishes it as a static website on GitHub Pages.

## 1. 🌐 Overview

The architecture is designed around three main layers:

- Frontend: static HTML/CSS/JavaScript files rendered by GitHub Pages
- Sync layer: a Node.js script that queries Discord and rebuilds the data file
- Automation layer: GitHub Actions that run the sync on a schedule or manually

## 2. 🧩 Main Components

### Frontend

Files:
- [index.html](index.html): main gallery page
- [script.js](script.js): loads the generated JSON, renders media cards, and handles modal display
- [css/style.css](css/style.css): styling for the cyberpunk / dark neon interface
- [dashboard.html](dashboard.html): optional monitoring dashboard for workflow visibility

### Sync Script

File:
- [recupere_medias.js](recupere_medias.js): connects to Discord, fetches recent messages, extracts media attachments, and writes [donnees.json](donnees.json)

### Automation

File:
- [.github/workflows/sync_discord.yml](.github/workflows/sync_discord.yml): runs the sync every hour, can be triggered manually, and publishes updated data

### Data

File:
- [donnees.json](donnees.json): generated JSON array containing the media URLs exposed to the frontend

## 3. 🔄 Runtime Flow

1. GitHub Actions starts from a scheduled trigger or manual dispatch.
2. The workflow injects the Discord secrets from GitHub Secrets.
3. The Node.js script calls the Discord API and reads recent messages from the configured channel.
4. Media attachments are extracted and normalized.
5. The script rewrites [donnees.json](donnees.json).
6. The static site reads the JSON file and displays cards for images and videos.
7. Optional notifications can be sent to Discord via a webhook.

## 4. 📦 Data Model

The generated JSON file is intentionally simple:

```json
[
  "https://cdn.discordapp.com/attachments/....jpg",
  "https://cdn.discordapp.com/attachments/....mp4"
]
```

Each string represents one media URL to be displayed by the frontend.

## 5. 🔐 Security Model

- The Discord bot token is never committed to the repository.
- Secrets are stored in GitHub Actions Secrets.
- The workflow uses the minimum required Discord permissions.
- The site remains fully static, which reduces deployment and hosting complexity.

## 6. 🚀 Deployment Model

- GitHub Pages serves the static frontend.
- GitHub Actions handles synchronization and data updates.
- No backend server is required.

## 7. 🌳 Project Tree

```text
Discord_Github_Action/
├── .github/
│   ├── workflows/
│   │   └── sync_discord.yml
│   └── dependabot.yml
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
├── image/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── favicon.ico
│
├── .gitignore
├── LICENSE
├── README.fr.md
├── README.md
├── SECURITY.md
├── dashboard.html
├── donnees.json
├── index.html
├── manifest.json
├── package.json
├── recupere_medias.js
├── script.js
└── sw.js
```

## 8. 📝 Notes

This project prioritizes simplicity and low maintenance cost. It is ideal for a gallery that updates automatically without needing a database or backend service.
