# Frontend Redesign Architecture

## Architectural Position

Rebuild as Astro-first pages with server-rendered content. Use minimal progressive enhancement and do not introduce React by default. The existing API endpoints and data modules remain the server/business layer. Static page content, headings, CTA links, fallbacks, and semantic forms must exist without JavaScript.

## Proposed Structure

```text
src/
  layouts/BaseLayout.astro
  pages/
    index.astro
    services/index.astro
    services/[slug].astro
    about.astro
    capabilities.astro
    insights/index.astro
    insights/[slug].astro
    contact.astro
    api/                         # preserve existing endpoints
  components/
    site/Header.astro
    site/Footer.astro
    hero/HeroKineticMedia.astro
    home/CapabilitySequence.astro
    home/ServiceIndex.astro
    home/ProcessRail.astro
    content/FaqList.astro
    contact/ContactForm.astro
    chat/ChatLauncher.astro
  scripts/
    motion/site-motion.ts
    ui/menu.ts
    ui/contact-form.ts
    ui/chat.ts
  styles/global.css
  data/                          # retain, then separate approved public content
```

This is a proposed file map, not Phase 1 file creation. Components should be composed by purpose, not assembled into a single interactive homepage component.

## Content And Form Architecture

- Keep content in typed data modules or content collections, with `approvalStatus`/source metadata for claims that need review.
- Use Astro pages to render approved services and insights; reuse existing blog functions rather than duplicating persistence logic.
- Contact form enhancement posts to `/api/contact`, keeps native labels/validation, announces endpoint errors, and only displays success after `{ ok: true }`.
- Chatbot enhancement posts to `/api/chat`; it must preserve progressive capture, visible fallback, consent flow, keyboard dialog behavior, and WhatsApp handoff from the returned API state.
- Do not build a public admin interface until auth/session/error states and storage behavior receive a separate decision.

## Motion, Lenis, And Astro Lifecycle

1. DOM-first motion modules initialise on `astro:page-load` (or a documented view-transition lifecycle when adopted).
2. Each module owns one `gsap.context`, a local cleanup function, and any observer/listener it creates.
3. Before a route swap, kill relevant ScrollTriggers/timelines and remove listeners; re-initialise only for the incoming page.
4. Do not run Lenis until the base native experience is complete. If adopted, use one shared RAF, update ScrollTrigger through its documented integration, and stop for reduced motion, tab-hidden, modal/dialog states, and narrow-screen fallback.
5. Provide a no-JS and reduced-motion final state for every narrative scene.

## Responsive And Performance Strategy

- Design three intentional modes: mobile linear, tablet simplified composition, desktop editorial/interactive.
- Keep visual-engine geometry DOM/SVG first and dynamically import only genuinely heavy enhancements.
- Use responsive image sources, explicit dimensions, lazy-loading below the fold, predictable font loading, and no unapproved third-party scripts.
- Follow the existing performance budgets: LCP under 2.5s target, zero unexpected CLS, and under 200ms INP target for primary interactions.

## SEO And Testing Strategy

- Implement one H1 per page, a shared metadata API, canonical URLs, Open Graph assets, meaningful titles/descriptions, semantic landmarks, `robots.txt`, sitemap, and JSON-LD only for verified entities/content.
- Add Playwright/browser checks for all public routes, header/menu, contact submission states, chat states, keyboard navigation, reduced motion, console/page errors, route changes, and horizontal overflow.
- Capture 1440, 1280, 1024, 768, 430, and 390px visual baselines. Build and browser checks are required after implementation, not merely during this documentation phase.
