# Blog Data Model

`src/data/blog.ts` exports `BlogPost` with these fields:

| Field | Purpose |
| --- | --- |
| `id`, `title`, `slug`, `excerpt`, `content` | Core article identity and safe structured source content |
| `coverImage`, `coverImageAlt`, `ogImage` | Accessible presentation and social image paths |
| `authorName`, `category`, `tags` | Display metadata only; author claims require verification |
| `status`, `featured`, `publishedAt`, `updatedAt`, `estimatedReadingTime` | Publication and listing behavior |
| `metaTitle`, `metaDescription`, `canonicalUrl`, `noindex` | SEO controls |

Allowed `status` values: `draft`, `scheduled`, `published`, `archived`.

Public visibility is limited to `published` posts and `scheduled` posts whose `publishedAt` has passed. `draft` and `archived` content never appears in public listing, article paths, sitemap, or RSS.

`src/lib/article-content.ts` parses a deliberately limited Markdown-like format without rendering unsanitised HTML. It supports headings, paragraphs, lists, links, images, quotes, code fences, simple tables, callouts, and dividers.
