// Befaring service worker: gjør appen tilgjengelig uten nett ute på befaring.
// Øk VERSION når index.html endres, så får telefonene ny versjon ved neste åpning.
const VERSION = 'befaring-v4';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'
];
const LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/piexifjs/1.0.6/piexif.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(SHELL);
    await Promise.all(LIBS.map(async url => {
      try { const r = await fetch(url, { mode: 'cors' }); if (r.ok) await cache.put(url, r); } catch {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Sidene: nett først (nyeste versjon), cache når du er uten dekning
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION); cache.put('./index.html', fresh.clone());
        return fresh;
      } catch {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Egne filer, bibliotek og skrift: cache først, oppdater i bakgrunnen
  const cacheable = url.origin === location.origin ||
    url.hostname === 'cdnjs.cloudflare.com' ||
    url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req, { ignoreVary: true });
    const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || new Response('', { status: 504 });
  })());
});
