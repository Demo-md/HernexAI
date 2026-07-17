---
name: tailwind-v4-design-system
description: Create and enforce a controlled Tailwind CSS v4 design system with semantic tokens, fluid typography, responsive grids, focus states, and reusable utility patterns.
---

# Tailwind v4 Design System

Use for Tailwind token, utility, responsive, or component-style work. Read `docs/codex/repository-context.md`, `references/design-token-schema.md`, and `docs/codex/design-principles.md`.

## Directives

- Define CSS custom properties for semantic colors, surfaces, type, spacing, containers, radii, shadows, motion, and focus states.
- Use fluid typography and a small deliberate breakpoint system. Make grid and container rules explicit.
- Prefer reusable utility patterns or component classes over one-off arbitrary values.
- Keep radii, shadows, colors, and spacing consistent; document intentional exceptions.
- Include visible focus, reduced-motion, safe-area, overflow, and touch rules in the system.
- Keep Tailwind v4 CSS-first configuration through the existing Vite plugin. Do not introduce a second styling system without a decision record.

## Handoff

Provide a token map and explain how it supports the brand and responsive compositions. Check generated CSS size and verify tokens in a real browser.
