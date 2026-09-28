# Step 5 — Motion System

## Objective

Define a coherent animation language before implementing individual animations.

## Inputs

- Design Thesis
- Visual System
- Information Architecture

## Actions

1. Define motion principles.
2. Define timing scale.
3. Define easing language.
4. Define movement distance scale.
5. Define stagger rules.
6. Define entrance/exit behavior.
7. Define hover/focus behavior.
8. Define scroll behavior.
9. Define parallax zones.
10. Define reduced-motion behavior.
11. Identify performance-sensitive animations.

## Motion Hierarchy

Level 1: micro-interactions

Level 2: component transitions

Level 3: section transitions

Level 4: cinematic interactions

Use higher levels less frequently.

## Parallax Rules

Every parallax effect must identify:

- source layer
- target layer
- reason for movement
- scroll relationship
- mobile behavior
- reduced-motion behavior
- performance risk

## Critical Questions

- What does this animation communicate?
- Would the interface improve if it were removed?
- Is motion consistent with other motion?
- Is scroll movement helping orientation or merely creating spectacle?
- Can the effect remain smooth on lower-powered devices?

## Output

A **Motion System Specification** containing:

- Motion principles
- Timing
- Easing
- Stagger
- Transitions
- Scroll behavior
- Parallax map
- Reduced-motion behavior
- Performance constraints

## Stop Conditions

Reject animations whose purpose is only "make it feel modern."

## Self-Review

Disable all proposed animation.

If the composition is weak without it, return to Step 4.
