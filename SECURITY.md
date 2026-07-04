# Security Policy

## Supported Versions

This project is actively maintained on the `main` branch.

| Version / Branch | Supported |
| ---------------- | --------- |
| `main`           | ✅ Yes    |
| Other branches   | ❌ No     |

## Security Scope

This repository contains:

- A static frontend deployed on GitHub Pages
- A GitHub Actions workflow to sync media data
- A Node.js script using Discord API credentials (`DISCORD_TOKEN`, `CHANNEL_ID`, `DISCORD_WEBHOOK_URL`)

The most sensitive assets are secrets/tokens and workflow integrity.

## Reporting a Vulnerability

If you discover a security issue, please **do not open a public issue**.

Please report it privately via one of these options:

1. **GitHub Security Advisories (preferred)**  
   Go to: `Security` tab -> `Report a vulnerability`
2. Or contact the maintainer directly (email/Discord, if provided in profile)

Please include:

- A clear description of the vulnerability
- Steps to reproduce
- Potential impact
- Any proof-of-concept (without exposing real secrets)

## Response Timeline

- Initial acknowledgment: **within 72 hours**
- First assessment/status update: **within 7 days**
- Fix timeline: depends on severity and complexity

## Disclosure Policy

- Valid reports will be investigated and fixed as quickly as possible.
- We may ask for coordinated disclosure until a patch is available.
- If the report is accepted, a security update/changelog note will be published.
- If declined, we will explain why (e.g., out of scope, not reproducible, duplicate).

## Secret Handling Policy

- Never commit bot tokens, API keys, or credentials.
- Use **GitHub Actions Secrets** only (`DISCORD_TOKEN`, `CHANNEL_ID`, `DISCORD_WEBHOOK_URL`).
- If a secret is exposed:
  1. Revoke/rotate it immediately (Discord Developer Portal)
  2. Update GitHub Secrets
  3. Review workflow and repository history
