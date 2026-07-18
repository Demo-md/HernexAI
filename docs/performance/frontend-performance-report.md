# Frontend Performance Report: Phase 2A

**Date:** 2026-07-18  
**Route tested:** `/` on local Astro development server

## Implemented Controls

- All homepage content, Growth Engine SVG, navigation, FAQ, contact form, and bot markup are server-rendered Astro HTML.
- GSAP, ScrollTrigger, and Lenis are dynamically imported after the document is usable. Lenis is desktop-only and disabled for reduced motion.
- The homepage hero uses semantic DOM and CSS capability frames, not a renderer, canvas, Three.js, Spline, or CSS3DRenderer.
- One GSAP media timeline runs the five deterministic campaign-stream paths. It pauses offscreen, while the document is hidden, and before the first Strategy transfer.
- The four-section Strategy controller caches layout geometry at setup and refresh boundaries. It does not read layout per scroll frame.
- HN Bot uses CSS 2.5D, not a model/canvas/runtime; it creates no GPU draw loop, model/texture cost, or WebGL context.
- The bot uses a requestAnimationFrame-throttled pointer response only for a fine hover pointer, and one footer `IntersectionObserver` that is cleaned up.
- No autoplay video, third-party analytics, remote images, or unapproved portfolio media is present in the Phase 2A hero.

## Browser Observations

| Check | Result |
| --- | --- |
| `1440`, `1280`, `1024`, `768`, `430`, `390` viewport width | No horizontal overflow observed |
| `1440` initial viewport | Headline, both CTAs, and HN Flow composition visible after the complete entrance |
| Reduced motion | `document.getAnimations()` reported `0` running animations; bot state was `reduced-motion` |
| Console/page errors | No critical page errors observed in normal browser scenarios |
| Hero motion fallback | Reduced motion and no-JavaScript states show a static capability concept and all content |

## Limits

This is a local development-server observation, not a production Core Web Vitals benchmark. No final production bundle analysis, mobile hardware frame profiling, or real 3D model measurement is applicable because no WebGL runtime is shipped. Measure the deployed site once production assets and external integrations are available.
# Phase 2B Update

- Service hubs are server-rendered; only the preview controller, chat bubble, and footer credit add client behavior.
- The preview controller pauses under reduced motion, offscreen, and hidden-tab conditions. It uses one scheduled timeout chain per hub, never `setInterval`.
- Service bubble requests are slug-only, session-cached in the browser, rate-limited and cached in the endpoint, and do not expose provider credentials.
- No Phase 2B Three.js, WebGL, Spline, canvas, or 3D service/card/footer feature was added.

## Phase 2C Update

- Testimonials are server-rendered semantic rows/columns. Their one-shot GSAP entrance loads only when a proof panel exists and is skipped for reduced motion.
- The public Blog is server-rendered. Search, filtering, and link-copy behavior use small page-local event listeners rather than a hydrated framework island.
- Article covers are lightweight local SVG diagrams. There are no remote review images, autoplay media, testimonial carousels, or auto-scrolling rows.
- HN Bot remains CSS/DOM based. Its blink GSAP module is dynamically imported, uses one repeating timeline, and is killed on Astro teardown. Dragging measures bounds only at start, resize, restore, and collision correction; it does not query layout every pointer frame.
- Back-to-top is global in `BaseLayout.astro` and remains visible independently from the draggable launcher.

## Current Limits

- Vite reports the existing large GSAP-related chunk advisory during production builds. The new launcher keeps its GSAP import dynamic and does not add a second static bundle path.
- The build environment can lack access to the preserved Google Sheets blog webhook. `getPosts()` falls back to local or explicitly marked development fixture data; deployment should verify the configured external endpoint separately.
