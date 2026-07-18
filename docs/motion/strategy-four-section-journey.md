# Strategy Four-Section Journey

## Destinations

1. Hero: `Human strategy.`
2. Problem: `Strategy turns activity into demand.`
3. Connected system: `Strategy gives every signal one direction.`
4. Services: `Strategy starts at the pressure point blocking growth.`
5. Capability: `Strategy makes your value easier to choose—and harder to ignore.`

## Controller

One controller in `src/scripts/motion/site-motion.ts` owns `HERO_IDLE`, transition, locked, reverse, and reduced-motion states. It uses one decorative `data-strategy-traveller`, cached source/target geometry, and four scrubbed ScrollTriggers. Geometry is refreshed only at setup, font settlement, resize, or ScrollTrigger refresh, never on every scroll frame.

At each destination the traveller settles, the target word appears, then the rest of the heading and supporting content reveal. Reverse scrolling returns the same traveller to its previous source. The hero loop pauses before travel and resumes only after returning fully to the hero.

## Accessibility

Every heading remains independently server-rendered and readable without enhancement. The traveller is `aria-hidden`. Reduced-motion mode disables the traveller, loop, and scrubbed motion; each heading is visible in its own section.
