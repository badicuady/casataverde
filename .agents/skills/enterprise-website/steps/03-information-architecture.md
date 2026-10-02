# Step 3 — Information Architecture

## Objective

Define what the user encounters, in what order, and why.

## Inputs

- Discovery Snapshot
- Design Thesis

If the Discovery Snapshot's "Upstream artifacts found" lists an existing information architecture document, review and adapt it instead of authoring the Actions below from scratch — treat this step as validation, not creation.

## Actions

1. Define page hierarchy.
2. Define major sections.
3. Define content hierarchy inside each section.
4. Map the primary user journey.
5. Identify entry points and exit points.
6. Define navigation requirements.
7. Define content dependencies.
8. Identify where evidence, trust, explanation, and conversion occur.
9. Define responsive structural changes at a high level.

## Recommended Narrative Model

Where appropriate:

Attention → Orientation → Understanding → Evidence → Confidence → Action

Do not force this sequence when the product requires a different journey. If the Discovery Snapshot recorded a branching-task Escalation Trigger, model that specific task with explicit decision points instead — this narrative model covers the default single-path scroll journey only.

## Escalation Triggers

Apply only when the Discovery Snapshot recorded the matching trigger — most projects trigger neither:

- **Gated/role-based content**: define a navigation-visibility-by-role note (what changes per role) and a controlled vocabulary for section/nav labels, rather than assuming one universal nav.
- **Branching task** (multi-step form, calculator, filtered search): map that task's entry point, exit point, decision points, and edge cases explicitly, rather than folding it into the linear narrative model above.

## Critical Questions

- What does the user need to know first?
- What can be deferred?
- Which content is supporting rather than primary?
- Is every section earning its place?
- Does the page tell a coherent story?
- What happens if the user scans rather than reads?

## Output

An **IA Snapshot** containing:

- Sitemap/page hierarchy
- Section hierarchy
- Primary user journey
- Navigation model
- Content dependencies
- Responsive structural notes
- Escalation-trigger notes, if any (role visibility / labeling vocabulary / branching-task map)

## Stop Conditions

Stop if major content requirements conflict with the proposed hierarchy. Resolve the conflict before visual design.

## Self-Review

Remove one section from the proposed structure.

If the page becomes better, determine whether that section was necessary.
