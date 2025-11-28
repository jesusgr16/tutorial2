const CACHE_NAME = 'tutorial-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',          // si separaste tu CSS
  '/script.js',           // si separaste tu JS
  '/assets/sqljs/sql-wasm.js',
  '/assets/fontawesome/css/all.min.css',
  '/assets/icons/hola.jpg',
  '/assets/icons/hol2.png',
  '/R.jpeg',
  '/noti.webp',
  '/OIP.webp',
  '/htrh.webp',
  '/hello.avif',
  '/app.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
