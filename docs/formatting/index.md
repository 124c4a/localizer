---
order: 3
title: Value formatting
---

# Value formatting

Localization goes beyond translation by adapting data formats to match the user's locale. **@localizer** offers configurable data formatters for common scenarios, including:

- [Dates and times](./dates-and-times/index.md)
- [Numbers and currencies](./numbers/index.md)
- [Relative time](./relative-time/index.md)
- [Display names](./display-name/index.md)
- [Lists](./lists/index.md)
- [Custom types](./custom-data-types/index.md)

The library provides a [set of preconfigured formatters](./preconfigured-formatters/index.md) for common use cases, reducing the need for custom implementations.

## What are formatters?

A formatter is a function that takes input and returns a [localizable value](../introduction/localizable.md). This allows formatted values to be used directly in UI components, [template literals](../introduction/localizable.md#string-templates), or translations.

The library offers several predefined formatter types:

### [`ValueFormatter<T>`](../api/_localizer/core/ValueFormatter/index.md)

`ValueFormatter<T>` formats a single value of type `T` into a localizable representation, suitable for standalone values like numbers, dates, or strings.

### [`UnitValueFormatter<T, U>`](../api/_localizer/core/UnitValueFormatter/index.md)

`UnitValueFormatter<T, U>` formats a value of type `T` with an associated unit of type `U`, such as distances (_12 km_) or monetary amounts (_$123.00_). It ensures the output respects the user's locale and conventions.

### [`ValueRangeFormatter<T>`](../api/_localizer/core/ValueRangeFormatter/index.md)

`ValueRangeFormatter<T>` formats a range of values, taking two arguments of type `T` (start and end). It returns a localizable representation that aligns with the user's locale and formatting preferences.

### [`RelativeValueFormatter<T>`](../api/_localizer/core/RelativeValueFormatter/index.md)

`RelativeValueFormatter<T>` formats relative values using two arguments of type `T`: the value and a reference. It is ideal for representing changes (_+20%_) or time relative to an event (_5 minutes ago_).

::: info NOTE

Developers can create custom formatters for scenarios requiring more than the predefined options. Custom formatters must return a `Localizable` value, enabling flexibility for unique formatting needs.

:::

## Best practice

Centralize all formatters to ensure consistent data formatting across your application. This simplifies updates and ensures uniformity in formatting rules.
