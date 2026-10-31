<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

Next.js 16 App Router frontend for a book-sharing library. Catalog data comes from a separate API at `http://localhost:5000`; accounts use better-auth + MongoDB. Implemented routes: `/`, `/books`, `/books/[id]`, `/add-book`, `/login`, `/register`, and `/api/auth/[...all]`. Navbar/Footer also link to `/my-books`, `/my-borrows`, and `/profile`, which do not exist yet.

## Commands

- `npm run dev` — Turbopack dev server on :3000. `next dev` rewrites the managed block above; keep it committed.
- `npm run build` — production build; it also runs TypeScript. It succeeds without the book API running because `/` and `/books` are dynamic.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — bare `eslint` with the flat config. There is no test runner or CI.
- Node >= 20.9 is required by Next 16.4.3. Use npm; `package-lock.json` is the lockfile.

## Runtime prerequisites

- `.env` (gitignored) must provide `MONGODB_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
- `src/app/lib/auth.ts` creates a Mongo client from `MONGODB_URL`, uses database `booknook`, and enables email/password auth. `src/app/api/auth/[...all]/route.ts` exposes it via `toNextJsHandler`.
- `src/app/lib/auth-client.ts` hardcodes `baseURL: "http://localhost:3000"`. Update it if the dev server runs elsewhere.
- The book API is hardcoded to `http://localhost:5000` in `books/page.tsx`, `books/[id]/page.tsx`, `books/NewArrivalBooks.tsx`, and `add-book/page.tsx`. Start it before expecting catalog data or add-book to work.
- `NewArrivalBooks` does not catch fetch failures (unlike the books pages), so the API being down breaks `/` at runtime.
- `next/image` allows only `images.unsplash.com` and `covers.openlibrary.org`; add other hosts in `next.config.ts`.

## Next.js 16 notes

- `cacheComponents` and `partialPrefetching` are currently **false**; `reactCompiler` and `experimental.agentFeedback` are on. Do not disable these to work around an error.
- `params` and `searchParams` are Promises: await them (`books/[id]`, `books/page.tsx`).
- Route types are generated (`LayoutProps<"/">`, `.next/types`); run `typecheck` after route changes.

## Architecture

- App Router is `src/app`; `@/*` maps to `src/*`. Imports use `@/app/...`, and shared helpers live in `src/app/lib/`, not `src/lib/`.
- `layout.tsx` renders `providers.tsx` (`next-themes`, class strategy), `Navbar`, `<main>`, and `Footer`.
- Home is `Banner` (Swiper, static first slide via `useMounted`, autoplay off under `prefers-reduced-motion`) + `NewArrivalBooks` + `Categories`.
- Book records use `bookName`, `author`, `category`, `price`, `rating`, `image`, `publishedYear`, `availableCopies`, and `isNewArrival`; the shape is redeclared in several files. The detail endpoint accepts either a bare book or `{ book }`.
- Auth UI is client-side: `authClient.useSession()` gates Navbar links and add-book; login/register call `signIn.email` / `signUp.email` then `redirect("/")`.
- `src/app/books/page.tsx` and `books/[id]/page.tsx` contain large commented-out earlier versions at the top. Edit the live code below them.

## Styling

- Tailwind CSS v4 + daisyUI 5, configured CSS-first in `globals.css`; there is no `tailwind.config`. It also imports `shadcn/tailwind.css` and defines `@custom-variant dark` for the class strategy.
- Prefer the `@theme` tokens (`paper`, `paper-2`, `ink`, `ink-2`, `navy`, `slate`, `muted`, `line`, `teal`, `brass`, `brass-dark`, `cream`, `danger`) over raw hex. Some book/auth pages still use raw hex; match the surrounding file rather than mass-converting.
- Headings use `font-serif` (Fraunces); body text uses Geist.
- `brass` (`#D6A85F`) is for accents on dark backgrounds; use `brass-dark` (`#8A5A16`) for small text on `paper`.
- Dark mode uses explicit `dark:` variants, not CSS-variable theme swaps.
- shadcn is configured (`components.json`, `base-nova`, base-ui). Its `@/lib` and `@/hooks` aliases point at `src/lib`/`src/hooks`, which do not exist; shared helpers are in `src/app/lib`. Check generated paths and imports before adding components.
