<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

Next.js 16 App Router frontend for a book-sharing library. Catalog, borrowing, and public-profile data come from a separate API at `http://localhost:5000` (not in this repo); accounts use better-auth + MongoDB. Routes: `/`, `/books`, `/books/[id]`, `/add-book`, `/login`, `/register`, `/my-books`, `/my-borrows`, `/profile`, `/userProfileUpdate`, and `/api/auth/[...all]`.

## Commands

- `npm run dev` — Turbopack dev server on :3000. `next dev` rewrites the managed block above; keep it committed.
- `npm run build` — production build; it also runs TypeScript. It succeeds without the book API running because `/` and `/books` render dynamically.
- `npm run typecheck` — `tsc --noEmit`. Run it after route changes because route types are generated.
- `npm run lint` — bare `eslint` with the flat config. There is no test runner or CI; lint currently reports warnings only.
- Node >= 20.9. Use npm; `package-lock.json` is the lockfile.

## Runtime prerequisites

- `.env` (gitignored) must provide `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.
- `src/app/lib/auth.ts` connects to MongoDB database `booknook` and enables email/password plus Google auth. `src/app/api/auth/[...all]/route.ts` exposes it via `toNextJsHandler`.
- `src/app/lib/auth-client.ts` hardcodes `baseURL: "http://localhost:3000"`; change it if the dev server runs elsewhere.
- The book API URL is hardcoded as `http://localhost:5000` in every page/component that uses it. There is no env var or Next proxy route; update all call sites together.
- `NewArrivalBooks` and `PopularBooks` fetch without try/catch, so the API being down breaks `/`. `Categories`, `/books`, and `/books/[id]` handle fetch failures.
- `next/image` allows only `encrypted-tbn*.gstatic.com`, `covers.openlibrary.org`, `images.unsplash.com`, and `lh3.googleusercontent.com`. Add-book accepts arbitrary image URLs, so other hosts fail at render; add hosts in `next.config.ts`.

## Book API contract

- `GET /book`, `GET /book?category=`, `GET /book/:id` — detail returns either a bare book or `{ book }`.
- `GET /categories`, `GET /popular-books`.
- `POST /add-book` — book fields plus `userName` and `userEmail`.
- `GET /my-books?email=`, `PUT|DELETE /my-books/:id?email=`.
- `GET /my-borrows?email=`, `POST /my-borrows` to borrow; `POST /return-book` with `{ borrowId, bookId, userEmail }`.
- `GET|PUT /user-profile?email=`.

Most calls run in client components; only the home sections, `/books`, and `/books/[id]` fetch on the server.

## Architecture

- App Router is `src/app`; `@/*` maps to `src/*`. Shared helpers live in `src/app/lib/`, not `src/lib/` (which does not exist).
- `layout.tsx` renders `providers.tsx` (`next-themes`, class strategy), `Navbar`, `<main>` (also containing the `sonner` Toaster), and `Footer`.
- Home is `Banner` (Swiper; static first slide via `useMounted`, autoplay off under reduced motion) + `NewArrivalBooks` + `Categories` + `PopularBooks`.
- Book records use `_id`, `bookName`, `author`, `category`, `price`, `rating`, `image`, `description`, `publishedYear`, `availableCopies`, `isNewArrival`, `userEmail`, and `userName`; the shape is redeclared in several files.
- Auth is entirely client-side: `authClient.useSession()` gates Navbar links/add-book, and protected pages render a "Please Login First" state. There is no middleware or server-side route guard; requests identify the user with an email query/body parameter.
- `/profile` reads name/image from the book API's `/user-profile`, not the better-auth user record; `/userProfileUpdate` PUTs back to that endpoint.
- Naming quirks: `my-books/DeletetBook.tsx` (typo) exports `DeleteBook`, and the profile editor route is `/userProfileUpdate` in camelCase. `add-book` links to `/signIn`, which does not exist; the login route is `/login`.

## Next.js 16 notes

- `cacheComponents` and `partialPrefetching` are **false**; `reactCompiler` and `experimental.agentFeedback` are on. Do not disable these to work around an error.
- `params` and `searchParams` are Promises: await them (`books/[id]`, `books/page.tsx`).
- Route types are generated (`LayoutProps<"/">`, `.next/types`); `npm run typecheck` covers them after route edits.

## Styling

- Tailwind CSS v4 + daisyUI 5, CSS-first in `globals.css`; there is no `tailwind.config`. It imports `shadcn/tailwind.css` and defines `@custom-variant dark` for the class strategy (not CSS-variable theme swaps).
- Prefer the `@theme` tokens: `paper`, `paper-2`, `paper-3`, `ink`, `ink-2`, `navy`, `slate`, `muted`, `line`, `line-strong`, `teal`, `teal-dark`, `brass`, `brass-light`, `brass-dark`, `cream`, `cream-muted`, `cream-subtle`, `danger`, `danger-light`, `danger-bg`. Many existing pages use raw hex (`#C59D5F`, `#172A3A`, `#FAF9F6`); match the surrounding file rather than mass-converting.
- Headings use `font-serif` (Fraunces); body text uses Geist. `--font-heading` is aliased to the sans stack, so use `font-serif`, not `font-heading`, for display type.
- `brass` (`#D6A85F`) is for accents on dark backgrounds; use `brass-dark` (`#8A5A16`) for small text on `paper`.
- shadcn is configured (`components.json`, `base-nova`, base-ui). Its `@/lib` and `@/hooks` aliases point at `src/lib`/`src/hooks`, which do not exist; generated files may import `@/lib/utils`. The real helper is `@/app/lib/utils`, which re-exports `cn` from the `cn` package (not clsx/tailwind-merge). `src/components/ui/button.tsx` is currently unused.
