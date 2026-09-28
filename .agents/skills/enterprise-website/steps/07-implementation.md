# Step 7 — Implementation

## Objective

Translate the approved experience into maintainable production-quality frontend code.

## Inputs

- All approved design artifacts
- Existing repository/code, if applicable
- Technical constraints

## Actions

1. Inspect the existing architecture before changing it.
2. Identify reusable existing components.
3. Define component boundaries.
4. Implement semantic structure.
5. Implement responsive layout.
6. Implement typography and visual system.
7. Implement interactions.
8. Implement Framer Motion where appropriate.
9. Implement scroll/parallax behavior.
10. Implement loading, error, empty, and success states for every form and async interaction — not loading alone.
11. Implement accessibility fundamentals.
12. Implement appropriate SSR/SSG behavior.
13. Optimize media loading.
14. If a CMS-driven content collection was flagged as an Escalation Trigger in Discovery, name that content object's fields and states in one short paragraph before building its components.

## Architecture Rules

Do not:

- create abstractions before repetition exists
- create components for every visual fragment
- add libraries without justification
- move working architecture merely to satisfy personal preference

Prefer meaningful components and clear responsibilities.

## Animation Rules

Keep animation logic understandable.

Prefer declarative motion where possible.

Avoid scroll handlers that cause unnecessary layout work.

## Performance Rules

Prioritize:

- minimal client JavaScript
- responsive images
- lazy loading below-the-fold media
- appropriate SSR/SSG
- code splitting
- stable layout
- efficient transforms

## Critical Questions

- Does the code match the approved design artifacts, or did convenience quietly change the design mid-build?
- Which component would break first if content length or count doubled?
- Is any state (loading/error/empty/success) implemented as an afterthought rather than a designed state?
- Would a new engineer understand this component boundary without asking why it exists?

## Output

A working implementation.

## Stop Conditions

Stop and revisit prior steps if implementation reveals that the approved concept is technically or structurally unsound.

Do not "hack around" a flawed design indefinitely.

## Self-Review

Ask:

> What part of this implementation is more complicated than the product actually needs?

Simplify where appropriate.
