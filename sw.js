const CACHE_NAME = 'cyber-gallery-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './css/style.css',
    './script.js',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('donnees.json')) {
        e.respondWith(fetch(e.request).catch(() => new Response(JSON.stringify({ error: "Hors-ligne"}))));
        return;
    }

    e.respondWith(
        fetch(e.request)
        .then((response) => {
            if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone));
            }
            return response;
        })
        .catch(() => caches.match(e.request))
    );
});