# HerNexAI Design System

## 1. Brand Positioning
HerNexAI is a women-led marketing and branding partner for founders, coaches, small businesses, and women-driven ventures. The brand feels clear, capable, warm, modern, and commercially grounded. Technology supports delivery; it is not the brand story.

## 2. Visual Direction
- Warm off-white canvas with blue, lavender, peach, and lime atmospheric glows.
- Near-black typography, editorial spacing, compact labels, and restrained glass surfaces.
- Premium motion supports hierarchy and discovery; it never delays access to content.
- Original agency expression inspired by modern digital studios, never copied from a competitor.

## 3. Color Tokens
- `ink`: `#11152a`
- `smoke`: `#f8f7f2`
- `paper`: `#fffefa`
- `muted`: `#626473`
- `line`: `#e5e3dc`
- `blue`: `#345cff`
- `blue-deep`: `#1738c8`
- `lavender`: `#b9a7ff`
- `peach`: `#ffb49e`
- `lime`: `#dfff72`

## 4. Typography Scale
- Display: `clamp(3.2rem, 7.4vw, 7.4rem)`, tight tracking, balanced wrapping.
- Section heading: `clamp(2.6rem, 5vw, 5rem)`.
- Card heading: `1.6rem–2rem`.
- Body: `1rem–1.2rem`, maximum readable line length `68ch`.
- Labels: uppercase mono, `0.72rem`, wide tracking.

## 5. Layout Rules
- Content width: `min(1240px, viewport - 32px)`.
- Section spacing: `96px` mobile, `144px` desktop.
- Cards: 24–32px padding, 24–32px radius, subtle border and shadow.
- Above-the-fold always includes headline, supporting copy, and both CTAs.

## 6. Motion System
### Page Transitions
- Astro ClientRouter owns cross-page navigation.
- Old page fades and lifts `10px`; new page fades in from `12px` over `500–650ms`.
- The canvas color remains warm off-white to prevent white flashes.

### Scroll Animation
- Lenis owns same-page anchor scrolling with an `88px` navbar offset.
- ScrollTrigger initializes after Lenis and refreshes after every `astro:page-load`.
- Reveals use opacity and `y` only. Parallax stays below `24px`.
- Hero and operating-system narratives use scrubbed, reversible timelines on desktop.

### Typography Motion
- SplitType applies only to the hero headline and reverts during cleanup.
- Never animate font size, width, line height, or letter spacing.
- Final text state is always `opacity:1`, `x:0`, `y:0`, `scale:1`, `rotate:0`.

### Hero Motion
- Scattered marketing objects converge into a five-node growth system.
- Lines draw, colors shift from lavender/blue to peach/lime, then the growth badge resolves.
- The board scales down slightly as Services enters.

### Services Motion
- Desktop uses one center-locked, pinned 3D card stack with `1500px` perspective.
- Each service exits backward while the next enters from the front; width and height never animate.
- Mobile and reduced-motion modes render a normal vertical stack.

### Trust Motion
- The Why section reveals headline lines sequentially, draws grid dividers, and spotlights one card at a time.
- No spinning, bouncing, or aggressive movement.

### Navigation Motion
- The `64px` navbar uses a subtle diagonal shine every `5s`, plus blur and shadow after scrolling.

### Process Motion
- The visual stays sticky on desktop while six narrative steps activate.
- Previous nodes remain connected; the progress line grows with scroll.

### Chatbot Motion
- Closed state uses a gentle pulse and orbiting signal dot.
- It stays `32px` from desktop edges and respects mobile safe areas.

### Mobile & Reduced Motion
- No pinned sections below `768px`; stories become readable stacked layouts.
- Reduced motion disables Lenis, loops, parallax, scrubbing, and text splitting.
- Static diagrams remain complete and legible.

## 7. Component Rules
- Primary buttons are dark or blue with clear action labels.
- Service cards show outcome first, then tags and route affordance.
- Dark sections use high contrast and soft atmospheric color.
- Chatbot uses one launcher, a clear label, quick actions, and WhatsApp handoff.

## 8. Accessibility Rules
- Semantic headings and landmarks.
- Visible `:focus-visible` rings.
- Minimum 44px touch targets.
- Icon buttons include accessible names.
- Dialogs close with Escape and outside click.
- Content remains visible if JavaScript or animation libraries fail.

## 9. Mobile Rules
- One-column content and cards below `768px`.
- Full-screen navigation overlay with safe-area padding.
- Chat opens as a bottom sheet and never covers primary content by default.
- Motion and decorative elements simplify on small screens.
