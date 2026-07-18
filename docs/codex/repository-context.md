# HernexAI Repository Context

## Current Stack

- Astro `7.0.6` in server output mode with `@astrojs/node` `11.0.2` standalone adapter.
- Vite-integrated Tailwind CSS `4.1.11` through `@tailwindcss/vite`.
- TypeScript `5.7.2`, extending `astro/tsconfigs/strict`, with Node types.
- GSAP `3.15.0` and Lenis `1.3.25` are runtime dependencies.
- Playwright `1.61.1` and Node types are available as dev dependencies.
- Node engine requirement is `>=22.12.0`.

## Important Paths

- `astro.config.mjs`: server output, Node adapter, Tailwind Vite plugin.
- `src/pages/api/`: preserved server endpoints for chat, blog, contact, and login.
- `src/lib/`: auth, blog, chat intent, lead scoring, sheets, and prompt logic.
- `src/data/`: shared site and chatbot knowledge data.
- `scripts/chat-self-check.ts`: deterministic chat self-check command.
- `public/robots.txt`: remaining public asset.
- `docs/reference-analysis/`: reference-site analysis artifacts, including the Six2Eight report.
- `.agents/skills/`: project-scoped Codex skills. Do not use `.codex/skills` for project skills.

## Current Frontend State

- Public pages use `src/layouts/BaseLayout.astro`, `src/components/`, `src/styles/global.css`, and lifecycle-aware scripts under `src/scripts/`.
- The homepage keeps its existing kinetic hero, Strategy journey, service index, WhatsApp paths, contact form, and CSS HN Bot.
- Public Blog routes are `/insights` and `/insights/[slug]`; content is shaped in `src/data/blog.ts` and `src/lib/blog.ts` for eventual Sheets/Supabase-backed administration in Phase 2D.
- Verified testimonials live in `src/data/testimonials.ts`. Original Google review screenshots have not yet been added to `public/testimonials/source/`.

## Existing Conventions

- Use ESM TypeScript and Astro-native server endpoints.
- Keep static content server-rendered and add client JavaScript only for behavior that needs it.
- Preserve API routes and their data dependencies when rebuilding a frontend.
- Use Tailwind v4 through CSS-first tokens and the configured Vite plugin when a stylesheet is reintroduced.
- Use GSAP and Lenis only when the interaction earns their runtime cost.
- Keep design/reference artifacts in `docs/` and QA output out of production paths.

## Constraints and Risks

- The frontend is currently an incremental Astro implementation. Preserve approved routes, component boundaries, visual language, and client-side lifecycle setup rather than replacing them.
- `src/data/site.ts` is shared by backend modules and must not be deleted as if it were presentation-only.
- Existing API behavior, environment variables, Google Sheets integration, and auth behavior are preserved functionality.
- No verified brand asset inventory is currently present in `public/`; missing assets and facts must be marked rather than invented.
- There is no dedicated lint or typecheck script in `package.json`; use available build/tests and report missing checks honestly.
- Do not add Three.js, Spline, React, or other frontend runtime dependencies without a documented decision and performance review.

## Verification Commands

```bash
npm run test:chat
npm run build
```

Use a real browser for visual and interaction verification. If a route or frontend is absent, record that as a failure or limitation rather than treating a server response as a successful UI check.
