# Animation Lifecycle

## Ownership

`BaseLayout.astro` owns the `astro:page-load` and `astro:before-swap` boundary. It calls `mountSite()` once per rendered page, invokes the previous cleanup before a swap, and keeps the document usable if enhancement loading fails.

| System | Initialisation | Cleanup |
| --- | --- | --- |
| Header, services menu, mobile menu, FAQ, form, back-to-top | `src/scripts/site.ts` on `astro:page-load` | Removes scroll, keyboard, click, focus, and form listeners |
| GSAP hero, campaign stream, and Strategy journey | Dynamic import in `src/scripts/motion/site-motion.ts` after static content renders | `gsap.context().revert()` removes timelines and ScrollTriggers; the media observer and Strategy geometry observer disconnect |
| Lenis | Desktop only, non-reduced-motion branch | Removes GSAP ticker callback and destroys Lenis; tab visibility listener removed |
| HN Bot / chat panel | `src/scripts/chatbot/chatbot.ts` and `src/scripts/chatbot/launcher-interactions.ts` through `mountSite()` | Releases pointer capture, kills the single blink timeline, disconnects footer observers, clears timers, removes handlers, and restores a validated stored position |
| Testimonial entrance | `setupTestimonialMotion()` in `src/scripts/site.ts` | Disconnects its observer and kills the one-shot timeline |
| Blog filters and share control | `setupInsightsFilters()` and `setupShareLinks()` in `src/scripts/site.ts` | Removes search, filter, and clipboard-control listeners |

## Route And Motion Rules

- Astro `ClientRouter` is present in the base layout. The homepage and supporting routes use normal internal links, while `astro:before-swap` tears down the outgoing enhancement layer before `astro:page-load` creates the incoming one.
- `astro:before-swap` calls existing cleanup before a new page can attach scripts.
- `astro:page-load` recreates only the page-local interaction layer.
- Reduced-motion users do not initialise GSAP/Lenis scenes. DOM content remains visible in its final state. Scroll reveals also use `immediateRender: false`, so no offscreen content is hidden before its trigger.
- The desktop Services trigger uses an explicit expanded state, closes on outside pointer-down, focus departure, and Escape, and does not trap focus. The mobile Services accordion is contained by the already focus-trapped mobile navigation dialog.
- The hero is a DOM-and-GSAP composition. Its labelled entrance reveals navigation, eyebrow, headline, supporting copy, CTAs, then the Kinetic Campaign Stream. The stream pauses offscreen, in a hidden tab, and before the Strategy handoff.
- One Strategy controller owns the letter loop, one decorative traveller, four scrubbed handoffs, cached geometry, reverse-scroll restoration, and resize/font refresh. Narrow layouts retain natural scrolling and use a vertical handoff with no letter scatter.
- The chat component has no canvas, renderer, texture, material, geometry, or WebGL lifecycle in Phase 2. A future renderer must add disposal before replacing the CSS fallback.
- The closed launcher alone uses Pointer Events. It distinguishes a click from a drag with a seven-pixel threshold, clamps coordinates to the current viewport, stores only `{ x, y }`, and never makes the open panel draggable.
- The bot blink is one lazily loaded GSAP timeline with `repeat: -1` and `repeatDelay: 3.8`; it pauses for dragging, open chat, hidden tabs, and reduced motion. Astro teardown kills it before a route swap can create another timeline.
- Back-to-top and HN Bot are separate fixed layers. Footer and back-to-top visibility observers trigger a collision correction rather than hiding either control.

## Validation Evidence

Browser checks verified one visible launcher, one chat panel, zero critical page errors, and successful close/minimise/Escape behavior. A deliberately aborted automation session was discarded; a fresh browser session then confirmed the normal returning state as `idle`.
# Phase 2B Lifecycle

- `mountSite()` initializes and tears down service preview controllers and the Insightsnode credit alongside existing header, chatbot, intro, and motion systems.
- Each service controller removes event listeners, timers, and its IntersectionObserver on teardown, including Astro route swaps.
- The footer credit observer and GSAP timeline are disposed during teardown.
- The 2D service preview remains independent from the Phase 2A hero timeline and Strategy traveller.
