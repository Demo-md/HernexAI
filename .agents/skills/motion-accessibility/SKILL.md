---
name: motion-accessibility
description: Make HernexAI motion accessible through reduced-motion alternatives, stable focus, keyboard-safe transitions, readable static states, and non-blocking responsive behavior.
---

# Motion Accessibility

Use for any animated, scroll-linked, pinned, cursor, video, 3D, menu, dialog, or route-transition experience. Read `docs/codex/accessibility-requirements.md` and `references/reduced-motion-patterns.md`.

## Directives

- Implement `prefers-reduced-motion` as a real alternate state: show content, remove non-essential loops/scrubbing, and preserve a readable hierarchy.
- Keep essential content visible without animation and never require motion to discover, submit, or navigate.
- Keep keyboard interaction usable during transitions; do not steal focus or trap scrolling.
- Do not use custom cursors on touch devices. Do not require pinned storytelling on narrow mobile screens.
- Avoid flashing, rapid scale changes, disorienting parallax, and motion that blocks a control.
- Manage focus for menus, dialogs, chat panels, and route transitions; support Escape and restoration.
- Test reduced motion, keyboard traversal, resize, touch, zoom/reflow, and screen-reader semantics in a real browser.

## Handoff

Record the default state, reduced-motion state, keyboard path, focus behavior, and any limitation. A passing visual animation with a failing reduced-motion state is not complete.
