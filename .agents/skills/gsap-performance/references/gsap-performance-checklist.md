# GSAP Performance Checklist

- [ ] Transform/opacity used for visual motion
- [ ] DOM reads batched before writes
- [ ] No layout measurement in a hot loop
- [ ] GSAP context or equivalent scope used
- [ ] Timelines and ScrollTriggers killed on teardown
- [ ] ScrollTrigger refreshed after fonts/media settle
- [ ] One shared Lenis/GSAP RAF
- [ ] Offscreen and hidden-tab loops paused
- [ ] Mobile animation density reduced
- [ ] Particle/DOM node count justified
- [ ] No duplicate listeners or materials
- [ ] Production metrics measured on representative devices
- [ ] Budgets in `docs/codex/performance-budgets.md` met or exceptions documented
