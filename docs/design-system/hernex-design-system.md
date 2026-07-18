# HernexAI Design System Plan

## Implementation Boundary

Phase 2 implements this system in `src/styles/global.css` with Tailwind v4's CSS-first `@theme` bridge and semantic CSS custom properties. Component classes consume tokens rather than component-specific raw color, radius, or timing values.

## Semantic Token Families

| Family | Planned tokens | Intent |
| --- | --- | --- |
| Brand | `--color-brand-navy`, `--color-brand-gold`, `--color-brand-gold-soft` | Identity and controlled emphasis |
| Background | `--color-bg-page`, `--color-bg-warm`, `--color-bg-navy`, `--color-bg-elevated` | Page and chapter rhythm |
| Surface | `--color-surface-base`, `--color-surface-raised`, `--color-surface-inverse` | Forms, menus, disclosures, selected states |
| Text | `--color-text-primary`, `--color-text-muted`, `--color-text-inverse`, `--color-text-link` | Readability before decoration |
| Feedback | `--color-focus`, `--color-error`, `--color-success` | Form, focus, and state communication |
| Border | `--color-border-subtle`, `--color-border-strong`, `--color-border-inverse` | Quiet structure |
| Layout | `--container-content`, `--gutter-*`, `--grid-columns-*` | Consistent containers and grids |
| Type | `--font-display`, `--font-utility`, `--text-*`, `--leading-*`, `--tracking-*` | Intentional hierarchy |
| Space | `--space-1` through `--space-16`, section gap tokens | Repeatable rhythm |
| Form | `--control-height`, `--control-radius`, `--focus-ring` | Accessible controls |
| Motion | `--duration-*`, `--ease-standard`, `--ease-emphasized`, `--ease-exit` | Shared timing vocabulary |
| Layer | `--z-base` through `--z-toast` | Predictable overlays |

## Implemented Values

```css
@theme {
  --color-brand-navy: #071b55;
  --color-brand-gold: #f5a623;
  --color-text-inverse: #ffffff;
  --color-text-inverse-muted: #c7d0e5;
  --color-focus: #f5a623;
  --radius-none: 0px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;
  --duration-base: 360ms;
  --duration-slow: 640ms;
}
```

The live token layer additionally defines `--paper`, `--warm`, `--ink`, `--ink-muted`, `--line`, `--line-inverse`, `--error`, `--success`, `--container`, `--section-space`, `--shadow-float`, `--shadow-panel`, and `--z-header` through `--z-chat`. `--font-display` and `--font-body` use a two-family system-font strategy because no approved webfont file was supplied; the display stack favours Avenir Next / Segoe UI Variable Display and the body stack favours Avenir Next / Segoe UI.

Gold is reserved for action, key emphasis, and active signal/output states. It is not used as body copy on light surfaces. Final custom-brand font assets remain a confirmation item.

## Layout And Breakpoints

| Breakpoint | Intent |
| --- | --- |
| Base to `639px` | One readable column, static/linear diagrams, no pinned story |
| `640px–767px` | Wide mobile / compact tablet; moderate grid variation |
| `768px–1023px` | Tablet: simplified hero engine, two-column content where useful |
| `1024px–1279px` | Desktop composition begins; controlled scroll narratives allowed |
| `1280px+` | Full editorial composition and optional hero enhancement |

Use 4/6/12 columns across mobile/tablet/desktop. Define a content container and section spacing tokens rather than repeatedly using one-off `px`, `gap`, and `max-w` values.

## Component Patterns

- **Buttons:** semantic anchor or button, 44px minimum target, one primary solid treatment, one secondary quiet treatment, explicit focus ring.
- **Cards:** reserved for a genuine unit of comparison or browsing. Homepage allows one conventional grid maximum.
- **Rail:** carries browseable work/insight only with visible controls, progress, focus support, touch behavior, and no forced autoplay.
- **Diagram/engine:** DOM/SVG first, decorative layers `aria-hidden`, data/meaning provided in adjacent text.
- **Forms:** labels never replaced by placeholders, errors announced, success only after endpoint response.

## Art-Directed Exceptions

One-off section grids, display-scale text, media crop treatments, and hero-engine geometry may use local CSS custom properties when they are documented in the component and do not become a second uncontrolled design system. Exceptions must retain responsive behavior, focus visibility, and reduced-motion fallbacks.
