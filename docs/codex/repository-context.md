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

The public frontend pages, layouts, components, styles, and motion scripts are currently absent from this checkout. The project is therefore an Astro server/API shell rather than a complete public website. Do not assume a homepage, `src/layouts`, `src/components`, `src/styles`, or `src/scripts` file exists; inspect before changing anything.

## Existing Conventions

- Use ESM TypeScript and Astro-native server endpoints.
- Keep static content server-rendered and add client JavaScript only for behavior that needs it.
- Preserve API routes and their data dependencies when rebuilding a frontend.
- Use Tailwind v4 through CSS-first tokens and the configured Vite plugin when a stylesheet is reintroduced.
- Use GSAP and Lenis only when the interaction earns their runtime cost.
- Keep design/reference artifacts in `docs/` and QA output out of production paths.

## Constraints and Risks

- The last cleanup intentionally removed the visual frontend, so any implementation task starts from architecture discovery rather than incremental component editing.
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
