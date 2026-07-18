# Final Performance Review

**Scope:** Phase 3 public routes

## Preserved Controls

- Astro renders primary content, headings, CTAs, forms, and route copy before optional client enhancement.
- GSAP, ScrollTrigger, and Lenis remain dynamically imported; Lenis is desktop-only and skipped for reduced motion.
- `BaseLayout` owns route-transition cleanup, avoiding duplicate handlers, timelines, ScrollTriggers, and Lenis tickers.
- The marketing engine and HN Bot remain CSS/SVG-based. No WebGL, model, texture, or second render loop was added.
- Scroll-reveal animation does not hide offscreen essential content before it triggers.
- There are no new remote images, autoplay media, third-party analytics, or unapproved 3D dependencies.

## Verification

- Production build passed.
- Agent-browser reported no overflow at desktop and mobile evidence widths.
- Playwright passed route, interaction, reduced-motion, and page-error coverage.

## Measurement Limit

No production deployment, real-device trace, or field Core Web Vitals data was available. The budgets in `docs/codex/performance-budgets.md` remain targets for the deployed environment.
