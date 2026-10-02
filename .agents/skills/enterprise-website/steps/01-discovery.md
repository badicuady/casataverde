# Step 1 — Discovery

## Objective

Establish enough context to make responsible product, design, and technical decisions without prematurely designing the interface.

## Inputs

- User request
- Existing project/repository, if available
- Existing website/design, if available
- Brand/content assets
- Technical constraints

## Actions

1. Identify the website's primary business/product objective.
2. Identify primary and secondary audiences.
3. Identify the primary user action and secondary actions.
4. Inventory known pages/sections/content.
5. Determine whether this is greenfield, redesign, or enhancement.
6. Identify technical environment and deployment constraints.
7. Identify existing visual/brand constraints.
8. Identify performance, accessibility, SEO, and motion requirements.
9. Separate facts from assumptions.
10. Record unknowns that could materially change the design.
11. Check for existing upstream artifacts for this project's slug (per SKILL.md's Upstream Artifact Check — information architecture, user flows, wireframes). Note what is found; it will be consumed in Step 3 instead of re-derived.
12. Identify whether the project has: CMS-driven content collections (blog, case studies, resources, job postings, team directory), gated/role-based content (portal, login, regional variants), or a task with real decision branches (multi-step forms, calculators, filtered search). Record these as Escalation Triggers — they scope later steps up, not down; absence of any trigger means the default lightweight path applies everywhere.

Do not solve visual design yet.

## Critical Questions

- What is the user actually trying to accomplish?
- What does the business actually need?
- What content is authoritative?
- Which requirement is hard, and which is merely a preference?
- What would make this project fail even if it looked beautiful?
- What information is missing that could change the architecture?

## Output

Create a **Discovery Snapshot** containing:

- Objective
- Audience
- Primary action
- Secondary actions
- Content inventory
- Technical stack
- Constraints
- Existing assets
- Assumptions
- Open questions
- Definition of success
- Upstream artifacts found (if any)
- Escalation triggers (content collections / gating / branching tasks — if any)

## Stop Conditions

STOP if:

- the objective is unknown
- the target audience is completely unknown
- the primary action cannot be inferred or established
- a technical constraint makes the requested direction impossible

Otherwise proceed.

## Self-Review

Ask:

> Did I solve a real information gap, or did I collect details that do not affect decisions?

> Which assumption is most dangerous?

> What would I ask a product owner if I had only two questions?
