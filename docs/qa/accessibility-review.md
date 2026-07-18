# Accessibility Review

## Implemented Behaviour

- Semantic landmarks include a skip link, header navigation, main content, sections, headings, forms, and footer.
- Each route uses one page-level H1; controls have visible labels or accessible names.
- The mobile menu exposes dialog semantics, moves focus to its close control, traps Tab while open, restores focus to its opener, and closes on Escape.
- The desktop Services menu uses a semantic button with `aria-expanded`, exposes both Marketing and Technology groups, closes on Escape and outside interaction, and intentionally does not trap focus. The mobile Services control is a labelled accordion inside the menu dialog.
- The chatbot launcher and panel expose expanded state, labelled controls, keyboard close behaviour, and labelled message input.
- Focus-visible styles use a high-contrast gold outline; text and button hierarchy use the navy/gold/paper token system.
- `prefers-reduced-motion` prevents GSAP/Lenis enhancement and autonomous bot motion, leaving final content states visible.
- Responsive layouts avoid mandatory pinned scenes and preserve native scroll on narrow screens.

## Checked In Browser

- Keyboard menu open and Escape close: pass.
- Keyboard chatbot open and Escape close: pass.
- Required contact controls and client-side validation message: pass.
- The contact service selector contains all nine entries from `src/data/site.ts`.
- Reduced-motion service visibility: pass.

## Limitation

Automated colour-contrast ratios and screen-reader announcements were not measured with a dedicated assistive-technology session. The semantic structure and keyboard flows were inspected through Chromium's accessibility tree.
