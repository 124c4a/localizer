---
order: 1
---

# Getting started

<script setup>
  import basicUsage from './getting-started-basic';
  import advancedUsage from './getting-started-advanced';
  import valueFormatting from './getting-started-value-formatting';
  import { VPFeatures } from 'vitepress/theme';
</script>

This guide provides essential information to get started quickly. From installation to basic usage, you'll learn how to integrate the tool into your workflow and utilize its features effectively. Begin with the installation instructions below, and explore advanced topics and API documentation as needed.

## Choose technology

<Cards>
    <Card :icon="{ src: '/typescript.svg', wrap: true }"
            title="Vanilla TypeScript"
            link="#installation"
        />
</Cards>

## Installation

To get started, install the `@localizer/all` package, which provides all core components of the **@localizer** ecosystem in one package.

Use one of the following commands based on your package manager:

::: code-group

```sh [npm]
npm install @localizer/all
```

```sh [pnpm]
pnpm install @localizer/all
```

```sh [yarn]
yarn add @localizer/all
```

```sh [bun]
bun add @localizer/all
```

:::

::: tip

If you're unsure which package manager to use, start with `npm`, as it is included with Node.js by default. Choose another option if it better suits your workflow.

:::

Refer to this documentation for detailed information on components and their features.

::: info NOTE

The `@localizer/all` package installs all core components of the **@localizer** ecosystem, simplifying setup and ensuring compatibility. For details on included modules and usage, see the [API Reference](../api/index.md).

:::

## Translation (basic) <Experimental/>

**@localizer** provides a vast set of utilities for localization, translation and data formatting. Below are examples for main functionality:

Define a simple dictionary to manage translations for your user interface. This centralized approach ensures easy maintenance and scalability as your application evolves.

Here’s how you can define a basic dictionary:

<<< ./getting-started-basic.ts#dictionary{ts}

The [`dictionary()`](../api/_localizer/translate/dictionary/index.md) function creates a strongly-typed object, ensuring translation keys are validated at compile time to prevent errors from missing or incorrect keys.

To use the translations in your application, you can simply pass the keys to [`Localizer`](./localizer.md):

<<< ./getting-started-basic.ts#localizer{ts}

This will output the following to the console:

```console-vue
{{ basicUsage }}
```

This approach simplifies translation management and integrates with TypeScript, ensuring type safety and autocompletion for all keys.

Using this basic dictionary setup, you can quickly localize your application's user interface. For advanced use cases like dynamic translations or context-based localization, see the advanced examples in this guide.

::: tip

For more details and comprehensive examples, refer to the [Translation Documentation](../translation/index.md). It provides in-depth guidance on utilizing translation utilities, managing dictionaries, and implementing advanced localization techniques.

:::

## Translation (advanced) <Experimental/>

Dynamic translations allow you to include runtime values like user names, dates, or numbers in your strings. Define a dictionary where translation values are functions that accept arguments and return formatted strings.

Here’s an example of how you can define a dictionary with dynamic translations:

<<< ./getting-started-advanced.ts#dictionary{ts}

The [`dictionary()`](../api/_localizer/translate/dictionary/index.md) function creates a strongly-typed object where values are functions that accept arguments and return formatted strings. This enables seamless injection of dynamic content into translations.

To use these dynamic translations in your application, you can pass the result to the [`Localizer`](./localizer.md):

<<< ./getting-started-advanced.ts#localizer{ts}

::: tip

The library uses [Unicode MessageFormat 2.0](https://messageformat.unicode.org/docs/quick-start/) for message formatting.

:::

This will produce the following output in the console:

```console-vue
{{ advancedUsage }}
```

Dynamic translations enable personalized and context-aware localization by injecting runtime values like names, dates, or numbers into strings. This approach is ideal for applications requiring user-specific or culturally adaptive content.

For advanced scenarios, such as complex pluralization or external translation service integration, refer to the additional examples in this guide to enhance your localization strategy.

::: tip

For more details and comprehensive examples, refer to the [Translation Documentation](../translation/index.md). It provides in-depth guidance on utilizing translation utilities, managing dictionaries, and implementing advanced localization techniques.

:::

## Formatting of values

To format or localize values like dates, numbers, or currencies, use **@localizer** utilities. These tools ensure data is displayed correctly for any locale.

<<< ./getting-started-value-formatting.ts#example{ts}

This will produce the following output in the console:

```console-vue
{{ valueFormatting }}
```

::: tip

Discover more about the available formatters and their capabilities in the [Formatting Documentation](../formatting/index.md). This section provides detailed examples and guidelines to help you effectively format dates, numbers, currencies, and other locale-specific values.

:::
