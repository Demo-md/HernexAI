---
name: visual-regression-qa
description: Capture and compare responsive website screenshots across required desktop, tablet, and mobile widths to detect visual regressions and animation end-state defects.
---

# Visual Regression QA

Use after implementation or visual changes. Read `docs/codex/browser-qa-matrix.md` and `references/viewport-matrix.md`.

## Procedure

1. Start a production preview or approved local server and record its URL.
2. Run `scripts/capture-responsive-screenshots.ts` or the equivalent Playwright workflow at `1440`, `1280`, `1024`, `768`, `430`, and `390` widths.
3. Capture stable initial and final animation states, full-page and key viewport screenshots. Store generated files under a gitignored QA output directory, never under public production assets.
4. Compare against the baseline or prior approved evidence. Check text clipping, horizontal overflow, stacking, alignment, spacing, sticky sections, headers/footers, overlays, and animation end states.
5. Record viewport, route, screenshot path, finding, severity, and baseline comparison. Do not rely on one desktop screenshot.

## Completion Rule

Mark the check failed for unexplained regressions or missing required widths. A screenshot that looks correct only before fonts or animation settle is not a passing baseline.
