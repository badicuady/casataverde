# Step 9 — Responsive Review

## Objective

Verify that the experience behaves intentionally across viewport sizes.

## Inputs

- Rendered implementation
- Responsive design specification

## Actions

Inspect at minimum:

- narrow mobile
- standard mobile
- tablet
- laptop
- desktop
- large desktop
- ultrawide when relevant

Review:

- layout
- navigation
- typography
- image crops
- spacing
- content order
- interaction targets
- animation
- parallax
- overflow
- horizontal scrolling

## Critical Questions

- Is mobile a deliberate composition?
- Does hierarchy remain clear?
- Does text wrap naturally?
- Are touch targets usable?
- Does animation remain appropriate?
- Does the design become too sparse or too dense at extremes?

## Output

A responsive review with:

- viewport tested
- issue
- severity
- expected behavior
- actual behavior
- fix recommendation

## Stop Conditions

Fix any issue that blocks:

- reading
- navigation
- primary action
- core content access
- stable layout

## Self-Review

Test the smallest reasonable viewport.

Ask:

> What did the desktop design assume that no longer exists here?
