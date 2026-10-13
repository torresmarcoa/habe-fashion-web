# Habe Fashion Web — Architecture

**Status:** Proposed architecture
**Last updated:** October 8, 2026

## 1. Purpose

This document defines the technical architecture for Habe Fashion Web, including the frontend, future backend, data storage, media delivery, security, testing, and deployment strategy.

It supports the following product documents:

- `specs/product.md`
- `specs/requirements.md`

The architecture must support the initial fashion portfolio while allowing the product to evolve into an e-commerce platform without requiring an unnecessary rewrite.

## 2. Architectural Decisions and Principles

The project will follow these principles:

1. **Frontend-first MVP:** Build and deploy the public portfolio without requiring a backend.
2. **Backend when needed:** Introduce backend services when actual requirements need server-side logic, persistent application data, or protected integrations.
3. **Separation of concerns:** Keep frontend and backend in independent application directories within the same monorepo.
4. **API only when justified:** Use backend APIs for functionality that requires them; do not route static content through an API without a concrete reason.
5. **Managed media delivery:** Use Cloudinary for image and video storage, transformations, and delivery.
6. **Relational data when needed:** PostgreSQL is the planned relational database for future application data. The access library and migration tooling remain TBD.
7. **Security by default:** Keep credentials and private configuration out of source control and client-side code.
8. **Incremental evolution:** Make decisions based on current requirements while preserving reasonable options for future e-commerce functionality.

## 3. Repository Structure

The project will use a public GitHub monorepo.

```text
habe-fashion-web/
├── habe-fashion-web-front/
├── habe-fashion-web-back/
├── specs/
│   ├── product.md
│   ├── requirements.md
│   ├── architecture.md
│   └── features/
├── docs/
│   └── adr/
├── .agents/
│   └── skills/
├── .gitignore
└── README.md
```

### Repository rules

- `habe-fashion-web-front/` contains the Next.js frontend.
- `habe-fashion-web-back/` is reserved for the future Node.js and Express backend.
- Each application must have its own dependencies, scripts, configuration, and build process.
- Shared specifications and engineering documentation live at the repository root.
- The frontend and backend may be built and deployed independently.
- Secrets, local environment files, generated files, and dependency directories must be excluded from Git as appropriate.
- `.env.example` may document the names of required environment variables, using placeholder or empty values rather than real credentials.
- Agent skills live in `.agents/skills/`, following the Agent Skills layout. Installed third-party skills are versioned so the development environment is reproducible.

### Git branches

- `main` is the production branch. It only receives reviewed changes.
- `develop` is the integration branch where day-to-day work lands.

Feature work branches from `develop`. Changes reach `main` through a pull request after review and verification.

**Consequence:** The repository is prepared for a separate backend, but the initial MVP does not need to implement or deploy one. The backend directory may remain a documented placeholder until its first approved requirement is ready.

## 4. High-Level Architecture

### MVP architecture

```text
Visitors
   |
   v
Next.js Frontend
   |
   +---- Static and portfolio content
   |
   +---- Cloudinary-hosted images and videos
   |
   +---- WhatsApp contact links
   |
   +---- Social media links
```

The initial portfolio can render its content through Next.js without depending on a custom backend.

Cloudinary handles media delivery. WhatsApp handles custom-dress inquiries and direct contact. Social media links direct visitors to the designer's existing profiles.

### Future architecture

```text
Visitors
   |
   v
Next.js Frontend
   |
   | HTTPS REST API (when required)
   v
Node.js + Express Backend
   |
   +---- PostgreSQL
   |
   +---- Cloudinary integration
   |
   +---- Future business logic
```

This second diagram represents the intended direction when server-side functionality becomes necessary. It is not a requirement to implement every component during the MVP.

## 5. Frontend Architecture

### Stack

- **Framework:** Next.js
- **UI library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS

Installed versions: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4. Node.js 20.9 is the framework minimum; Node.js 22 LTS is the development baseline.

### Tooling

- **Testing:** Vitest with React Testing Library and jest-dom, run in jsdom. Playwright is deferred. See `docs/adr/ADR-008-frontend-testing.md`.
- **Linting:** ESLint via its own CLI. Next.js 16 removed `next lint`, so linting runs as a separate step and is not part of `next build`.
- **Bundler:** Turbopack, the default in Next.js 16 for both `next dev` and `next build`.

### Responsibilities

The frontend is responsible for:

- Rendering the fashion portfolio and its navigation.
- Displaying design categories, galleries, and available media.
- Providing WhatsApp contact links and social media links.
- Supporting responsive layouts for mobile, tablet, and desktop.
- Implementing accessibility and SEO requirements.
- Optimizing images, page rendering, and user-perceived performance.
- Presenting content independently of any custom backend during the MVP.

### Routes

```text
/                          Homepage: hero, about sections, gallery teaser, CTA
/galeria                   Gallery index with every item and category links
/galeria/[categoria]       One statically generated route per design category
```

Category routes are generated by `generateStaticParams` from `src/content/categories.ts`, so adding a category produces its route without further code changes. Each route declares its own metadata through `generateMetadata`, giving every category its own title, description, and canonical URL (REQ-SEO-001, REQ-SEO-002, REQ-SEO-008).

Categories are addressed by a URL `slug` that is declared separately from the internal `id`, so a readable URL can differ from the internal identifier.

### Rendering and content

Use Next.js rendering capabilities appropriate for each page. Prefer static generation or server rendering when suitable for SEO and performance.

Keep reusable UI components separate from content and configuration.

Portfolio content is stored as typed TypeScript modules under `src/content/`, one module per concern. This approach is recorded in `docs/adr/ADR-007-portfolio-content.md`. It satisfies REQ-CONTENT-002: designer content replaces placeholder content by editing data files only, and invalid content fails the production build instead of rendering incorrectly. The MVP does not require a database merely to display mostly static information.

Avoid introducing global state management unless the actual functionality requires it.

### Environment configuration

The frontend may use public environment variables for configuration such as a future API base URL.

Any environment variable exposed to browser code must be treated as public. Private credentials and privileged API keys must never be included in client-side bundles.

## 6. Backend Architecture

### Proposed future stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript

### MVP decision

**The backend will not be implemented as a required part of the initial MVP.**

The frontend must be able to deliver the agreed portfolio functionality without a custom backend. The backend application will be introduced when a concrete requirement justifies it.

Potential future reasons to add a backend include:

- Managing products and categories through a backoffice.
- Persisting product, inventory, customer, or order information.
- Validating and processing business operations on the server.
- Integrating with services that require private credentials.
- Supporting authentication, authorization, or payment workflows.

These are future possibilities, not MVP commitments.

### Consequences

- The MVP has fewer moving parts and a simpler deployment process.
- There is no need to maintain an unused API or pay for an unnecessary backend service.
- Features that later require server-side logic will need an implementation phase and potentially additional infrastructure.
- Frontend components should not assume that an API already exists.
- When backend development begins, its contracts and responsibilities must be documented before dependent features are implemented.

The backend stack remains the proposed direction, but its detailed structure and dependencies should be finalized when the first backend feature is approved.

## 7. Database Architecture

### Planned database

**PostgreSQL** is the planned relational database for future persistent application data.

However, the MVP does not require PostgreSQL solely to display the portfolio. The need for a database will be evaluated against the actual content-management and application requirements.

### Decisions still open

The following remain **TBD**:

- PostgreSQL access technology: Knex.js, Prisma, Drizzle, or another justified option.
- Database migration tooling.
- Database hosting provider.
- Connection management and pooling strategy.
- Backup and recovery requirements.

These choices should be made when the first backend feature requires persistent data, considering developer familiarity, maintenance, deployment environment, schema evolution, and total cost.

### Data rules

When the database is introduced:

- Database access must occur on the server, not directly from the browser.
- Use relational constraints and appropriate indexes.
- Manage schema changes through versioned migrations.
- Validate incoming data at the API boundary.
- Never store passwords, API secrets, or payment credentials as ordinary application data.
- Store media references and provider identifiers rather than image or video binaries.

Future product, inventory, and order data should be modeled according to approved requirements rather than added preemptively.

## 8. Media Architecture

### Provider

Cloudinary is the selected provider for image and video storage, transformations, and delivery.

### Responsibilities

- Store and deliver portfolio media.
- Generate appropriately optimized image variants.
- Support responsive image delivery and suitable formats.
- Deliver videos when required by the portfolio.
- Keep media assets separate from the application's relational data.

### Integration approach

During the MVP, the frontend may display Cloudinary-hosted assets without a custom backend, provided the chosen delivery configuration is safe for public access.

Private credentials and privileged upload credentials must not be exposed to the browser.

The following remain TBD until the content-management workflow is defined:

- Whether assets are uploaded manually through the Cloudinary dashboard or through a future administrative interface.
- Naming and folder conventions.
- The upload and authorization strategy for a future backoffice.

Portfolio media references are declared as typed entries in `src/content/`, which resolves the earlier question of whether a media manifest is needed for the MVP. No separate manifest format is introduced.

Cloudinary identifiers and URLs should be managed consistently to make future gallery updates and migrations easier.

### Media delivery

Production media is delivered through Cloudinary URLs built in `src/lib/media.ts`. No Cloudinary SDK is required: assets are uploaded through the Cloudinary dashboard and referenced by public ID, so the application constructs a delivery URL but never uploads.

Delivery URLs are built as:

```text
https://res.cloudinary.com/<cloudName>/image/upload/f_auto,q_auto,w_<width>/<publicId>
```

`f_auto` and `q_auto` satisfy REQ-MEDIA-001 and REQ-MEDIA-005: the browser receives a negotiated format and quality rather than an original-resolution asset. The version segment is deliberately omitted so that replacing an asset in the dashboard takes effect without a code change.

`images.remotePatterns` in `next.config.ts` is restricted to `res.cloudinary.com` over HTTPS. A wildcard host would let any external URL pass through the image optimization endpoint, which REQ-SEC-004 does not permit.

Media references use a single shape accepting either a Cloudinary public ID or a complete local `src`, so a placeholder can be replaced by a production asset without changing content types. When a reference has no resolvable URL, components render a neutral branded block instead of a broken image, which is what keeps the hero understandable when media is unavailable (REQ-HERO-004).

## 9. Frontend–Backend Communication

### MVP

The frontend must not require a custom API for static portfolio content or direct external links.

It can communicate directly with public services where appropriate, such as retrieving publicly deliverable Cloudinary assets and opening WhatsApp links.

### Future backend integration

When backend functionality is introduced:

- Use HTTPS for communication.
- Expose a configurable API base URL.
- Validate and normalize request data on the server.
- Return consistent HTTP status codes and documented response structures.
- Configure CORS to allow only the necessary frontend origins.
- Keep server-side credentials and privileged operations on the backend.

The following remain TBD:

- API error-response format.
- API versioning strategy.
- API documentation approach.
- Request validation library.
- Authentication and authorization mechanisms, if needed.

Do not create endpoints simply to serve content that can be delivered more simply and safely by the frontend or an appropriate managed service.

## 10. Security and Configuration

Security requirements apply from the beginning, even when the MVP has no custom backend.

- Keep `.env` files containing local secrets out of source control.
- Provide `.env.example` files with placeholder values where needed.
- Never commit real API keys, passwords, access tokens, or private certificates.
- Never expose server-side secrets through public frontend environment variables.
- Use HTTPS in production.
- Minimize third-party scripts and dependencies.
- Validate and authorize requests on the server when backend functionality exists.
- Restrict Cloudinary upload capabilities according to the chosen workflow.
- Apply least-privilege access to infrastructure and external services.
- Document security-sensitive configuration without documenting actual secret values.

Because the repository is public, every file committed to it must be treated as publicly accessible.

## 11. Testing and Quality Assurance

Testing should be proportional to the functionality being implemented.

### Frontend

Verify:

- Navigation and links work correctly.
- WhatsApp links open the intended contact destination.
- Social media links point to the correct profiles.
- Galleries and media display correctly.
- Layouts work across supported viewport sizes.
- Keyboard navigation and accessibility requirements are met.
- SEO metadata and page rendering are correct.
- Loading behavior and performance meet the project's targets.

### Future backend

When a backend is introduced, test:

- Request validation.
- Expected status codes and response formats.
- Business rules and failure scenarios.
- Database operations and migration behavior.
- Authentication and authorization, where applicable.
- Integration boundaries with external services.

### Required verification

Before considering an implementation complete, run the relevant available checks:

- TypeScript type checking.
- Linting.
- Automated tests.
- Production build.
- Relevant accessibility and performance audits.

The exact scripts and thresholds will be documented in engineering rules and the project harness once the application setup is established.

Do not claim a check passed unless it was actually run and its result was verified.

### Current frontend verification commands

Established when the frontend application was scaffolded and documented in `habe-fashion-web-front/README.md`:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run test:run    # vitest run
npm run build       # next build
npm run verify      # all four, in sequence
```

`npm run verify` in `habe-fashion-web-front/` is the gate before a pull request.

Note that Next.js 16 removed `next lint`, so `next build` no longer runs linting. Linting is a separate step and must be run explicitly.

## 12. Deployment Architecture

### MVP deployment decision

The deployment strategy remains **TBD** pending a comparison of costs, technical requirements, limitations, and maintenance needs.

The MVP needs a production deployment for the frontend. A separate backend deployment is not required until backend functionality exists.

### Candidates to compare

- **Frontend:** Vercel and other suitable Next.js hosting options.
- **Backend:** Render and other suitable Node.js hosting options, when required.
- **Database:** Managed PostgreSQL providers, when required.

These are candidates, not final provider selections.

### Evaluation criteria

Compare options based on:

- Free-tier limitations and paid-tier pricing.
- Build and deployment requirements for a monorepo.
- Root-directory configuration for each application.
- Custom domain and HTTPS support.
- Bandwidth, build minutes, storage, and usage limits.
- Serverless versus persistent server requirements.
- Backend availability, cold starts, and operational limits.
- PostgreSQL hosting, connection limits, backups, and storage costs.
- Environment-variable management.
- Logs, monitoring, and troubleshooting.
- Expected traffic and future growth.
- Migration difficulty and vendor lock-in.

### Deployment principles

Regardless of the final provider:

- The frontend must be independently buildable and deployable.
- The backend, when introduced, must be independently buildable and deployable.
- Monorepo deployments must use the correct application root directory.
- Production configuration must be managed separately from local development configuration.
- Do not add a paid backend service to the MVP without a requirement that justifies its cost.

The final hosting provider, service arrangement, and database provider remain **TBD** until the comparison is complete.

## 13. Future E-commerce Evolution

E-commerce is explicitly outside the initial MVP.

The architecture should permit later additions such as:

- Product and category management.
- Sizes, colors, and other product variants.
- Inventory management.
- Shopping cart and checkout.
- Orders and payment integration.
- Customer accounts, if justified.
- A protected backoffice for managing products and orders.
- Authentication, authorization, and audit-sensitive operations.

These features will likely require a backend and a relational database, but their exact implementation must follow approved future requirements.

Custom-dress inquiries will continue to use WhatsApp unless the product requirements are explicitly changed.

Do not implement e-commerce infrastructure, payment workflows, inventory systems, or a backoffice in advance of the corresponding approved scope.

## 14. Constraints and Non-Goals

The architecture must respect the following constraints:

- The initial product is a fashion portfolio, not an online store.
- The initial frontend must not depend on an unavailable backend.
- The project uses a monorepo with separate frontend and backend directories.
- Cloudinary handles media delivery.
- Media binaries are not stored in PostgreSQL.
- WhatsApp is the primary contact channel.
- Secrets must never be committed to the public repository.
- Hosting, database access tooling, and migration tooling remain open decisions until evaluated.
- Technical agents must not silently replace agreed architectural decisions.

## 15. Open Decisions

The following decisions remain unresolved and must be tracked rather than guessed.

| Decision                         | Status                                | Resolved by                     |
| -------------------------------- | ------------------------------------- | ------------------------------- |
| Frontend framework               | Resolved: Next.js with React and TypeScript | ADR-001                    |
| Frontend styling                 | Resolved: Tailwind CSS                | ADR-001                         |
| Monorepo structure               | Resolved: separate applications      | ADR-002                         |
| Media provider                   | Resolved: Cloudinary                  | ADR-003                         |
| Backend implementation timing    | Resolved: deferred until required    | ADR-005                         |
| Portfolio content management     | Resolved: typed TypeScript content   | ADR-007                         |
| Frontend testing framework       | Resolved: Vitest with React Testing Library | ADR-008                  |
| Backend stack                    | Node.js, Express, and TypeScript proposed | Before the first backend feature |
| PostgreSQL access library        | TBD                                   | Before database implementation   |
| Database migration tooling       | TBD                                   | Before the first schema change   |
| Database hosting                 | TBD                                   | When persistent application data is required |
| Frontend hosting                 | TBD                                   | Before production deployment     |
| Backend hosting                  | TBD                                   | Before deploying the backend     |
| Deployment arrangement           | TBD; compare costs and requirements | Before selecting production infrastructure |
| API error format                 | TBD                                   | Before the first API endpoint    |
| API versioning                   | TBD                                   | Before public or versioned API contracts are needed |
| API documentation                | TBD                                   | Before the API grows beyond its initial endpoints |
| Backend testing framework        | TBD                                   | Before the first backend feature |
| Cloudinary upload workflow       | TBD                                   | Before implementing content uploads |
| Authentication and authorization | Future requirement; details TBD       | Before protected administrative features |
| Payment provider                 | Future e-commerce decision            | Before checkout implementation   |
| Custom domain                    | TBD                                   | Before production launch         |

## 16. Proposed Architecture Decision Records (ADRs)

Create individual records under `docs/adr/` when decisions need a durable rationale.

Existing records:

- `ADR-001`: Select Next.js for the frontend. (Accepted)
- `ADR-002`: Keep frontend and backend as separate applications in one monorepo. (Accepted)
- `ADR-003`: Use Cloudinary for image and video delivery. (Accepted)
- `ADR-004`: Plan for PostgreSQL as the relational database. (Proposed)
- `ADR-005`: Defer backend implementation until a concrete requirement needs it. (Accepted)
- `ADR-006`: Select hosting and deployment strategy after comparing costs and requirements. (Deferred)
- `ADR-007`: Store portfolio content as typed TypeScript modules. (Accepted)
- `ADR-008`: Test the frontend with Vitest and React Testing Library. (Accepted)

Potential future records:

- `ADR-009`: Select PostgreSQL access and migration tooling when database implementation begins.

Each ADR should include:

- Context and problem.
- Options considered.
- Decision and rationale.
- Consequences and trade-offs.
- Status and date.

An ADR should record a decision once it has been evaluated and accepted, rather than treating every candidate as already selected.

## 17. Architecture Evolution Rules

When requirements change or new functionality is proposed:

1. Review the product specification and requirements.
2. Determine whether the change requires an architectural decision.
3. Update this document and create or amend an ADR when appropriate.
4. Identify effects on security, cost, performance, testing, and deployment.
5. Update the engineering rules and project harness if agent behavior or verification requirements change.
6. Implement only the approved scope.

AI agents must not silently introduce a database, backend deployment, new framework, payment system, or additional infrastructure without a requirement and an appropriately documented decision.

The architecture should evolve with the product—not ahead of it.
