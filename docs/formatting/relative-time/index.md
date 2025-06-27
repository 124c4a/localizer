---
order: 3
title: Relative times
---

# Relative time <Badge type="info" text="@localizer/format-relativetime" />

> **[relativeTimeFormatter](../../api/_localizer/format-relativetime/relativeTimeFormatter/index.md)**<`T`> ( `options?` ): [RelativeValueFormatter](../index.md#relativevalueformatter-t)<`T`>
>
> - `T` _extends number | Date_ - The type of value to format. Number values are treated as timestamps (milliseconds since _January 1, 1970, 00:00:00 UTC_).
> - `options` - Optional [configuration of the formatter](./options.md).

This formatter provides a flexible, locale-aware way to display relative times for past and future events.

::: tip

If you prefer to use default settings, consider using a [preconfigured relative time formatter](../preconfigured-formatters/dates-and-times/relative-time.md). It simplifies the process by providing a ready-to-use configuration for common use cases.

:::
