# Reduced Motion Patterns

- Keep content at its final readable position when reduced motion is enabled.
- Replace entrance transforms with immediate visibility or a short opacity change only when it remains comfortable.
- Replace scrubbed/pinned sequences with normal document flow and static explanatory media.
- Stop decorative loops, cursor-following, camera movement, particle motion, and autoplay where they are not essential.
- Preserve control states, focus order, and semantic announcements independently of animation.
- Do not use `transition: none` as the only strategy if it causes abrupt state loss; choose a stable readable state.
- Test `matchMedia('(prefers-reduced-motion: reduce)')`, keyboard focus, Escape, scroll, and route changes together.
