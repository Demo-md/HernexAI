# Hero Phase 1 Motion Plan

## Direction

The hero follows `read -> understand -> watch -> explore`. Typography is the first event, the HN Flow system is a quiet second event, and generic concept media appears only after the headline and CTAs are understood.

## Master Timeline

| Label | Target | Timing | Behaviour |
| --- | --- | --- | --- |
| `navigation` | Header | `0.00s` | Short settle. |
| `eyebrow` | Human-led growth systems | `0.15s` | Quiet opacity and upward reveal. |
| `human` | Human | `0.25s` | Masked line reveal. |
| `strategy` | Eight letter spans | `0.30s` | Each letter converges from a controlled 20-45px offset and +/-4-7 degree rotation. |
| `strategyLock` | Complete word | `0.96s` | Tighten tracking slightly, settle, and draw a restrained gold sweep. |
| `creative` | Creative direction | `1.05s` | Masked line reveal. |
| `execution` | AI-enabled execution | `1.25s` | Masked line reveal. |
| `supporting` | Supporting copy and CTAs | `1.30-1.42s` | Short opacity/transform entrance. |
| `system` | HN Flow core and paths | `1.55s` | Increase a previously faint system to its final contrast, then draw selective paths and labels. |
| `mediaOne` | Back concept plate | `1.80s` | Editorial plate crosses behind headline then exits. |
| `mediaTwo` | Front concept plate | `3.55s` | Briefly crosses part of `strategy` after readability is established, then exits. |

Desktop scroll adds a short non-pinned handoff for the remaining concept plates. Narrow screens do not run the media choreography or pin the hero.

## Accessibility And Performance

- The H1 has one screen-reader string; visible strategy letters are `aria-hidden`.
- Reduced motion renders the finished headline, system, CTAs, and one static concept plate immediately.
- All motion uses opacity, transforms, SVG stroke values, and a single existing GSAP/Lenis ticker lifecycle.
- Media is inline SVG/CSS concept material with no raster fetch, no fake client work, no preload cost, and no second RAF loop.
