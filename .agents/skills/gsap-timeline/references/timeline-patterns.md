# Timeline Planning Patterns

Before coding, record:

| Field | Decision |
|---|---|
| Initial state | What is visible if JS fails? |
| Trigger | Load, hover, focus, enter, leave, or scroll position |
| Beats | Named labels and dependency order |
| Target | DOM, SVG, mask, media, or CSS variable |
| Timing | Duration, delay, stagger, and easing character |
| Interruption | What happens when the user reverses or leaves? |
| Reset | How does resize, route change, or back navigation restore state? |
| Reduced motion | Static/shortened alternative |

Prefer one parent timeline with labels for a choreographed entrance. Use separate reversible timelines for independent hover/focus states. Keep split text wrappers out of the accessibility tree only when an equivalent semantic source remains available.
