# Habe Fashion Web — Harness Engineering

**Status:** Initial proposal

## 1. Purpose

Define the environment, instructions, tools, and verification processes that make AI-assisted development reliable and repeatable.

The harness should help agents follow project requirements, minimize unintended changes, and provide evidence that their work has been verified.

## 2. Sources of Context

The harness uses these sources:

- `AGENTS.md`: general instructions for coding agents.
- `specs/product.md`: product goals and scope.
- `specs/requirements.md`: requirements and acceptance criteria.
- `specs/architecture.md`: architectural constraints and unresolved decisions.
- `docs/engineering-rules.md`: engineering practices and restrictions.
- `docs/adr/`: recorded architectural decisions.
- Existing source code, tests, and project configuration.

Documentation must be consistent with the actual implementation. When they disagree, agents must report the discrepancy rather than silently assuming either is correct.

## 3. Execution Workflow

Every task should follow this workflow:

1. **Understand:** identify the requested outcome and relevant requirements.
2. **Inspect:** examine the affected code, configuration, and existing tests.
3. **Plan:** determine the smallest complete change and its verification strategy.
4. **Implement:** modify only the files necessary for the approved scope.
5. **Verify:** run applicable checks using existing project scripts.
6. **Review:** inspect the final diff and address unintended changes.
7. **Report:** summarize the result, evidence, limitations, and outstanding issues.

## 4. Verification Layers

### Layer A: Static checks

Run available checks such as TypeScript type checking and linting.

### Layer B: Automated tests

Run relevant unit, component, integration, or end-to-end tests that exist in the affected application.

### Layer C: Production build

Verify that the affected application builds successfully when the build environment and dependencies are available.

### Layer D: User-facing quality

Check relevant responsive behavior, accessibility, SEO, navigation, and performance.

### Layer E: Security

Review changes involving secrets, dependencies, permissions, external integrations, or sensitive data.

Not every task requires every layer. The agent must select appropriate checks and explain any omissions.

## 5. Evidence and Reporting

A verification claim must correspond to an actual executed check.

Reports must distinguish:

- Passed checks.
- Failed checks.
- Checks not run.
- Checks blocked by missing dependencies or configuration.
- Manual reviews that have not been automated.

A successful build alone does not prove that all acceptance criteria are satisfied.

## 6. Documentation Currency

Documentation must describe the implementation as it actually is. A document that describes an earlier state of the code is worse than a missing document, because an agent reads it and works from it.

Before reporting a task complete, review whether the change made any statement in the project documentation inaccurate, and update it in the same change. This applies to:

- `AGENTS.md` and this harness document.
- `specs/product.md`, `specs/requirements.md`, `specs/architecture.md`.
- `docs/engineering-rules.md` and the ADRs in `docs/adr/`.
- Application READMEs and `.env.example`.
- Agent skills in `.agents/skills/`, including project-specific skills.

The following must be updated whenever the change makes them inaccurate:

- A new or removed command, script, dependency, or tool.
- A new environment variable, in the owning application's `.env.example`.
- A change to how content, configuration, or media is stored or delivered.
- A change to the visual design system, including color roles.
- A newly resolved or newly discovered open decision.
- A new page, route, or major component that changes the documented structure.

Rules for updating documentation:

1. Update documentation **in the same change** as the code, not in a follow-up commit, unless the documentation depends on an unresolved decision.
2. Never mark an open decision as resolved without a recorded decision.
3. Do not weaken a rule to make an implementation easier.
4. When documentation and code disagree and the correct state is unclear, report the conflict instead of assuming either is correct.
5. A statement that describes an intended future state must say so explicitly. Documentation describes the present tense unless it says otherwise.

## 7. Change Control

Agents must not silently change:

- Approved architectural decisions.
- Product scope.
- Dependency policy.
- Security restrictions.
- Database schemas or production infrastructure.

If a change requires a new decision, the agent must document the issue and request approval.

## 8. Human Approval Boundaries

Require explicit authorization for destructive operations, production deployments, irreversible changes, and actions involving private client information.

Routine local checks and non-destructive development changes may proceed within the permissions already granted.

## 9. Initial Implementation Priorities

1. Establish repository instructions.
2. Inspect the actual project structure and package scripts.
3. Define the initial verification commands.
4. Add lightweight automated checks.
5. Add task-specific Commands and Skills.
6. Introduce specialized agents only when repeated workflows justify them.

## 10. Verification Commands

These commands have been implemented and executed. They are documented in `specs/architecture.md` §11 and in the owning application's README.

Frontend, from `habe-fashion-web-front/`:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run test:run    # vitest run
npm run build       # next build
npm run verify      # all four, in sequence
```

`npm run verify` is the gate before a pull request. Note that Next.js 16 removed `next lint`, so `next build` no longer runs linting; linting is a separate step.

Always discover the actual scripts in the affected application before running checks. Never invent a command.

## 11. Current Limitations

The following are still unresolved and must not be documented as operational until they are implemented and tested:

- **CI workflow.** No pipeline exists. Verification currently depends on running it locally.
- **Accessibility and performance audits.** REQ-PERF-004 asks for repeatable measurements such as Lighthouse. No audit is configured yet.
- **Responsive verification.** REQ-RESP-001 covers four device classes. Only type checks and component tests exist; no browser-driven viewport checks run automatically.
- **Backend verification.** Not applicable until backend functionality is approved.
- **Branch protection.** Expected on `main` and `develop` in GitHub, but repository settings are not visible from the code and must be confirmed by a human.

Do not document a check as operational until it has been implemented and tested.
