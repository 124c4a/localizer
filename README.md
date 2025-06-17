# `@localizer`: Type-safe localization, formatting and translation library

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/124c4a/localizer/ci-full.yml)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/124c4a/localizer)

## About the Project

`@localizer` is a powerful and flexible library designed to simplify localization, formatting, and translation in your applications. It provides a type-safe approach to managing localized content, ensuring consistency and reducing runtime errors. With `@localizer`, you can easily handle multiple languages, date and number formatting, and dynamic translations, all while maintaining clean and maintainable code.

## Highlights

- **Type-safe Localization**: Ensures compile-time safety for translations and reduces runtime errors.
- **Flexible Formatting**: Supports date, number, and custom formatting for various locales.
- **Dynamic Translations**: Easily handle runtime language switching and dynamic content.
- **Multi-language Support**: Simplifies managing multiple languages in your application.
- **Clean API**: Provides an intuitive and maintainable API for developers.
- **Lightweight and Performant**: Optimized for performance without adding unnecessary overhead.
- **Extensible**: Easily extendable to meet custom localization needs.

## Modules

`@localizer` is organized into several modules to provide a modular and flexible approach to localization and formatting:

### Core Modules

- **`@localizer/core`**: The foundation of the library, providing essential utilities for localization.
- **`@localizer/transform`**: Provides locale-dependent transformations of translations and formatted values.

### Formatters

- **`@localizer/format`**: Provides built-in formatting for dates, numbers, and other custom formats across different locales.
- **`@localizer/format-datetime`**: Formatters for dates, times and their ranges.
- **`@localizer/format-displayname`**: Formatters for display names (languages, countries, currencies).
- **`@localizer/format-list`**: Formatters for lists of items.
- **`@localizer/format-lookup`**: Formatters based on look-up tables.
- **`@localizer/format-number`**: Formatters for numbers, measurements and monetary amounts.
- **`@localizer/format-relativetime`**: Formatters for relative time.

### Translation support

- **`@localizer/translate`**: TypeScript-native translation library.

These modules can be used independently or together, depending on your application's requirements.

### Bundle

- **`@localizer/all`**: A meta-package bundling all the modules.

## Versioning

`@localizer` follows [Semantic Versioning](https://semver.org/) to ensure clarity and predictability in version updates. The version numbers are structured as `MAJOR.MINOR.PATCH`, where:

- **MAJOR**: Increments when there are incompatible API changes.
- **MINOR**: Increments when new features are added in a backward-compatible manner.
- **PATCH**: Increments when backward-compatible bug fixes are introduced.

### Release Process

1. **Development**: All changes are made in feature branches and merged into the `main` branch after review.
2. **Pre-release Testing**: Each release undergoes thorough testing to ensure stability and compatibility.
3. **Version Tagging**: Once a release is ready, it is tagged with the appropriate version number.
4. **Publishing**: The release is published to npm and other relevant platforms.

### Compatibility

We strive to maintain backward compatibility within the same major version. Breaking changes will be clearly documented in the release notes.

For detailed information about changes in each release, refer to the [Changelog](CHANGELOG.md).

## Contribution Guide

We welcome contributions to `@localizer`! Whether you're fixing bugs, adding new features, or improving documentation, your help is greatly appreciated. Follow the steps below to get started:

### Getting Started

1. **Fork the Repository**: Click the "Fork" button on the GitHub repository to create your own copy.
2. **Clone the Repository**: Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/<your-username>/localizer.git
   ```
3. **Install Dependencies**: Navigate to the project directory and install the required dependencies:
   ```bash
   cd localizer
   npm install
   ```

### Making Changes

1. **Create a Branch**: Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make Your Changes**: Implement your changes in the codebase.
3. **Run Tests**: Ensure all tests pass before committing your changes:

   ```bash
   npx nx test <module>

   # for example:
   npx nx test format-number
   ```

4. **Commit Your Changes**: Write a clear and concise commit message:
   ```bash
   git commit -m "feat: Added new feature"
   ```

### Submitting Your Changes

1. **Push Your Branch**: Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request**: Go to the original repository and open a pull request. Provide a detailed description of your changes.

### Need Help?

If you have any questions or need assistance, feel free to open an issue or reach out to the maintainers.

Thank you for contributing to `@localizer`!
...
