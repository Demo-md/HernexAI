const CACHE_VERSION = "hernex-public-v1";
const CONTENT_CACHE = `${CACHE_VERSION}-content`;
const METADATA_CACHE = `${CACHE_VERSION}-metadata`;
const CACHE_TTL_MS = 48 * 60 * 60 * 1000;
const METADATA_PREFIX = "/__hernex-cache-meta__/";

const isCacheableRequest = (request) => {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.search || url.pathname === "/sw.js" || url.pathname.startsWith("/api/")) return false;
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  return ["document", "script", "style", "image", "font"].includes(request.destination) || request.mode === "navigate" || acceptsHtml;
};

const metadataRequest = (request) => new Request(`${self.location.origin}${METADATA_PREFIX}${encodeURIComponent(request.url)}`);

const isFresh = async (request) => {
  const metadata = await caches.open(METADATA_CACHE);
  const response = await metadata.match(metadataRequest(request));
  if (!response) return false;
  const { expiresAt } = await response.json().catch(() => ({}));
  return typeof expiresAt === "number" && expiresAt > Date.now();
};

const cacheResponse = async (request, response) => {
  if (!response.ok || response.type === "opaque") return response;

  // Storage limits must not turn an otherwise successful request into a failure.
  try {
    const content = await caches.open(CONTENT_CACHE);
    const metadata = await caches.open(METADATA_CACHE);
    await Promise.all([
      content.put(request, response.clone()),
      metadata.put(metadataRequest(request), new Response(JSON.stringify({ expiresAt: Date.now() + CACHE_TTL_MS }), { headers: { "Content-Type": "application/json" } })),
    ]);
  } catch {
    // Use the network response when Cache Storage is unavailable or full.
  }

  return response;
};

const fetchAndCache = async (request) => cacheResponse(request, await fetch(request));

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("hernex-public-") && !name.startsWith(CACHE_VERSION)).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!isCacheableRequest(request)) return;

  event.respondWith((async () => {
    const content = await caches.open(CONTENT_CACHE);
    const cached = await content.match(request);
    if (cached && await isFresh(request)) {
      event.waitUntil(fetchAndCache(request).catch(() => undefined));
      return cached;
    }
    try {
      return await fetchAndCache(request);
    } catch (error) {
      if (cached) return cached;
      throw error;
    }
  })());
});
