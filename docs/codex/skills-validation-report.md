# Codex Skills Validation Report

Validated on 2026-07-17 in `/Users/sayantansen/Desktop/HernexAI`.

## Summary

- Project scope: `.agents/skills/<skill-name>/`
- `.codex/skills` was not used for the requested project skills.
- Official `quick_validate.py` result: all 15 requested skills passed.
- Frontmatter check: every requested `SKILL.md` contains only `name` and `description` in YAML frontmatter.
- Metadata check: every requested skill has `agents/openai.yaml` with `display_name`, `short_description`, and a `$skill-name` `default_prompt`.
- Placeholder scan: no `TODO`, scaffold placeholder, or template section remains in the requested skills.
- Application source: not modified.
- Repository self-check: `npm run test:chat` passed.
- Production build: `npm run build` passed.

## Skills

| Skill | Status | Resources | Expected trigger | Limitations/dependencies |
|---|---|---|---|---|
| `design-reference-analyzer` | Pass | `references/reference-analysis-template.md` | Reference URL, screenshot, recording, Figma reference, or similar-site request | Requires a real browser for evidence; existing frontend is currently absent. |
| `agent-browser-verify` | Pass | `references/browser-verification-checklist.md` | Browser verification of routes and interactions | Requires `agent-browser` CLI and a running route. |
| `premium-frontend` | Pass | None | Bespoke public-facing frontend work | Must be paired with architecture, brand, accessibility, and QA skills as relevant. |
| `anti-generic-ui` | Pass | `references/anti-pattern-catalogue.md`, `references/composition-alternatives.md` | Generic/card-heavy UI risk or visual review | Heuristic; requires a concrete design to critique. |
| `gsap-timeline` | Pass | `references/timeline-patterns.md` | Coordinated GSAP choreography | Requires existing GSAP/runtime surface. |
| `gsap-performance` | Pass | `references/gsap-performance-checklist.md` | GSAP, ScrollTrigger, or Lenis performance work | Measurements require a browser and production build. |
| `motion-accessibility` | Pass | `references/reduced-motion-patterns.md` | Any motion, scroll, cursor, video, 3D, menu, or transition work | Reduced-motion behavior cannot be proven without an implemented frontend. |
| `frontend-design-critic` | Pass | None | First-pass design critique | Review-only unless the user requests fixes; current frontend is absent. |
| `visual-regression-qa` | Pass | `references/viewport-matrix.md`, `scripts/capture-responsive-screenshots.ts` | Responsive screenshot capture/comparison | Script captures the current route; comparison requires a baseline. |
| `playwright-interactive` | Pass | None | Repeatable browser interaction tests | Requires implemented routes and installed/browser-capable Playwright. |
| `astro-architecture` | Pass | `references/astro-architecture-patterns.md` | Astro pages, layouts, islands, endpoints, or scripts | Current checkout has API routes but no public pages/layouts/components. |
| `astro-view-transitions` | Pass | `references/astro-transition-lifecycle.md` | Astro route-transition work | Requires public routes to verify lifecycle behavior. |
| `tailwind-v4-design-system` | Pass | `references/design-token-schema.md` | Tailwind v4 tokens, utilities, responsive styles | Tailwind is installed; current frontend stylesheet is absent. |
| `spline-threejs-integration` | Pass | `references/3d-decision-framework.md` | Explicit or justified Spline/Three.js request | Optional 3D runtime is not installed and was intentionally not added. |
| `hernex-brand-guardian` | Pass | `references/hernex-brand-rules.md`, `references/content-integrity-checklist.md` | Public design, copy, asset, proof, or CTA work | Brand asset inventory is incomplete; missing facts must remain marked. |

## Script Validation

`visual-regression-qa/scripts/capture-responsive-screenshots.ts` was executed with Node's built-in TypeScript stripping against a temporary Astro production server. It successfully captured `1440`, `1280`, `1024`, `768`, `430`, and `390` viewport screenshots plus full-page variants under `/private/tmp/hernex-skill-qa/`.

The current project has no public homepage route because the frontend was intentionally removed earlier. Therefore the script run validates browser launch, viewport iteration, font/network wait handling, screenshot output, and cleanup, but does not constitute visual QA of a finished HernexAI page.

## External Tools

- `agent-browser` CLI: required by the reference analyzer and browser verification when available.
- Chromium/real browser: required for screenshots, interaction, accessibility, and runtime motion checks.
- Playwright: installed as `@playwright/test`; required for repeatable interaction and screenshot automation.
- Astro/Tailwind/GSAP/Lenis: existing repository dependencies used by the architecture and frontend skills.
- Spline/Three.js: optional and not installed; the 3D skill requires a decision gate before adding either.

## Generated File Inventory

### Shared project documents

- `AGENTS.md`
- `docs/codex/repository-context.md`
- `docs/codex/design-principles.md`
- `docs/codex/motion-principles.md`
- `docs/codex/accessibility-requirements.md`
- `docs/codex/performance-budgets.md`
- `docs/codex/browser-qa-matrix.md`
- `docs/codex/brand-foundation.md`
- `docs/codex/skill-activation-order.md`
- `docs/codex/skills-validation-report.md`

### Project skills

Each directory below contains `SKILL.md` and `agents/openai.yaml`.

- `.agents/skills/design-reference-analyzer/`
- `.agents/skills/agent-browser-verify/`
- `.agents/skills/premium-frontend/`
- `.agents/skills/anti-generic-ui/`
- `.agents/skills/gsap-timeline/`
- `.agents/skills/gsap-performance/`
- `.agents/skills/motion-accessibility/`
- `.agents/skills/frontend-design-critic/`
- `.agents/skills/visual-regression-qa/`
- `.agents/skills/playwright-interactive/`
- `.agents/skills/astro-architecture/`
- `.agents/skills/astro-view-transitions/`
- `.agents/skills/tailwind-v4-design-system/`
- `.agents/skills/spline-threejs-integration/`
- `.agents/skills/hernex-brand-guardian/`

Additional skill resources are linked from the corresponding `SKILL.md` files and are intentionally kept one directory level below each skill.

### Exact skill files

```text
.agents/skills/design-reference-analyzer/SKILL.md
.agents/skills/design-reference-analyzer/agents/openai.yaml
.agents/skills/design-reference-analyzer/references/reference-analysis-template.md
.agents/skills/agent-browser-verify/SKILL.md
.agents/skills/agent-browser-verify/agents/openai.yaml
.agents/skills/agent-browser-verify/references/browser-verification-checklist.md
.agents/skills/premium-frontend/SKILL.md
.agents/skills/premium-frontend/agents/openai.yaml
.agents/skills/anti-generic-ui/SKILL.md
.agents/skills/anti-generic-ui/agents/openai.yaml
.agents/skills/anti-generic-ui/references/anti-pattern-catalogue.md
.agents/skills/anti-generic-ui/references/composition-alternatives.md
.agents/skills/gsap-timeline/SKILL.md
.agents/skills/gsap-timeline/agents/openai.yaml
.agents/skills/gsap-timeline/references/timeline-patterns.md
.agents/skills/gsap-performance/SKILL.md
.agents/skills/gsap-performance/agents/openai.yaml
.agents/skills/gsap-performance/references/gsap-performance-checklist.md
.agents/skills/motion-accessibility/SKILL.md
.agents/skills/motion-accessibility/agents/openai.yaml
.agents/skills/motion-accessibility/references/reduced-motion-patterns.md
.agents/skills/frontend-design-critic/SKILL.md
.agents/skills/frontend-design-critic/agents/openai.yaml
.agents/skills/visual-regression-qa/SKILL.md
.agents/skills/visual-regression-qa/agents/openai.yaml
.agents/skills/visual-regression-qa/references/viewport-matrix.md
.agents/skills/visual-regression-qa/scripts/capture-responsive-screenshots.ts
.agents/skills/playwright-interactive/SKILL.md
.agents/skills/playwright-interactive/agents/openai.yaml
.agents/skills/astro-architecture/SKILL.md
.agents/skills/astro-architecture/agents/openai.yaml
.agents/skills/astro-architecture/references/astro-architecture-patterns.md
.agents/skills/astro-view-transitions/SKILL.md
.agents/skills/astro-view-transitions/agents/openai.yaml
.agents/skills/astro-view-transitions/references/astro-transition-lifecycle.md
.agents/skills/tailwind-v4-design-system/SKILL.md
.agents/skills/tailwind-v4-design-system/agents/openai.yaml
.agents/skills/tailwind-v4-design-system/references/design-token-schema.md
.agents/skills/spline-threejs-integration/SKILL.md
.agents/skills/spline-threejs-integration/agents/openai.yaml
.agents/skills/spline-threejs-integration/references/3d-decision-framework.md
.agents/skills/hernex-brand-guardian/SKILL.md
.agents/skills/hernex-brand-guardian/agents/openai.yaml
.agents/skills/hernex-brand-guardian/references/hernex-brand-rules.md
.agents/skills/hernex-brand-guardian/references/content-integrity-checklist.md
```
