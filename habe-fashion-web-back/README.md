# Backend — Reserved, Not Implemented

This directory is intentionally empty.

Habe Fashion Web's MVP is a frontend-only fashion portfolio. Its required functionality — navigation, design categories, a gallery, social media links, and WhatsApp contact — is delivered entirely by the Next.js application in `habe-fashion-web-front/`.

## Why this directory exists

The project uses a monorepo with separate application boundaries. The backend is expected to be a Node.js and Express application in TypeScript, and this directory reserves its location so the backend can be introduced later without reorganizing the repository.

This is a documented placeholder, not unfinished work. See:

- `specs/architecture.md` §6 — Backend Architecture
- `docs/adr/ADR-005-deferred-backend.md` — Defer Backend Implementation Until Required

## When this directory will be populated

Implementation is deferred until an approved requirement needs server-side logic, persistent application data, or protected integrations. Expected triggers include product management, inventory, order processing, or any administrative functionality.

The backend will be independently buildable and deployable, and the MVP does not depend on it existing.

## Do not add code here without an approved requirement

Adding an API endpoint, database schema, or authentication flow before its requirement is approved violates `docs/engineering-rules.md` §3 (Scope Control) and §4 (Architecture and Dependencies).