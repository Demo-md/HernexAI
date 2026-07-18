# Verified Testimonial Content

## Source And Integrity

- Source: client-supplied Google review wording in the Phase 2C brief.
- Rating and source are recorded exactly as supplied: `5`, `Google Review`.
- No reviewer title, location, date, profile image, client metric, or additional testimonial was added.
- Review screenshots were referenced in the brief but are not present in this repository. `sourceImage` remains undefined until the client supplies the original files.

## Records

| Reviewer | Business | Service type | Data key |
| --- | --- | --- | --- |
| Namdev Koyale | Design Elementz | Social Media Management | `namdev-koyale` |
| Sandip Patil | Not supplied | Website Design and Development | `sandip-patil` |
| Harish Dani | Hex Solutions | Digital Marketing | `harish-dani` |

The exact review text is stored in `src/data/testimonials.ts` so presentation components do not rewrite or embellish it.

## Source Screenshot Status

Expected paths, once client files are provided:

- `public/testimonials/source/namdev-koyale-google-review.jpg`
- `public/testimonials/source/sandip-patil-google-review.jpg`
- `public/testimonials/source/harish-dani-google-review.jpg`

Do not add placeholders or extracted reviewer avatars. When these files exist, add a focus-managed original-review modal before exposing a `View original review` control.
