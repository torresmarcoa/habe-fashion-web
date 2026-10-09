# ADR-006: Defer Final Hosting and Deployment Provider Selection

- **Status:** Deferred
- **Date:** 2026-10-08

## Context

The project uses a monorepo containing independently buildable frontend and backend applications.

The frontend must be deployed for the MVP. The backend and database will be deployed only when required.

Potential providers have been identified, but their costs, limitations, and deployment requirements have not yet been compared sufficiently.

## Decision

Defer the final hosting-provider and deployment arrangement decision until the relevant requirements and cost comparisons are documented.

The frontend and backend must remain independently buildable and deployable regardless of the selected provider.

Vercel is a candidate for frontend hosting. Render is a candidate for future backend hosting. Neither provider is confirmed by this ADR.

## Alternatives to Evaluate

1. **Separate providers:** Potentially select the best fit for each application.
2. **One provider for multiple services:** May simplify account management or networking, depending on the provider.
3. **Other suitable hosting options:** Consider alternatives based on Next.js compatibility, Node.js runtime needs, and total cost.

## Evaluation Criteria

- Monthly cost and free-tier limitations.
- Next.js rendering and build compatibility.
- Monorepo root-directory configuration.
- Build minutes, bandwidth, and deployment limits.
- Backend runtime requirements and availability.
- PostgreSQL availability, connection limits, backups, and cost.
- Custom domain and HTTPS support.
- Environment-variable management.
- Logs, monitoring, and debugging.
- Expected traffic and future scaling needs.
- Portability and migration effort.

## Consequences

- The project avoids committing prematurely to a provider.
- The initial frontend deployment can be selected independently of the future backend.
- A comparison is required before production infrastructure is finalized.
- Cost assumptions must be revisited as traffic and functionality grow.

## Constraints

- Do not claim a provider has been selected until the comparison is complete.
- Do not deploy an unnecessary backend for the MVP.
- Do not commit credentials or production environment files.
- Document final selections and their rationale in a superseding or updated ADR.

## Trigger for Re-evaluation

Evaluate frontend hosting before the MVP production launch. Evaluate backend and database hosting when the first backend-dependent feature is ready to implement.

## References

- `specs/architecture.md`
- `specs/requirements.md`
