# Step 13 — Refinement

## Objective

Fix the highest-impact problems without introducing new complexity.

## Inputs

- All review findings

## Actions

1. Group findings by root cause.
2. Fix structural problems before cosmetic problems.
3. Revisit design decisions when implementation hacks are accumulating.
4. Remove unnecessary elements before adding new ones.
5. Re-render affected areas.
6. Re-run relevant reviews.

## Priority

1. Information hierarchy
2. UX
3. Layout
4. Responsive behavior
5. Performance
6. Accessibility
7. Motion
8. Micro-interactions
9. Decorative polish

This ordering is a guide, not a rigid score.

## Critical Rule

Do not solve a design problem by adding complexity unless the complexity is justified.

Prefer:

- removing
- simplifying
- restructuring
- clarifying

before adding effects.

## Output

Updated implementation plus a **Refinement Log**:

- Problem
- Root cause
- Change
- Why the change improves the experience
- New risk, if any

## Stop Conditions

Repeat only while material issues remain.

Do not endlessly polish subjective details.

## Self-Review

Ask:

> Did this refinement genuinely improve the experience, or did it merely change it?
