# Habe Fashion Web

Public fashion portfolio for **Hannia Farfán**, designer behind the **Habe** brand.

This repository is a monorepo containing a portfolio frontend and a placeholder for a future backend.

## Current Status

The MVP is a frontend-only fashion portfolio. E-commerce, payments, inventory, customer accounts, and any administrative interface are explicitly out of scope.

The backend, database, and hosting provider have not been selected. See `specs/architecture.md` for the full list of open decisions.

## Repository Structure

```text
habe-fashion-web/
├── habe-fashion-web-front/   Next.js portfolio application (MVP)
├── habe-fashion-web-back/    Reserved for the future backend; intentionally empty
├── specs/                    Product, requirements, and architecture documents
├── docs/                     Engineering rules, harness, and ADRs
├── .agents/skills/           Agent skills used during development
├── .gitignore
└── README.md
```

## Documentation

Start here, in this order:

1. `specs/product.md` — product vision, scope, and open product decisions.
2. `specs/requirements.md` — numbered requirements and acceptance criteria.
3. `specs/architecture.md` — technical structure, constraints, and open decisions.
4. `docs/engineering-rules.md` — engineering constraints for humans and agents.
5. `docs/adr/` — accepted technical decisions and their rationale.

Requirements are identified as `REQ-<AREA>-<NNN>`. Work should reference the requirement it satisfies whenever practical.

## Development

Setup, verification, and build commands are documented in `docs/engineering-rules.md` once the frontend application is established.

## License

Not yet specified.