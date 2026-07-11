/**
 * Service Worker - Cyberpunk Discord Gallery
 * Stratégie : cache-first (stale-while-revalidate) pour le shell,
 * network-first pour donnees.json (toujours avoir les derniers médias).
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

// --- INSTALL ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// --- ACTIVATE ---
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

  // Seulement le même origine
  if (url.origin !== self.location.origin) {
    return;
  }

  // 1. donnees.json : Network-First
  if (url.pathname.endsWith("donnees.json")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DATA_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 2. Reste du shell : Cache-First avec mise à jour en arrière-plan (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // On lance la requête réseau pour mettre à jour le cache
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const clone = networkResponse.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // Optionnel : échec silencieux du réseau en arrière-plan
      });

      // Si on l'a en cache, on le renvoie TOUT DE SUITE. 
      // On utilise event.waitUntil si disponible (selon les contextes) pour laisser le temps au fetch de finir
      if (cachedResponse) {
        return cachedResponse;
      }

      // Sinon, on attend le réseau
      return fetchPromise;
    })
  );
});
