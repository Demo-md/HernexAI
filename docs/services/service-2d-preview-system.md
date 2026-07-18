# 2D Service Preview System

`src/scripts/services/service-preview.ts` owns one controller per hub.

- A single service preview is visible at once.
- The automatic cycle uses one timeout chain, not `setInterval`, and changes after 4.2 seconds.
- Hover, focus, and tap select a service; hover/focus wait 820ms before a service-interest event.
- The cycle pauses while interacting, offscreen, hidden-tab, or under reduced motion.
- Transitions use only opacity, `translateX`, and `rotationZ` through CSS classes. No WebGL, canvas, perspective, or 3D service cards are used.
