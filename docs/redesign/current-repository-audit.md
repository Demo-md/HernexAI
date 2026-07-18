# Current Repository Audit

**Audit date:** 2026-07-17  
**Scope:** Phase 1 documentation only. No production frontend was changed.

## Executive Finding

This checkout is an Astro server/API shell, not a currently rendered public website. The previous public pages, layouts, components, styles, motion modules, images, logos, and fonts are absent. A successful build therefore validates the server/API layer, not a visual redesign. Rebuild the public experience deliberately around the preserved API and data contracts.

## Stack And Configuration

| Area | Current implementation |
| --- | --- |
| Framework | Astro `7.0.6`, server output |
| Server adapter | `@astrojs/node` `11.0.2`, standalone mode |
| Language | TypeScript, strict Astro configuration |
| Styling foundation | Tailwind CSS v4 through `@tailwindcss/vite` |
| Motion dependencies | GSAP `3.15.0`, Lenis `1.3.25`; neither has active source usage |
| Test tooling | Playwright `1.61.1`; no test suite/config yet |
| Runtime | Node `>=22.12.0` |
| Deployment implication | Persistent Node host is required when file-based blog storage is used |

`astro.config.mjs` has server output and the Node adapter. `tsconfig.json` extends `astro/tsconfigs/strict`. There is no Tailwind stylesheet, theme, global CSS, or component layer in the current source tree.

## Current Structure

| Path | Responsibility |
| --- | --- |
| `src/pages/api/blog.ts` | Authenticated blog CRUD endpoint |
| `src/pages/api/chat.ts` | Chat, intent handling, lead/support capture, Groq fallback |
| `src/pages/api/contact.ts` | Contact-enquiry validation and Sheets handoff |
| `src/pages/api/login.ts` | Admin-session cookie creation |
| `src/lib/` | Auth, blog persistence, chat intents, lead scoring, Sheets, prompt logic |
| `src/data/site.ts` | Contact details, services, FAQs, process, provisional proof points and blog seed |
| `src/data/hernex-knowledge.ts` | Approved chatbot knowledge assembled from shared site data |
| `data/blogs.json` | Local blog persistence fallback |
| `docs/google-sheets-webhook.gs` | Google Apps Script receiver for leads, tickets, conversations, and blogs |
| `scripts/chat-self-check.ts` | Deterministic checks for intent/lead parsing |
| `public/robots.txt` | Only intentional public asset; `public/.DS_Store` is accidental metadata |

No `src/pages` public routes, `src/layouts`, `src/components`, `src/styles`, `src/scripts`, logo assets, mascot assets, image assets, or font files exist. `README.md` and `DESIGN.md` describe an earlier frontend that is not present; they are historical input, not an executable source of truth.

## Routes And Business Functionality To Preserve

| Endpoint | Behaviour that must not break |
| --- | --- |
| `POST /api/chat` | Validates a short message/history, detects intent, uses Groq when configured, falls back to local answers, scores lead intent, supports progressive lead/support capture, returns WhatsApp-ready state |
| `POST /api/contact` | Requires name, email, and message; sends a lead payload to Google Sheets when configured; returns a safe failure path when unavailable |
| `GET/POST/PUT/DELETE /api/blog` | Lists posts and requires a valid session for mutations |
| `POST /api/login` | Validates environment-provided admin credentials and issues an HTTP-only session cookie |

The chat and contact APIs rely on `GOOGLE_SHEETS_WEBHOOK_URL`; chat optionally relies on `GROQ_API_KEY` and `GROQ_MODEL`; auth relies on `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`. Do not expose these values to browser code. Blog persistence uses `data/blogs.json` unless the Sheets webhook is available, so stateless/serverless deployment needs a different persistence decision before production.

## Existing Content And Brand Inputs

- The repository describes marketing, branding, website, SEO, automation, funnel, analytics, and growth-technology offerings.
- The chatbot knowledge describes a women-led agency founded by Priyanka Jha and audiences including founders, coaches, small businesses, women-driven ventures, and modern brands.
- `site.ts` contains outcome-style proof points and broad technology-service claims. They are repository content, not independently substantiated website proof; confirm them before public publication.
- The only confirmed current public asset is `robots.txt`. No approved logo, imagery, photography, illustration, case-study, favicon, social-preview, or font asset inventory is available.
- `DESIGN.md` specifies a warm off-white, blue/lavender/peach/lime system and historical components. This conflicts with the Phase 1 navy-and-gold direction and must be treated as legacy until HernexAI confirms it.

## Present UX, Visual, Motion, Responsive, And SEO State

There is no delivered public page to inspect. Consequently there is no active navigation, footer, visual system, responsive layout, GSAP code, ScrollTrigger code, Lenis setup, analytics, client-side form UI, chatbot UI, metadata, canonical URL, sitemap, or social preview implementation to retain. `robots.txt` is the only SEO artifact. The absence of UI means accessibility and visual QA cannot be passed yet; it is not evidence of quality.

## Retain, Refactor, Replace

| Decision | Items | Rationale |
| --- | --- | --- |
| Retain | Astro server setup, TypeScript strictness, API routes, `src/lib`, data contracts, environment-variable boundary, Sheets webhook, chat self-check | Existing business operations and integrations |
| Refactor later | `site.ts` into verified/public vs internal content, blog presentation data, contact validation messages, deployment persistence strategy | Avoid publishing unapproved claims and keep content maintainable |
| Replace/build | All public routes, layout, navigation, footer, design tokens, styling, motion modules, forms UI, chatbot UI, SEO metadata, images/assets, QA tests | These layers are absent |

## Accessibility And Performance Risks

- No frontend exists to provide semantic landmarks, keyboard routes, focus states, reduced-motion handling, form error announcement, or skip navigation.
- A future visual rebuild could accidentally hydrate static content or introduce expensive motion because GSAP and Lenis are installed but currently unused.
- The chat endpoint may call an external LLM; the fallback response must remain fast and visible while external configuration is unavailable.
- File-backed blog writes require a writable persistent disk. A static or serverless deployment can lose content.
- `src/lib/auth.ts` has a development fallback session secret. Production must set a strong `ADMIN_SESSION_SECRET` before the admin UI is exposed.
- Dependency declarations and installed `node_modules` showed version drift during inspection. `npm install` is required before final validation.

## Redesign Constraints

1. Keep Astro as the rendering architecture and use Astro components for static content.
2. Introduce an isolated island only where interaction cannot be achieved with progressive enhancement.
3. Render headline, CTA, content, form controls, and a static hero explanation in HTML before any enhancement.
4. Preserve API payload expectations and never put secrets or chat prompts in public bundles.
5. Treat case studies, client logos, results, testimonials, awards, certifications, and quantitative proof as unavailable until confirmed.
6. Validate browser UX only after public routes exist; build success alone is insufficient.
