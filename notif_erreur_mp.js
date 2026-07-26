const DISCORD_API_BASE = "https://discord.com/api/v10";

async function sendDirectMessage() {
  const token = process.env.DISCORD_TOKEN;
  const userId = process.env.DISCORD_USER_ID;
  const errorMessage = process.env.ERROR_MESSAGE || "Une erreur inconnue est survenue lors de l'exécution du workflow.";
  const runUrl = process.env.RUN_URL || "";

  if (!token || !userId) {
    console.log("Jeton Discord ou User ID manquant. Envoi du MP ignoré.");
    process.exit(0);
  }

  try {
    const dmResponse = await fetch(`${DISCORD_API_BASE}/users/@me/channels`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient_id: userId }),
    });

    if (!dmResponse.ok) {
      const errText = await dmResponse.text();
      console.error("Impossible de créer le canal MP avec l'utilisateur:", errText);
      process.exit(1);
    }

    const dmChannel = await dmResponse.json();

    const payload = {
      embeds: [
        {
          title: "🚨 Échec de la synchronisation de la Galerie",
          color: 0xef4444,
          description: `Une erreur est survenue pendant l'exécution du script de synchronisation.\n\n**Détail :**\n\`\`\`text\n${errorMessage.slice(0, 1500)}\n\`\`\``,
          fields: runUrl ? [{ name: "🛠️ Rapport GitHub Action", value: `[Voir les logs du Run](${runUrl})` }] : [],
          footer: { text: "Galerie Discord • Alerte Automatique" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const msgResponse = await fetch(`${DISCORD_API_BASE}/channels/${dmChannel.id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!msgResponse.ok) {
      console.error("Erreur lors de l'envoi du message MP:", await msgResponse.text());
      process.exit(1);
    }

    console.log("Notification d'erreur envoyée en MP avec succès.");
  } catch (error) {
    console.error("Échec de l'exécution du script de notification MP:", error);
    process.exit(1);
  }
}

sendDirectMessage();
