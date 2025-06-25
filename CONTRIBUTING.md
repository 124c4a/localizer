# Contributing to @localizer

We would love for you to contribute to @localizer! Read this document to see how to do it.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us
by [submitting an issue](https://github.com/124c4a/localizer/blob/master/CONTRIBUTING.md#submit-issue)
to [our GitHub Repository](https://github.com/124c4a/localizer). Even better, you
can [submit a Pull Request](https://github.com/124c4a/localizer/blob/master/CONTRIBUTING.md#submit-pr) with a fix.

## Project Structure

Source code and documentation are included in the top-level folders listed below.

- `packages` - Source code for @loclizer packages containing formatting, translation and other locale-specific functionality.
- `scripts` - Miscellaneous scripts for project tasks such as building documentation, testing, and code formatting.

## Technologies

The following technologies are used in this repo:

- **TypeScript**: The primary language for @localizer packages.
- **Nx**: The monorepo toolchain.

## Building the Project

After cloning the project to your machine, to install the dependencies, run:

```bash
npm install
```

To build all the packages, run:

```bash
npx nx run-many --target=build
```

### Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```bash
npx nx affected --target=test
```

For example, if you need to only run the tests for the `format-number` package, run:

```bash
npx nx test format-number
```

## Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem may already exist and has been
resolved, or the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. A minimal
reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are
fixing the right problem.

We will be insisting on a minimal reproduction in order to save maintainers' time and ultimately be able to fix more
bugs. Interestingly, from our experience, users often find coding problems themselves while preparing a minimal
reproduction repository. We understand that sometimes it might be hard to extract essentials bits of code from a larger
codebase, but we really need to isolate the problem before we can fix it.

You can file new issues by filling out our [issue form](https://github.com/124c4a/localizer/issues/new/choose).

### <a name="submit-pr"></a> Submitting a PR

Please follow the following guidelines:

- Make sure all code is documented with TSDoc
- Make sure all code changes are covered with unit tests

  - Preview and internal functionality (annotated with `@alpha`, `@beta` or `@internal` TSDoc directives) should be covered by
    unit tests in `*.test.ts` files.
  - Public functionality (annotated with `@public` TSDoc directive) should be covered by unit tests in `*.spec.ts` files
    (specifications).

- Make sure unit tests pass (`npx nx affected --target=test`)
  - Target a specific project with: `npx nx proj:test` (i.e. `npx nx run format-number:test` to target `packages/format-number`)
  - Target a specific unit test file (i.e. `packages/format-number/src/lib/currencyFormatter.spec.ts`)
    with `npx vitest packages/format-number/src/lib/currencyFormatter`
- Make sure you run `nx format`

#### PR Title Guidelines

The PR title should follow the following format:

```plain
type(scope): Subject of change
```

or

```plain
type: Subject of change
```

##### Type

The type must be one of the following:

- feat - New or improved behavior being introduced (e.g. Updating to new versions of external dependencies which bring in new
  features)
- fix - Fixes the current unexpected behavior to match expected behavior (e.g. Fixing the incorrect handling of `undefined` values in value formatters)
- cleanup - Code Style changes that have little to no effect on the user (e.g. Refactoring some functions into a
  different file)
- chore - Changes that have absolutely no effect on users (e.g. Updating the version of Nx used to build the repo)

##### Scope

The scope must be one of the following:

- core - core functionality
- format - anything related to data formatting
- transform - anything related to transformations
- translate - anything related to translations

##### Subject and Body

The subject must contain a description of the change, and the body of the message contains any additional details to provide more context about the change.

Including the issue number that the PR relates to also helps with tracking.

If the PR contains breaking changes, it is advisable to include explanation in the PR body, prefixed with `BREAKING CHANGE:`

#### Example

```plain
feat(format): Time zone support in date/time formatter

Date/time formatters now accept `TZDate` type from `@date-fns/tz`

Closes #157
```
