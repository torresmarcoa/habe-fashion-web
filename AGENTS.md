# Habe Fashion Web — Agent Instructions

## Project Overview

Habe Fashion Web is a fashion portfolio website for a fashion designer.

The initial MVP is a public portfolio, not an e-commerce platform.

The repository is a public GitHub monorepo containing separate frontend and future backend applications.

## Required Context

Before making changes, consult the relevant documents:

1. `specs/product.md`
2. `specs/requirements.md`
3. `specs/architecture.md`
4. `docs/engineering-rules.md`
5. Relevant ADRs in `docs/adr/`

Read the sections relevant to the current task. For architectural changes, review the full relevant decision context.

## Project Constraints

- Frontend: Next.js, React, TypeScript, and Tailwind CSS.
- Backend: Node.js, Express, and TypeScript are the proposed future stack.
- Media provider: Cloudinary.
- Planned relational database: PostgreSQL; database access tooling remains undecided.
- The MVP must work without a custom backend.
- Hosting and deployment providers remain undecided.
- E-commerce is outside the MVP scope.
- The repository is public. Never commit secrets or private credentials.

Do not interpret a proposed technology or an unresolved decision as an approved implementation requirement.

## Working Procedure

For each task:

1. Identify the requirement and acceptance criteria.
2. Inspect the existing code and project conventions.
3. Identify assumptions, dependencies, and unresolved decisions.
4. Propose a plan for substantial changes.
5. Implement the smallest complete solution.
6. Run the applicable verification commands.
7. Review the final diff for unintended changes.
8. Report the changes, verification results, and remaining issues.

For small, unambiguous tasks, the plan may be brief.

## Verification Rules

- Discover the actual scripts available in the affected application before running checks.
- Do not invent commands or claim checks were successful without executing them.
- Report failed or unavailable checks explicitly.
- Do not suppress a failure simply to report completion.
- Do not claim that a feature is complete if its acceptance criteria remain unmet.

## Permission Boundaries

- Do not deploy or publish changes unless explicitly authorized.
- Do not perform destructive operations without approval.
- Do not discard or overwrite unrelated user changes.
- Do not introduce dependencies or change architecture without justification.
- Never expose secrets or private client information.

## Final Report

At the end of a task, report:

- What changed.
- Which requirement the change addresses.
- Which checks were executed and their actual results.
- Any checks that remain outstanding.
- Any unresolved decisions or follow-up work.
