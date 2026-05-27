document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");

  if (!galleryGrid) return;

  const fallbackImage =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#0d0d17"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              fill="#ec4899" font-size="44" font-family="Arial, sans-serif">
          Media indisponible
        </text>
      </svg>
    `);

  const videoExtensions = [".mp4", ".mov", ".webm", ".ogg", ".m4v", ".mkv"];

  const isVideo = (url) => {
    const clean = String(url).split("?")[0].toLowerCase();
    return videoExtensions.some((ext) => clean.endsWith(ext));
  };

  const renderMessage = (text) => {
    galleryGrid.innerHTML = `<p class="gallery-message">${text}</p>`;
  };

  const createMediaElement = (url) => {
    if (isVideo(url)) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.className = "gallery-media";
      video.onerror = () => {
        const img = document.createElement("img");
        img.src = fallbackImage;
        img.alt = "Video indisponible";
        img.loading = "lazy";
        img.className = "gallery-media";
        video.replaceWith(img);
      };
      return video;
    }

    const image = document.createElement("img");
    image.src = url;
    image.alt = "Media Discord";
    image.loading = "lazy";
    image.decoding = "async";
    image.className = "gallery-media";
    image.onerror = () => {
      image.src = fallbackImage;
      image.alt = "Image indisponible";
    };
    return image;
  };

  const addMediaCard = (url) => {
    const card = document.createElement("div");
    card.className = "media-card";

    const mediaElement = createMediaElement(url);
    card.appendChild(mediaElement);
    galleryGrid.appendChild(card);
  };

  const loadGallery = async () => {
    try {
      renderMessage("Chargement des medias...");
      const response = await fetch("donnees.json", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const urls = await response.json();

      if (!Array.isArray(urls)) {
        throw new Error("Format invalide: tableau d'URLs attendu.");
      }

      galleryGrid.innerHTML = "";

      if (urls.length === 0) {
        renderMessage("Aucun media disponible pour le moment.");
        return;
      }

      urls.forEach((url) => {
        if (typeof url === "string" && url.trim()) {
          addMediaCard(url.trim());
        }
      });

      if (galleryGrid.children.length === 0) {
        renderMessage("Aucun lien media valide n'a ete trouve.");
      }
    } catch (error) {
      console.error("Erreur de chargement de la galerie:", error);
      renderMessage("Impossible de charger la galerie pour le moment.");
    }
  };

  loadGallery();
});
