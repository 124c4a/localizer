# Contributing to @localizer

Contributions are welcome! Follow this guide to get started.

## Found an Issue?

If you find a bug or error, please [submit an issue](https://github.com/124c4a/localizer/issues/new/choose) or [open a Pull Request](https://github.com/124c4a/localizer/blob/master/CONTRIBUTING.md#submit-pr) with a fix.

## Project Structure

- `packages` - Contains source code for @localizer packages, including formatting, translation, and locale-specific functionality.
- `scripts` - Includes scripts for tasks like building documentation, testing, and code formatting.

## Technologies

- **TypeScript**: Language for @localizer packages.
- **Nx 22.x**: Monorepo toolchain for this workspace.

## Building the Project

After cloning the project, install dependencies with:

```bash
npm install
```

Build all packages with:

```bash
npx nx run-many --target=build --all
```

### Running Unit Tests

To ensure your changes pass all unit tests, use:

```bash
npx nx run-many --target=test --all
```

To test a specific package, such as `@localizer/format-number`, run:

```bash
npx nx test @localizer/format-number
```

## Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before submitting an issue, search the issue tracker to check if it already exists. If not, provide a minimal reproduction to help us confirm and fix the problem efficiently.

File new issues using our [issue form](https://github.com/124c4a/localizer/issues/new/choose).

### <a name="submit-pr"></a> Submitting a PR

Please ensure the following before submitting your PR:

- Document all code changes using TSDoc.
- Cover all code changes with unit tests:
  - Use `*.test.ts` files for preview/internal functionality (`@alpha`, `@beta`, or `@internal` TSDoc directives).
  - Use `*.spec.ts` files for public functionality (`@public` TSDoc directive).
- Verify all unit tests pass:
  - Run all tests: `npx nx run-many --target=test --all`.
  - Run tests for a specific project: `npx nx test [project-name]` (e.g., `npx nx test @localizer/format-number`).
  - Run a specific test file: `npx vitest [file-path]` (e.g., `npx vitest packages/format-number/src/lib/currencyFormatter.spec.ts`).
- Format your code using `npx nx format`.
- Ensure your PR adheres to the [PR Title Guidelines](#pr-title-guidelines).
- Include a clear description and reference related issues in the PR body.

Thank you for contributing!

#### PR Title Guidelines

The PR title should follow this format:

```plain
type: Subject of change
```

##### Type

- feat - Introduces new features or improvements (e.g., adding support for new formats).
- fix - Resolves bugs or incorrect behavior (e.g., fixing edge cases in formatters).
- cleanup - Refactors or improves code without user-facing changes (e.g., reorganizing utility functions).
- chore - Updates project dependencies or configurations with no user impact (e.g., upgrading build tools).

##### Subject and Body

The subject should briefly describe the change. The body provides additional context, such as implementation details or reasons for the change.

Reference related issues using keywords like `Closes #<issue-number>` to link the PR to an issue.

For breaking changes, include a `BREAKING CHANGE:` section in the body to explain the impact and migration steps.

#### Example

```plain
feat: Time zone support in date/time formatter

Date/time formatters now accept `TZDate` type from `@date-fns/tz`

Closes #157
```
