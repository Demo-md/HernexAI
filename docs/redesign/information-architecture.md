# Information Architecture

## Decision

Build a concise marketing site around verified capability and contact conversion. The current project exposes API routes only, so this route map is proposed rather than a migration of existing public pages.

## Primary Navigation

`Home` / `Services` / `About` / `Capabilities` / `Contact`  
Primary CTA: `Book a Free Strategy Call`  
Secondary CTA: `View Our Work`

Use `Capabilities` as the navigation label until enough approved work evidence exists. Change it to `Work` only when case studies, client permission, and outcomes are confirmed.

## Proposed Route Map

| Route | Content responsibility |
| --- | --- |
| `/` | Positioning, AI Growth Engine explanation, selected capability, process, approved trust signals, contact conversion |
| `/services` | Overview of approved services and problem-led routes |
| `/services/[slug]` | One verified service: problem, approach, scope, FAQs, related service, CTA |
| `/about` | Mission, founder/team only with approval, values, collaboration approach |
| `/capabilities` | Honest demonstrations, approved work, process examples, and concept work only if explicitly labelled and authorised |
| `/insights` | Blog index backed by the existing API/data source |
| `/insights/[slug]` | Article page with author/date/status, related content, and a measured CTA |
| `/contact` | Existing contact endpoint, WhatsApp route, consent, error/success handling |
| `/privacy`, `/terms`, `/cookies` | Legal content supplied by HernexAI |
| `/404` | Clear recovery path to Services and Contact |

`/admin` is intentionally not added until the existing login/blog API contract is mapped to an approved admin UI. Do not expose an admin route by convention alone.

## Homepage Story

1. Header with clear routes and a single primary CTA.
2. Hero: human-led marketing promise, a 2D Kinetic Campaign Stream, and the Strategy journey handoff.
3. “From fragmented activity to a connected growth system” problem framing.
4. Capability sequence: strategy, creative expression, execution, and practical automation.
5. Services as a selective editorial index, not a generic tile wall.
6. Process: discover, position, build, launch, optimise, scale, subject to final service validation.
7. Capability/work evidence: only approved case studies or clearly labelled demonstrations.
8. About/human trust moment with approved founder/team content.
9. FAQ with semantic disclosure controls.
10. Contact conversion and footer route map.

## Linking, Trust, And Mobile

- Link home sections to specific service pages, relevant insights, and contact rather than duplicating all copy.
- Let each service page surface a relevant next service and one context-specific CTA.
- Keep blog and capability evidence connected by buyer question, not keyword stuffing.
- On mobile, use a real menu button and focus-managed dialog/drawer; retain the booking CTA but prevent it from crowding navigation.
- Use anchors only for short within-page jumps. Native focus and URL behavior must remain intact.

## Placeholder Policy

No invented case studies, logos, client lists, reviews, awards, certifications, team sizes, impact metrics, industry claims, or office details. Until proof is approved, use capability demonstrations, transparent process, and useful service explanation.
