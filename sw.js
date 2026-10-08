const CACHE = 'vm-vmuzlqtst';
const CASCA = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CASCA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  // rede primeiro (sempre a versão nova quando há internet); cache se estiver sem conexão
  e.respondWith(fetch(r).then((resp) => { const cp = resp.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); return resp; }).catch(() => caches.match(r).then((m) => m || caches.match('index.html'))));
});
