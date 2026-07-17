---
name: frontend-design-critic
description: Critique the first HernexAI frontend implementation like a senior design director, ranking originality, hierarchy, pacing, responsiveness, accessibility, credibility, and generic patterns by severity.
---

# Frontend Design Critic

Use after the first implementation and before final QA. This is a review-only phase: do not modify implementation unless the user explicitly asks for fixes. Read `docs/codex/design-principles.md`, `docs/codex/brand-foundation.md`, and the relevant reference analysis.

## Review

Inspect desktop and mobile screenshots plus the live browser. Review originality, brand recognition, typography, hierarchy, section variety, spacing, visual pacing, animation purpose, mobile composition, unnecessary cards, generic AI patterns, accessibility, content credibility, and CTA hierarchy.

Classify every finding as `Critical`, `Major`, `Moderate`, or `Minor`. Cite the route, viewport, evidence, user impact, and recommended correction. Separate findings from praise and assumptions.

## Output

Write `docs/critique/frontend-design-critique.md`. State whether the quality gate passes, list unresolved risks, and do not call the work complete when Critical or Major defects remain.
