---
name: agent-browser-verify
description: Verify an implemented Astro website in a real browser across routes, responsive states, interactions, motion, accessibility, and console/page errors before completion.
---

# Agent Browser Verify

Use this skill for browser-based verification after implementation. Read `docs/codex/repository-context.md` and `docs/codex/browser-qa-matrix.md` first.

## Procedure

1. Detect or start the local dev/preview server without changing application code. Record the URL and server command.
2. Use `agent-browser` when available. Load `agent-browser skills get core --full`; prefer snapshot/ref interaction and real screenshots.
3. Verify the homepage and every major route. If a route or frontend is absent, record a failure/limitation.
4. At each required viewport, inspect complete-page scroll, reverse scroll, navigation, mobile menu, internal links, buttons, forms, focus, hover, sticky/pinned content, hero animation, ScrollTrigger activation, and final animation visibility.
5. Check reduced-motion mode, WebGL/animation fallback where relevant, page resize, keyboard behavior, and blocked scroll/overflow.
6. Inspect console logs and page errors. Treat critical runtime errors, invisible required content, overlap, broken navigation, or blocked scrolling as quality-gate failures.
7. Write `docs/qa/browser-verification.md` from `references/browser-verification-checklist.md`. Include environment, routes, viewport results, evidence paths, failures, and unresolved limitations.

## Completion Rule

Do not report browser verification as passed while critical defects, console errors, failing routes, or unverified required interactions remain. Distinguish `Pass`, `Fail`, and `Not inspected`.
