# Astro Architecture Patterns

- **Page:** owns route-level composition and metadata.
- **Layout:** owns shared document structure, navigation, global styles, and persistent semantics.
- **Component:** owns a bounded visual/content responsibility.
- **Island:** owns only browser behavior that cannot be server-rendered; choose the smallest client directive.
- **Endpoint:** owns server-side API behavior and should not import browser-only modules.
- **Data:** owns verified content and domain data, not visual state.
- **Script:** initializes behavior idempotently and exposes teardown for route changes.

Prefer Astro components for static content. Use React only for an existing or deliberately isolated interactive island with a documented cost. Keep server data and frontend state separate.
