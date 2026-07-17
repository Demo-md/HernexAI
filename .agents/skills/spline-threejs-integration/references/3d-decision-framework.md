# 3D Decision Framework

Answer these before adding Spline or Three.js:

1. What user-facing relationship does 3D explain that DOM/SVG/video cannot?
2. What is the immediate static fallback and does it preserve the complete message?
3. What is the desktop, tablet, mobile, reduced-motion, and WebGL-disabled composition?
4. What are the model, texture, draw-call, DPR, memory, and bundle budgets?
5. When does the scene load, pause, resume, and dispose?
6. How will GPU/frame performance and Core Web Vitals be measured?

Decline 3D when it is only decorative, duplicates a DOM animation, adds an unnecessary React dependency, or cannot meet the fallback and cleanup requirements.
