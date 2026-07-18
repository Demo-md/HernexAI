# Hero 2D Kinetic Media

## Intent

The Kinetic Campaign Stream makes the headline the primary reading event. One same-shaped campaign device appears only after the copy and CTAs are understandable. It remains in one fixed presentation slot, with a restrained tilt and a three-second content rotation instead of crossing the entire hero.

## Timeline

| Label | Time | Behaviour |
| --- | --- | --- |
| `eyebrow` | 0.15s | Eyebrow rises into place. |
| `human` | 0.25s | Human reveals. |
| `strategy` | 0.30-0.85s | Eight letters converge, then receive one gold sweep. |
| `creative` / `execution` | 0.95s / 1.15s | Remaining headline lines reveal. |
| `supporting` / actions | 1.30-1.42s | Supporting copy and CTAs enter. |
| campaign stream | 1.65s onward | One GSAP timeline rotates five fixed-slot campaign devices. Each device has a `0.42s` arrival, a full `3s` settled state, and a `0.42s` departure; the five-card loop repeats every `19.2s`. |

The presentation slot sits to the right of the centred copy on desktop and below it on mobile. No frame crosses the CTA group. Every asset uses the same handset-like rounded frame; only the editorial image and capability label change. During the short Strategy loop, stream opacity lowers temporarily but its timeline does not freeze.

## Responsive and Reduced Motion

- Desktop, tablet, and mobile render all five beats with one dominant object at a time.
- Mobile anchors the device below the copy, reduces its width and movement distance, and keeps it away from the headline and CTA controls.
- Reduced motion and no-JavaScript states render the complete copy plus one static concept frame. There is no loop, rotation, scrub, or travel.

## Lifecycle

`site-motion.ts` owns the master entrance and the one media timeline. The stream pauses while the hero is offscreen, when the document is hidden, and before the first Strategy travel. Astro teardown kills the timeline, observer, and listener through the motion context.
