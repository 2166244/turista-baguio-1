(function() {
  'use strict';

  var CACHE_NAME = 'static-cache';

  var urlsToCache = [
  '.',
  'index.html',
  '',
  'tenants.json',
  'main.js',
  'database.js',
  'instascan.min.js',
  'audio.mp3',
  'tenantPics/0019.jpg',
  'tenantPics/0020.jpg',
  'tenantPics/0022.jpg',
  'icon.png',
  'hall_involvement.png',
  'Warning_icon.png',
  'style.css',
  'tenants.json'
  ];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}

})();
