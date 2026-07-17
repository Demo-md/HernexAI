---
name: premium-frontend
description: Produce bespoke, art-directed, production-quality public-facing Astro frontend experiences with editorial typography, strong hierarchy, deliberate asymmetry, storytelling, and intentional responsive behavior.
---

# Premium Frontend

Use for new public-facing pages or substantial visual redesigns. Read `docs/codex/repository-context.md`, `docs/codex/design-principles.md`, and `docs/codex/brand-foundation.md` before choosing a direction.

## Directives

- Establish a clear creative direction before writing components: audience, mood, type hierarchy, surface system, grid, section rhythm, signature interaction, and mobile simplification.
- Use premium editorial typography, intentional negative space, distinct section compositions, and brand-specific interactions.
- Give each section one narrative job and one dominant visual idea. Make proof and clarity precede decorative spectacle.
- Keep semantic HTML, server-rendered content, responsive flow layout, and accessible states at the center of the implementation.
- Load enhancement code progressively; ensure headline, CTA, and core message render before heavy animation or 3D.

## Reject

- Generic landing-page templates, default SaaS compositions, unnecessary bento layouts, repeated cards, and decoration without narrative purpose.
- Visual polish that depends on hidden content, fragile absolute positioning, inaccessible hover states, or desktop-only composition.

## Handoff

Before implementation, state the design direction and the performance/accessibility strategy. After the first pass, run `frontend-design-critic`, browser verification, and visual QA.
