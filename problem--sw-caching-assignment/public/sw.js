const STATIC_CACHE_VERSION = 'static-v3';
const DYNAMIC_CACHE_VERSION = 'dynamic-v3';

self.addEventListener('install', (event) => {
  console.log('[Service worker] Installed ...');
  event.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then((cache) => {
      cache.addAll([
        '/',
        'index.html',
        './src/js/main.js',
        './src/js/material.min.js',
        './src/css/app.css',
        './src/css/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
      ]);
    })
  );
});
//ssf

self.addEventListener('activate', (event) => {
  console.log('[Service worker] Activated ...');
  event.waitUntil(
    caches.keys().then((keysList) => {
      return Promise.all(
        keysList.map((key) => {
          if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respond) => {
      if (respond) {
        console.log('[Service worker] From cache ...', event.request.url);
        return respond;
      } else {
        console.log('[Service worker] New fetch ...', event.request.url);
        return fetch(event.request).then((res) => {
          return caches
            .open(DYNAMIC_CACHE_VERSION)
            .then((cache) => {
              cache.put(event.request.url, res.clone());
              return res;
            })
            .catch((error) => console.log(error));
        });
      }
    })
  );
});
