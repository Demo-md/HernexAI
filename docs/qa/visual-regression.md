# Visual Regression QA

**Route:** `/`  
**Output:** `.qa/visual-regression/` (gitignored)  
**Date:** 2026-07-19

## Captured Viewports

| Width | Height | Result |
| --- | --- | --- |
| 1440 | 900 | Pass |
| 1280 | 900 | Pass |
| 1024 | 900 | Pass |
| 768 | 900 | Pass |
| 430 | 900 | Pass |
| 390 | 900 | Pass |

Each viewport has initial-viewport and full-page PNG evidence. The capture helper resets scroll and waits for the kinetic headline lines to return to their resting transforms, so the baselines do not record an entrance-animation intermediate state.

## Review Notes

- No text clipping or horizontal overflow was observed in the captured homepage matrix.
- Desktop uses a three-line centred headline with a DOM-only Kinetic Campaign Stream; mobile deliberately reduces the stream to text-safe lower-frame moments.
- Header, footer, CTA hierarchy, chatbot safe area, FAQ rows, form stacking, and section transitions remained consistent.
- Supporting-route desktop evidence was additionally reviewed through agent-browser at `/services`; its service index is visible before scroll after the ScrollTrigger correction.
- Phase 2A adds evidence under `.qa/hero-campaign-stream/` and `.qa/strategy-four-section/`, covering five media concepts, four Strategy destinations, reverse scrolling, and the six-width matrix.

## Phase 2C Review - 2026-07-19

**Output:** `.qa/phase-2c/` (gitignored)  
**Route coverage:** `/`, `/capabilities`, `/insights`

| Viewport | Homepage | Review focus |
| --- | --- | --- |
| 1440 x 900 | Pass | Header, centred hero, CTA alignment, proof panel, Blog introduction, footer. |
| 1280 x 800 | Pass | Desktop rhythm, headline wrapping, proof/card boundaries, nav fit. |
| 1024 x 768 | Pass | Tablet transition and preserved interactive hierarchy. |
| 768 x 1024 | Pass | Intentional stacked layout, clear buttons, no clipped type. |
| 430 x 932 | Pass | Mobile headline, campaign simplification, contact controls, safe bot placement. |
| 390 x 844 | Pass | Narrow mobile stacking, menu space, no horizontal overflow. |

### Focused Captures

- `home-testimonials-1440.png`: three compact verified-review rows beside the Capability headline.
- `capabilities-testimonials-1440.png`: distinct three-column editorial proof section after the former evidence placeholder was removed.
- `capabilities-testimonials-390.png`: single-column mobile testimonial composition.
- `blog-1440.png`: featured Blog story with compact secondary article rows and no dashboard/grid treatment.
- `home-footer-1440.png`: full-page review of the centred ending, integrated footer, logo treatment, and final CTA.

### Outcome

- No clipping, unexpected wrapping, horizontal overflow, broken stacking, or blocked primary controls was found in the reviewed Phase 2C captures.
- The HN Bot stays on its own fixed layer; the separately layered back-to-top control remains available when the footer is visible.
- Reduced motion retains content and controls without automatic testimonial, media, or blink movement.

## About, Footer, and Greeting Review - 2026-07-19

**Output:** `.qa/about-footer-update/` (gitignored)  
**Route coverage:** `/about`, first-visit `/`

| Viewport | Result | Review focus |
| --- | --- | --- |
| 1440 x 900 | Pass | Editorial founder split, readable founder details, three-principle rhythm, CTA-to-footer handoff, and right-side footer directory. |
| 390 x 844 | Pass | Intentional one-column founder sequence, readable navigation links, compact logo, and no horizontal overflow. |

- The same existing light logo file is smaller through layout styling only; no logo artwork was replaced.
- The welcome overlay offers a small, keyboard-focusable Skip control beneath the greeting and never blocks access to the hero after activation.
