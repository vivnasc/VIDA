// BIZ.MZ Service Worker v2
// Supports: offline-first, auto-update, cache versioning, background sync
const APP_VERSION = "2.0.0";
const CACHE_STATIC = `biz-mz-static-v${APP_VERSION}`;
const CACHE_DYNAMIC = `biz-mz-dynamic-v${APP_VERSION}`;
const CACHE_IMAGES = `biz-mz-images-v${APP_VERSION}`;

// Static assets to pre-cache on install
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.svg",
  "/icons/icon-512x512.svg",
  "/onboarding",
];

// Network-first patterns (always try fresh data)
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /supabase/,
  /_next\/data/,
];

// Cache-first patterns (static assets)
const CACHE_FIRST_PATTERNS = [
  /\/_next\/static\//,
  /\.(?:js|css|woff2?|ttf|eot)$/,
  /\/icons\//,
];

// --- INSTALL ---
self.addEventListener("install", (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// --- ACTIVATE ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const validCaches = [CACHE_STATIC, CACHE_DYNAMIC, CACHE_IMAGES];
      return Promise.all(
        keys
          .filter((key) => key.startsWith("biz-mz-") && !validCaches.includes(key))
          .map((key) => caches.delete(key))
      );
    }).then(() => {
      // Notify all clients about the update
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "SW_UPDATED",
            version: APP_VERSION,
          });
        });
      });
    }).then(() => self.clients.claim())
  );
});

// --- FETCH ---
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith("http")) return;

  // Network-first for API calls and dynamic data
  if (NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.href))) {
    event.respondWith(networkFirst(request, CACHE_DYNAMIC));
    return;
  }

  // Cache-first for static assets
  if (CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.href))) {
    event.respondWith(cacheFirst(request, CACHE_STATIC));
    return;
  }

  // Images: cache-first with image cache
  if (/\.(?:png|jpg|jpeg|gif|svg|webp|ico)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, CACHE_IMAGES));
    return;
  }

  // Navigation requests: network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, CACHE_DYNAMIC));
    return;
  }

  // Default: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, CACHE_DYNAMIC));
});

// --- STRATEGIES ---

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback(request);
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

function offlineFallback(request) {
  if (request.mode === "navigate") {
    return caches.match("/") || new Response(
      `<!DOCTYPE html>
      <html lang="pt">
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
          <title>BIZ.MZ - Offline</title>
          <style>
            body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#FFFBEB;color:#92400E;text-align:center;padding:24px}
            .box{max-width:300px}.icon{font-size:48px;margin-bottom:16px}h1{font-size:20px;margin:0 0 8px}p{font-size:14px;margin:0 0 24px;opacity:.7}
            button{background:#F59E0B;color:white;border:none;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer}
          </style>
        </head>
        <body>
          <div class="box">
            <div class="icon">📡</div>
            <h1>Sem internet</h1>
            <p>Verifica a tua ligação e tenta de novo.</p>
            <button onclick="location.reload()">Tentar de novo</button>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
  return new Response("Offline", { status: 503 });
}

// --- MESSAGE HANDLER ---
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data === "GET_VERSION") {
    event.source.postMessage({
      type: "SW_VERSION",
      version: APP_VERSION,
    });
  }
});
