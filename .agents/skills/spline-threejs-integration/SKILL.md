---
name: spline-threejs-integration
description: Evaluate and optionally integrate Spline or Three.js experiences with fallbacks, lazy loading, responsive simplification, reduced motion, cleanup, and measurable GPU performance.
---

# Spline/Three.js Integration

Activate only when the user explicitly asks for 3D or a documented design decision justifies interactive 3D. Read `references/3d-decision-framework.md`, `docs/codex/performance-budgets.md`, and `docs/codex/accessibility-requirements.md`.

## Gate

1. Write why 3D explains the product/story better than DOM/SVG/video and define a static fallback.
2. Preserve Astro architecture. Prefer a small client island and avoid adding React solely for a scene; use React only when the repository already uses it or an isolated island is justified.
3. Lazy-load the scene after core content is visible. Design loading, error, WebGL-disabled, reduced-motion, and mobile states before the desktop scene.
4. Control DPR, geometry, textures, draw calls, shadows, post-processing, and animation density. Pause when offscreen or the tab is hidden.
5. Clean renderer, materials, textures, RAF loops, observers, and event listeners on teardown and route changes.
6. Measure GPU/frame/bundle impact on representative devices and compare with shared budgets.

## Completion Rule

Do not add 3D merely for decoration. Do not report success without fallback, responsive, reduced-motion, cleanup, and performance evidence.
