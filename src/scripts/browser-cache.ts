const CACHE_MARKER_KEY = "hernex-browser-cache-v1";
const CACHE_TTL_MS = 48 * 60 * 60 * 1000;

let registration: Promise<ServiceWorkerRegistration | undefined> | undefined;

export function registerBrowserCache() {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  if (registration) return;

  registration = navigator.serviceWorker.register("/sw.js", { scope: "/" })
    .then((worker) => {
      try {
        localStorage.setItem(CACHE_MARKER_KEY, JSON.stringify({ expiresAt: Date.now() + CACHE_TTL_MS }));
      } catch {
        // Cache Storage remains available even when localStorage is restricted.
      }
      return worker;
    })
    .catch(() => undefined);
}
