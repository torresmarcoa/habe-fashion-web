# ADR-007: Store Portfolio Content as Typed TypeScript Modules

- **Status:** Accepted
- **Date:** 2026-10-09

## Context

The MVP needs to display designer categories, a portfolio gallery, business information, social media links, and a WhatsApp contact destination.

Two requirements constrain how that content is stored:

- **REQ-CONTENT-001** allows placeholder content during development.
- **REQ-CONTENT-002** requires placeholder content to be replaceable with designer-supplied content *without structural changes to unrelated application functionality*.

`specs/architecture.md` §5 states explicitly that the content approach must be finalized before implementation, and §15 previously listed "Portfolio content management" as an open decision. This ADR resolves that decision.

The volume of content is small and mostly static. There is no requirement for a database, an administrative interface, or content that changes without a code deployment.

## Decision

Store portfolio content as typed TypeScript modules under `src/content/` in the frontend application, with one module per concern:

```text
src/content/
├── site.ts          Brand names, description, navigation, social profiles
├── about.ts         Hero, content section, and call-to-action copy
├── categories.ts    Design categories and their descriptions
├── gallery.ts       Portfolio items and their media references
└── runtime.ts       Public environment-variable configuration
```

Each module exports a value constrained by an explicit TypeScript type. Presentation components receive this content through props and must not import content data directly for rendering decisions.

The module set grows with the product; the pattern does not change. Adding a section of copy means adding a module or extending one, not changing presentation logic.

`runtime.ts` is the exception to "content in code": it holds values that must change without a deployment. It may only contain configuration that is safe to expose to the browser (REQ-SEC-003), such as the WhatsApp number and public social profile URLs. It must never contain a secret. Every value it reads is documented in the application's `.env.example`.

Do not introduce a database, CMS, or content API for the MVP.

## Alternatives Considered

1. **Typed TypeScript modules:** Selected. Content is validated by the compiler, requires no dependency, and needs no separate authoring format.
2. **JSON files with a runtime schema:** Would decouple content from TypeScript types, but requires adding a validation library and a build step to catch errors that TypeScript already catches for free.
3. **Markdown or MDX files:** Suits editorial content with substantial prose. The MVP's content is short structured data, and MDX adds a build-time compilation surface.
4. **Headless CMS:** Would let the designer update content without a developer, which is a real future need. It introduces an external service, a credential, and a cost before any approved requirement demands it.

## Consequences

### Positive

- Content shape errors fail the production build rather than rendering incorrectly at runtime.
- Replacing placeholder content is a data-only change; components are not touched, satisfying REQ-CONTENT-002.
- No dependency, service, or credential is added for content storage.
- `any` is structurally impossible for content values.
- Search engines receive complete server-rendered HTML because content is available at render time, supporting REQ-SEO-003 and REQ-SEO-007.

### Trade-offs

- Content changes require a code change and a deployment. This is acceptable while content changes rarely, and unacceptable once the designer needs frequent updates.
- The repository remains the source of truth for content, so business details are visible in a public repository. Only non-sensitive business information belongs here.
- Introducing a CMS later means moving content out of the content module. Types should be retained at the boundary to keep components insulated from that change.

## Constraints

- Do not add a database, headless CMS, or content API for the MVP.
- Do not put credentials, private client information, or the designer's phone number in committed source files.
- Do not import content directly into leaf presentation components; pass it through props.
- `runtime.ts` must hold only client-safe configuration. Any value that must stay on the server requires a new decision, because this module is bundled to the browser.
- When a content-management requirement is approved, revisit this ADR rather than layering a CMS behind the existing modules.

## References

- `specs/product.md` §6 (Content)
- `specs/requirements.md` REQ-CONTENT-001, REQ-CONTENT-002, REQ-CONTACT-005
- `specs/architecture.md` §5 (Frontend Architecture)