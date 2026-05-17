self.addEventListener("install", (event) => {
  console.log("sw installed!");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("our-app")
      .then((cache) =>
        cache.addAll([
          "/",
          "index.html",
          "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          "assets/1.png",
          "assets/cardd.jfif",
          "assets/projects.jfif",
          "./manifest_and_icons/manifest.json",
          "manifest_and_icons/icon512_maskable.png",
          "manifest_and_icons/icon512_rounded.png",
          "indexeddb.js",
          "notifications.js",
        ])
      )
  );
});

self.addEventListener("activate", (event) => {
  console.log("sw Activated!");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request.url).then((file) => {
      if (file) {
        console.log(file);
        console.log("inside if statment");
        return file;
      } else {
        console.log("network request");
        return fetch(event.request.url);
      }
    })
  );
});
self.addEventListener('notificationclick', (event) => {
  // console.log('notificationclick',event);
  clients.openWindow('https://www.google.co.uk/')
})