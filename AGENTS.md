# AGENTS.md

## Project

Nimbus Tech — public marketing website for Nimbus Tech GmbH (German software consultancy). Next.js 15+ App Router, React 19, TypeScript strict, Tailwind CSS v4, Apollo Client + GraphQL, Radix UI, Remix Icons, motion v12.

## Token Efficiency

**Always use caveman mode.** Every response, no exceptions. Default intensity: `full`. Switch via `/caveman lite|full|ultra`. Drop articles, filler, hedging. Fragments OK. Code/commits/PRs: write normal.

## Skills

Use these skills when relevant:

| Skill | Trigger |
|-------|---------|
| `caveman` | All responses (mandatory) |
| `nextjs-typescript` | Any Next.js or TypeScript code |
| `react-best-practices` | React components, hooks, performance |
| `composition-patterns` | Component architecture, refactoring |
| `pragmatic-development` | All code changes (conservative approach) |
| `web-design-guidelines` | UI review, accessibility checks |
| `migrate-radix-to-base` | Radix → Base UI migration |

## Architecture

- **App Router only.** No Pages Router for new code.
- **Server Components** for data fetching. Client Components only for interactivity/browser APIs.
- **GraphQL-first** with mock data fallback (`src/queries/index.ts`).
- **Multilingual** — `en-US` / `de-DE`, slug suffix `-de` convention.
- **Content pipeline** — scripts generate types, icons, mock data, page content, resumes. Run `npm run setup:dev`.

## TypeScript

- `strict: true` non-negotiable. No `any` (use `unknown`, generics).
- Explicit return types on all functions.
- Validate runtime data with Zod (API bodies, env vars, external responses).
- Use `satisfies` over `as` for object shape assertions.

## API Routes

- App Router: `app/api/**/route.ts`. Use `NextRequest`/`NextResponse`.
- One endpoint, one responsibility.
- Consistent JSON envelope: `{ data, error, meta }`.
- Never expose secrets. Read from `process.env` only.
- Support edge runtime where possible.

## Performance

- Eliminate async waterfalls — `Promise.all` for independent awaits.
- Never import heavy libs in Client Components.
- Use initializer callback for expensive `useState` ops.
- Reduce client bundle — prefer Server Components.

## Style

- Tailwind CSS v4. Use `cn()` for conditional classes.
- No `space-x-*`/`space-y-*` — use `flex` + `gap-*`.
- Semantic colors (`bg-primary`, `text-muted-foreground`), never raw hex/rgb.
- `size-*` when width = height. `truncate` shorthand.

## Testing

- Vitest. New logic requires tests unless trivial.
- Deterministic, isolated tests. Behavioral over snapshot.
- Bug fixes must include regression test.

## Verify Before Commit

Typecheck + lint + tests pass. No unnecessary diff churn. No accidental side effects.

## Code Conventions

- Named exports preferred.
- Keep functions small and readable.
- Comments explain "why", not "what".
- Never add dependencies without strong justification.
- Preserve existing structure and tooling.
