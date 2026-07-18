# Public Blog Architecture

## Routes

- `/insights`: public Blog listing with feature, search, category filters, row layout, and empty state.
- `/insights/[slug]`: public article template with breadcrumbs, optional table of contents, safe structured body, related articles, adjacent navigation, share control, and topic CTA.
- `/sitemap.xml`: only indexable public posts and public routes.
- `/rss.xml`: only indexable public posts.

## Data Flow

`src/data/blog.ts` defines temporary presentation fixtures. `src/lib/blog.ts` reads the existing Google Sheets blog contract when available, then local persisted data, then fixtures. It normalizes legacy fields so the current API remains compatible.

Phase 2D may replace the data source without changing public page components. Do not create the Phase 2D dashboard in this phase.

## Fixture Rule

The two temporary example articles have `isDevelopmentFixture: true` and `noindex: true`. Their cards and article headings visibly say `Development preview`; they are excluded from RSS and sitemap output. They are not client work, published editorial claims, or proof.
