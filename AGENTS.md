<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

A single-page Next.js 16 landing page for a book-sharing library. Only `/` is implemented; the Navbar and Footer still link to routes such as `/books`, `/login`, `/register`, `/add-book`, `/my-books`, and `/my-borrows`, which do not exist yet.

## Commands

- `npm run dev` — Turbopack dev server on :3000. `next dev` rewrites the managed blocks in this file; keep them committed.
- `npm run build` — production build; it also runs TypeScript.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — bare `eslint` with the flat config. There is no test runner or CI.
- Node >= 20.9 is required by Next 16.4.3. Use npm; `package-lock.json` is the lockfile.

## Next.js 16 configuration

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`, and `experimental.agentFeedback`. Do not disable these to work around an error.
- Cache Components forbids unstable values during prerender (`new Date()`, `Math.random()`, etc.). `Footer` gets the copyright year through a `"use cache"` function with `cacheLife("days")`; keep that pattern.
- `next/image` remote images are allowlisted to `images.unsplash.com` only; add other hosts in `next.config.ts`.

## Architecture

- App Router lives in `src/app`; `@/*` maps to `src/*`. Home components are under `src/app/components/home/`.
- `layout.tsx` wraps the app in `providers.tsx` (`next-themes`), then renders `Navbar`, `<main>`, and `Footer`.
- `Banner.tsx` is a client component using Swiper. It renders a static first slide during SSR/hydration via `useMounted`, so the hero is never blank. Autoplay is disabled when `prefers-reduced-motion` is set.
- `ThemeToggle.tsx` toggles the `class` strategy used by `next-themes`. `globals.css` defines the matching `@custom-variant dark`.
- `src/lib/auth-client.ts` is the only auth code: a better-auth React client. There is no server auth route, database, or env setup, so sessions do not work end-to-end yet.

## Styling

- Tailwind CSS v4 plus daisyUI 5, configured CSS-first in `globals.css`. There is no `tailwind.config`.
- Use the semantic tokens in `@theme` (`paper`, `ink`, `navy`, `slate`, `muted`, `line`, `teal`, `brass`, `cream`) instead of raw hex values.
- Headings use `font-serif`, mapped to Fraunces via `--font-serif`; body text uses Geist.
- `brass` (`#D6A85F`) is for accents on dark backgrounds. For small text on the light `paper` background, use `brass-dark` (`#8A5A16`) to keep contrast.
- Dark mode uses explicit `dark:` variants; there are no CSS-variable theme swaps.
