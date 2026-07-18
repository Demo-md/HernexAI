# Homepage Motion Map

All timings are design targets to validate in-browser, not promises to copy from a reference. All scenes must use `prefers-reduced-motion`, retain final visible content without JavaScript, and clean GSAP/observer/listener state on teardown.

| Section | Narrative purpose | Trigger and duration | Desktop / tablet / mobile | Reduced-motion fallback | Cleanup and risk |
| --- | --- | --- | --- | --- | --- |
| Header | Establish orientation, then acknowledge scroll | Initial 240ms fade; small state change after scroll | Desktop/tablet light transform; mobile no entrance dependency | Static header | One scroll observer; avoid per-frame layout reads |
| Hero type | Make the promise legible before the visual engine | Initial 180–760ms line emphasis, `ease-emphasized` | Same content order; mobile shortens sequence | Fully visible text | GSAP context; never split text in a way that harms reading order |
| AI Growth Engine | Explain connected inputs and outputs | Initial 420–1,900ms timeline; optional 0–8% desktop exit scrub | Full desktop; 4 nodes tablet; linear static mobile | Complete diagram | Pause offscreen/tab-hidden; no WebGL/continuous RAF |
| Problem framing | Shift from fragmented activity to a coherent system | Viewport entry 420ms | Editorial reveal; no pin | Static | Intersection-based; low risk |
| Capability sequence | Show the human-to-AI operating order | Desktop scroll activation, 480ms each; no mandatory scrub | Desktop may use a short sticky visual; tablet normal flow; mobile stacked | All steps visible | Kill ScrollTriggers; no pin below 1024px |
| Service index | Help self-selection without decorative motion | Entry 360ms, individual controls on hover/focus | Light image/copy response; no auto-carousel | Static | Respect keyboard focus, do not animate large lists |
| Process | Make engagement feel understandable | Desktop line progress on scroll, 560ms step activation | Desktop optional sticky rail; tablet no pin; mobile numbered list | Completed line/list | Refresh after fonts/media; prevent scroll trap |
| Work/capability evidence | Let approved proof receive attention | Image mask/fade 480ms on intersection | One image at a time on small screens | Static media | Lazy-load images, reserve dimensions |
| About/human moment | Add trust after capability | Text/media entry 400ms | Same hierarchy, no parallax on mobile | Static | Avoid animating portrait or personal imagery unnecessarily |
| FAQ | Reveal information on user control | 180ms disclosure transition | Same interaction all sizes | Instant disclosure | Native button semantics, `aria-expanded`, no ScrollTrigger |
| Contact / footer | Make the final next step calm and clear | CTA focus/hover 160ms; footer entry 360ms | Same; no mobile pin | Static | Form response is endpoint-driven; no false success state |

## Lifecycle Rules

1. Initialise GSAP only after the relevant DOM and fonts are ready.
2. Use `gsap.context()` per island/component and `gsap.matchMedia()` for breakpoint/reduced-motion variants.
3. Use one optional Lenis RAF integration only if it improves the finished UX; native scroll remains the fallback.
4. Call `ScrollTrigger.refresh()` after meaningful layout/font/media changes and kill triggers before Astro route replacement.
5. Avoid global anonymous listeners, duplicate RAF loops, hidden content, scroll-jacking, and autonomous animation while an overlay is open.
