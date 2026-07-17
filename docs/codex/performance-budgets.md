# HernexAI Performance Budgets

Use these as targets, not excuses to hide failures. Measure production builds on representative desktop and mobile hardware.

- LCP: target under `2.5s`; investigate any regression over `3.0s`.
- CLS: target `0`; investigate any unexpected layout shift.
- INP: target under `200ms` for primary interactions.
- JavaScript: keep the initial route payload minimal; dynamically load heavy animation/3D code.
- Images: use responsive modern formats, reserved dimensions, and below-fold lazy loading.
- 3D: lazy-load, cap device pixel ratio, minimize draw calls/textures, pause offscreen, and provide a static fallback.
- Motion: one shared RAF for Lenis/GSAP integration; no leaked ScrollTriggers, listeners, or loops.
- Mobile: reduce particle count, shadows, media concurrency, and animation density.
- Validation: compare before/after measurements and report environment, route, and limitations.
