# Phase 2 Correction Report

**Date:** 2026-07-18  
**Scope:** data-driven service navigation and concise HN Flow hero. Superseded for the homepage hero by Phase 2A; no Phase 3 implementation work was started.

## Data And Routes

- `src/data/site.ts` is the public source of truth for the nine services, their category, summary, customer problem, approach, included work, tags, FAQs, contact data, chatbot suggestions, and form options.
- Marketing contains eight services: Branding & Identity; Social Media & Content; Performance Marketing; Website & E-commerce; SEO & Organic Growth; Marketing Automation & AI; Lead Generation & Sales Funnels; Analytics, Consulting & Training.
- Technology contains Growth Technology Services at `/services/tech-services`. Its complete 22-item inclusion list is rendered by the dynamic service page.
- The homepage service index, `/services`, every `/services/[slug]` page, the desktop menu, mobile accordion, chatbot suggestion, and contact selector derive from this model. The disconnected `public-content.ts` service list was removed.

## Navigation And Hero

- Desktop Services is an accessible disclosure menu with grouped Marketing and Technology sections, direct service links, `View all services`, keyboard activation, Escape close, outside close, and no focus trap.
- Mobile Services is an accordion within the existing focus-trapped navigation dialog. It exposes all nine service links and collapses when the dialog closes.
- The former HN Flow scene is superseded by Phase 2A's DOM-first Kinetic Campaign Stream and four-section Strategy journey. Consult the Phase 2A motion documents for the current hero architecture.

## Motion, Performance, And Accessibility

- One labelled GSAP entrance coordinates navigation, headline, HN Flow core, signal paths, outputs, and cue. A short desktop-only ScrollTrigger transition has no pinning; mobile keeps native scroll.
- The idle engine pauses offscreen and while the document is hidden. GSAP, ScrollTrigger, and Lenis remain dynamic imports; Lenis stays desktop-only. No WebGL, Three.js, Spline, model, or new dependency was added.
- Reduced-motion users receive static final content with no GSAP or Lenis initialisation. The mobile menu, Services controls, chatbot, CTAs, contact form, skip link, focus visibility, and semantic service headings remain keyboard usable.

## Validation

- `npm install`: passed; no dependency changes or vulnerabilities reported.
- `npm run build`: passed. All nine static service routes were generated.
- `npx playwright test`: 6 passed, covering public routes, service data, desktop and mobile navigation, chatbot Escape, contact validation, and reduced motion.
- `npm run test:chat`: passed.
- Agent-browser: desktop and mobile menu behaviour, focus return, all service links, overflow, and errors verified at `1440 x 900` and `390 x 844`.
- Visual QA: captured homepage viewport and full-page evidence at `1440`, `1280`, `1024`, `768`, `430`, and `390` widths in `.qa/visual-regression/`.

## Remaining Limitation

The existing blog Sheets request could not reach its external source during local builds and used its repository fallback. Contact and Sheets integration code was preserved; no real external form submission was made during QA.
