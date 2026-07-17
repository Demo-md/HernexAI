# Responsive Viewport Matrix

Use the same route, browser state, font readiness, and capture naming across runs.

| Width | Suggested height | Primary checks |
|---:|---:|---|
| 1440 | 900 | Full desktop composition, hero hierarchy, wide grids, sticky sections |
| 1280 | 900 | Desktop tightening, navigation spacing, media crop, content density |
| 1024 | 900 | Tablet/desktop breakpoint, two-column collapse, CTA alignment |
| 768 | 1024 | Tablet portrait, navigation mode, stacked sections, overflow |
| 430 | 932 | Mobile hero, touch targets, drawer/chat overlap, readable type |
| 390 | 844 | Narrow mobile wrapping, safe-area spacing, final overflow check |

Capture both viewport and full-page screenshots. Record whether the screenshot is initial, settled, reduced-motion, menu-open, or another named state. Keep output under the gitignored `.qa/` directory or an explicitly temporary directory.
