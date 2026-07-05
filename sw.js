/**
 * Service Worker - Cyberpunk Discord Gallery
 * Stratégie : cache-first pour le shell (HTML/CSS/JS/icônes),
 * network-first pour donnees.json (toujours avoir les derniers médias),
 * fallback offline propre si tout échoue.
 */

const CACHE_VERSION = "v1";
const SHELL_CACHE = `gallery-shell-${CACHE_VERSION}`;
const DATA_CACHE = `gallery-data-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./script.js",
  "./manifest.json",
  "./image/android-chrome-192x192.png",
  "./image/android-chrome-512x512.png",
  "./image/apple-touch-icon.png",
  "./image/favicon.ico",
];

// --- INSTALL : on met en cache le "shell" de l'app ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// --- ACTIVATE : on nettoie les vieux caches ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== DATA_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// --- FETCH ---
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Seulement le même origine (on ne touche pas aux médias Discord CDN externes)
  if (url.origin !== self.location.origin) {
    return;
  }

  // donnees.json : network-first (on veut les médias les plus frais),
  // avec repli sur le cache si hors-ligne
  if (url.pathname.endsWith("donnees.json")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(DATA_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Reste du shell : cache-first, avec mise à jour silencieuse en arrière-plan
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
