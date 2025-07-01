# `@localizer`: Type-safe localization, formatting and translation library

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/124c4a/localizer/ci-main.yml)
![NPM Downloads](https://img.shields.io/npm/dm/%40localizer%2Fcore)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/124c4a/localizer)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/124c4a/localizer)
![NPM License](https://img.shields.io/npm/l/%40localizer%2Fall)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/10752/badge)](https://www.bestpractices.dev/projects/10752)
![OSSF-Scorecard Score](https://img.shields.io/ossf-scorecard/github.com/124c4a/localizer?label=openssf%20scorecard)

# 📖 [Official documentation](https://124c4a.github.io/localizer) 📖

## About the Project

**@localizer** simplifies localization, formatting, and translation with a type-safe approach. It ensures consistency, reduces runtime errors, and supports multiple languages, dynamic translations, and locale-specific formatting.

## Highlights

- **Type-safe Localization**: Compile-time safety for translations, reducing runtime errors.
- **Flexible Formatting**: Supports locale-specific date, number, and custom formatting.
- **Dynamic Translations**: Enables runtime language switching and dynamic content.
- **Multi-language Support**: Simplifies managing multiple languages.
- **Lightweight and Performant**: Optimized for performance with minimal overhead.
- **Extensible**: Easily customizable for specific localization needs.

## Modules

### Modules Overview

**@localizer** is modular, offering flexibility for various localization needs:

#### Core

- **`@localizer/core`**: Essential utilities for localization.
- **`@localizer/transform`**: Locale-dependent transformations.

#### Formatters

- **`@localizer/format`**: Built-in formatting for dates, numbers, and more.
- **`@localizer/format-datetime`**: Date and time formatting.
- **`@localizer/format-displayname`**: Formatting for languages, countries, and currencies.
- **`@localizer/format-list`**: List formatting.
- **`@localizer/format-lookup`**: Lookup table-based formatting.
- **`@localizer/format-number`**: Number, measurement, and currency formatting.
- **`@localizer/format-relativetime`**: Relative time formatting.

#### Translation

- **`@localizer/translate`**: TypeScript-native translation library.

Use modules independently or combine them as needed.

### Bundle

- **`@localizer/all`**: A meta-package bundling all the modules.

## Versioning

**@localizer** uses [Semantic Versioning](https://semver.org/), structured as `MAJOR.MINOR.PATCH`:

- **MAJOR**: For breaking changes.
- **MINOR**: For new features.
- **PATCH**: For bug fixes.

### Release Process

1. **Development**: Changes are made in feature branches and merged into `main` after review.
2. **Testing**: Each release is tested for stability and compatibility.
3. **Version Tagging**: Releases are tagged with the appropriate version.
4. **Publishing**: Releases are published to npm.

### Compatibility

We aim to keep backward compatibility within a major version. Breaking changes are documented in the change logs of corresponding packages.

## Contribution Guide

Contributions are welcome! Fix bugs, add features, or improve documentation by following these steps:

### Getting Started

1. **Fork and Clone**: Fork the repository and clone it locally:

```bash
git clone https://github.com/<your-username>/localizer.git
cd localizer
```

2. **Install Dependencies**: Install the required dependencies:

```bash
npm install
```

3. **Create a Branch**:

```bash
git checkout -b feature/your-feature-name
```

4. **Make Changes**: Update the codebase as needed.

5. **Run Tests**: Verify your changes:

```bash
npx nx test <module>
```

6. **Commit Changes**: Use a clear commit message:

```bash
git commit -m "feat: Add new feature"
```

Refer to the [contribution guide](./CONTRIBUTING.md) for more details.

### Need Help?

For questions or assistance, [open an issue](https://github.com/124c4a/localizer/issues/new/choose) or contact the maintainers.

Thank you for supporting **@localizer**!
