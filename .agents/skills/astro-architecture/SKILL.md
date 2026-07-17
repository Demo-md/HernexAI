---
name: astro-architecture
description: Protect and improve HernexAI's Astro architecture through semantic pages, layouts, islands, minimal hydration, static/server rendering, endpoints, and lifecycle-aware scripts.
---

# Astro Architecture

Use for Astro page, component, endpoint, data, or client-island work. Read `docs/codex/repository-context.md` and `references/astro-architecture-patterns.md`.

## Directives

- Preserve Astro and its current server adapter. Never migrate to Next.js or convert the project into a React application.
- Keep static content server-rendered. Use client directives only for behavior that truly needs a browser.
- Separate pages, shared layouts, visual components, endpoints, data, and client scripts. Keep islands small and explicit.
- Preserve existing API routes, forms, auth, analytics, and shared data dependencies.
- Avoid hydrating static content, monolithic components, speculative abstractions, and large client bundles.
- Make script setup idempotent and cleanup-aware across dev reloads and Astro route transitions.

## Handoff

Describe the render mode, island boundary, dependency cost, data path, and lifecycle cleanup before implementation. Run the production build and browser verification afterward.
