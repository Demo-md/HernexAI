---
name: gsap-performance
description: Optimize GSAP, ScrollTrigger, and Lenis animation systems by controlling rendering cost, lifecycle cleanup, offscreen work, mobile density, and measurable runtime performance.
---

# GSAP Performance

Use when adding, reviewing, or debugging GSAP/ScrollTrigger/Lenis motion. Read `docs/codex/performance-budgets.md`, `docs/codex/motion-principles.md`, and `references/gsap-performance-checklist.md`.

## Directives

- Prefer transform and opacity; batch DOM reads before writes and avoid layout thrashing.
- Use scoped contexts where appropriate. Kill timelines, ScrollTriggers, RAF loops, observers, and event listeners on teardown and route changes.
- Refresh ScrollTrigger after fonts and important media settle, without creating duplicate instances.
- Share one RAF between Lenis and GSAP when integrated. Pause autonomous/offscreen animation and hidden-tab work.
- Reduce animation density, particle count, DPR, shadows, and media concurrency on mobile.
- Do not animate excessive DOM nodes or add 3D to decoration without a measured reason.
- Measure production behavior and compare against the shared budgets; do not claim performance from intuition.

## Handoff

Report the tested device/browser, route, metrics, remaining risks, and cleanup evidence. Treat leaked loops or runtime errors as failures.
