---
name: playwright-interactive
description: Run repeatable Playwright interaction tests for Astro navigation, menus, forms, chatbot states, keyboard behavior, reduced motion, animation visibility, links, and browser errors.
---

# Playwright Interactive

Use for repeatable interaction coverage after a route is available. Read `docs/codex/browser-qa-matrix.md` and inspect existing Playwright tests before adding helpers.

## Procedure

1. Start or detect the local server and use the repository's installed `@playwright/test`; do not install a new framework.
2. Prefer semantic locators, stable roles/labels, and state assertions. Avoid arbitrary sleeps; wait for URL, network state, visible text, or a meaningful final state.
3. Test navigation, mobile menu, contact form states, chatbot open/minimize/close when present, back/forward navigation, keyboard traversal, reduced-motion mode, animated final visibility, internal links, console errors, and page errors.
4. Keep tests independent and deterministic. Mock only approved local endpoints when necessary, never real user data or production services.
5. Save traces/screenshots only to gitignored QA output and report failures with route, viewport, and evidence.

## Completion Rule

Do not treat compilation as interaction coverage. A missing frontend route or unimplemented state must be reported as `Not available` or `Fail`, not silently skipped.
