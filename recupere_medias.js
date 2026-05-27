/**
 * Recupere les medias d'un salon Discord prive et ecrit les URLs dans donnees.json.
 * Node 18+ requis (fetch global natif).
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const DISCORD_API_BASE = "https://discord.com/api/v10";
const LIMIT = 50;
const OUTPUT_FILE = path.join(__dirname, "donnees.json");

const SUPPORTED_MIME_PREFIXES = ["image/", "video/"];
const SUPPORTED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".mp4",
  ".mov",
  ".webm",
  ".ogg",
  ".m4v",
  ".mkv",
];

function isMediaAttachment(attachment) {
  if (!attachment || typeof attachment.url !== "string") return false;

  if (
    typeof attachment.content_type === "string" &&
    SUPPORTED_MIME_PREFIXES.some((prefix) =>
      attachment.content_type.toLowerCase().startsWith(prefix),
    )
  ) {
    return true;
  }

  const lowerUrl = attachment.url.toLowerCase();
  return SUPPORTED_EXTENSIONS.some((ext) => lowerUrl.includes(ext));
}

async function fetchMessages({ token, channelId }) {
  const endpoint = `${DISCORD_API_BASE}/channels/${channelId}/messages?limit=${LIMIT}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "DiscordMediaSyncBot (GitHub Actions, 1.0.0)",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Erreur Discord API (${response.status} ${response.statusText}): ${errorBody}`,
    );
  }

  const body = await response.json();

  if (!Array.isArray(body)) {
    throw new Error("Reponse Discord invalide: tableau de messages attendu.");
  }

  return body;
}

function extractMediaUrls(messages) {
  const urls = [];
  const dedupe = new Set();

  for (const message of messages) {
    if (!Array.isArray(message.attachments)) continue;

    for (const attachment of message.attachments) {
      if (!isMediaAttachment(attachment)) continue;
      if (dedupe.has(attachment.url)) continue;

      dedupe.add(attachment.url);
      urls.push(attachment.url);
    }
  }

  return urls;
}

async function saveMediaUrls(urls) {
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(urls, null, 2) + "\n", "utf8");
}

async function main() {
  const token = process.env.DISCORD_TOKEN;
  const channelId = process.env.CHANNEL_ID;

  if (!token || !channelId) {
    throw new Error(
      "Variables manquantes: DISCORD_TOKEN et CHANNEL_ID sont obligatoires.",
    );
  }

  const messages = await fetchMessages({ token, channelId });
  const mediaUrls = extractMediaUrls(messages);
  await saveMediaUrls(mediaUrls);

  console.log(`Messages analyses: ${messages.length}`);
  console.log(`Medias detectes: ${mediaUrls.length}`);
  console.log(`Fichier mis a jour: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("Echec de synchronisation des medias:", error);
  process.exitCode = 1;
});
