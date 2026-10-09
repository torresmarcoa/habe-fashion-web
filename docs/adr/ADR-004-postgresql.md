# ADR-004: Plan to Use PostgreSQL for Relational Application Data

- **Status:** Proposed
- **Date:** 2026-10-08

## Context

Future versions of Habe Fashion Web may require persistent structured data for products, categories, variants, inventory, and orders.

These entities have relationships and consistency requirements that make a relational database a reasonable candidate.

The initial portfolio MVP does not require a database merely to display its content.

## Decision

Plan to use PostgreSQL as the relational database when approved backend requirements introduce a need for persistent application data.

Do not provision a database solely for the initial static portfolio.

## Alternatives Considered

1. **PostgreSQL:** Proposed because it supports relational data, constraints, transactions, and structured queries.
2. **Other relational databases:** Could meet similar needs, depending on hosting and operational constraints.
3. **Document database:** Could be appropriate for some data models, but is not currently justified by the known requirements.
4. **No database for the MVP:** Selected for the initial portfolio where persistent application data is unnecessary.

## Consequences

### Potential benefits

- Provides a relational foundation for future products, variants, inventory, and orders.
- Supports transactional operations and data integrity.
- Can accommodate evolving application requirements.

### Trade-offs

- Introduces database hosting, backups, migrations, and connection management when implemented.
- Schema changes must be planned and tested.
- The access library and migration tooling require separate evaluation.

## Deferred Decisions

The following remain TBD:

- PostgreSQL access technology: Knex.js, Prisma, Drizzle, or another option.
- Migration tooling.
- Database hosting provider.
- Connection pooling and backup strategy.

These choices must be evaluated before implementing the first database-backed feature.

## Constraints

- Do not provision a database for the MVP without a concrete requirement.
- Do not store image or video binaries in the database.
- Do not expose database credentials to the browser.
- Use versioned migrations when schema management is introduced.

## References

- `specs/architecture.md`
- `specs/requirements.md`
