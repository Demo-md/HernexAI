---
name: astro-view-transitions
description: Implement safe Astro route transitions with GSAP and Lenis cleanup, reinitialization, persistence, history navigation, fallbacks, and reduced-motion behavior.
---

# Astro View Transitions

Use only when Astro route transitions are explicitly needed. Read `references/astro-transition-lifecycle.md`, `docs/codex/motion-principles.md`, and `docs/codex/accessibility-requirements.md`.

## Procedure

1. Identify the current page-load lifecycle and whether view transitions are supported and justified for the project.
2. Register setup and teardown around Astro transition lifecycle events. Kill old GSAP timelines, ScrollTriggers, Lenis hooks, observers, and listeners before reinitializing.
3. Decide which elements persist, especially header, navigation, chatbot, and analytics. Avoid duplicate IDs, duplicate event handlers, and stale references.
4. Preserve browser history, back/forward behavior, anchor targets, focus restoration, form state expectations, and a no-transition fallback.
5. Disable or simplify transition motion under `prefers-reduced-motion`; never delay essential content or trap navigation.
6. Verify first load, internal route, back, forward, interrupted transition, resize, hidden tab, and reduced-motion states in a real browser.

## Handoff

Document lifecycle hooks, persistent elements, cleanup proof, fallback behavior, and route/browser evidence. If the project has no public pages, record that the transition cannot yet be verified.
