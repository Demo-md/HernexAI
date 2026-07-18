# The First Signal Intro Plan

## Intent

Create a first-visit-only HernexAI greeting that lets eleven languages settle one after another before the gold signal hands the visitor to the existing human-led growth-system hero. The intro is decorative; the real heading remains server-rendered and available throughout.

## Ownership

- **GSAP:** intro labels, dot handoff, overlay exit, Three.js intensity, and release of the existing hero master timeline.
- **Motion for React:** the isolated greeting word only, using `AnimatePresence`, slice/mask/rise/compress variants, opacity, and transforms.
- **Three.js:** one lazy-loaded, low-contrast signal constellation behind the greeting. It has one points draw call and one line draw call, no lights, shadows, textures, post-processing, or pointer interaction.
- **Astro:** homepage-only overlay markup, server-rendered hero, isolated React island, and Astro page lifecycle cleanup.

## Desktop Timeline

| Label | Time | Event |
| --- | ---: | --- |
| `intro:start` | 0.00 | Navy overlay and dormant field appear. |
| `greetings:start` | 0.15 | English `HELLO` resolves through horizontal slices. |
| `greeting:hindi` | 0.85 | Hindi `नमस्ते` rises into alignment. |
| `greeting:bengali` | 1.55 | Bengali `নমস্কার` compresses and resolves. |
| `greeting:telugu` | 2.25 | Telugu `నమస్కారం` travels through a mask. |
| `greeting:tamil` | 2.95 | Tamil `வணக்கம்` resolves. |
| `greeting:kannada` | 3.65 | Kannada `ನಮಸ್ಕಾರ` rises into alignment. |
| `greeting:urdu` | 4.35 | Urdu `سلام` resolves right-to-left. |
| `greeting:punjabi` | 5.05 | Punjabi `ਸਤ ਸ੍ਰੀ ਅਕਾਲ` travels through a mask. |
| `greeting:haryanvi` | 5.75 | Haryanvi `राम राम` resolves. |
| `greeting:kashmiri` | 6.45 | Kashmiri `آداب` rises right-to-left. |
| `greeting:malayalam` | 7.15 | Malayalam `നമസ്കാരം` compresses into its final state. |
| `greeting:hold` | 7.49-8.99 | The settled Malayalam greeting remains uninterrupted for 1.5 seconds. |
| `signal:handoff` | 8.99 | Greeting exits; the gold dot centralises and the field converges. |
| `hero:prepare` | 9.33 | The overlay slides down and the intro renderer disposes. |
| `hero:start` | 9.41 | The existing GSAP hero timeline begins. |

The target is approximately 9.7 seconds before the hero is fully unobstructed. No part of the hero sequence begins while the overlay is opaque.

## Responsive And Fallback States

- **Desktop:** eleven greetings, 24 signal points, DPR capped at `1.5`.
- **Mobile below 768px:** the requested eleven-greeting order is preserved, with 14 signal points, DPR capped at `1`, smaller type, and no additional media.
- **Reduced motion:** no React sequence or WebGL field; a 250ms `Hello.` opacity transition releases the hero.
- **Returning sessions, internal navigation, history navigation:** skip the full intro through `sessionStorage`.
- **Failed React/WebGL/GSAP setup:** a 12-second hard timeout removes the overlay and releases the hero. An overlay is only visually active after its inline eligibility script runs, so JavaScript failure cannot create a blank screen.

## Performance And Accessibility

- Scope React/Motion to the homepage greeting island and load Three.js only for eligible first visits. The island exits without running motion when the session intro is skipped.
- Keep the intro canvas decorative and `aria-hidden`; do not announce changing greetings.
- Keep the overlay out of the tab order and use `pointer-events: none`; it never traps keyboard focus.
- Pause Three.js when the document is hidden, dispose all WebGL resources after handoff, and do not leave a second RAF loop running.
- Animate only transforms, opacity, and a small overlay clip/mask. The main hero text remains rendered without JavaScript.
