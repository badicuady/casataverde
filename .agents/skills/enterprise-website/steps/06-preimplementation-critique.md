# Step 6 — Pre-Implementation Critique

## Objective

Attack the proposed experience before expensive implementation begins.

## Inputs

All outputs from Steps 1–5.

## Actions

Review the proposed design through five lenses.

### Product

- Does it support the objective?
- Is the primary action clear?

### UX

- Can users understand the page quickly?
- Is scanning supported?
- Is anything unnecessarily complicated?

### Visual

- Is the composition distinctive?
- Is hierarchy obvious?
- Is the visual language coherent?

### Motion

- Is motion purposeful?
- Is parallax justified?

### Engineering

- Is the concept feasible?
- Is the animation approach maintainable?
- Are there obvious performance risks?

## Mandatory Tests

### Genericity Test

Would a competent AI likely produce the same page?

### Static Test

Does it work without motion?

### Remove Test

Can 20% of the visual elements disappear without harming the experience?

### Mobile Test

Does the concept survive at a small viewport?

### Six-Month Test

Would the implementation remain understandable?

## Critical Questions

- If this shipped exactly as designed, what would the first user complaint be?
- Which lens above found the weakest result, and is that lens being under-weighted because the others look strong?
- Is any "required change" actually a preference dressed up as a requirement?
- What would change this critique's go/no-go decision from go to no-go?

## Output

A critique containing:

- Strengths
- Weaknesses
- Risks
- Required changes
- Optional improvements
- Explicit go/no-go decision

## Stop Conditions

Do not proceed if there is a major unresolved issue in:

- information hierarchy
- user journey
- feasibility
- mobile composition
- performance risk
- visual concept

## Self-Review

The reviewer must identify at least one weakness even when the design appears strong.
