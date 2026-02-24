// Basic service worker for NDC2021A directory
// This file is served at /sw.js to satisfy browser checks and
// can be extended for offline support.

const CACHE_NAME = "ndc2021-cache-v1";
const ASSETS = [
  "/",
  "/favicon.ico",
  "/ndc.svg",
  "/badge.png",
  "/images/user.png",
  // add any other static files you want cached by default
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
