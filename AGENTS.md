# AGENTS.md

## Overview

`@localizer` — type-safe localization/formatting/translation library. Nx monorepo with 13 packages under `packages/`, all published to npm under the `@localizer` scope.

## Setup

```sh
npm ci --legacy-peer-deps   # --legacy-peer-deps is REQUIRED
```

Node 20+.

## Monorepo Structure

Nx (no `project.json` files) — all targets are inferred by plugins in `nx.json` from each package's `package.json`. The `nx` key in each `package.json` defines custom targets.

```
packages/
  core/                 # Foundation — no internal deps
  transform/            # Depends on core
  format-datetime/      # Depends on core
  format-displayname/   # Depends on core
  format-list/          # Depends on core
  format-lookup/        # Depends on core
  format-number/        # Depends on core
  format-relativetime/  # Depends on core + date-fns
  format/               # Aggregates all format-* + transform
  translate/            # Depends on core + format + messageformat
  x-react/              # React bindings (peer: react ^18/^19)
  x-vue/                # Vue bindings (peer: vue ^3.4)
  all/                  # Meta-package, re-exports everything (no tests)
```

## Build

Packages are built with **tsc** (not Vite/esbuild). The `@nx/js/typescript` plugin uses `tsconfig.lib.json` in each package. Output goes to `dist/`. The `vite.config.ts` in each package exists **only for Vitest**.

Each package has dual tsconfigs: `tsconfig.lib.json` (build) and `tsconfig.spec.json` (tests). The per-package `tsconfig.json` is a composite root referencing both.

Packages use a `"development"` export condition in `package.json` exports to resolve to raw `.ts` source during dev/typecheck. This is enabled by `"customConditions": ["development"]` in `tsconfig.base.json`.

## Commands

```sh
# Build all packages
npx nx run-many -t build

# Build affected packages only
npx nx affected -t build

# Lint
npx nx run-many -t lint

# Test all
npx nx run-many -t test

# Test one package
npx nx test format-number

# Test one file
npx vitest packages/format-number/src/lib/currencyFormatter.spec.ts

# Format (Prettier)
npx nx format

# Typecheck
npx nx run-many -t typecheck
```

CI order: **lint → build → api (API Extractor) → test**

## Testing

- **Vitest** with jsdom, globals enabled, V8 coverage
- Shared config: `vitest.config.json` (root) — a raw JSON file read by each package's `vite.config.ts` via `readFileSync`
- Tests colocated in `src/` next to source files
- **File naming convention matters** — it mirrors the TSDoc release tag of the symbol under test:
  - `*.spec.ts` — tests for public API (`@public` TSDoc directive). These test the stable, documented surface that consumers rely on.
  - `*.test.ts` — tests for preview/internal functionality (`@alpha`, `@beta`, or `@internal` TSDoc directives). These cover unstable or internal symbols that are excluded from the generated API reference (`excludeInternal: true` in typedoc).
  - Choosing the wrong suffix misrepresents the stability of the feature. Match the test file suffix to the release tag on the exported symbol.
- Tests depend on upstream builds (`^build` in Nx target defaults)

## Code Conventions

### License Header (enforced by ESLint)

Every `.ts`/`.js` file must start with:

```
/**
 * Copyright <current-year> Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 ...
 */
```

The `headers/header-format` ESLint rule auto-checks this with the current year.

### TSDoc + API Extractor

All exported symbols must have TSDoc with a release tag (`@public`, `@alpha`, `@beta`, or `@internal`). API Extractor (`api` target) errors on:

- `ae-forgotten-export` — unexported types referenced by public API
- `ae-missing-release-tag` — exported symbol without a release tag
- `ae-undocumented` — exported symbol without TSDoc

### Import Sorting

`perfectionist/sort-imports` enforced — natural ascending order.

### Prettier

Single quotes, TSDoc-aware formatting via `prettier-plugin-jsdoc`. Run `npx nx format` before committing.

## Documentation

**All new user-facing functionality must be accompanied by documentation.** This means both TSDoc on exported symbols (which feeds the generated API reference) and, where appropriate, updates to the hand-written guides in `docs/`.

The project has a VitePress documentation site (`docs/`, `.vitepress/`) published to GitHub Pages. The doc pipeline is tightly coupled to the library build — **you cannot skip steps**.

### Pipeline (order matters)

1. **Build all packages** — `npx nx run-many -t build` (tsc must produce `dist/` first)
2. **Generate API reference** — `npx nx typedoc` (runs typedoc → `tmp/api/`, then `scripts/reprocess-api-reference.js` copies to `docs/api/`)
3. **Build the site** — `npx nx build` at root (runs codegen scripts, then `vitepress build`; output to `.vitepress/dist/`)

The root `build` target in `package.json` depends on `typedoc`, which depends on `^build`. Nx resolves this chain automatically — running `npx nx build` at root triggers the full pipeline.

### Key details

- **API docs are generated, not hand-written.** `docs/api/` is entirely produced by typedoc + `scripts/reprocess-api-reference.js`. Do not edit files in `docs/api/` — they will be overwritten.
- **Several `scripts/generate-*.js` files run before VitePress build** (package reference, entity reference, card reference, recent changes). These produce data files consumed by VitePress.
- **Hand-written docs live in `docs/`** under `introduction/`, `formatting/`, `translation/`, and `plugins/`. Edit these directly.
- **TSDoc comments in source code become the API reference.** Improving documentation means editing TSDoc in `packages/*/src/` and rebuilding.
- **Dev server:** `npx nx dev` at root starts VitePress dev with live reload (also runs the codegen scripts first).
- **Site config:** `.vitepress/config.mts` — sidebar is auto-generated from file structure + typedoc sidebar JSON.

### When to rebuild docs

- After changing any exported symbol's TSDoc → re-run `npx nx typedoc` (or just `npx nx build` at root)
- After adding/removing/renaming a package → re-run the full pipeline
- After editing hand-written docs in `docs/` → VitePress dev server hot-reloads, or run `npx nx build` for a production build

## Commits and PRs

Conventional commits required. PR title format:

```
type: Subject of change
```

Types: `feat`, `fix`, `cleanup`, `chore`

For breaking changes, include a `BREAKING CHANGE:` section in the commit/PR body explaining impact and migration steps. Reference related issues with `Closes #<issue-number>`.

Nx release uses independent versioning per package with conventional commits for changelog generation.
