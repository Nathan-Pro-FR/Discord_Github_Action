# 📘 Professional Documentation

## 🌐 Project Overview

This repository implements a lightweight media gallery that automatically synchronizes media from a private Discord channel and publishes it as a static website on GitHub Pages.

The solution is designed for simplicity, low maintenance cost, and fully automated content refresh.

## ✨ Key Features

- Automatic synchronization from Discord every hour
- Manual execution via GitHub Actions
- Support for images and videos
- Static hosting with GitHub Pages
- No backend or database required
- Simple JSON-based data model

## 🏗️ Architecture Summary

The system consists of three layers:

1. Frontend layer
   - HTML, CSS, and JavaScript files
   - Renders the gallery from a generated JSON file

2. Synchronization layer
   - Node.js script that queries Discord
   - Extracts media attachments and updates the data file

3. Automation layer
   - GitHub Actions workflow triggered on schedule or manually
   - Stores secrets securely and updates the published content

## 📁 Repository Structure

- [index.html](index.html) — gallery page layout
- [script.js](script.js) — rendering logic and modal interaction
- [css/style.css](css/style.css) — visual styling
- [recupere_medias.js](recupere_medias.js) — Discord media sync script
- [donnees.json](donnees.json) — generated media list
- [.github/workflows/sync_discord.yml](.github/workflows/sync_discord.yml) — automation workflow
- [dashboard.html](dashboard.html) — optional monitoring dashboard

## ✅ Prerequisites

- Node.js 18 or newer
- A Discord bot token
- A Discord channel ID
- A GitHub repository with GitHub Pages enabled

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Discord access

Create a Discord bot and give it access to the target channel with the minimum required permissions:

- View Channel
- Read Message History

### 4. Add GitHub repository secrets

In GitHub, open your repository settings and add:

- DISCORD_TOKEN
- CHANNEL_ID
- DISCORD_WEBHOOK_URL (optional)
- DISCORD_USER_ID (optional)

### 5. Run the workflow

Go to the Actions tab and run the workflow manually once. After that, the gallery will refresh automatically on the defined schedule.

## Setup Instructions

1. Clone or fork the repository.
2. Create a Discord bot and invite it to the target server.
3. Add the following repository secrets in GitHub:
   - DISCORD_TOKEN
   - CHANNEL_ID
   - DISCORD_WEBHOOK_URL
   - DISCORD_USER_ID
4. Enable GitHub Pages for the repository.
5. Run the workflow once manually to initialize the gallery.

## 🔐 Security Recommendations

- Keep the Discord token in GitHub Secrets only
- Avoid hardcoding credentials in source files
- Grant the bot only the minimum required permissions
- Rotate the token immediately if it is exposed

## 🛠️ Maintenance

The workflow re-runs automatically on a schedule and can be triggered manually at any time. The gallery content is refreshed without requiring a backend service.

## 💡 Recommended Next Steps

- Add a lightbox experience for media preview
- Implement filtering by type or date
- Improve visual polish and accessibility
- Add thumbnails or caching for performance
