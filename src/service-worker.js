const cacheName = 'sw-cache-v1';
const filesToCache = [
  './',
  './404.png',
  './NPU Logo Black.png',
  './manifest.webmanifest',
];

self.addEventListener('install', async e => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    console.log('Cached all files');
  } catch (error) {
    console.log('Error caching files');
  }
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}

// var GHPATH = '/';

var APP_PREFIX = 'voting_';

var VERSION = 'v2';

// var URLS = [
//   `${GHPATH}/`,
//   `${GHPATH}/404.png`,
//   `${GHPATH}/NPU Logo Black.png`,
//   `${GHPATH}/manifest.webmanifest`,
// ];
