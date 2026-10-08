// Ponder moved to ponder-cards.github.io. This replaces the old service worker,
// clears the files it stored and removes itself, so the old address only redirects.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: "window" });
    windows.forEach((w) => w.navigate(w.url));
  })());
});
