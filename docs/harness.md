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

## 6. Change Control

Agents must not silently change:

- Approved architectural decisions.
- Product scope.
- Dependency policy.
- Security restrictions.
- Database schemas or production infrastructure.

If a change requires a new decision, the agent must document the issue and request approval.

## 7. Human Approval Boundaries

Require explicit authorization for destructive operations, production deployments, irreversible changes, and actions involving private client information.

Routine local checks and non-destructive development changes may proceed within the permissions already granted.

## 8. Initial Implementation Priorities

1. Establish repository instructions.
2. Inspect the actual project structure and package scripts.
3. Define the initial verification commands.
4. Add lightweight automated checks.
5. Add task-specific Commands and Skills.
6. Introduce specialized agents only when repeated workflows justify them.

## 9. Current Limitations

The exact verification commands, automated checks, CI workflow, and agent permissions must be finalized after inspecting the actual repository and its application configurations.

Do not document a check as operational until it has been implemented and tested.
