# Browser Verification

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tool:** agent-browser with Chromium  
**Date:** 2026-07-18

## Result

**Pass with documented external integration limitation.** No critical browser errors, route failures, blocked scrolling, or horizontal overflow were observed.

## Coverage

| Area | Result | Evidence |
| --- | --- | --- |
| Homepage structure, HN Flow hero, CTAs, FAQ, contact fields, footer, HN Bot | Pass | agent-browser snapshots at `1440 x 900` and `390 x 844` |
| Services, all nine service detail pages, About, Capabilities, Contact, and Insights | Pass | Playwright public-route test |
| Desktop Services menu | Pass | Both groups, all nine service links, keyboard open, Escape, outside close, and no focus trap verified |
| Mobile Services accordion | Pass | All nine links visible after expansion; Escape closes menu and returns focus to trigger |
| Chatbot | Pass | Launcher opened the dialog; textarea, minimise/close controls exposed; Escape closed it |
| Reduced motion | Pass | Motion enhancement bypassed and service content remained visible |
| Horizontal overflow | Pass | `documentElement.scrollWidth > innerWidth` was `false` at `1440 x 900` and `390 x 844` |
| Console and page errors | Pass | No critical errors in normal agent-browser sessions |
| Contact form client validation and service data | Pass | Required-field guidance is announced; selector has nine source-derived services |

## Known Integration Limitation

The existing contact endpoint and Sheets integration were preserved. The build log shows the existing blog Sheets fetch is unavailable in this environment and falls back to repository content. This QA run did not submit a real enquiry or claim external webhook success.

## Hero Phase 1 Verification - 2026-07-18

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** agent-browser and Playwright Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| Eight-letter `strategy` structure and accessible headline | Pass | Playwright asserts eight visible letter spans; the semantic heading is read once. |
| Text-first master timeline | Pass | Agent-browser still captures show the message state before the brand plate, then the rear brand and foreground campaign moments. |
| HN system wake and scroll transition | Pass | Core, paths, and signals activate after text; scroll QA showed a single workflow plate and no horizontal overflow. |
| Mobile simplification | Pass | `1024`, `768`, `430`, and `390` captures contain the readable static system with no kinetic media. |
| Reduced motion | Pass | Browser inspection returned `mediaDisplay: none` and all strategy letters visible at rest. |
| Console/page errors | Pass | agent-browser reported only Astro/Vite debug messages, with no page errors. |
| Responsive matrix | Pass | Captured `1440`, `1280`, `1024`, `768`, `430`, and `390` widths under `.qa/hero-phase-1/`. |
| Automated interaction suite | Pass | `7 passed` using `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npx playwright test`. |

### Visual Evidence

- `.qa/hero-phase-1/1440x900.png` - settled desktop message and HN Flow state.
- `.qa/hero-phase-1/1024x900.png` - desktop-to-tablet simplification.
- `.qa/hero-phase-1/390x900.png` - intentional narrow-screen composition.
- Agent-browser captures inspected during QA: letter convergence, rear brand-plate movement, foreground campaign-plate movement, scroll transition, and reduced-motion state.

### QA Limitation

`ffmpeg` is not installed, so agent-browser could not produce an optional WebM recording. Still captures, live DOM state checks, console/error checks, the six-width screenshot matrix, and the passing Playwright suite provide the verification evidence for this phase.

## First Signal Intro Verification - 2026-07-18

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** agent-browser and Playwright Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| First-visit full sequence | Pass | Playwright verifies that the final Malayalam greeting `നമസ്കാരം` becomes visible, remains visible through a 900ms sampled portion of its 1.5-second hold, and then hands off to the hero. |
| First-visit-only behavior | Pass | Browser test clears session storage for the first pass, then verifies reload and browser back do not replay the overlay. |
| GSAP / Motion separation | Pass | GSAP timeline owns overlay, signal, handoff, and hero release; the React island owns greeting typography only. |
| Three.js lifecycle | Pass | A 24-point desktop / 14-point mobile field renders only during the intro and is disposed at handoff. The WebGL-disabled Playwright path releases the page. |
| Mobile intro | Pass | `390 x 844` captures retain the requested eleven-language sequence with the lightweight 14-point field and a captured Malayalam hold. |
| Reduced motion | Pass | The browser reaches `data-intro-state="complete"` quickly, hides the overlay, and exposes the completed hero without 3D or typography travel. |
| Console and page errors | Pass | Dedicated first-signal capture reports no errors for desktop, mobile, or reduced motion. |
| Settled responsive matrix | Pass | `1440`, `1280`, `1024`, `768`, `430`, and `390` final page captures completed under `.qa/visual-regression/`. |

### Visual Evidence

- `.qa/first-signal/desktop-1440-initial.png`
- `.qa/first-signal/desktop-1440-bengali.png`
- `.qa/first-signal/desktop-1440-malayalam-hold.png`
- `.qa/first-signal/desktop-1440-hero.png`
- `.qa/first-signal/mobile-390-initial.png`
- `.qa/first-signal/mobile-390-malayalam-hold.png`
- `.qa/first-signal/mobile-390-hero.png`
- `.qa/first-signal/reduced-1440-hero.png`

The direct agent-browser accessibility-tree inspection also confirmed the completed homepage retains the logical `h1`, both hero CTAs, primary navigation, contact controls, and HN Bot launcher after the overlay clears.

## Strategy Shared-Word Verification - 2026-07-18

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** Playwright Chromium and agent-browser

| Check | Result | Evidence |
| --- | --- | --- |
| Hero idle loop | Pass | The loop is one GSAP repeat timeline with a 2.47-second total cycle, short individual letter displacement, signal sweep, and a long resting state. |
| Forward transfer | Pass | Playwright scrolls from the hero into the positioning section and confirms the source hides while the gold destination word becomes visible. |
| Reverse transfer | Pass | The same browser test scrolls to the top and confirms the hero source restores. |
| Destination content | Pass | Agent-browser exposes one semantic h2: `Strategy turns activity into demand.` The visual traveller is decorative and hidden from assistive technology. |
| Responsive matrix | Pass | Captures completed without console/page errors at `1440`, `1280`, `1024`, `768`, `430`, and `390`; mobile uses a direct vertical movement. |
| Reduced motion | Pass | `reduced-1440-static.png` shows independent, static source and destination content with no clone or scrub. |
| Lifecycle | Pass | The traveller is removed through the existing Astro teardown path; the ResizeObserver and transfer timeline are disconnected/killed with the motion context. |

### Visual Evidence

- `.qa/strategy-transfer/desktop-1440-idle.png`
- `.qa/strategy-transfer/desktop-1440-detach.png`
- `.qa/strategy-transfer/desktop-1440-mid.png`
- `.qa/strategy-transfer/desktop-1440-boundary.png`
- `.qa/strategy-transfer/desktop-1440-landed.png`
- `.qa/strategy-transfer/mobile-390-landed.png`
- `.qa/strategy-transfer/reduced-1440-static.png`

### Validation

- `npm run build` passed. Vite retained the existing lazy chunk-size warning and the existing Sheets blog fetch warning during prerender.
- `npm run test:chat` passed.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npx playwright test --reporter=line` passed: `10/10`.

## Campaign Orbit 3D Verification - 2026-07-18

> Superseded by Phase 2A's DOM-only Kinetic Campaign Stream. This historical verification does not describe the current hero.

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** Playwright Chromium and responsive screenshot capture

| Check | Result | Evidence |
| --- | --- | --- |
| One renderer and progressive loading | Pass | The `three` module is dynamically imported after the message phase; the static SVG capability visual remains available for loading failure and unsupported WebGL. |
| Desktop depth and readability | Pass | The five-plane orbit uses one selected foreground surface at a time. Its right-biased position avoids the headline, supporting copy, and CTAs. |
| Feature exchange | Pass | Feature-one and feature-two captures show a single material focus changing through controlled rotations rather than a pile of static cards. |
| Scroll handoff | Pass | Scroll-clear captures show the orbit moving out of the strategy handoff range before the warm positioning section becomes the reading surface. |
| Responsive simplification | Pass | The scene renders five surfaces on desktop, three on tablet, and two on mobile. Narrow captures keep all headline text unobscured. |
| Reduced motion and unavailable WebGL | Pass | Reduced-motion capture uses the static capability visual. Playwright replaces canvas contexts and confirms the same safe fallback. |
| Console and page errors | Pass | Responsive capture and Playwright report no console or page errors. |

### Visual Evidence

- `.qa/campaign-orbit/desktop-1440-feature-one.png`
- `.qa/campaign-orbit/desktop-1440-feature-two.png`
- `.qa/campaign-orbit/desktop-1440-scroll-clear.png`
- `.qa/campaign-orbit/tablet-1024-feature-one.png`
- `.qa/campaign-orbit/tablet-768-feature-two.png`
- `.qa/campaign-orbit/mobile-430-feature-one.png`
- `.qa/campaign-orbit/mobile-390-feature-two.png`
- `.qa/campaign-orbit/reduced-1440-static-fallback.png`

### Validation

- `npm run build` passed.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npx playwright test --reporter=line` passed: `11/11`.
- `npm run test:chat` passed.
- Live agent-browser inspection confirmed the `data-hero-three="ready"` state, one logical hero H1, both CTAs, semantic navigation and form controls, and a clear hero source after the 700px handoff scroll.

## Phase 2A Homepage Verification - 2026-07-19

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** Playwright Chromium, agent-browser, responsive screenshot capture

| Check | Result | Evidence |
| --- | --- | --- |
| Circular hero system removed | Pass | The live hero contains no `GrowthEngine`, hero WebGL canvas, orbit outline, or radial HN Flow scene. |
| Text-first entrance | Pass | The eyebrow, headline, supporting copy, and CTAs settle before the campaign stream starts at 1.65 seconds. |
| Strategy assembly and loop | Pass | Eight visible letters converge from small controlled offsets, sweep once, then run one short 2.5-second loop. |
| 2D campaign stream | Pass | Five original concept frames use one GSAP timeline; captures show the first and second desktop beats, a controlled foreground edge pass, and no CTA overlap. |
| Four-section Strategy journey | Pass | Playwright and agent-browser confirm Problem, Connected System, Services, Capability, and reverse restoration to `HERO_IDLE`. |
| Responsive behaviour | Pass | Capture matrix covers `1440`, `1280`, `1024`, `768`, `430`, and `390`; tablet reduces frame count and mobile keeps frames below the headline. |
| Reduced motion | Pass | Browser test confirms a complete static hero and static campaign concept with no kinetic stream. |
| Semantics and overflow | Pass | Agent-browser exposes all four h2 statements before scrolling; live checks reported one traveller, no horizontal overflow, and no console/page errors. |

### Evidence

- `.qa/hero-campaign-stream/desktop-1440-first-media.png`
- `.qa/hero-campaign-stream/desktop-1440-second-media.png`
- `.qa/hero-campaign-stream/desktop-1440-handoff.png`
- `.qa/hero-campaign-stream/tablet-1024-first-media.png`
- `.qa/hero-campaign-stream/tablet-768-second-media.png`
- `.qa/hero-campaign-stream/mobile-430-first-media.png`
- `.qa/hero-campaign-stream/mobile-390-second-media.png`
- `.qa/strategy-four-section/desktop-1440-problem.png`
- `.qa/strategy-four-section/desktop-1440-system.png`
- `.qa/strategy-four-section/desktop-1440-services.png`
- `.qa/strategy-four-section/desktop-1440-capability.png`
- `.qa/strategy-four-section/mobile-390-services.png`

### Validation

- `npm run build` passed.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npx playwright test --reporter=line` passed: `11/11`.
- Live agent-browser scroll verification reached `SYSTEM_LOCKED`, then returned to `HERO_IDLE` with the hero source restored.

## Fixed-Slot Campaign Device Verification - 2026-07-19

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser tools:** Playwright Chromium and the responsive capture script

| Check | Result | Evidence |
| --- | --- | --- |
| Same device geometry | Pass | All five `data-kinetic-media-item` elements use the shared handset frame and one fixed presentation stage. |
| Three-second rotation | Pass | A focused Chromium interaction test observed `brand` then `social` on consecutive 3-second beats. |
| Fixed stage | Pass | The same test compares card centre coordinates, confirming the deliberate tilt does not move the card away from its stage. |
| Headline and CTA clearance | Pass | `desktop-1440-repositioned.png` shows a lower/right stage; the copy and both CTAs remain readable. |
| Responsive matrix | Pass | Captures generated at `1440`, `1280`, `1024`, `768`, `430`, and `390`; mobile locks the device beneath the copy. |
| All five desktop states | Pass | `desktop-1440-first`, `second`, `third`, `fourth`, and `fifth` captures confirm the full cycle. |
| Reduced motion | Pass | `reduced-1440-static.png` retains a static capability device and hides the autonomous loop. |
| Console and page errors | Pass | Chromium capture output reported no errors for completed desktop capture contexts; the full route suite independently checks page and console errors. |

### Evidence

- `.qa/hero-campaign-stream/desktop-1440-repositioned.png`
- `.qa/hero-campaign-stream/desktop-1440-first-media.png`
- `.qa/hero-campaign-stream/desktop-1440-second-media.png`
- `.qa/hero-campaign-stream/desktop-1440-third-media.png`
- `.qa/hero-campaign-stream/desktop-1440-fourth-media.png`
- `.qa/hero-campaign-stream/desktop-1440-fifth-media.png`
- `.qa/hero-campaign-stream/tablet-1024-first-media.png`
- `.qa/hero-campaign-stream/tablet-768-second-media.png`
- `.qa/hero-campaign-stream/mobile-430-first-media.png`
- `.qa/hero-campaign-stream/mobile-390-second-media.png`
- `.qa/hero-campaign-stream/reduced-1440-static.png`

### Tool Limitation

`agent-browser` was loaded and its existing six-width Six2Eight evidence informed the analysis, but a new isolated Chrome session stalled during this focused pass. Local Chromium verification therefore used the repository's Playwright browser flow. No fresh `agent-browser` success is claimed for this update.

### Validation

- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npx playwright test --reporter=line` completed as two clean shards: `8/8` route, navigation, form, semantic, reduced-motion, and intro tests; `4/4` WebGL fallback, DOM-only media, campaign rotation, and reversible Strategy travel tests.
- `npm run test:chat` passed.
- `npm run build` passed.
- The build retains the existing Vite chunk-size advisory and the existing non-fatal Sheets blog fallback warning during prerender.

## Campaign Device Timing Correction - 2026-07-19

- Each campaign device now remains fully settled for `3s` before its exit begins.
- The entrance and exit are both `0.42s`, making the complete card-to-card period `3.84s` rather than shortening the readable card state.
- The focused Chromium test asserts that the first card is still active after `2.4s`, then confirms the second card reaches the same fixed presentation centre after the handoff.

## Phase 2B Service Architecture Verification - 2026-07-19

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browser:** Playwright Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| Simplified desktop and mobile Services navigation | Pass | Two-hub menu tests confirm Marketing and Technology only, keyboard traversal, Escape, click-outside, and mobile expansion. |
| Marketing hub | Pass | Eight `data-service-preview-trigger` and eight preview panels at `/services/marketing`. |
| Technology hub | Pass | Twenty-two triggers and panels at `/services/technology`; no canvas is present. |
| Existing routes | Pass | All public routes render without page errors, including every marketing detail URL and `/services/tech-services`. |
| Context-aware HN Bot / WhatsApp | Pass | Explicit service action opens a compact bubble with a service-specific WhatsApp prefill. |
| Preview lifecycle | Pass | Automatic switching, back/forward navigation, and static reduced-motion state are covered by Playwright. |
| Responsive QA | Pass | Marketing and Technology captured at `1440`, `1280`, `1024`, `768`, `430`, and `390`; all browser checks reported no overflow or console/page errors. |
| Phase 2A regression | Pass | Greeting, WebGL-unavailable escape, DOM-only campaign stream, three-second card hold, and reversible Strategy journey pass in Chromium. |

### Evidence

- `.qa/phase-2b/marketing-1440.png`
- `.qa/phase-2b/marketing-1280.png`
- `.qa/phase-2b/marketing-1024.png`
- `.qa/phase-2b/marketing-768.png`
- `.qa/phase-2b/marketing-430.png`
- `.qa/phase-2b/marketing-390.png`
- `.qa/phase-2b/technology-1440.png`
- `.qa/phase-2b/technology-1280.png`
- `.qa/phase-2b/technology-1024.png`
- `.qa/phase-2b/technology-768.png`
- `.qa/phase-2b/technology-430.png`
- `.qa/phase-2b/technology-390.png`
- `.qa/phase-2b/marketing-reduced-1440.png`

### Validation

- Playwright completed `14/14` tests in four deterministic groups: `7/7` baseline/navigation/reduced motion, `2/2` greeting/WebGL fallback, `3/3` Phase 2A motion, and `2/2` Phase 2B service hub/preview behavior.
- `npm run test:chat` passed.
- `npm run build` passed with the existing Vite chunk-size warning and non-fatal Sheets blog fallback warning.
- Fresh `agent-browser` Chrome sessions remain unavailable in this environment; all Phase 2B local browser evidence uses Playwright Chromium.

## Homepage Conversion Refinement Verification - 2026-07-19

**Environment:** Astro production preview, `http://127.0.0.1:3002`  
**Browser:** Playwright Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| Production route and console sweep | Pass | `14/14` Playwright checks passed with no page or console errors. |
| WhatsApp handoff | Pass | A two-turn website enquiry returns `Start WhatsApp Chat` and the configured `wa.me` URL. |
| Contact form requirements | Pass | Phone and budget range are required; custom budget is required only when that range is selected. |
| Chat panel identity | Pass | The avatar remains inside a fixed header slot beside “HerNex Bot” and its presence label. |
| Responsive composition | Pass | Captures created at `1440`, `1280`, `1024`, `768`, `430`, and `390`; no horizontal overflow was observed. |
| Reduced motion | Pass | Existing reduced-motion tests remain green with the static hero composition and no compulsory animation. |

### Evidence

- `.qa/conversion-pass/1440x900.png`
- `.qa/conversion-pass/1280x900.png`
- `.qa/conversion-pass/1024x900.png`
- `.qa/conversion-pass/768x900.png`
- `.qa/conversion-pass/430x900.png`
- `.qa/conversion-pass/390x900.png`
- `.qa/conversion-pass/capabilities-1440.png`
- `.qa/conversion-pass/contact-1440.png`
- `.qa/conversion-pass/footer-1440.png`
- `.qa/conversion-pass/chatbot-1440.png`

## Phase 2C Testimonials, Blog, and HN Bot Verification - 2026-07-19

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browsers:** Playwright Chromium and agent-browser Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| Verified testimonials | Pass | All three supplied reviews render on the homepage proof panel and on `/capabilities`; full text is available with native details on the homepage and directly in the Capabilities columns. |
| Capabilities composition | Pass | The former evidence placeholder is removed. The replacement uses an editorial heading and three bounded proof columns, not overlapping or auto-scrolling cards. |
| Public Blog | Pass | `/insights`, all three article routes, search, category filters, related links, breadcrumbs, and empty state behaviour render in Chromium. Development fixtures are visibly marked and noindexed. |
| Public SEO | Pass | Article JSON-LD, canonical metadata, `/sitemap.xml`, and `/rss.xml` were checked. Development fixtures do not enter the sitemap or RSS feed. |
| HN Bot | Pass | Click, keyboard activation, drag threshold, saved viewport position, reset, Escape close, reduced motion, and back-to-top collision protection pass in Chromium. |
| Footer and navigation | Pass | Live accessibility-tree inspection confirms the `Blog` navigation label, centred final CTA layout, WhatsApp link, Insightsnode link, and logical footer links. |
| Console and page errors | Pass | Agent-browser `errors` returned no page errors in the final local session; the public-route Playwright test also passed without console/page errors. |
| Responsive and reduced motion | Pass | Homepage was captured at `1440`, `1280`, `1024`, `768`, `430`, and `390`; Capabilities proof was reviewed at desktop and `390`; reduced-motion hero and draggable launcher tests passed. |

### Automated Validation

- `npx tsc --noEmit` passed after adding the official declarations for the existing Three.js intro dependency and correcting strict timeline/data guards.
- `npm run build` passed.
- `npm run test:chat` passed.
- All `18/18` Playwright tests passed in deterministic local Chromium groups. This covers public routes, desktop and mobile navigation, form validation, intro and WebGL fallback, service previews, campaign timing, Strategy reverse-scroll, testimonials, Blog filtering/SEO, HN Bot drag/reset, and back-to-top behaviour.

### Phase 2C Evidence

- `.qa/phase-2c/home-1440x900.png`
- `.qa/phase-2c/home-1280x800.png`
- `.qa/phase-2c/home-1024x768.png`
- `.qa/phase-2c/home-768x1024.png`
- `.qa/phase-2c/home-430x932.png`
- `.qa/phase-2c/home-390x844.png`
- `.qa/phase-2c/home-testimonials-1440.png`
- `.qa/phase-2c/capabilities-testimonials-1440.png`
- `.qa/phase-2c/capabilities-testimonials-390.png`
- `.qa/phase-2c/blog-1440.png`
- `.qa/phase-2c/home-footer-1440.png`

### Known Source Limitations

- The verified review screenshot files were not supplied in the repository. The source-image fields remain intentionally empty, so no review-image modal is rendered. The supplied reviewer names, ratings, businesses, service categories, and review wording are retained in structured data.
- The supplied logo was a raster conversation reference, not an original vector export. The project uses a lightweight SVG interpretation and favicon; replace those files with the approved source artwork for pixel-exact brand reproduction.
- The existing Sheets blog fetch is unavailable in this environment during static prerender. The established fallback path remains intact; `PUBLIC_SITE_URL` should be set in production so canonical URLs and feeds use the public domain.

## About, Footer, and Greeting Update Verification - 2026-07-19

**Environment:** Astro dev server, `http://127.0.0.1:3001`  
**Browsers:** agent-browser Chromium and Playwright Chromium

| Check | Result | Evidence |
| --- | --- | --- |
| Founder-led About page | Pass | `/about` exposes one clear founder narrative, Priyanka Jha's LinkedIn link, exactly three working principles, and one final CTA. |
| Footer directory | Pass | The final CTA remains left-aligned while complete grouped footer navigation occupies the right-side space; the lower row contains only the compact HerNexAI mark and Insightsnode credit. |
| Original logo treatment | Pass | The existing `/hernex-logo-light.svg` asset is used unchanged in the header and footer; CSS only reduces its displayed size. |
| Greeting sequence | Pass | The first-visit sequence contains English, Hindi, Bengali, Telugu, Tamil, Kannada, and Malayalam, each held for `0.8s`. |
| Skip control | Pass | A real-browser click on `Skip intro` hides the overlay, sets `data-intro-state="complete"`, and leaves the homepage heading available with no reported browser errors. |
| Responsive review | Pass | `/about` was inspected at `1440 x 900` and `390 x 844`; no clipping or horizontal overflow was found. |

### Evidence

- `.qa/about-footer-update/about-1440.png`
- `.qa/about-footer-update/about-390.png`

### Known Approval Dependencies

- No approved portrait of Priyanka Jha is stored in the repository. The page intentionally uses a clearly labelled initials placeholder.
- The founder statement is visibly labelled as approval required and should be replaced only with approved final copy.

## Footer and WhatsApp Action Refinement - 2026-07-19

| Check | Result | Evidence |
| --- | --- | --- |
| Raw WhatsApp URL handling | Pass | A mocked HN Bot reply containing `https://wa.me/919581444069` rendered no raw URL and exposed a `Chat on WhatsApp` button with the configured destination. |
| Footer CTA | Pass | The Connect group now uses a visible WhatsApp action button instead of a plain WhatsApp text link. |
| Homepage-to-footer transition | Pass | The homepage approach section now uses the warm editorial surface, making the navy final CTA/footer visually distinct. |
| Footer alignment | Pass | Navigation groups are top-aligned in the footer directory and the Insightsnode credit is centred in the lower row. |

### Validation

- `npx tsc --noEmit` passed.
- `npm run test:chat` passed.
- Focused Playwright HN Bot, WhatsApp, About/footer checks: `3/3` passed.
- `npm run build` passed with the existing Vite chunk-size advisory and non-fatal Sheets blog fallback warning.
