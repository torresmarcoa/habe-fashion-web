# Habe Fashion Web — Frontend

Next.js application for the Habe fashion portfolio by Hannia Farfán.

Part of the `habe-fashion-web` monorepo. See the repository root `README.md` and `specs/` for product and architectural context.

## Stack

Next.js 16 (App Router) with React 19, TypeScript, Tailwind CSS v4, and Vitest with React Testing Library.

## Requirements

- Node.js 20.9 or later (Next.js 16 minimum; Node 22 LTS recommended)
- npm

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000.

The build succeeds with an empty `.env.local`. The WhatsApp contact action renders as disabled and unconfigured social profiles are omitted until real values are supplied.

## Verification Commands

| Command | Purpose |
|---|---|
| `npm run typecheck` | TypeScript type checking, no emit |
| `npm run lint` | ESLint via the CLI |
| `npm run test` | Vitest in watch mode |
| `npm run test:run` | Vitest, single run |
| `npm run build` | Production build |
| `npm run verify` | Runs typecheck, lint, tests, and build in sequence |

Run `npm run verify` before opening a pull request.

## Environment Variables

See `.env.example` for the full list and what each variable is for.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Designer's WhatsApp number, international format, digits only |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook profile URL |

Every `NEXT_PUBLIC_*` value is inlined into the client bundle at build time and is therefore public. Use only values safe to expose publicly. Never add an API secret, token, or password to this file.

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx              Root layout, metadata, header, footer
│   ├── page.tsx                Homepage
│   ├── globals.css             Brand tokens and global styles
│   └── galeria/
│       ├── page.tsx            Gallery index at /galeria
│       └── [categoria]/        One static route per design category
├── components/                 Presentational components
├── content/                    Portfolio content and runtime configuration
├── lib/                        Pure helpers with no framework dependency
├── types/                      Shared TypeScript types
tests/                          Vitest suites
```

Portfolio content lives in `src/content/` as typed modules. Replacing placeholder content with designer-supplied content is a data-only change. See `docs/adr/ADR-007-portfolio-content.md` in the repository root.

## Routes

| Route | Source | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | Static |
| `/galeria` | `app/galeria/page.tsx` | Static |
| `/galeria/[categoria]` | `app/galeria/[categoria]/page.tsx` | Statically generated, one path per category |

Categories are defined in `src/content/categories.ts`. Adding a category adds its route automatically through `generateStaticParams`, plus its link on the homepage and in the gallery. A category with no items yet renders an honest empty state rather than being hidden.

## Notes

`AGENTS.md` in this directory is generated and maintained by `next dev`. It points coding agents at the version-matched Next.js documentation in `node_modules/next/dist/docs/`. Commit changes to it alongside your work.