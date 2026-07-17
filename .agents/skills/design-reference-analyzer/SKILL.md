---
name: design-reference-analyzer
description: Analyze supplied reference websites, screenshots, recordings, Figma references, or similar-site requests in a real browser before HernexAI frontend implementation, then write an evidence-based original design report.
---

# Design Reference Analyzer

Use this skill whenever a user supplies a reference URL, screenshot, recording, Figma reference, or asks for a similar website. Do not modify application code during analysis.

## Procedure

1. Read `docs/codex/repository-context.md` and `references/reference-analysis-template.md`.
2. Use `agent-browser` when available. Load its current workflow with `agent-browser skills get core --full` before issuing browser commands.
3. Visit the complete reference site in a real browser. Inspect desktop at `1440`, `1280`, and `1024` widths; inspect tablet/mobile at `768`, `430`, and `390` widths.
4. Capture screenshots at every required width, scroll from hero through footer at each relevant breakpoint, and inspect lazy-loaded content. Save evidence outside production paths or link to approved QA output.
5. Inspect navigation, menus, links, buttons, forms, hover/focus states, cursor behavior, touch behavior, loading, route changes, reverse scroll, pinned/sticky regions, and page transitions. Record anything unavailable as `Not inspected`.
6. Inventory typography scale, hierarchy, color/contrast, grid logic, spacing, section rhythm, composition, responsive simplification, accessibility, and performance risk.
7. Classify motion as `entrance`, `timeline`, `scroll-triggered`, `scrubbed`, `pinned`, `parallax`, `masking`, `typography`, `microinteraction`, or `page transition`. Record trigger, target, approximate timing/easing, repeat/reset behavior, and confidence.
8. Separate `Observation`, `Inference`, and `Recommendation`. Do not infer exact source implementation from appearance.
9. Write `docs/reference-analysis/<reference-name>.md` using the linked template before any implementation begins.
10. Translate transferable principles into an original HernexAI direction. Never copy source code, text, assets, illustrations, proprietary characters, exact coordinates, or signature composition.

## Quality Gate

- The report exists before implementation.
- All six required widths have screenshots or explicit limitations.
- Every accessible page section was scrolled and assessed.
- Key interactions and accessibility states were attempted.
- Motion inventory includes confidence and reset behavior.
- Original HernexAI interpretation and non-copy constraints are explicit.
- Only the analysis artifact changed during this phase.
