# ADR-005: Defer Backend Implementation Until Required

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

The MVP is a public fashion portfolio. Its initial functionality includes navigation, design showcases, a gallery, social media links, and WhatsApp contact.

These features can be delivered without a custom application backend.

Implementing and deploying an unused backend would add complexity and potentially recurring costs without providing necessary MVP functionality.

## Decision

Build and deploy the frontend first. Introduce the Node.js and Express backend when an approved requirement needs server-side logic, persistent application data, or protected integrations.

Keep the planned backend directory in the monorepo, but do not require it to contain a working application during the initial MVP.

## Alternatives Considered

1. **Build and deploy both applications immediately:** Rejected because the MVP does not currently require a backend.
2. **Create the backend but delay its deployment:** Also possible, but still introduces implementation and maintenance work before there is a concrete need.
3. **Build the frontend first and add the backend later:** Selected because it minimizes initial complexity and infrastructure costs.

## Consequences

### Positive

- Faster focus on the public portfolio.
- Fewer services to configure and maintain initially.
- No unnecessary backend hosting expense.
- Backend design can be guided by real requirements rather than assumptions.

### Trade-offs

- Features requiring persistent data or server-side logic must wait until the backend is introduced.
- Future API contracts and database design will require a dedicated implementation phase.
- The frontend must avoid unnecessary coupling to an API that does not yet exist.

## Constraints

- The MVP must work without the custom backend.
- Do not add API endpoints without a justified requirement.
- Do not introduce a database or backend deployment solely to make the architecture appear complete.
- Revisit this decision when the first backend-dependent feature is approved.

## Trigger for Re-evaluation

Re-evaluate this decision when the product requires functionality such as product management, inventory, order processing, protected administrative features, or other server-side business logic.

## References

- `specs/product.md`
- `specs/requirements.md`
- `specs/architecture.md`
