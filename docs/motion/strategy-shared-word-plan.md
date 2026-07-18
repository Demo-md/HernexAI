# Strategy Shared-Word Motion Plan

## Static State

- The server-rendered hero heading remains readable as `Human strategy. Creative direction. AI-enabled execution.`
- The next section independently contains the complete accessible statement: `Strategy turns activity into demand.`
- Enhancement-only visual spans are hidden from assistive technology. Without JavaScript or with reduced motion, both statements remain fully visible in their own sections.

## Timeline And States

| State | Trigger | Motion | Interruption and reset |
| --- | --- | --- | --- |
| Hero entrance | Existing hero master timeline | The individual hero letters converge once and the first gold sweep resolves. | The repeating loop does not start until this completes. |
| `HERO_IDLE` | Hero is visible, page is active | One GSAP repeat timeline moves the eight letters by at most 8px and 2deg for about 0.55s, then rests until the 2.5s cycle repeats. | Pause offscreen or while the page is hidden. |
| `TRANSFER_START` | Positioning section reaches the viewport | Pause and settle the loop, crossfade source to one traveller clone. | Reversible ScrollTrigger returns the source on upward scroll. |
| `TRANSFER_ACTIVE` | ScrollTrigger scrub | The traveller uses cached document-space source/target geometry, `translate3d`, scale, and small desktop-only per-letter offsets. | No DOM node moves per frame and no geometry is read per frame. |
| `DESTINATION_LOCK` | Final 8% of scroll progress | Traveller hides, destination word appears, then the two remaining headline lines, lead, and note reveal. | Reverse progress hides the target and restores the traveller/source. |
| Reduced motion | `prefers-reduced-motion` | No loop, clone, scrub, or letter separation. | Both source and destination content remain visible independently. |

## Performance And Lifecycle

- Use one loop timeline and one ScrollTrigger timeline, both scoped to the existing GSAP context.
- Cache source and destination geometry only during initialization, ScrollTrigger refreshes, and ResizeObserver callbacks.
- Animate only opacity and transforms. The traveller is one temporary, `aria-hidden` DOM clone and is removed on Astro teardown.
- Pause the loop when hidden/offscreen; destroy observers, timelines, traveller, Lenis integration, and ScrollTriggers during Astro page transitions.
- Desktop uses small individual offsets; tablet reduces them; narrow mobile uses one vertical word movement without letter scatter or pinning.
