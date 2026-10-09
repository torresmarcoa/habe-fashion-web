# ADR-002: Keep Frontend and Backend as Separate Applications in One Monorepo

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

Habe Fashion Web will use a single public GitHub repository while keeping frontend and backend code independently organized.

The initial MVP consists of the portfolio frontend. Backend functionality will be introduced later when requirements justify it.

## Decision

Use one monorepo with separate application directories:

- `habe-fashion-web-front/`
- `habe-fashion-web-back/`

Keep specifications, architecture documentation, ADRs, and agent configuration at the repository root.

Each application must be independently buildable and deployable.

## Alternatives Considered

1. **Monorepo with separate applications:** Selected because it keeps project documentation and both applications together while preserving application boundaries.
2. **Separate repositories:** Would provide stronger repository-level separation but distribute project context across repositories.
3. **Single application directory:** Would initially be simpler but would not match the chosen frontend/backend separation.

## Consequences

### Positive

- Shared specifications and architectural decisions remain in one place.
- Agents can access the same project context.
- Frontend and backend can use independent dependencies and deployment configurations.
- The backend can be introduced without reorganizing the repository.

### Trade-offs

- Deployment pipelines must use the correct application root directory.
- CI workflows should eventually avoid rebuilding unrelated applications unnecessarily.
- Repository-wide tooling must account for multiple applications.
- The public repository requires strict secret-management practices.

## Constraints

- Keep frontend and backend dependencies separate.
- Do not require the backend to exist or run during the frontend-only MVP.
- Do not assume that both applications must be deployed together.
- Never commit secrets or private environment configuration.

## References

- `specs/architecture.md`
