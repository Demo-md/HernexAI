# Reference Analysis: six2eight

## Metadata

- URL: `https://six2eight.com/`
- Inspected on: 2026-07-17
- Browser/tool: `agent-browser` with Chromium, real browser session
- Framework/runtime signals: Next.js-rendered page, Lenis `1.3.15` smooth-scroll marker, Swiper-like sliders
- Viewports captured: `1440x900`, `1280x800`, `1024x800`, `768x1024`, `430x932`, `390x844`
- Screenshot evidence: `/private/tmp/six2eight-reference/`
  - `1440x900.png`, `1440x900-full.png`
  - `1280x800.png`, `1280x800-full.png`
  - `1024x800.png`, `1024x800-full.png`
  - `768x1024.png`, `768x1024-full.png`
  - `430x932.png`, `430x932-full.png`
  - `390x844.png`, `390x844-full.png`
  - `mobile-menu-open.png`, `mobile-faq-open-2.png`, `desktop-services-hover.png`, `our-services-route.png`
- Measured page length: approximately `18,327px` at `1440x900` and `16,523px` at `390x844`; exact length varies with responsive media and runtime state.
- Inspection limits: exact source implementation, design files, proprietary asset provenance, touch-device gesture feel, and a visually confirmed page-transition animation were not inspected. Automated pointer movement did not expose a visible cursor state. The report uses approximate timing where behavior was inferred from rendered animation metadata.

## Executive Summary

- **Observation:** six2eight presents a long-form digital product studio story through alternating near-black and white surfaces, oversized typography, vivid lime accents, editorial case-study imagery, proof metrics, process, FAQ, blog, and contact content.
- **Observation:** the homepage is not a short conversion landing page. It behaves as a guided portfolio narrative with repeated proof and multiple opportunities to enter a service, project, article, or contact route.
- **Observation:** the page combines static layout with a muted autoplay hero video, image-card transitions, horizontal sliders, smooth scrolling, sticky content, and long-duration decorative motion.
- **Inference:** the strongest design idea is the contrast between a restrained structural system and a few high-energy media moments. The page feels designed around rhythm and pacing more than around a dense component library.
- **Recommendation:** for HernexAI, adapt the pacing, contrast, proof sequencing, and art-directed media logic, while replacing the studio portfolio story with an original marketing-engine narrative in the existing navy-and-gold identity.

## Direct Observations

- The live desktop and mobile site was scrolled through its complete homepage at all required Phase 1 widths. The 1280px capture measured a `1280px` document width and approximately `18,120px` scroll height; the other viewport evidence and interaction notes are listed in this report.
- The rendered experience uses a fixed navigation treatment, oversized editorial type, dark/light chapter changes, media-led service/work sections, a desktop sticky FAQ relationship, sliders, muted autoplay media, and Lenis-marked smooth scrolling.
- Desktop exposes a broad navigation and CTA; mobile compresses it into a drawer. Text scale, media density, service presentation, process composition, and FAQ layout are intentionally simplified for narrow screens.
- This report records only rendered behavior. Exact source implementation, proprietary assets, exact route-transition timing, and a conclusively visible custom cursor could not be inspected.

## Brand Feeling

- **Observation:** the visual voice is confident, contemporary, editorial, and product-led. Black backgrounds and white type establish seriousness; acid lime supplies energy and action; occasional blue, cyan, violet, orange, and pastel imagery keeps the portfolio expressive.
- **Observation:** pill labels with a small bright dot create a repeated section-signpost language. Large type, rounded media corners, and sparse controls make the experience feel premium without being quiet.
- **Inference:** the brand feeling comes from controlled contrast and scale, not from the lime accent alone. The accent is most effective when reserved for action, status, or a small marker.
- **Recommendation:** preserve that contrast logic for HernexAI, but use gold as the high-value signal and navy as the structural field. Do not transplant the lime palette.

## Page Structure

1. **Hero and fixed navigation** — dark field, capsule header, large typographic promise, short supporting copy, green CTA, platform/tool signals, and changing media.
2. **Media interlude** — dark video/image section that gives the hero breathing room and creates an early visual hook.
3. **Services** — dark introduction followed by oversized rounded service cards with imagery and directional controls.
4. **Brand proof** — compact logo/brand strip on the dark surface.
5. **Portfolio** — white editorial section with large title, floating category chips, and an asymmetric image grid.
6. **Testimonials** — light background, horizontal review cards, arrows, rating proof, and a trust statement.
7. **Strategy and metrics** — dark section with centered proposition, metrics, and decorative moving graphics/tickers.
8. **Process** — dark numbered path with alternating content, images, connecting dotted route, and supporting copy.
9. **Founder/contact** — dark gray founder block with oversized meeting CTA, portrait, bio, social link, and circular consultation control.
10. **FAQ** — white split layout with visual cue, sticky left content on desktop, accordion content on the right.
11. **Blog** — white article preview rail with a section title and route CTA.
12. **Social and footer** — dark social links, contact form, grouped footer navigation, legal links, and a repeated closing brand block.

## Visual Hierarchy

- **Observation:** the largest visual weights are the hero heading, the portfolio heading, the strategy/process headings, and the meeting CTA. They act as chapter titles rather than isolated component headings.
- **Observation:** body copy is secondary and centered in the hero, while later sections often use a two-column relationship between a large statement and supporting detail.
- **Observation:** high-contrast CTA surfaces are easy to find: lime filled buttons for primary actions and outlined white/black buttons for secondary routes.
- **Observation:** image content carries equal or greater attention than copy in the services and portfolio sections. Rounded media frames make otherwise disparate project assets feel like one system.
- **Inference:** hierarchy is achieved through scale, surface changes, and media cropping before it is achieved through borders or card chrome.
- **Recommendation:** give HernexAI one dominant message per chapter, one primary action, and one memorable visual system. Avoid adding pills, paragraphs, and competing hero claims simply because the reference has many sections.

## Typography Observations

- **Observation:** the rendered font is an Inter variable family with a system fallback. Visible hero title metrics measured approximately `84px / 95px`, weight `700` on desktop and `36px / 41px`, weight `700` on mobile.
- **Observation:** visible section headings measured approximately `72px / 82px`, weight `600` on desktop and `32px / 36px` on mobile. Supporting body copy is commonly around `20px / 33px` on desktop hero content and `16px / 24px` on mobile.
- **Observation:** the hero title uses word-level spans, with an italic treatment on the opening design phrase. The result is emphatic but still legible because most of the title remains upright and bold.
- **Observation:** headings use tight negative tracking at large sizes; body text has more relaxed line spacing and medium-gray contrast on dark surfaces.
- **Inference:** the type system is deliberately compressed at the top of the hierarchy and generous in body rhythm. The apparent simplicity depends on a careful scale jump from body copy to chapter headings.
- **Recommendation:** create HernexAI type tokens with a display face, a readable body face, and a small mono/utility layer only where it reinforces the AI-engine concept. Use one selective italic or variable-weight contrast rather than styling every word.

## Colour and Contrast Observations

- **Observation:** the dominant dark surface is approximately `#111111`, with a slightly lighter dark founder surface. White and near-white text create strong primary contrast.
- **Observation:** the primary action accent is a bright yellow-green, used for filled buttons, small section dots, the circular consultation CTA, and status-like elements. The portfolio introduces colored category chips and image-specific colors.
- **Observation:** white sections use black typography and very light gray backgrounds in the testimonial region. Borders are subtle and mostly used for accordion rows, controls, and dividers.
- **Inference:** accent color functions as a semantic signal, not as a background theme. The design becomes calmer when accent elements are sparse.
- **Recommendation:** use HernexAI navy as the dominant field, gold for action/status/AI output, and a small number of supporting colors for channel tokens. Verify contrast for muted copy, icon-only controls, and any gold-on-navy combination.

## Layout System

- **Observation:** desktop content generally uses a centered max-width container with broad horizontal gutters. The fixed header is a compact rounded capsule rather than a full-width opaque bar.
- **Observation:** the services section shifts from an introductory two-column layout into an oversized horizontal card rail. Portfolio uses asymmetric columns and varied vertical image heights rather than a uniform card grid.
- **Observation:** the testimonial cards form an intentional horizontal overflow system with visible next-card peeking and explicit arrow controls. The blog preview uses a similar rail language.
- **Observation:** chapter spacing is large; dark-to-light surface changes often coincide with a new content mode. Section labels create small local anchors within those spaces.
- **Observation:** FAQ left content is sticky around the desktop middle of the viewport; the right accordion grows beside it. This creates a reading anchor while questions progress.
- **Inference:** the grid alternates between editorial composition and controlled horizontal overflow. It is not one universal grid applied to every section.
- **Recommendation:** define HernexAI layout modes explicitly: hero split, engine canvas/DOM pairing, proof rail, process timeline, and FAQ split. Avoid fragile absolute positioning for primary text and actions.

## Section-by-Section Analysis

### Hero and Navigation

- **Observation:** a dark hero begins with a centered fixed capsule header. Desktop exposes logo, four primary navigation links, and a white rounded CTA. Mobile replaces the links with a hamburger and a secondary speech-style icon.
- **Observation:** the hero title is centered, extremely large, and partly overlaps a rotating/stacked product-media card. A centered paragraph follows, then a lime portfolio CTA and a row of platform marks.
- **Observation:** the lower hero media is rounded and changes over time. The page exposes a muted/unmute control over the media. The mobile version gives the media less vertical height and lets the header, title, CTA, and media fit into a compact opening sequence.
- **Observation:** the desktop header is fixed at the top and remains visually separate from the dark field through its rounded outline. The mobile drawer is a white panel approximately `300px` wide over a darkened/blurred page.
- **Inference:** the hero sells capability through three layers: a broad promise, a compact proof/action row, and an active media surface. It does not depend on a large service list in the opening viewport.
- **Recommendation:** HernexAI should use a similarly layered opening, but the visual engine must explain AI marketing flow and use original bot/core/token assets. Keep the DOM headline and CTA readable before any heavy scene loads.

### Media Interlude

- **Observation:** a dark media section follows the opening hero and provides a large visual pause before the service story. On mobile it is shorter and more tightly cropped.
- **Observation:** the media is rounded and frequently changes content, creating a living showcase rather than a single static hero image.
- **Inference:** this interlude is a pacing device: it lets the visitor feel the studio's visual quality before asking them to understand the service architecture.
- **Recommendation:** use a lightweight marketing-engine fallback or short visual sequence for HernexAI, with a pause/visibility policy and reduced-motion alternative.

### Services

- **Observation:** a dark section label introduces a large left-aligned statement and a right-aligned explanatory paragraph/action. The cards below are large, image-forward, rounded, and arranged as a horizontal field on desktop.
- **Observation:** cards use circular white arrow controls over the image and large white service names near the bottom edge. Mobile simplifies the rail into a vertically readable sequence with fewer simultaneous cards.
- **Inference:** the card is treated as a visual chapter, not a compact information tile. The image establishes desire; the label provides orientation.
- **Recommendation:** for HernexAI, represent the marketing-engine stages as a small number of visual chapters, each with one outcome and one interaction. Do not reproduce the same horizontal card dimensions or arrow placement.

### Brand Proof

- **Observation:** client/technology marks are arranged on the dark field as a compact proof strip. The strip uses many small logos and restrained spacing rather than a dominant title.
- **Inference:** this is a low-friction credibility handoff between capability and portfolio.
- **Recommendation:** use a small, accessible proof row for HernexAI only if real partner/client evidence is available; do not substitute decorative platform icons for proof.

### Portfolio

- **Observation:** the page changes to white and places a large black title in an open field. Colored category chips float above and around the heading with slight rotations. The work grid is asymmetric, image-led, and highly varied in crop and aspect ratio.
- **Observation:** cards pair project imagery with compact category metadata and short descriptions. The grid creates discovery through visual difference rather than through heavy card borders.
- **Observation:** no strong portfolio-card hover transformation was visible in the automated pass; this is `Not inspected` beyond a pointer hover screenshot because the cards may rely on subtle CSS or state not exposed by the captured timing.
- **Inference:** the portfolio is the visual centerpiece and uses white space to make project imagery feel collectible.
- **Recommendation:** HernexAI can use a case-study rail or campaign-output gallery, but should create its own composition, motion, and metadata vocabulary rather than copying floating chips or masonry geometry.

### Testimonials

- **Observation:** a pale surface introduces a centered chapter title, then horizontally arranged testimonial cards with rounded white surfaces, small client marks, rating badges, and generous internal padding.
- **Observation:** previous/next circular controls sit beside a thin progress rule. A compact rating proof block follows the rail.
- **Inference:** the slider makes social proof feel browseable while the rule and rating block communicate controlled completeness.
- **Recommendation:** a HernexAI testimonial rail should prioritize readable quotes, keyboard controls, and a visible progress state. Avoid auto-advancing if users need to read.

### Strategy and Metrics

- **Observation:** a dark chapter follows the light testimonial surface. The title is centered and oversized, with metrics and decorative graphic treatment deeper in the section.
- **Observation:** runtime inspection found a repeating small pulse around `1500ms` and long circular-motion animations around `32000ms`. The exact visual trigger and easing were not reconstructed.
- **Inference:** the section turns abstract positioning into evidence by pairing one large idea with a set of concrete numeric signals.
- **Recommendation:** make HernexAI's equivalent metrics directly support the marketing-engine story: signal quality, campaign iteration, or performance outcomes. Keep ambient motion slow and subordinate.

### Process

- **Observation:** the process section stays dark and uses a large centered heading, a supporting paragraph, oversized step numbers, alternating content blocks, image inserts, and a dotted connecting path.
- **Observation:** desktop alternates left/right content to create a journey across the width. Mobile stacks the steps, reduces the path complexity, and keeps each step self-contained.
- **Observation:** a runtime animation named generically as a drop effect was active with an approximate `800ms` duration during the inspection. Trigger timing was not deterministically isolated.
- **Inference:** the path turns a potentially dry service process into a visual route. Number scale provides orientation even when the content blocks move.
- **Recommendation:** HernexAI can use a signal-to-campaign-to-output sequence, but its visual connector should be an original data-flow motif and should remain understandable without motion.

### Founder and Contact

- **Observation:** a darker-gray block uses a giant meeting-related typographic treatment, a founder portrait, a short bio, a social link, and a large lime circular consultation CTA.
- **Inference:** the section humanizes a technology/design service and gives the visitor a high-confidence conversion moment after proof and process.
- **Recommendation:** HernexAI should place its human trust signal after the engine story, but use a rectangular or editorial CTA treatment aligned with its own identity rather than the circular lime control.

### FAQ

- **Observation:** the white FAQ section is split on desktop: a question-shaped visual and supporting statement on the left, accordion rows on the right. The left content is sticky around `20%` from the top according to rendered styles.
- **Observation:** accordion questions are clickable headings and expand inline. The automated pass successfully exposed an answer after clicking the first question.
- **Inference:** the sticky visual maintains orientation while the question list grows. The accordion protects vertical space and lets visitors choose depth.
- **Recommendation:** use semantic buttons with `aria-expanded` and `aria-controls` for HernexAI's FAQ. Keep the left message non-sticky or lightly sticky on small screens.

### Blog

- **Observation:** the blog section returns to white, uses a large editorial heading with a route CTA, and displays a horizontal article rail with dark image cards and short summaries.
- **Observation:** the rail can show adjacent cards, making the section feel like a continuation of portfolio browsing rather than a dense archive.
- **Inference:** editorial content is framed as a continuation of the studio's expertise, not as a separate product.
- **Recommendation:** HernexAI can connect insights to its marketing-engine stages, but should use its own content hierarchy and avoid the reference's article-card imagery language.

### Social and Footer

- **Observation:** the closing dark area contains large social heading and separated social rows with platform labels/icons. A contact form includes name, service selection, budget options, email, additional information, and a submit action, followed by grouped footer navigation and legal links.
- **Observation:** the footer is substantial, with a repeated closing brand block that brings the visual language back to the beginning.
- **Inference:** the footer functions as a final conversion surface and a full sitemap, not just a legal footer.
- **Recommendation:** preserve a clear contact path and grouped route navigation in HernexAI, but keep form fields minimal and align them to existing integrations.

## Animation Inventory

| Classification | Target and observed behavior | Timing estimate | Trigger/relationship | Confidence |
|---|---|---:|---|---|
| `entrance` | Hero title words and supporting hero block appear through staged transitions; rendered word spans are present. | About `1.1s` transition observed on split text; stagger not isolated. | Initial load / hero initialization. | Medium |
| `microinteraction` | Hero media cards change with a crossfade/transform transition. | About `1.0s` transition. | Timed media rotation; not directly scroll-bound. | High |
| `entrance` | Image/media wrappers use class/state transitions as content enters. | About `0.8s` drop-like animation observed in one section. | Section visibility or carousel state; exact trigger not isolated. | Medium |
| `scroll-triggered` | Process, strategy, and portfolio content changes state as sections enter the viewport. | Approximate; not enough evidence for exact duration. | Scroll position / intersection state. | Medium |
| `scrubbed` | The page has smooth scrolling and motion elements that respond continuously during long scroll travel. | Continuous. | Lenis smooth-scroll runtime; exact scrub links not isolated. | Medium |
| `pinned` | FAQ left column is sticky at desktop; header is fixed. | Persistent within containing section / page. | Viewport position. | High |
| `parallax` | Decorative circular-motion imagery and process visuals move slowly relative to content. | About `32s` for repeating circular motion. | Ambient loop; scroll coupling not confirmed. | Medium |
| `typography` | Oversized section headings and hero word spans animate/reveal as chapters enter. | About `1.1s` on split text. | Initial or section entry. | Medium |
| `microinteraction` | Accent dot pulses at section label/status locations. | About `1.5s`, repeating. | Idle loop. | High |
| `microinteraction` | Founder/illustration treatment has a swing-like repeating loop. | About `3s`, repeating. | Idle loop. | High |
| `microinteraction` | Testimonial/blog sliders transition between slides. | About `0.5s` to `3.2s` transitions were observed. | Arrow/slider state and timed content changes. | Medium |
| `page transition` | Same-site route `/our-services` loaded with a Next.js page state and a hidden loading container after completion. | Loading duration not captured. | Internal navigation. | Low |
| `masking` | Cropped media, rounded overflow, and text/image overlap create reveal-like framing. | CSS-driven; exact animation not isolated. | Media state and layout. | Medium |

The exact easing curves were not inspected. The visual character is mostly smooth, low-bounce, and editorial; any implementation should validate easing from the HernexAI story rather than copying timing values.

## Interaction Inventory

- **Navigation:** desktop links route to services, work, about, and blog; a fixed CTA routes to contact. Mobile uses a hamburger-triggered white drawer with close control, primary links, and a full-width CTA.
- **Menu:** the mobile menu was opened and screenshot-captured. The toggle exposed `aria-expanded=true`. Explicit close worked. Pressing Escape did not visibly close the menu in the automated pass, so Escape behavior is a limitation/risk rather than a confirmed feature.
- **Hero media:** a muted autoplay loop is present with an accessible unmute button. Video is configured with autoplay, muted, loop, controls disabled, and `preload="auto"`.
- **Services:** large image cards expose arrow controls and route to service pages. Desktop behaves like a horizontal card field; mobile reduces the simultaneous content density.
- **Portfolio:** cards are links to project pages. Pointer hover was exercised, but no strong computed transform/filter/opacity change was observed in the captured state.
- **Testimonials:** previous/next circular controls and a visible progress rule expose a horizontal review slider.
- **FAQ:** clicking a question expands the answer inline. The answer was present after interaction, though no `aria-expanded=true` element was observed in the automated DOM check.
- **Contact form:** name, service selector, budget radio-like labels, email, additional information, and submit controls are exposed in the accessibility tree. Form submission was not performed.
- **Cursor:** a large fixed green cursor-following element exists in the DOM but was opacity `0` and pointer-events `none` during pointer movement. A visible cursor state was not confirmed.
- **Keyboard:** skip link and semantic landmarks are present. A visible blue focus outline was observed on the active control. Full keyboard traversal and focus restoration were not exhaustively tested.

## Mobile Adaptation

- **Observation:** at `390px`, the hero title drops from approximately `84px` desktop to `36px`, with body copy at `16px / 24px`. Chapter headings measured around `32px / 36px` and step/stat headings around `24px`.
- **Observation:** the desktop capsule navigation becomes a compact capsule with hamburger, centered logo, and chat/speech affordance. The drawer is a fixed white panel with a dark blurred backdrop and simplified links.
- **Observation:** hero media is shorter and more tightly cropped. The service section becomes a longer vertically readable sequence. Process content stacks and reduces zig-zag complexity. The FAQ changes from a split/sticky layout into a stacked flow.
- **Observation:** horizontal testimonial/blog patterns remain conceptually present but are constrained to the viewport; adjacent content and controls must be tested carefully on touch.
- **Observation:** measured document width matched the viewport at `390px`, with no horizontal overflow detected in the basic `body.scrollWidth` check.
- **Inference:** mobile is an intentional editorial compression, not a simple scale transform. It prioritizes title, CTA, media, and one readable content column.
- **Recommendation:** HernexAI mobile should use a deliberately simplified engine visual, reduce particle/token count, preserve the story order, and keep the pet/chat affordance away from primary copy and form controls.

## Accessibility Observations

- **Observation:** the page exposes one main landmark, multiple navigation landmarks, a skip link, semantic headings, named buttons, named form controls, and an accessible unmute control.
- **Observation:** focus styling was visible as a blue browser outline on a focused control. Mobile menu toggle state was exposed through `aria-expanded`.
- **Observation:** two images lacked alternative text in the measured DOM inventory. Many other images had descriptive alt text, including product/media descriptions.
- **Observation:** FAQ answers opened visually, but the automated inspection did not find an `aria-expanded=true` state after opening. This may indicate a semantic implementation gap or a state representation not exposed to the tool.
- **Observation:** reduced-motion emulation matched the media query, but eight animations were still present and the document retained smooth scrolling. A complete reduced-motion reduction was not confirmed.
- **Recommendation:** HernexAI should use real buttons for disclosures, explicit `aria-expanded`/`aria-controls`, reliable Escape and focus restoration for drawers, meaningful alt text for informative visuals, decorative image hiding, and a real reduced-motion branch that disables non-essential loops and smooth scrolling.
- **Not inspected:** contrast ratios were not calculated programmatically, screen-reader output was not tested with VoiceOver/NVDA, and touch target dimensions were not exhaustively measured.

## Performance Observations

- **Observation:** the homepage contained approximately `207` image elements and one video. Hero images loaded through a remote image optimization path; many images were rendered as part of the long portfolio and content story.
- **Observation:** the hero video was autoplaying, muted, looping, and `preload="auto"`, which can increase first-load bandwidth and mobile cost.
- **Observation:** measured browser metrics for the homepage were approximately `TTFB 349ms`, `FCP 532ms`, `LCP 1284ms`, and `CLS 0` in the inspection environment. These are a single run, not a production benchmark.
- **Observation:** third-party analytics scripts were present, including Google Tag Manager/Google Analytics and Ahrefs analytics. Their network and CPU impact were not profiled separately.
- **Observation:** long-duration animations and sliders continue to exist as runtime animations. Offscreen pausing was not confirmed.
- **Inference:** the strongest risk is the combined cost of large image count, autoplay media, remote optimization, sliders, and ambient animation rather than any single effect.
- **Recommendation:** HernexAI should lazy-load below-fold media, use responsive image sources and modern formats, cap DPR and particle counts, pause the engine when offscreen or the tab is hidden, dynamically load heavy 3D code, reserve media dimensions to protect CLS, and avoid two continuous render loops.

## Transferable Principles

1. **Use chapter rhythm:** alternate visual surfaces and content modes so a long page feels paced rather than repetitive.
2. **Make one idea dominant per section:** pair a large statement with one proof or action instead of competing blocks.
3. **Treat media as narrative evidence:** show the product/service outcome through carefully selected visuals, not decorative floating images.
4. **Keep the accent semantic:** use one high-energy color for action, status, and wayfinding; let the structural palette do most of the work.
5. **Build proof into the journey:** move from promise to service capability to work, testimonials, process, and contact.
6. **Use controlled overflow intentionally:** rails can communicate abundance, but they need visible progress, keyboard controls, and touch-safe behavior.
7. **Let mobile simplify the story:** preserve the sequence and hierarchy while reducing simultaneous media, motion, and layout complexity.
8. **Humanize technical work late in the story:** a founder/trust moment is strongest after the visitor understands the capability and process.

## Unsuitable Patterns For HernexAI

- A portfolio-studio information architecture that depends on an extensive public work library, because approved HernexAI case-study evidence is not currently available.
- A near-black page as the default visual field, since the HernexAI direction needs navy, light editorial, and warm-neutral pacing.
- A large autoplay hero video or numerous image rails as a prerequisite for the first meaningful paint.
- Ambient motion, smooth scrolling, sliders, or custom cursor behavior that continue without a full reduced-motion and focus-safe fallback.
- Large, highly rounded service cards as the dominant layout pattern; HernexAI must not become card-heavy.

## Patterns That Must Not Be Copied

- The exact black/lime palette, capsule header geometry, logo treatment, or CTA styling.
- The exact hero sentence, service labels, portfolio labels, article titles, testimonials, or other copy.
- The rotating product-card composition, eye/video treatment, platform-mark row, floating category-chip arrangement, or masonry coordinates.
- Any six2eight or client project assets, portraits, illustrations, icons, videos, or remote media URLs.
- The exact alternating process path, dotted connector geometry, circular consultation button, slider layout, or section ordering.
- Proprietary source code, CSS class structure, runtime code, exact animation sequence, or reverse-engineered implementation details.

## Original HernexAI Interpretation

- **Audience:** founders, coaches, service businesses, and growing brands that need a clearer path from attention to qualified growth.
- **Brand feeling:** intelligent, assured, warm, and operational. The interface should feel like a calm command center rather than a portfolio gallery.
- **Visual direction:** use a deep HernexAI navy as the structural field, warm gold as the action/output signal, soft off-white for reading surfaces, and restrained channel colors only inside social/data tokens.
- **Information hierarchy:** start with the marketing problem and a single sharp headline; reveal the engine as a visual explanation; then move through signal intake, AI processing, campaign output, proof, process, FAQ, and contact.
- **Original interaction model:** pointer response should make the HN Bot and social/data signals feel attentive; token selection can change a compact explanation panel; scroll should advance the story without trapping the user or hiding required content.
- **Responsive behavior:** desktop can show orbit depth and output cards; tablet should reduce token count and overlap; mobile should show a static or lightweight engine diagram with one clear flow and a persistent but non-blocking chat affordance.
- **Accessibility direction:** every animated state needs a readable DOM equivalent, a reduced-motion alternative, keyboard-operable controls, focus management, and a WebGL-disabled fallback.

## Implementation Recommendations

### Astro

- Keep the headline, CTA links, structured content, and fallback media in server-rendered Astro HTML so they appear before any interactive scene bundle.
- Use a small client island for token selection, pointer response, and engine state. Load heavier 3D code only after the hero is visible and the device supports it.
- Keep the marketing story in semantic sections with one `h1`, ordered chapter headings, real links, and a non-canvas fallback. Preserve existing routes, forms, analytics, and API boundaries.
- Reserve image/video dimensions and use responsive sources. Add `loading="lazy"` below the fold and keep hero media eager only when it is genuinely the LCP candidate.

### Tailwind

- Convert the observed principles into project tokens rather than copying six2eight values: `navy`, `gold`, `surface`, `muted`, container widths, section gaps, display scale, and mobile simplification breakpoints.
- Use grid and flex layouts for primary copy/actions. Reserve absolute positioning for decorative orbit lines, tokens, and art-directed media that have a DOM fallback.
- Create separate desktop/tablet/mobile composition utilities for the engine. Do not scale a desktop WebGL scene down unchanged.
- Include visible focus styles, `motion-reduce` variants, safe-area padding, and overflow checks as part of the component classes.

### GSAP

- Use one scoped context per interactive island and clean all timelines, ScrollTriggers, observers, and pointer listeners on teardown.
- Use `gsap.matchMedia()` for desktop/tablet/mobile and `prefers-reduced-motion`. Prefer transforms and opacity; avoid scroll-linked layout writes.
- Use ScrollTrigger for chapter entrances and a restrained engine handoff. Reserve scrub/pin for the one or two moments that explain the marketing flow; do not animate every card.
- Keep the headline reveal readable if JavaScript fails. Provide an immediate static state and ensure reverse scroll resets predictably.

### Lenis

- Add Lenis only if it improves the HernexAI story and remains compatible with native keyboard, anchor, focus, and touch scrolling.
- Stop or reduce smooth scrolling for `prefers-reduced-motion`, when the tab is hidden, and when an overlay/chat panel requires predictable focus behavior.
- If combined with GSAP, drive one shared RAF and clean it on island teardown. Test anchor links, reverse scroll, mobile momentum, nested overflow, and ScrollTrigger refresh behavior.

## Quality Gate

- Report created at `docs/reference-analysis/six2eight.md`.
- Required viewport screenshots captured at `1440`, `1280`, `1024`, `768`, `430`, and `390` widths.
- Full page scrolled and section inventory recorded through footer.
- Desktop and mobile navigation, menu, FAQ, form controls, hover, pointer, focus, loading, route, reduced-motion, and performance checks attempted.
- Observations, inferences, recommendations, and limitations are separated.
- Original HernexAI direction and non-copy constraints are explicit.
- No HernexAI application files were modified during the analysis.

## 2026-07-19 Hero Media Revalidation

### Evidence And Limits

- **Observation:** the supplied local recording shows the Six2Eight opening state with a single compact, rounded media object overlapping an oversized headline. It is slightly rotated and treated as a changing focal object rather than as a grid of cards.
- **Observation:** the 2026-07-17 real-browser capture above remains the complete desktop/mobile evidence set, including all required viewports, page sections, navigation, hover, and responsive observations.
- **Limitation:** a fresh isolated `agent-browser` session stalled during Chrome launch on 2026-07-19, so no new browser evidence was claimed. The existing captured browser evidence and the supplied recording were used for this focused visual interpretation.

### Focused Observation

- **Observation:** the strength of the reference hero is not a copied route or exact media geometry. It is the hierarchy: one readable central statement, one visual object at a time, a small persistent rotation, and a measured content change.
- **Recommendation:** the HernexAI equivalent should keep every campaign device inside one fixed right-of-centre presentation slot, rotate through original concepts on a predictable cadence, and avoid full-screen flights, card piles, or repeated overlap with CTAs.
- **Original HernexAI interpretation:** five navy-and-gold campaign devices use a common handset-like frame and concept-only marketing, AI, and technology imagery. Each holds the same stage for three seconds, enters with a small 14px/18px directional correction, settles at a controlled 3.5-5.5 degree tilt, then leaves in a short handoff. This adopts the editorial principle without reusing the reference composition, assets, text, source code, or timing.
