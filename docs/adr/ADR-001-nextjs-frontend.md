# ADR-001: Use Next.js for the Frontend

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

Habe Fashion Web is a public fashion portfolio that showcases the designer's work through images, videos, design categories, and contact links.

The website must prioritize SEO, accessibility, responsive design, and performance. It should also support future product pages and other functionality without requiring a complete frontend rewrite.

The project uses React and TypeScript, and the frontend is maintained separately from the planned backend application.

## Decision

Use Next.js as the frontend framework, with React and TypeScript.

Use Tailwind CSS for styling.

Select appropriate Next.js rendering strategies based on the needs of each page, prioritizing static generation or server rendering when beneficial for SEO and performance.

## Alternatives Considered

1. **Next.js:** Provides a React-based framework with routing, rendering options, and SEO-friendly capabilities.
2. **Vite with React:** Provides a flexible React development and build environment, but additional decisions and implementation may be needed for server rendering and SEO.
3. **Other frameworks:** Could be evaluated if project requirements change significantly.

## Consequences

### Positive

- Provides rendering options suitable for a public portfolio.
- Supports reusable React components and TypeScript.
- Offers a foundation for future expansion.
- Provides routing and framework conventions that can guide consistent implementation.

### Trade-offs

- Introduces framework conventions that developers and agents must follow.
- Deployment and rendering behavior must be considered when selecting hosting.
- The team must avoid unnecessary client-side JavaScript and use framework capabilities appropriately.

## Constraints

- Do not introduce Vite as a second frontend framework.
- Do not add a separate routing library unless a documented requirement justifies it.
- Do not default every page or component to client-side rendering.
- Validate SEO, accessibility, and production build behavior.

## References

- `specs/product.md`
- `specs/requirements.md`
- `specs/architecture.md`
