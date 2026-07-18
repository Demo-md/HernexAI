# Public Blog SEO

## Implemented

- Per-page title and meta description
- Canonical URL when `PUBLIC_SITE_URL` is configured
- Open Graph and Twitter metadata
- Article and breadcrumb JSON-LD for indexable article pages
- Published and updated metadata for articles
- `noindex, nofollow` for development fixtures and private content
- XML sitemap and RSS feed excluding `noindex` posts
- Descriptive image alt text and readable URLs

## Integrity Boundaries

- No review schema, client-count claim, author credential, organization credential, or performance statistic is invented.
- The article JSON-LD deliberately omits person/organization author claims until verified metadata exists.
- Set `PUBLIC_SITE_URL` in the deployment environment to produce canonical and absolute social URLs.
