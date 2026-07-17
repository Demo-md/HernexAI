---
name: gsap-timeline
description: Plan and implement coordinated GSAP timelines for Astro hero entrances, navigation reveals, split-text and mask effects, section transitions, and reversible interactions.
---

# GSAP Timeline

Use for coordinated GSAP choreography, not isolated animation snippets. Read `docs/codex/motion-principles.md`, `references/timeline-patterns.md`, and `gsap-performance` before implementation.

## Procedure

1. Write a timeline plan first: states, labels, dependencies, triggers, durations, easing character, interruption behavior, reset behavior, and reduced-motion state.
2. Keep semantic text and controls readable without animation. If using split lines/words, preserve an accessible source or `aria-label` and avoid duplicate screen-reader output.
3. Use scoped timelines for hero entrance, navigation, SVG/mask reveals, section handoffs, and reversible hover/focus states. Label major beats so the sequence can be tuned.
4. Use ScrollTrigger only for narrative scroll relationships. Avoid scroll-jacking and never hide required content until a trigger fires.
5. Scope and clean timelines, ScrollTriggers, observers, and listeners on component teardown and Astro route transitions.
6. Provide a static or low-motion alternative under `prefers-reduced-motion`; keep keyboard and focus behavior independent of visual timing.

## Handoff

Document the planned sequence before coding, then verify initial, mid-transition, final, reverse-scroll, resize, route-change, and reduced-motion states in a real browser.
