/* Atelier du Code : service worker (hors connexion)
   Change VERSION à chaque mise à jour du site pour renouveler le cache. */
const VERSION = 'atelier-v1';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './fonts/bricolage-grotesque-latin-700-normal.woff2',
  './fonts/bricolage-grotesque-latin-800-normal.woff2',
  './fonts/instrument-sans-latin-400-normal.woff2',
  './fonts/instrument-sans-latin-600-normal.woff2',
  './fonts/jetbrains-mono-latin-400-normal.woff2',
  './fonts/jetbrains-mono-latin-500-normal.woff2',
  './vendor/sqljs/sql-wasm.js', './vendor/sqljs/sql-wasm.wasm',
  './vendor/pyodide/pyodide.js', './vendor/pyodide/pyodide.asm.js',
  './vendor/pyodide/pyodide.asm.wasm', './vendor/pyodide/python_stdlib.zip',
  './vendor/pyodide/pyodide-lock.json'
];

self.addEventListener('install', (e) => {
  // Un fichier manquant n'empêche pas l'installation des autres.
  e.waitUntil(
    caches.open(VERSION).then((c) =>
      Promise.allSettled(CORE.map((u) => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res && res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined));
    })
  );
});
