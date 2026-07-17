# Astro Transition Lifecycle

Plan these states before enabling transitions:

1. First document load: initialize once after DOM and fonts needed for measurement are ready.
2. Before swap: stop input-sensitive motion, kill old ScrollTriggers, detach observers/listeners, and preserve required persistent state.
3. After swap: query the new DOM, reinitialize scoped GSAP/Lenis behavior, refresh measurements, restore focus, and announce route changes if needed.
4. Interrupted navigation: leave the document usable and prevent stale promises/listeners from completing against removed nodes.
5. History navigation: support back/forward, anchor targets, scroll restoration, and no-transition fallback.
6. Reduced motion: skip decorative route motion and keep the new page immediately readable.

Persistent header/chatbot elements need explicit ownership. Never duplicate IDs or attach handlers on every route without teardown.
