# Hero Kinetic Media Assets

The five hero images are external stock photography used only as clearly labelled capability concepts. They do not represent client work, campaign outcomes, or HernexAI product screens. Their final commercial use requires client approval against the image provider terms.

| Identifier | Source and ownership | Purpose | Sequence and layer | Mobile behavior | Optimisation |
| --- | --- | --- | --- | --- | --- |
| `unsplash:brand-system` | External Unsplash stock image in `HeroKineticMedia.astro`; approval required | Brand-system concept | Device 1; fixed hero slot, `-5.5deg` rest tilt | Same slot below the mobile copy | Responsive CDN URL; first image is eager |
| `unsplash:campaign-creative` | External Unsplash stock image; approval required | Campaign creative concept | Device 2; fixed hero slot, `4.5deg` rest tilt | Same slot below the mobile copy | Responsive CDN URL; lazy after the first device |
| `unsplash:search-visibility` | External Unsplash stock image; approval required | Search/technology concept | Device 3; fixed hero slot, `-3.5deg` rest tilt | Same slot below the mobile copy | Responsive CDN URL; lazy |
| `unsplash:mobile-journey` | External Unsplash stock image; approval required | Mobile/technology concept | Device 4; fixed hero slot, `5.5deg` rest tilt | Same slot below the mobile copy | Responsive CDN URL; lazy |
| `unsplash:ai-workflow` | External Unsplash stock image; approval required | AI-enabled workflow concept | Device 5; fixed hero slot, `-4.5deg` rest tilt | Same slot below the mobile copy | Responsive CDN URL; lazy |
| `inline:campaign-static` | Original semantic DOM; HernexAI concept | Static reduced-motion and no-JavaScript context | The same fixed slot before enhancement and under reduced motion | Centred below hero copy | CSS/HTML only; no request |

All frames are marked `Concept visual` where a caption is displayed. Replace them only with approved, owned assets and update this inventory with source, permission, crop, and optimisation status.
