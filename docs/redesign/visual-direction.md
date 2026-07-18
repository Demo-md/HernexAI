# Visual Direction

## Direction

Create a premium, lively, intelligent, human, and controlled marketing experience. The page should move between deep branded moments, airy editorial reading surfaces, and warm-neutral pauses. Navy establishes confidence; gold carries action, progress, and selected outcomes. Do not turn the whole page into a navy screen or gold decoration exercise.

## Colour Use

| Role | Value | Use |
| --- | --- | --- |
| Deep navy | `#071B55` | Branded sections, high-contrast footer, structural linework |
| Gold | `#F5A623` | Primary action, emphasis, AI-engine output, status only |
| Primary light | `#FFFFFF` | Dark-surface display text |
| Secondary light | `#C7D0E5` | Supporting text on dark surfaces |
| Soft gold glow | `rgba(245, 166, 35, 0.25)` | Restrained focus or engine depth; never ambient filler |
| Editorial light | Provisional warm off-white, approval required | Reading sections and case-study surfaces |

Confirm final light-surface and dark-text values through contrast testing before code. `DESIGN.md`'s blue/lavender/peach/lime treatment is historical and is not the redesign palette.

## Typography

Use no more than two families. Proposed approval-dependent pairing: **Bricolage Grotesque** variable for display/body and **IBM Plex Mono** for restrained labels, stage names, and timestamps. If licensing, hosting, or brand approval is unavailable, use one licensed variable sans and retain the mono utility layer only where it improves comprehension.

| Token | Planned range | Purpose |
| --- | --- | --- |
| Display | `clamp(3rem, 7vw, 7.5rem)` | Hero and chapter statements |
| H2 | `clamp(2.25rem, 4.5vw, 5rem)` | Major chapter headings |
| H3 | `clamp(1.35rem, 2vw, 2rem)` | Service/process titles |
| Body | `1rem–1.125rem`, `1.55–1.7` line-height | Comfortable reading |
| Utility | `0.72rem–0.8rem`, uppercase only when useful | Labels and engine stages |

Use high-contrast type, deliberate wrap points, and at most one selective italic/weight contrast per display statement. Avoid centre alignment as the default.

## Grid, Space, And Surfaces

- Use a 12-column desktop grid, 6-column tablet grid, and 4-column mobile grid inside a fluid max-width container.
- Planned container: `min(1240px, calc(100vw - 2rem))`, growing horizontal gutters at tablet and desktop.
- Use generous chapter gaps: approximately `7rem–10rem` desktop, `4.5rem–6rem` mobile, adjusted by content role rather than a single mechanical scale.
- Primary copy and CTAs stay in normal grid flow. Absolute positioning is reserved for decorative lines, engine signals, and media framing with a semantic fallback.
- Reserve full-width media for approved evidence or narrative moments, not empty visual noise.

## Form, Radius, Shadow, Image, And Icon Rules

- Use a compact radius scale: 0, 8, 14, and 24px. Large pills are for controls only, not section wrappers.
- Prefer 1px tonal borders and elevation through surface contrast; use soft, short shadows only for menus/dialogs and active engine elements.
- Use original or licensed photography, campaign artefacts, editorial crops, and intentional diagrams. No generated corporate people, generic robots, or borrowed reference media.
- Use a consistent line-icon family only when a label cannot communicate the meaning. Do not create icon collections as decoration.

## Composition And Responsive Rules

Every major section needs a distinct composition: hero split with visual engine, editorial service index, capability sequence, process rail, proof/media frame, split FAQ, and contact field. Mobile reorders for clarity, reduces visual density, removes decorative overlap, and turns complex diagrams into one readable linear flow. It must not be a scaled desktop scene.
