/* Atelier du Code : service worker (hors connexion)
   Change VERSION à chaque mise à jour du site pour renouveler le cache. */
const VERSION = 'atelier-v1';
const PY = 'https://cdn.jsdelivr.net/npm/pyodide@0.26.4/full/';
const SQL = 'https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/';
const CORE = [
  './', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  PY + 'pyodide.js', PY + 'pyodide.asm.js', PY + 'pyodide.asm.wasm',
  PY + 'python_stdlib.zip', PY + 'pyodide-lock.json',
  SQL + 'sql-wasm.js', SQL + 'sql-wasm.wasm',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
];

self.addEventListener('install', (e) => {
  // Un fichier qui échoue n'empêche pas l'installation des autres.
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
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
    caches.match(e.request, { ignoreSearch: false }).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        // Sauvegarde ce qui est téléchargé (site, polices, moteurs) pour la prochaine fois sans internet.
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined));
    })
  );
});
