---
order: 2
---

# Formatting

Localization is more than just translating text; it involves adapting data formats to align with the user's locale. To ensure consistency and precision, **@localizer** provides a robust set of configurable data formatters designed for common scenarios, such as:

- Numeric values and monetary amounts
- Dates, times, and ranges
- Relative time expressions (e.g., past and future)
- Names of languages, countries, and currencies
- Itemized lists
- Enumerations and custom data formats

To streamline development and minimize boilerplate code, the library also includes a [collection of preconfigured data formatters](./preconfigured-formatters.md) ready for immediate use.

## What are formatters?

A formatter is a function that accepts one or more arguments and returns a [localizable value](../basics/localizable.md). This enables seamless integration of formatted values wherever a [`Localizable`](../api/_localizer/core/Localizable/index.md) is required, such as in UI components, [template literals](../basics/localizable.md#string-templates), or translations.

The library offers several predefined formatter types:

### [`ValueFormatter<T>`](../api/_localizer/core/ValueFormatter/index.md)

`ValueFormatter<T>` is a flexible formatter type that takes a single argument of type `T` and produces a localizable representation of the value. It is ideal for formatting standalone values like numbers, dates, or strings based on the user's locale and preferences.

### [`UnitValueFormatter<T, U>`](../api/_localizer/core/UnitValueFormatter/index.md)

`UnitValueFormatter<T, U>` is tailored for formatting measurable values paired with their units, such as distances (_12 kilometers_) or monetary amounts (_$123.00_). It accepts two arguments: the value to format and its associated unit, ensuring the output adheres to the user's locale and conventions.

### [`ValueRangeFormatter<T>`](../api/_localizer/core/ValueRangeFormatter/index.md)

`ValueRangeFormatter<T>` extends [`ValueFormatter<T>`](#valueformattert) to handle ranges of values. It takes two arguments of type `T`, representing the start and end of the range, and produces a localizable representation that respects the user's locale and formatting preferences.

### [`RelativeValueFormatter<T>`](../api/_localizer/core/RelativeValueFormatter/index.md)

`RelativeValueFormatter<T>` is designed for formatting relative values. It accepts two arguments of type `T`: the value to represent and a reference value. This formatter is commonly used for expressing relative changes (_+20%_) or time points relative to an event (_5 minutes ago_).

::: info NOTE

The predefined formatter types cover a wide range of use cases, but they are intentionally designed to be flexible. Developers can create custom formatting functions for more complex scenarios requiring three or more arguments. The only requirement for a custom formatter is that it must return a `Localizable` value. This extensibility allows developers to adapt the library to meet unique and specialized formatting needs beyond the predefined options.

:::

## Best practice

To maintain consistent data formatting across your application, define all formatters in a centralized location. This approach simplifies adjustments and ensures uniformity, making it easier to manage and update formatting rules as needed.
