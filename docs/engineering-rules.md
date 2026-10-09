# Habe Fashion Web — Engineering Rules

**Status:** Proposed
**Last updated:** 2026-10-08

## 1. Purpose

This document defines the engineering rules that developers and AI coding agents must follow when working on Habe Fashion Web.

The goal is to maintain consistency, minimize unnecessary complexity, protect the public repository, and ensure that implementations satisfy the approved requirements.

These rules apply to all code, configuration, tests, documentation, and infrastructure changes in the repository.

## 2. Source of Truth

Before implementing a feature or modifying existing behavior, consult the relevant project documentation.

Use the following documents according to their purpose:

- `specs/product.md`: product vision, scope, users, and product decisions.
- `specs/requirements.md`: functional and non-functional requirements and acceptance criteria.
- `specs/architecture.md`: architectural structure, technology choices, constraints, and unresolved decisions.
- `docs/adr/`: accepted technical decisions and their rationale.
- `docs/engineering-rules.md`: engineering constraints and development practices.

If these documents conflict, do not silently choose whichever instruction is most convenient.

Identify the conflict, explain its impact, and request clarification or an explicit decision before implementing the affected change.

## 3. Scope Control

1. Implement only the functionality included in the approved task and its acceptance criteria.
2. Do not introduce features merely because they might be useful in the future.
3. Do not implement future e-commerce functionality as part of the portfolio MVP.
4. Do not add a backend, database, authentication system, payment integration, or administrative panel without an approved requirement.
5. If a task reveals a missing requirement, document the gap and propose a change instead of silently expanding scope.
6. Prefer the smallest implementation that completely satisfies the requirement.

## 4. Architecture and Dependencies

1. Respect the decisions documented in `specs/architecture.md` and accepted ADRs.
2. Do not replace an approved framework, library, or architectural pattern without an explicit decision.
3. Do not introduce a dependency when the existing stack or a small, maintainable implementation is sufficient.
4. Before adding a dependency, explain its purpose, benefits, alternatives, and maintenance or security implications.
5. Do not create abstractions, services, hooks, utilities, or design patterns without a concrete need.
6. Reuse existing components and utilities when doing so preserves clarity and behavior.
7. Avoid duplicate implementations of the same functionality.
8. Keep frontend and backend responsibilities separate.
9. Keep frontend and backend dependencies and build processes independent.
10. Do not introduce Vite as a second frontend framework alongside Next.js.

If an unresolved architectural decision blocks implementation, mark it as unresolved and request approval rather than treating a proposed option as already accepted.

## 5. Frontend Engineering

1. Use Next.js, React, TypeScript, and Tailwind CSS according to the established architecture.
2. Prefer server rendering or static generation when appropriate for SEO and performance.
3. Use client components only when client-side behavior is required.
4. Build reusable components when they reduce meaningful duplication without making the implementation unnecessarily complex.
5. Keep content, configuration, and presentation appropriately separated.
6. Use semantic HTML and accessible interactive elements.
7. Provide meaningful alternative text for informative images; use appropriate empty alternative text for decorative images.
8. Ensure interactive elements can be operated with a keyboard.
9. Implement responsive layouts for supported mobile, tablet, and desktop viewports.
10. Avoid unnecessary client-side JavaScript and excessive global state.
11. Do not use placeholder content in production without explicit approval.
12. Do not invent the designer's brand details, contact information, social profiles, or portfolio content.

## 6. API and Backend Boundaries

These rules apply when backend development is authorized.

1. Keep database access and privileged operations on the server.
2. Validate and normalize incoming requests at the API boundary.
3. Use appropriate HTTP methods and status codes.
4. Document API behavior and response structures.
5. Handle expected errors explicitly; do not silently swallow exceptions.
6. Apply authorization checks to protected operations.
7. Do not trust client-provided prices, permissions, inventory values, or other security-sensitive business data.
8. Do not add endpoints that duplicate functionality already adequately handled by the frontend or a managed service.
9. Do not access PostgreSQL directly from browser code.
10. Do not store image or video binaries in PostgreSQL.

The absence of a backend during the MVP is intentional. Do not create artificial API dependencies merely to conform to a future architecture.

## 7. Data and Database Changes

These rules apply when a database is introduced.

1. Database changes must be justified by an approved requirement.
2. Use version-controlled migrations for schema changes.
3. Explain the purpose and consequences of schema modifications.
4. Preserve existing data unless a destructive change has been explicitly approved.
5. Never run destructive production operations without explicit authorization and an appropriate recovery plan.
6. Do not store secrets in source code or ordinary database records.
7. Use appropriate constraints, indexes, and data types.
8. Test migrations and relevant data-access behavior in a suitable environment.
9. Do not select an ORM or migration tool until the relevant architectural decision has been resolved.

## 8. Security and Privacy

1. Never commit real credentials, access tokens, private keys, or production secrets.
2. Keep secret-bearing `.env` files out of Git.
3. Use `.env.example` files to document required configuration with placeholder values only.
4. Treat every file in the public repository as publicly accessible.
5. Never expose privileged Cloudinary credentials or server-side secrets in frontend bundles.
6. Use the least privileges required for each tool, service, and agent.
7. Do not include real customer information in fixtures, examples, logs, or tests without authorization.
8. Do not upload private client assets to external services without permission.
9. Review security-sensitive dependency changes before accepting them.
10. Ask for explicit approval before modifying production resources, publishing sensitive information, or performing destructive operations.

## 9. Testing and Verification

1. Add or update tests when changing behavior that can be tested automatically.
2. Test important edge cases and failure paths, not only the expected success path.
3. Run the relevant checks available for the affected application.
4. Run TypeScript type checking, linting, tests, and production builds when applicable to the task.
5. If a check fails, investigate the cause rather than hiding or suppressing the failure.
6. Do not disable tests, lint rules, TypeScript checks, or security controls merely to obtain a passing result.
7. Do not claim that tests, builds, audits, or other checks passed unless they were actually executed and their results were verified.
8. Clearly report checks that could not be run and explain why.
9. Do not change unrelated files just to make a task appear complete.
10. Verify that the final diff contains only intended changes.

A task is not verified merely because the code looks correct.

## 10. Performance, SEO, and Accessibility

1. Treat SEO, accessibility, responsiveness, and performance as requirements rather than optional polish.
2. Use optimized image delivery and suitable responsive image sizes.
3. Avoid unnecessarily large assets and dependencies.
4. Provide descriptive page titles and appropriate metadata.
5. Ensure important page content can be discovered by search engines.
6. Use semantic headings and landmarks.
7. Maintain visible focus indicators and sufficient color contrast.
8. Avoid layout shifts and unnecessary loading delays where reasonably achievable.
9. Use measurable checks when suitable tools are available.
10. Do not claim compliance with a standard or performance target without evidence.

## 11. Code Quality and Maintainability

1. Use clear, descriptive names.
2. Keep functions and components focused on their responsibilities.
3. Avoid unnecessary duplication while preserving readability.
4. Prefer explicit, understandable implementations over clever but difficult-to-maintain solutions.
5. Use TypeScript types that represent actual data and behavior.
6. Avoid `any` unless there is a documented, justified reason.
7. Handle nullable and optional values deliberately.
8. Remove unused code and imports introduced by the task.
9. Do not add speculative extension points without a concrete use case.
10. Follow the conventions already established in the affected application.

## 12. AI-Assisted Development

1. Read the relevant specifications and architecture before modifying code.
2. Identify the task's scope and acceptance criteria before implementation.
3. Inspect existing files and conventions before creating new abstractions.
4. Produce an implementation plan when a task involves multiple files, architectural changes, or significant uncertainty.
5. Prefer small, reviewable changes.
6. Do not invent files, commands, test results, API contracts, or existing functionality.
7. Distinguish verified facts from assumptions.
8. Ask for clarification when an unresolved decision materially affects correctness, cost, security, or architecture.
9. Never silently modify an accepted ADR or bypass an engineering constraint.
10. Review changes generated by other agents before relying on them.
11. Do not assume that another agent's completion report proves that its implementation works.
12. Record significant deviations from the plan and explain why they were necessary.

## 13. Tool and Permission Boundaries

1. Use only tools and permissions needed for the current task.
2. Do not expose secrets in prompts, logs, generated documentation, or agent outputs.
3. Request approval before destructive operations, production changes, or irreversible actions.
4. Do not deploy, publish, or modify production infrastructure unless the task explicitly authorizes it.
5. Do not execute untrusted scripts or install new dependencies without assessing their purpose and risk.
6. Preserve user changes and unrelated work in the working tree.
7. Do not discard, reset, or overwrite existing work merely to simplify implementation.

## 14. Documentation and Traceability

1. Significant features must reference their relevant requirements.
2. Changes to architecture must be reflected in `specs/architecture.md` when appropriate.
3. Changes to accepted technical decisions must be recorded in the relevant ADR.
4. New environment variables must be documented in the appropriate `.env.example`.
5. Setup, test, lint, and build commands must be documented when established.
6. Update documentation when implementation changes make it inaccurate.
7. Do not mark unresolved decisions as accepted.
8. Keep documentation concise, accurate, and consistent with the actual repository.

## 15. Definition of Done

A task may be considered complete when all applicable criteria are satisfied:

- The approved requirement has been implemented.
- The acceptance criteria have been checked.
- The change respects the architecture and engineering rules.
- Relevant tests have been added or updated.
- Applicable type checks, linting, tests, and builds have been executed.
- Failures and unexecuted checks are explicitly reported.
- Security and accessibility implications have been considered.
- Documentation has been updated when necessary.
- The final diff has been reviewed for unrelated or unintended changes.
- No unresolved critical issue is being presented as completed work.

If any required criterion remains unmet, report the task as incomplete or partially verified.

## 16. Rule Changes

These engineering rules may evolve as the project matures.

A change that modifies a core constraint must include:

- The reason for the change.
- Its effect on existing code and agent behavior.
- Any necessary updates to specifications, architecture, ADRs, or harness configuration.

Agents may propose changes, but must not silently weaken these rules to make their own implementation easier.
