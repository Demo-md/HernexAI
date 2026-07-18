# HN Bot Implementation

## Selected Technology

HN Bot is implemented as an original, lightweight **CSS 2.5D character** inside a semantic launcher button. It does not use Three.js, Spline, WebGL, React, a model file, textures, or a canvas.

This is the responsible Phase 2 choice because the repository contains no authorised HN Bot illustration, GLB/GLTF model, Spline scene, texture, animation, or ownership record. The user requested a 3D-quality companion, and the brief explicitly permits a professionally animated 2.5D fallback when a final approved 3D model is unavailable. The DOM-based character gives the chat experience depth, pointer response, and expressive states without adding a GPU runtime to the initial route.

## Asset Ownership

- **Visual asset source:** Original HTML/CSS geometry created in this repository.
- **Ownership status:** Project-created interface asset; no third-party model, image, texture, scene, or code was reused.
- **External robot reference:** No robot image was available in the supplied Phase 2 attachment directory. No external robot was copied.
- **Replacement requirement:** An approved original GLB/GLTF or Spline asset, usage rights, texture licensing, and visual sign-off are required before a real WebGL renderer is considered.

## Visual And Interaction Strategy

- Navy screen/body details, gold accent body and signal, pale head, and low-cost CSS depth create the HernexAI relationship.
- The bot appears at the bottom-right, listens to a precise pointer through bounded CSS rotations, enters an idle float only when motion is allowed, and performs one session-scoped greeting.
- The canvas is never the control: the entire character sits inside the `Open HN Bot chat` button, with keyboard focus and a visible label on desktop hover/focus.
- The chat panel and bot are one system: opening sets `chat-open`, sending sets `typing`, API completion sets `success`, and invalid/error states are visible in the panel.

## Loading, Mobile, And Fallbacks

| Condition | Behaviour |
| --- | --- |
| Initial route | Static bot markup renders with the homepage; no loader or blank area |
| First visit | Short CSS entering/greeting sequence, then idle; session storage avoids replay |
| Returning visit | Stable idle state |
| Mobile / low capability | Same static 2.5D markup, smaller scale, no pointer tracking, reduced idle density |
| Reduced motion | Stable resting bot, no floating/wave/pointer response, immediate panel state |
| WebGL unavailable | No impact: the selected production implementation does not require WebGL |
| Future model load failure | Keep the existing CSS bot as the permanent static fallback; never replace it with a blank canvas |
| Chat API unavailable | Keep panel usable and announce the failure/retry path; WhatsApp remains separately available in the page contact area |

## WebGL Replacement Gate

Do not replace this implementation merely to display a 3D model. A future WebGL island must be lazy-loaded after core hero content, use one runtime only, provide this CSS bot as fallback, cap DPR, avoid realtime shadows/post-processing, pause offscreen and hidden-tab work, dispose all renderer resources, and report bundle/GPU measurements against `docs/codex/performance-budgets.md`.

## Performance Profile

- No model polygons, draw calls, textures, materials, lights, shadows, post-processing, WebGL context, or renderer memory.
- No autonomous JavaScript render loop. Pointer updates are requestAnimationFrame-throttled and only enabled for precise hover pointers.
- Footer awareness uses one `IntersectionObserver`; it is disconnected during Astro lifecycle cleanup.
- CSS animation is limited to a small floating transform/signal after the bot reaches idle, and disabled by `prefers-reduced-motion`.

## Remaining Asset Requirement

The current bot is production-usable as a 2.5D implementation. An authorised original 3D model remains optional future work, not a Phase 2 blocker.
