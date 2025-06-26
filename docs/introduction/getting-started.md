---
order: 1
---

# Getting started

<script setup>
  import basicUsage from './getting-started-basic';
  import advancedUsage from './getting-started-advanced';
  import valueFormatting from './getting-started-value-formatting';
</script>

This guide is designed to help you get up and running with the tool in no time. Whether you're a first-time user exploring its capabilities or a returning user looking for a refresher, this document provides all the essential information you need to start confidently.

We'll cover everything from installation to basic usage, ensuring you have a solid foundation to build upon. By the end of this guide, you'll be equipped with the knowledge to integrate the tool seamlessly into your workflow and take full advantage of its features.

If you're new to the tool, we recommend starting with the installation instructions below. For more advanced topics and detailed API documentation, feel free to explore the additional resources linked throughout this guide.

## Installation

To begin using the tool, the first step is to install the `@localizer/all` package. This package serves as a convenient meta-package that consolidates and re-exports symbols from all the core components of the **@localizer** ecosystem. By installing this package, you'll have access to all the essential functionality needed to get started.

Here are the installation commands for each package manager:

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

> [!TIP]
> If you're unsure which package manager to use, you can stick with `npm`, as it comes pre-installed with Node.js. However, feel free to explore other options based on your workflow preferences.

Once the installation is complete, you're ready to move on to the next steps. For more details about the individual components included in the `@localizer/all` package, refer to the [API Reference](../api/index.md). This will provide you with a deeper understanding of the available modules and their capabilities.

> [!NOTE]
> The `@localizer/all` package is a meta-package that consolidates and re-exports symbols from all core components of the **@localizer** ecosystem. This means that by installing and using this single package, you gain access to a comprehensive suite of tools and utilities without needing to manage multiple dependencies individually. It simplifies the setup process and ensures compatibility across the various components of the ecosystem.
>
> For a detailed breakdown of the individual packages and modules included in `@localizer/all`, refer to the [API Reference](../api/index.md). There, you'll find in-depth documentation on each component, including usage examples, configuration options, and best practices to help you make the most of the tool.

## Translation (basic) <Badge type="warning" text="experimental" />

**@localizer** provides a vast set of utilities for localization, translation and data formatting. Below are examples for main functionality:

In this example, we define and utilize a straightforward dictionary to manage translations for various parts of the user interface. This dictionary serves as a centralized repository for all translation keys and their corresponding localized values, making it easier to maintain and extend as your application grows.

Here’s how you can define a basic dictionary:

<<< ./getting-started-basic.ts#dictionary{ts}

The [`dictionary()`](../api/_localizer/translate/dictionary/index.md) function creates a strongly-typed object where each key represents a translatable string. This ensures that your translation keys are validated at compile time, reducing the risk of runtime errors caused by missing or misspelled keys.

To use the translations in your application, you can simply pass the keys to [`Localizer`](./localizer.md):

<<< ./getting-started-basic.ts#localizer{ts}

This will output the following to the console:

```console-vue
{{ basicUsage }}
```

This approach not only simplifies the process of managing translations but also integrates seamlessly with TypeScript, providing type safety and autocompletion for all defined keys.

By leveraging this basic dictionary setup, you can quickly implement localization for your application’s user interface, ensuring a consistent and efficient workflow for managing translations. For more advanced use cases, such as dynamic translations or context-based localization, refer to the advanced examples in this guide.

## Translation (advanced) <Badge type="warning" text="experimental" />

Quite often, translations need to include dynamic values that are determined at runtime. For instance, you might want to display a user's name, a date, or a numerical value within a translated string. To handle such scenarios, you can define a dictionary where the translation values are functions. These functions accept arguments and dynamically format the output based on the provided input.

Here’s an example of how you can define a dictionary with dynamic translations:

<<< ./getting-started-advanced.ts#dictionary{ts}

In this example, the [`dictionary()`](../api/_localizer/translate/dictionary/index.md) function creates a strongly-typed object where each key represents a translatable string. However, unlike static translations, the values here are functions that take arguments and return a formatted string. This approach allows you to inject dynamic content into your translations seamlessly.

To use these dynamic translations in your application, you can pass the result to the [`Localizer`](./localizer.md):

<<< ./getting-started-advanced.ts#localizer{ts}

This will produce the following output in the console:

```console-vue
{{ advancedUsage }}
```

By leveraging this approach, you can create highly flexible and reusable translations that adapt to various contexts. For example, you can use this method to display personalized greetings, format dates and times, or handle pluralization based on numeric values.

Dynamic translations are particularly useful in applications that require localization for user-specific or context-sensitive content. They ensure that your application remains both user-friendly and culturally appropriate, regardless of the target audience or locale.

For more advanced use cases, such as handling complex pluralization rules or integrating with external translation services, refer to the additional resources and examples provided in this guide. These will help you further enhance your localization strategy and deliver a polished, professional user experience.

## Formatting of values

To format or localize different value types, **@localizer** provides a comprehensive set of utilities designed to handle various data formats, including dates, numbers, and currencies. These formatters ensure that your application can present data in a way that is both culturally appropriate and user-friendly, regardless of the target locale.

<<< ./getting-started-value-formatting.ts#example{ts}

This will produce the following output in the console:

```console-vue
{{ valueFormatting }}
```
