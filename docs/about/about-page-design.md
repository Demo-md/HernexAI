# About Page Design

## Direction

The page is founder-led, warm, and concise. Deep navy frames the opening and closing CTA, warm white supports the founder story, and a navy three-principle sequence gives the philosophy clear rhythm. The page uses editorial grids, fine rules, and typography instead of a values-card grid.

## Responsive Behaviour

- Desktop: opening copy and founder placeholder share a measured split; philosophy uses three ruled columns.
- Tablet: the footer directory moves beneath the CTA while the founder opening retains its hierarchy.
- Mobile: the portrait placeholder follows the opening copy, principles become one vertical sequence, and footer links become a readable two-column directory.

## Motion

The About opening uses one GSAP timeline: eyebrow, two headline lines, portrait mask, founder name, and supporting copy. Existing one-time reveal motion handles later sections. Reduced-motion users receive the completed layout without transform or mask travel.

## Footer And Greeting

- The footer's upper area contains all public navigation and contact paths; the lower bar contains only the smaller supplied logo asset and the Insightsnode mark.
- The first-visit greeting sequence uses English, Hindi, Bengali, Telugu, Tamil, Kannada, and Malayalam at an `0.8s` cadence. The Skip Intro button immediately releases the homepage and remains keyboard accessible.
