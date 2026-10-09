# ADR-003: Use Cloudinary for Image and Video Delivery

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

The website depends on high-quality fashion photography and may include videos. Media delivery must support performance, responsive presentation, and future growth.

The portfolio needs media hosting without requiring the project to operate its own file-storage infrastructure.

## Decision

Use Cloudinary to store, transform, and deliver public portfolio images and videos.

Store media references or provider identifiers in application content or database records when appropriate. Do not store media binaries in PostgreSQL.

During the MVP, public assets may be managed through Cloudinary's existing interface without building a custom upload system.

## Alternatives Considered

1. **Cloudinary:** Selected for managed media storage, transformations, and delivery.
2. **Self-hosted media storage:** Would increase infrastructure and operational responsibilities.
3. **Another managed object-storage provider:** May be suitable, but would require evaluating image transformations, delivery, and operational complexity.

## Consequences

### Positive

- Reduces the need to implement media processing and delivery infrastructure.
- Supports image optimization and responsive delivery.
- Separates media storage from application hosting.
- Can support future portfolio and product imagery.

### Trade-offs

- The project depends on an external provider.
- Usage limits and paid-tier costs must be monitored.
- Media organization and naming conventions need documentation.
- Public delivery URLs and upload permissions must be configured carefully.

## Constraints

- Never expose privileged Cloudinary credentials in frontend code.
- Do not build a custom upload interface until an approved requirement needs it.
- Use suitable image transformations and responsive delivery.
- Keep media identifiers organized to support future maintenance.

## Open Questions

- What naming and folder conventions should be used?
- How will the designer provide and organize new assets?
- Will a future backoffice need a controlled upload workflow?

## References

- `specs/product.md`
- `specs/requirements.md`
- `specs/architecture.md`
