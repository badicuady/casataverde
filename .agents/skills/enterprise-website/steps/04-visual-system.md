# Step 4 — Visual System

## Objective

Turn the design thesis into a coherent visual language.

## Inputs

- Discovery Snapshot
- Design Thesis
- Information Architecture

## Actions

Define:

1. Typography hierarchy
2. Color strategy
3. Spacing rhythm
4. Grid/alignment system
5. Shape language
6. Image treatment
7. Depth/shadow strategy
8. Section composition patterns
9. Interactive states (hover/focus/active) and, for every form or async interaction, empty/loading/error/success states
10. Responsive visual transformations

## Typography

Define display, heading, body, label, and utility scales as needed.

Do not choose extreme typography solely for visual drama.

## Color

Define semantic roles rather than isolated colors.

Avoid arbitrary per-section palettes unless justified by the concept.

## Composition

Use:

- scale
- whitespace
- alignment
- asymmetry
- full-bleed imagery
- overlap
- contrast

only where they support hierarchy.

## Critical Questions

- Does the visual system communicate the design thesis?
- Does it remain coherent across different sections?
- Is there enough contrast between primary and secondary information?
- Is whitespace intentional?
- Does the design still work without decorative effects?

## Output

A **Visual System Specification** containing:

- Typography
- Color
- Spacing
- Grid
- Shape language
- Image rules
- Composition rules
- Interactive states (including empty/loading/error/success for forms and async interactions)
- Responsive rules

## Stop Conditions

Stop if any form or async interaction has no defined error or empty state. Resolve before motion design or implementation begin — retrofitting states after Step 7 is more expensive than defining them here.

## Self-Review

Remove all gradients, shadows, and decorative effects mentally.

If the page loses its identity, strengthen the underlying typography/composition.
